'use client';

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Page Title */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Terms of Service
          </h1>
          <p className="text-muted-foreground text-lg">
            Last Updated: February 2026
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-8">
          <p className="text-foreground text-base leading-relaxed mb-4">
            Welcome to HOQUE. These Terms of Service ("Terms") govern your use of our website and services. By accessing and using our website, you agree to be bound by these Terms. If you do not agree with any part of these Terms, please do not use our services.
          </p>
        </section>

        {/* 1. Acceptance of Terms */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            1. Acceptance of Terms
          </h2>
          <p className="text-foreground text-base leading-relaxed">
            By using the HOQUE website and services, you agree to comply with and be legally bound by these Terms of Service and our Privacy Policy. We reserve the right to modify these Terms at any time. Your continued use of our services following the posting of revised Terms constitutes your acceptance of such changes.
          </p>
        </section>

        {/* 2. Use License */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            2. Use License
          </h2>
          <p className="text-foreground text-base leading-relaxed mb-4">
            Permission is granted to temporarily download one copy of the materials (information or software) on HOQUE's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul className="list-disc list-inside space-y-2 text-foreground text-base leading-relaxed">
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose or for any public display</li>
            <li>Attempt to decompile or reverse engineer any software contained on the website</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
            <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            <li>Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the website</li>
          </ul>
        </section>

        {/* 3. Description of Services */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            3. Description of Services
          </h2>
          <p className="text-foreground text-base leading-relaxed mb-4">
            HOQUE provides educational services including but not limited to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-foreground text-base leading-relaxed">
            <li>University selection and guidance</li>
            <li>University application assistance</li>
            <li>UCAS application support</li>
            <li>Visa and immigration guidance</li>
            <li>IELTS preparation resources</li>
            <li>Student accommodation support</li>
            <li>Scholarship and funding guidance</li>
            <li>General educational counseling</li>
          </ul>
        </section>

        {/* 4. User Responsibilities */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            4. User Responsibilities
          </h2>
          <p className="text-foreground text-base leading-relaxed mb-4">
            You agree to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-foreground text-base leading-relaxed">
            <li>Provide accurate and truthful information when using our services</li>
            <li>Take responsibility for maintaining the confidentiality of your account information</li>
            <li>Not use our services for any unlawful or fraudulent purposes</li>
            <li>Not impersonate any person or entity</li>
            <li>Not transmit any harmful, defamatory, or offensive content</li>
            <li>Comply with all applicable laws and regulations</li>
            <li>Not attempt to gain unauthorized access to our systems or data</li>
          </ul>
        </section>

        {/* 5. Intellectual Property Rights */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            5. Intellectual Property Rights
          </h2>
          <p className="text-foreground text-base leading-relaxed mb-4">
            All content on the HOQUE website, including text, graphics, logos, images, and software, is the property of HOQUE or its content suppliers and is protected by international copyright laws. You may not reproduce, distribute, or transmit any content without our prior written permission.
          </p>
          <p className="text-foreground text-base leading-relaxed">
            The HOQUE name, logo, and all related marks are trademarks of HOQUE and may not be used without permission.
          </p>
        </section>

        {/* 6. Disclaimer of Warranties */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            6. Disclaimer of Warranties
          </h2>
          <p className="text-foreground text-base leading-relaxed mb-4">
            The materials on HOQUE's website are provided on an "as-is" basis. HOQUE makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including:
          </p>
          <ul className="list-disc list-inside space-y-2 text-foreground text-base leading-relaxed">
            <li>Implied warranties of merchantability</li>
            <li>Fitness for a particular purpose</li>
            <li>Non-infringement of intellectual property rights</li>
          </ul>
          <p className="text-foreground text-base leading-relaxed mt-4">
            Further, HOQUE does not warrant that the information contained on the website is accurate, reliable, or complete.
          </p>
        </section>

        {/* 7. Limitations of Liability */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            7. Limitations of Liability
          </h2>
          <p className="text-foreground text-base leading-relaxed mb-4">
            In no event shall HOQUE or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the website, even if HOQUE or an authorized representative has been notified orally or in writing of the possibility of such damage.
          </p>
          <p className="text-foreground text-base leading-relaxed">
            Our services are advisory in nature. HOQUE does not guarantee admission to any university or institution, nor does it guarantee the success of visa applications or other related outcomes.
          </p>
        </section>

        {/* 8. Accuracy of Materials */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            8. Accuracy of Materials
          </h2>
          <p className="text-foreground text-base leading-relaxed">
            The materials appearing on HOQUE's website could include technical, typographical, or photographic errors. HOQUE does not warrant that any of the materials on the website are accurate, complete, or current. HOQUE may make changes to the materials contained on its website at any time without notice.
          </p>
        </section>

        {/* 9. Links */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            9. Links
          </h2>
          <p className="text-foreground text-base leading-relaxed mb-4">
            HOQUE has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by HOQUE of the site. Use of any such linked website is at the user's own risk.
          </p>
          <p className="text-foreground text-base leading-relaxed">
            If you believe that a link on our website infringes upon your intellectual property rights, please notify us immediately.
          </p>
        </section>

        {/* 10. Modifications */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            10. Modifications
          </h2>
          <p className="text-foreground text-base leading-relaxed">
            HOQUE may revise these Terms of Service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these Terms of Service.
          </p>
        </section>

        {/* 11. Governing Law */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            11. Governing Law
          </h2>
          <p className="text-foreground text-base leading-relaxed">
            These terms and conditions are governed by and construed in accordance with the laws of the United Kingdom, and you irrevocably submit to the exclusive jurisdiction of the courts located in London, United Kingdom.
          </p>
        </section>

        {/* 12. Termination of Services */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            12. Termination of Services
          </h2>
          <p className="text-foreground text-base leading-relaxed mb-4">
            HOQUE reserves the right to terminate or suspend your access to its services at any time, with or without cause, and with or without notice. Reasons for termination may include:
          </p>
          <ul className="list-disc list-inside space-y-2 text-foreground text-base leading-relaxed">
            <li>Violation of these Terms of Service</li>
            <li>Unauthorized or fraudulent use of our services</li>
            <li>Abusive or threatening behavior toward our staff</li>
            <li>Providing false or misleading information</li>
            <li>Non-compliance with applicable laws and regulations</li>
          </ul>
        </section>

        {/* 13. Communication */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            13. Communication
          </h2>
          <p className="text-foreground text-base leading-relaxed mb-4">
            By using our services, you consent to receive communications from HOQUE via email, phone, or other electronic means. These communications may include service updates, important notices, and promotional materials.
          </p>
          <p className="text-foreground text-base leading-relaxed">
            You can opt out of non-essential communications at any time by contacting us directly or using the unsubscribe option in our emails.
          </p>
        </section>

        {/* 14. Confidentiality */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            14. Confidentiality
          </h2>
          <p className="text-foreground text-base leading-relaxed">
            HOQUE is committed to maintaining the confidentiality of all information you provide. We will not disclose your personal or academic information to any third party without your explicit consent, except where required by law. For details on how we handle your information, please refer to our Privacy Policy.
          </p>
        </section>

        {/* 15. Contact Information */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            15. Contact Information
          </h2>
          <p className="text-foreground text-base leading-relaxed mb-4">
            If you have any questions about these Terms of Service, please contact us:
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
            These Terms of Service are provided for informational purposes and govern the use of HOQUE's website and educational services. We reserve all rights not expressly granted in these terms. Your use of our services constitutes your acceptance of these terms in their entirety.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  )
}
