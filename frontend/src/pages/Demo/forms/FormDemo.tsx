import type { AnyFieldApi } from '@tanstack/react-form';
import { z } from 'zod';
import {
  Button,
  Form,
  FormActions,
  FormCheckbox,
  FormGroup,
  FormInput,
  FormSelect,
  FormSwitch,
  FormTextarea,
  useToast,
} from '@/components/ui';
import './FormDemo.css';

// Define the form schema with Zod
const contactFormSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  role: z.string().min(1, 'Please select a role'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  newsletter: z.boolean(),
  notifications: z.boolean(),
  terms: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms and conditions' }),
  }),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const roleOptions = [
  { value: 'developer', label: 'Developer' },
  { value: 'designer', label: 'Designer' },
  { value: 'manager', label: 'Manager' },
  { value: 'other', label: 'Other' },
];

export function FormDemo() {
  const { addToast } = useToast();

  const handleSubmit = (values: ContactFormData) => {
    console.log('Form submitted:', values);
    addToast({
      intent: 'success',
      title: 'Message sent!',
      message: 'Thanks for reaching out. We\'ll get back to you within 24 hours.',
      duration: 5000,
    });
  };

  return (
    <div className="form-demo">
      <div className="form-demo__container">
        <header className="form-demo__header">
          <h2 className="form-demo__title">Get in Touch</h2>
          <p className="form-demo__description">
            Fill out the form below and we'll get back to you within 24 hours.
          </p>
        </header>

        <Form<ContactFormData>
          schema={contactFormSchema}
          defaultValues={{
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            company: '',
            role: '',
            message: '',
            newsletter: false,
            notifications: true,
            terms: false as unknown as true,
          }}
          onSubmit={handleSubmit}
        >
          {(form) => (
            <>
              <FormGroup legend="Personal Information" description="Tell us about yourself">
                <FormGroup layout="horizontal">
                  <form.Field name="firstName">
                    {(field: AnyFieldApi) => (
                      <FormInput
                        field={field}
                        label="First Name"
                        placeholder="John"
                        autoComplete="given-name"
                        required
                      />
                    )}
                  </form.Field>
                  <form.Field name="lastName">
                    {(field: AnyFieldApi) => (
                      <FormInput
                        field={field}
                        label="Last Name"
                        placeholder="Doe"
                        autoComplete="family-name"
                        required
                      />
                    )}
                  </form.Field>
                </FormGroup>

                <form.Field name="email">
                  {(field: AnyFieldApi) => (
                    <FormInput
                      field={field}
                      label="Email Address"
                      type="email"
                      placeholder="john@example.com"
                      autoComplete="email"
                      hint="We'll never share your email with anyone else"
                      required
                    />
                  )}
                </form.Field>

                <FormGroup layout="horizontal">
                  <form.Field name="phone">
                    {(field: AnyFieldApi) => (
                      <FormInput
                        field={field}
                        label="Phone Number"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        autoComplete="tel"
                      />
                    )}
                  </form.Field>
                  <form.Field name="company">
                    {(field: AnyFieldApi) => (
                      <FormInput
                        field={field}
                        label="Company"
                        placeholder="Acme Inc."
                        autoComplete="organization"
                      />
                    )}
                  </form.Field>
                </FormGroup>
              </FormGroup>

              <FormGroup legend="Your Message" description="How can we help you?">
                <form.Field name="role">
                  {(field: AnyFieldApi) => (
                    <FormSelect
                      field={field}
                      label="Your Role"
                      options={roleOptions}
                      placeholder="Select your role"
                      required
                    />
                  )}
                </form.Field>

                <form.Field name="message">
                  {(field: AnyFieldApi) => (
                    <FormTextarea
                      field={field}
                      label="Message"
                      placeholder="Tell us how we can help you..."
                      hint="Be as detailed as possible so we can best assist you"
                      required
                    />
                  )}
                </form.Field>
              </FormGroup>

              <FormGroup legend="Preferences" description="Customize your experience">
                <form.Field name="newsletter">
                  {(field: AnyFieldApi) => (
                    <FormCheckbox
                      field={field}
                      checkboxLabel="Subscribe to our newsletter"
                      hint="Get the latest updates, tips, and news delivered to your inbox"
                    />
                  )}
                </form.Field>

                <form.Field name="notifications">
                  {(field: AnyFieldApi) => (
                    <FormSwitch
                      field={field}
                      switchLabel="Enable email notifications"
                      hint="Receive notifications about your account activity"
                    />
                  )}
                </form.Field>
              </FormGroup>

              <FormGroup>
                <form.Field name="terms">
                  {(field: AnyFieldApi) => (
                    <FormCheckbox
                      field={field}
                      checkboxLabel="I agree to the terms of service and privacy policy"
                      required
                    />
                  )}
                </form.Field>
              </FormGroup>

              <FormActions>
                <Button
                  type="button"
                  intent="secondary"
                  onClick={() => form.reset()}
                >
                  Clear Form
                </Button>
                <form.Subscribe selector={(state: { isSubmitting: boolean }) => state.isSubmitting}>
                  {(isSubmitting: boolean) => (
                    <Button type="submit" intent="primary" disabled={isSubmitting}>
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  )}
                </form.Subscribe>
              </FormActions>
            </>
          )}
        </Form>
      </div>
    </div>
  );
}
