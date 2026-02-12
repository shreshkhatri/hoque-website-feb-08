'use client';

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Page Title */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-lg">
            Last Updated: February 2026
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-8">
          <p className="text-foreground text-base leading-relaxed mb-4">
            At HOQUE, we are committed to protecting your privacy and ensuring transparency about how we collect, use, and protect your personal information. This Privacy Policy outlines our practices regarding data collection and usage for our educational services.
          </p>
        </section>

        {/* 1. Information We Collect */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            1. Information We Collect
          </h2>
          <div className="space-y-4 text-foreground text-base leading-relaxed">
            <div>
              <h3 className="font-semibold mb-2">Personal Information</h3>
              <p>
                We collect personal information that you voluntarily provide to us, including:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-2 text-muted-foreground">
                <li>Full name and contact information (email, phone, address)</li>
                <li>Educational background and academic qualifications</li>
                <li>Test scores (IELTS, TOEFL, SAT, GRE, etc.)</li>
                <li>University application details and preferences</li>
                <li>Visa and immigration information</li>
                <li>Financial information for scholarship and funding applications</li>
                <li>Date of birth and other demographic information</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Automatically Collected Information</h3>
              <p>
                When you visit our website, we may automatically collect:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-2 text-muted-foreground">
                <li>IP address and device information</li>
                <li>Browser type and operating system</li>
                <li>Pages visited and time spent on our website</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 2. How We Use Your Information */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            2. How We Use Your Information
          </h2>
          <p className="text-foreground text-base leading-relaxed mb-4">
            We use the information we collect for the following purposes:
          </p>
          <ul className="list-disc list-inside space-y-2 text-foreground text-base leading-relaxed">
            <li>Providing educational services and guidance</li>
            <li>Processing university applications on your behalf</li>
            <li>Offering visa and immigration support</li>
            <li>Facilitating accommodation arrangements</li>
            <li>Communicating with you about our services and updates</li>
            <li>Responding to your inquiries and providing customer support</li>
            <li>Conducting research to improve our services</li>
            <li>Complying with legal and regulatory obligations</li>
            <li>Sending promotional materials and newsletters (with your consent)</li>
          </ul>
        </section>

        {/* 3. Data Sharing and Disclosure */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            3. Data Sharing and Disclosure
          </h2>
          <p className="text-foreground text-base leading-relaxed mb-4">
            We may share your personal information with:
          </p>
          <ul className="list-disc list-inside space-y-2 text-foreground text-base leading-relaxed">
            <li><strong>Partner Universities:</strong> To process your applications and admission inquiries</li>
            <li><strong>Service Providers:</strong> Third parties who assist us in providing services (accommodation providers, visa consultants)</li>
            <li><strong>Legal Authorities:</strong> When required by law or to protect our rights</li>
            <li><strong>Business Partners:</strong> For educational and career opportunities relevant to you</li>
          </ul>
          <p className="text-foreground text-base leading-relaxed mt-4">
            We do not sell or rent your personal information to third parties for marketing purposes without your explicit consent.
          </p>
        </section>

        {/* 4. Data Security */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            4. Data Security
          </h2>
          <p className="text-foreground text-base leading-relaxed">
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, or disclosure. However, no method of transmission over the Internet is completely secure. While we strive to protect your data, we cannot guarantee absolute security.
          </p>
        </section>

        {/* 5. Data Retention */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            5. Data Retention
          </h2>
          <p className="text-foreground text-base leading-relaxed">
            We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy. After the completion of our services, we retain records as required by law or for legitimate business purposes. You may request deletion of your data, subject to legal and contractual obligations.
          </p>
        </section>

        {/* 6. Your Rights and Choices */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            6. Your Rights and Choices
          </h2>
          <p className="text-foreground text-base leading-relaxed mb-4">
            You have the right to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-foreground text-base leading-relaxed">
            <li>Access the personal information we hold about you</li>
            <li>Request correction or updating of inaccurate information</li>
            <li>Request deletion of your personal information (subject to legal requirements)</li>
            <li>Opt-out of marketing communications and newsletters</li>
            <li>Request a copy of your data in a portable format</li>
            <li>Withdraw consent for data processing at any time</li>
          </ul>
          <p className="text-foreground text-base leading-relaxed mt-4">
            To exercise these rights, please contact us at Info@hoque.org.uk
          </p>
        </section>

        {/* 7. Cookies and Tracking Technologies */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            7. Cookies and Tracking Technologies
          </h2>
          <p className="text-foreground text-base leading-relaxed">
            Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and personalize content. You can control cookie preferences through your browser settings. Please note that disabling cookies may affect the functionality of our website.
          </p>
        </section>

        {/* 8. Third-Party Links */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            8. Third-Party Links
          </h2>
          <p className="text-foreground text-base leading-relaxed">
            Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review the privacy policies of any third-party websites before providing your personal information.
          </p>
        </section>

        {/* 9. Children's Privacy */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            9. Children's Privacy
          </h2>
          <p className="text-foreground text-base leading-relaxed">
            Our services are not intended for individuals under the age of 18 without parental or guardian consent. We do not knowingly collect personal information from children under 18. If we become aware that a child under 18 has provided us with personal information, we will take steps to delete such information and terminate the child's account.
          </p>
        </section>

        {/* 10. International Data Transfers */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            10. International Data Transfers
          </h2>
          <p className="text-foreground text-base leading-relaxed">
            Your personal information may be transferred to, stored in, and processed in countries other than your country of residence. These countries may have data protection laws that differ from your country. By using our services, you consent to the transfer of your information to countries outside your country of residence.
          </p>
        </section>

        {/* 11. Policy Updates */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            11. Policy Updates
          </h2>
          <p className="text-foreground text-base leading-relaxed">
            We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of significant changes by updating the "Last Updated" date and posting the revised policy on our website. Your continued use of our services constitutes your acceptance of the updated policy.
          </p>
        </section>

        {/* 12. Contact Us */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            12. Contact Us
          </h2>
          <p className="text-foreground text-base leading-relaxed mb-4">
            If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us:
          </p>
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-foreground font-semibold mb-3">HOQUE</p>
            <p className="text-foreground text-base mb-2">
              <strong>Address:</strong> 119-121 Whitechapel Road, 3rd Floor, London, E1 1DT, United Kingdom
            </p>
            <p className="text-foreground text-base mb-2">
              <strong>Email:</strong> <a href="mailto:Info@hoque.org.uk" className="text-primary hover:underline">Info@hoque.org.uk</a>
            </p>
            <p className="text-foreground text-base">
              <strong>Phone:</strong> <a href="tel:+447878944475" className="text-primary hover:underline">+44 7878 944475</a>
            </p>
          </div>
        </section>

        {/* Legal Notice */}
        <section className="border-t border-border pt-8">
          <p className="text-xs text-muted-foreground">
            This Privacy Policy is provided for informational purposes and complies with standard data protection practices followed by educational institutes. We are committed to maintaining your trust by protecting your personal information and providing transparency in our data handling practices.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  )
}
