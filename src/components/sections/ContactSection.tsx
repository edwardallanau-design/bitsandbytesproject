import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Textarea } from "@/components/ui/textarea";

/**
 * Contact section — static UI for now.
 * Form submission can be wired to a service like Resend, Formspree,
 * or a custom API route in a later iteration.
 */
export function ContactSection() {
  return (
    <SectionWrapper>
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
            Let&apos;s talk
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            Ready to take your business online? Tell us about your project and
            we&apos;ll get back to you within 24 hours.
          </p>
        </div>

        <form className="space-y-5" action="#" method="POST">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                required
                placeholder="Jane"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                required
                placeholder="Smith"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="jane@example.com"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="businessName">Business name</Label>
            <Input
              id="businessName"
              name="businessName"
              type="text"
              placeholder="Acme Co."
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              rows={5}
              required
              placeholder="Tell us about your business and what you're looking to achieve..."
            />
          </div>

          <Button type="submit" className="w-full" size="lg">
            Send message
          </Button>
        </form>
      </div>
    </SectionWrapper>
  );
}
