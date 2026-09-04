import { z } from 'zod';

const name = z
  .string()
  .trim()
  .min(2, 'Enter your full name.')
  .max(80, 'Name is too long.');

const email = z
  .string()
  .trim()
  .min(1, 'Enter an email address.')
  .email('Enter a valid email address.')
  .max(120, 'Email is too long.');

const phone = z
  .string()
  .trim()
  .min(7, 'Enter a contactable phone number.')
  .max(20, 'Phone number is too long.')
  .regex(/^[+()\-\s\d]+$/, 'Use digits, spaces and + ( ) - only.');

const message = z
  .string()
  .trim()
  .min(10, 'Tell us a little more — at least 10 characters.')
  .max(2000, 'Please keep this under 2000 characters.');

export const hiringEnquirySchema = z.object({
  kind: z.literal('hiring'),
  name,
  email,
  phone: phone.or(z.literal('')).optional(),
  company: z.string().trim().min(2, 'Enter your company name.').max(120),
  requirement: z.enum([
    'permanent',
    'contract',
    'contract-to-hire',
    'project',
    'consulting',
    'other',
  ]),
  message,
  /** Honeypot — must stay empty. */
  website: z.string().max(0).optional(),
});

export const careerEnquirySchema = z.object({
  kind: z.literal('career'),
  name,
  email,
  phone,
  role: z.string().trim().min(2, 'Enter the role you are targeting.').max(120),
  domain: z.string().trim().min(2, 'Choose a technology domain.').max(80),
  experience: z.enum(['0-2', '2-5', '5-8', '8-12', '12+']),
  location: z.enum(['onsite', 'remote', 'hybrid', 'wfh-women-programme']),
  message: message.or(z.literal('')).optional(),
  website: z.string().max(0).optional(),
});

export type HiringEnquiry = z.infer<typeof hiringEnquirySchema>;
export type CareerEnquiry = z.infer<typeof careerEnquirySchema>;

export const RESUME_MAX_BYTES = 5 * 1024 * 1024;
export const RESUME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

export type FormState = {
  status: 'idle' | 'success' | 'error';
  message: string;
  /** Field-level errors keyed by input name. */
  errors?: Record<string, string>;
};

export const idleState: FormState = { status: 'idle', message: '' };
