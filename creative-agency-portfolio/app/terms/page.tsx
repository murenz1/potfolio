import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Terms of Service | Lumion dev",
  description: "Read our terms of service and conditions for using Lumion dev's website and services.",
}

export default function TermsPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p>Last Updated: March 19, 2025</p>

          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing or using the Lumion dev website and services, you agree to be bound by these Terms of Service
            and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited
            from using or accessing this site.
          </p>

          <h2>2. Use License</h2>
          <p>
            Permission is granted to temporarily access the materials on Lumion dev's website for personal,
            non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under
            this license you may not:
          </p>
          <ul>
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose or for any public display</li>
            <li>Attempt to decompile or reverse engineer any software contained on Lumion dev's website</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
            <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
          </ul>

          <h2>3. Services</h2>
          <p>
            Lumion dev provides various digital services including but not limited to digital marketing, software
            development, e-commerce solutions, and AI & automation services. All services are provided "as is" and "as
            available" without any warranties, expressed or implied.
          </p>

          <h2>4. User Accounts</h2>
          <p>
            When you create an account with us, you must provide accurate, complete, and current information. You are
            responsible for safeguarding the password and for all activities that occur under your account. You agree to
            notify us immediately of any unauthorized use of your account.
          </p>

          <h2>5. Payment Terms</h2>
          <p>
            For services that require payment, you agree to pay all fees or charges to your account based on our fees,
            charges, and billing terms in effect at the time a fee or charge is due and payable. All payments are
            non-refundable unless otherwise specified in a separate agreement.
          </p>

          <h2>6. Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are and will remain the exclusive property
            of Lumion dev and its licensors. The Service is protected by copyright, trademark, and other laws of both
            the United States and foreign countries.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            In no event shall Lumion dev, nor its directors, employees, partners, agents, suppliers, or affiliates, be
            liable for any indirect, incidental, special, consequential or punitive damages, including without
            limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to
            or use of or inability to access or use the Service.
          </p>

          <h2>8. Termination</h2>
          <p>
            We may terminate or suspend your account and bar access to the Service immediately, without prior notice or
            liability, under our sole discretion, for any reason whatsoever and without limitation, including but not
            limited to a breach of the Terms.
          </p>

          <h2>9. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of the State of California, without
            regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will
            not be considered a waiver of those rights.
          </p>

          <h2>10. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to
            access or use our Service after any revisions become effective, you agree to be bound by the revised terms.
          </p>

          <h2>11. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at:</p>
          <p>
            Email: legal@lumiondev.com
            <br />
            Address: 123 Innovation Drive, Tech District, San Francisco, CA 94103
            <br />
            Phone: (555) 123-4567
          </p>
        </div>

        <div className="mt-12 flex justify-center">
          <Link href="/" className="text-primary hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

