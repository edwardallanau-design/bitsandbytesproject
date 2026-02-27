import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Textarea } from "@/components/ui/textarea";

/**
 * Contact section — static UI.
 * Form submission can be wired to Resend, Formspree, or a custom API route.
 */
export function ContactSection() {
  return (
    <SectionWrapper className="bg-neutral-950">
      <div className="mx-auto max-w-2xl">
        <div className="mb-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-600">
            Contact us
          </p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Let&apos;s talk
          </h2>
          <p className="mt-4 text-lg text-neutral-400">
            Ready to take your business online? Tell us about your project and
            we&apos;ll get back to you within 24 hours.
          </p>
        </div>

        <form className="space-y-5" action="#" method="POST">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label
                htmlFor="firstName"
                className="text-sm font-medium text-neutral-300"
              >
                First name
              </Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                required
                placeholder="Jane"
                className="border-neutral-700 bg-neutral-900 text-white placeholder:text-neutral-600 focus-visible:ring-neutral-500"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="lastName"
                className="text-sm font-medium text-neutral-300"
              >
                Last name
              </Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                required
                placeholder="Smith"
                className="border-neutral-700 bg-neutral-900 text-white placeholder:text-neutral-600 focus-visible:ring-neutral-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-neutral-300"
            >
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="jane@example.com"
              className="border-neutral-700 bg-neutral-900 text-white placeholder:text-neutral-600 focus-visible:ring-neutral-500"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="businessName"
              className="text-sm font-medium text-neutral-300"
            >
              Business name
            </Label>
            <Input
              id="businessName"
              name="businessName"
              type="text"
              placeholder="Acme Co."
              className="border-neutral-700 bg-neutral-900 text-white placeholder:text-neutral-600 focus-visible:ring-neutral-500"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="message"
              className="text-sm font-medium text-neutral-300"
            >
              Message
            </Label>
            <Textarea
              id="message"
              name="message"
              rows={5}
              required
              placeholder="Tell us about your business and what you're looking to achieve..."
              className="border-neutral-700 bg-neutral-900 text-white placeholder:text-neutral-600 focus-visible:ring-neutral-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-white py-3 text-sm font-semibold text-neutral-950 transition-colors hover:bg-neutral-200"
          >
            Send message
          </button>
        </form>
      </div>
    </SectionWrapper>
  );
}
