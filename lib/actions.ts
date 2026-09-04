'use server';

import { z } from 'zod';
import {
  careerEnquirySchema,
  hiringEnquirySchema,
  RESUME_MAX_BYTES,
  RESUME_TYPES,
  type FormState,
} from '@/lib/validation';

type Payload = Record<string, unknown>;

/**
 * Single outbound seam. Point TEKTON_ENQUIRY_WEBHOOK at a Supabase Edge
 * Function, an automation platform, or your own API and every submission
 * arrives there as JSON. With no webhook configured the submission is
 * validated and logged, so the form is still safe to ship.
 */
async function deliver(payload: Payload): Promise<void> {
  const endpoint = process.env.TEKTON_ENQUIRY_WEBHOOK;

  if (!endpoint) {
    console.info('[tekton] enquiry received', {
      ...payload,
      receivedAt: new Date().toISOString(),
    });
    return;
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...(process.env.TEKTON_ENQUIRY_SECRET
        ? { 'x-tekton-signature': process.env.TEKTON_ENQUIRY_SECRET }
        : {}),
    },
    body: JSON.stringify({ ...payload, receivedAt: new Date().toISOString() }),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Enquiry endpoint responded ${response.status}`);
  }
}

function fieldErrors(error: z.ZodError): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === 'string' && !errors[key]) errors[key] = issue.message;
  }
  return errors;
}

const TRANSPORT_ERROR =
  'We could not send that just now. Email HRTekton@outlook.com or call +91 6303069896 and we will pick it up.';

export async function submitHiringEnquiry(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = hiringEnquirySchema.safeParse({
    kind: 'hiring',
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone') ?? '',
    company: formData.get('company'),
    requirement: formData.get('requirement'),
    message: formData.get('message'),
    website: formData.get('website') ?? '',
  });

  if (!parsed.success) {
    return {
      status: 'error',
      message: 'Check the highlighted fields and send again.',
      errors: fieldErrors(parsed.error),
    };
  }

  try {
    await deliver(parsed.data);
  } catch (error) {
    console.error('[tekton] hiring enquiry failed', error);
    return { status: 'error', message: TRANSPORT_ERROR };
  }

  return {
    status: 'success',
    message: `Thanks ${parsed.data.name.split(' ')[0]} — your requirement is with our team. Expect a reply within one business day.`,
  };
}

export async function submitCareerEnquiry(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = careerEnquirySchema.safeParse({
    kind: 'career',
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    role: formData.get('role'),
    domain: formData.get('domain'),
    experience: formData.get('experience'),
    location: formData.get('location'),
    message: formData.get('message') ?? '',
    website: formData.get('website') ?? '',
  });

  if (!parsed.success) {
    return {
      status: 'error',
      message: 'Check the highlighted fields and send again.',
      errors: fieldErrors(parsed.error),
    };
  }

  const resume = formData.get('resume');
  let resumeMeta: { name: string; size: number; type: string } | null = null;

  if (resume instanceof File && resume.size > 0) {
    if (!RESUME_TYPES.includes(resume.type)) {
      return {
        status: 'error',
        message: 'Attach your CV as a PDF or Word document.',
        errors: { resume: 'PDF, DOC or DOCX only.' },
      };
    }
    if (resume.size > RESUME_MAX_BYTES) {
      return {
        status: 'error',
        message: 'That file is over the 5 MB limit.',
        errors: { resume: 'Maximum file size is 5 MB.' },
      };
    }
    resumeMeta = { name: resume.name, size: resume.size, type: resume.type };
  }

  try {
    await deliver({ ...parsed.data, resume: resumeMeta });
  } catch (error) {
    console.error('[tekton] career enquiry failed', error);
    return { status: 'error', message: TRANSPORT_ERROR };
  }

  return {
    status: 'success',
    message: `Thanks ${parsed.data.name.split(' ')[0]} — your profile is in. A consultant will reach out when a matching ${parsed.data.domain} role opens.`,
  };
}
