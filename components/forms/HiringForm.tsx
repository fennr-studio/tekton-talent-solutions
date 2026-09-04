'use client';

import { useActionState } from 'react';
import { submitHiringEnquiry } from '@/lib/actions';
import { idleState } from '@/lib/validation';
import {
  FormStatus,
  Honeypot,
  SelectField,
  SubmitButton,
  TextAreaField,
  TextField,
} from '@/components/forms/Field';

const requirements = [
  { value: 'permanent', label: 'Permanent hiring' },
  { value: 'contract', label: 'Contract staffing' },
  { value: 'contract-to-hire', label: 'Contract-to-hire' },
  { value: 'project', label: 'Project-based team' },
  { value: 'consulting', label: 'Technology consulting' },
  { value: 'other', label: 'Something else' },
];

export function HiringForm() {
  const [state, formAction, pending] = useActionState(submitHiringEnquiry, idleState);
  const errors = state.errors ?? {};

  return (
    <form action={formAction} className="relative" noValidate>
      <Honeypot />
      <div className="grid gap-8 sm:grid-cols-2">
        <TextField label="Your name" name="name" required autoComplete="name" error={errors.name} />
        <TextField label="Company" name="company" required autoComplete="organization" error={errors.company} />
        <TextField label="Work email" name="email" type="email" required autoComplete="email" error={errors.email} />
        <TextField
          label="Phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          hint="Optional"
          error={errors.phone}
        />
        <SelectField
          label="What do you need"
          name="requirement"
          options={requirements}
          error={errors.requirement}
          className="sm:col-span-2"
        />
        <TextAreaField
          label="Roles, skills, timelines"
          name="message"
          required
          rows={5}
          placeholder="Four SAP S/4HANA consultants for a Hyderabad rollout, starting next quarter…"
          error={errors.message}
          className="sm:col-span-2"
        />
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-6">
        <SubmitButton pending={pending}>Send requirement</SubmitButton>
        <FormStatus status={state.status} message={state.message} />
      </div>
    </form>
  );
}
