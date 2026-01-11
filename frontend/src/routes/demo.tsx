import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { Demo } from '../pages/Demo';

const demoSearchSchema = z.object({
  modal: z.string().optional(),
  drawer: z.string().optional(),
});

export const Route = createFileRoute('/demo')({
  validateSearch: demoSearchSchema,
  component: Demo,
});
