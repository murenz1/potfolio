import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy | Lumion dev",
  description: "Learn about how we collect, use, and protect your personal information.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p>Last Updated: March 19, 2025</p>

          <h2>1. Introduction</h2>
          <p>
            At Lumion dev ("we," "our," or "us"), we respect your privacy and are committed to protecting your personal
            information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when
            you visit our website or use our services.
          </p>

          <h2>2. Information We Collect</h2>
          <p>We may collect information about you in a variety of ways, including:</p>

          <h3>2.1 Personal Data</h3>
          <p>When you interact with our website or services, we may collect personal information such as:</p>
          <ul>
            <li>Name, email address, phone number, and other contact details</li>
            <li>Billing information and payment details</li>
            <li>Information you provide when filling out forms on our website</li>
            <li>Information you provide when communicating with us</li>
          </ul>

          <h3>2.2 Usage Data</h3>
          <p>We may also collect information about how you access and use our website and services, including:</p>
          <ul>
            <li>IP address, browser type, and operating system</li>
            <li>Pages you visit and features you use</li>
            <li>Time spent on pages and navigation patterns</li>
            <li>Referring websites or sources</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We may use the information we collect for various purposes, including to:</p>
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Process transactions and send related information</li>
            <li>Respond to your inquiries and provide customer support</li>
            <li>Send administrative information, updates, and marketing communications</li>
            <li>Monitor and analyze usage patterns and trends</li>
            <li>Protect against unauthorized access and legal liability</li>
          </ul>

          <h2>4. Disclosure of Your Information</h2>
          <p>We may share your information with third parties in certain situations, including:</p>
          <ul>
            <li>With service providers who perform services on our behalf</li>
            <li>To comply with legal obligations</li>
            <li>To protect our rights, privacy, safety, or property</li>
            <li>In connection with a business transaction such as a merger or acquisition</li>
          </ul>

          <h2>5. Your Rights and Choices</h2>
          <p>
            Depending on your location, you may have certain rights regarding your personal information, including the
            right to:
          </p>
          <ul>
            <li>Access, correct, or delete your personal information</li>
            <li>Object to or restrict certain processing activities</li>
            <li>Data portability</li>
            <li>Withdraw consent where applicable</li>
          </ul>

          <h2>6. Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information.
            However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot
            guarantee absolute security.
          </p>

          <h2>7. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The updated version will be indicated by an updated
            "Last Updated" date, and the updated version will be effective as soon as it is accessible.
          </p>

          <h2>8. Contact Us</h2>
          <p>If you have questions or concerns about this Privacy Policy, please contact us at:</p>
          <p>
            Email: privacy@lumiondev.com
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

