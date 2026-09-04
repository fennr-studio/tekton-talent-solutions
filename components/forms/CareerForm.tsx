'use client';

import { useActionState } from 'react';
import { submitCareerEnquiry } from '@/lib/actions';
import { idleState } from '@/lib/validation';
import { technologyDomains } from '@/data/technology-domains';
import {
  FileField,
  FormStatus,
  Honeypot,
  SelectField,
  SubmitButton,
  TextAreaField,
  TextField,
} from '@/components/forms/Field';

const experience = [
  { value: '0-2', label: '0 – 2 years' },
  { value: '2-5', label: '2 – 5 years' },
  { value: '5-8', label: '5 – 8 years' },
  { value: '8-12', label: '8 – 12 years' },
  { value: '12+', label: '12+ years' },
];

const workModes = [
  { value: 'onsite', label: 'Onsite' },
  { value: 'remote', label: 'Remote' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'wfh-women-programme', label: 'Work from home — women’s programme' },
];

const domains = [
  ...technologyDomains.map((domain) => ({ value: domain.name, label: domain.name })),
  { value: 'Other', label: 'Other / not listed' },
];

export function CareerForm() {
  const [state, formAction, pending] = useActionState(submitCareerEnquiry, idleState);
  const errors = state.errors ?? {};

  return (
    <form action={formAction} className="relative" noValidate>
      <Honeypot />
      <div className="grid gap-8 sm:grid-cols-2">
        <TextField label="Full name" name="name" required autoComplete="name" error={errors.name} />
        <TextField label="Email" name="email" type="email" required autoComplete="email" error={errors.email} />
        <TextField label="Phone" name="phone" type="tel" required autoComplete="tel" error={errors.phone} />
        <TextField
          label="Role you are targeting"
          name="role"
          required
          placeholder="ServiceNow developer"
          error={errors.role}
        />
        <SelectField label="Technology domain" name="domain" options={domains} error={errors.domain} />
        <SelectField label="Experience" name="experience" options={experience} error={errors.experience} />
        <SelectField
          label="Preferred way of working"
          name="location"
          options={workModes}
          error={errors.location}
          className="sm:col-span-2"
        />
        <FileField
          label="CV"
          name="resume"
          accept=".pdf,.doc,.docx"
          hint="PDF, DOC or DOCX, up to 5 MB. Optional — you can send it later."
          error={errors.resume}
          className="sm:col-span-2"
        />
        <TextAreaField
          label="Anything else"
          name="message"
          rows={4}
          hint="Optional"
          placeholder="Notice period, preferred locations, certifications…"
          error={errors.message}
          className="sm:col-span-2"
        />
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-6">
        <SubmitButton pending={pending}>Send my profile</SubmitButton>
        <FormStatus status={state.status} message={state.message} />
      </div>
    </form>
  );
}
