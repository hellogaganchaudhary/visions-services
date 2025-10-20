'use client';

import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Shield className="w-16 h-16 text-primary-400 mx-auto mb-6" />
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              <span className="gradient-text">Privacy Policy</span>
            </h1>
            <p className="text-lg text-gray-400">
              Last Updated: October 16, 2025
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-3xl p-8 md:p-12 space-y-8 text-gray-300"
          >
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
              <p className="leading-relaxed">
                At TechVision, we are committed to protecting your privacy and ensuring the security of your personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our 
                website or use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
              <p className="leading-relaxed mb-4">We collect information that you provide directly to us, including:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Name, email address, phone number, and other contact information</li>
                <li>Company name and business information</li>
                <li>Project requirements and specifications</li>
                <li>Payment and billing information</li>
                <li>Communications between you and TechVision</li>
                <li>Technical data such as IP address, browser type, and device information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
              <p className="leading-relaxed mb-4">We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Process your transactions and send related information</li>
                <li>Respond to your comments, questions, and customer service requests</li>
                <li>Send you technical notices, updates, security alerts, and support messages</li>
                <li>Communicate with you about products, services, offers, and events</li>
                <li>Monitor and analyze trends, usage, and activities</li>
                <li>Detect, prevent, and address technical issues and fraudulent activity</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Information Sharing and Disclosure</h2>
              <p className="leading-relaxed mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your information with:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Service providers who perform services on our behalf</li>
                <li>Professional advisors such as lawyers, accountants, and auditors</li>
                <li>Law enforcement or government agencies when required by law</li>
                <li>Other parties in connection with a merger, sale, or acquisition</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
              <p className="leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction. These measures include encryption, secure servers, 
                access controls, and regular security assessments. However, no method of transmission over the Internet or 
                electronic storage is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Cookies and Tracking Technologies</h2>
              <p className="leading-relaxed">
                We use cookies and similar tracking technologies to collect information about your browsing activities. 
                You can control cookies through your browser settings and other tools. However, disabling cookies may 
                limit your ability to use certain features of our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Your Rights and Choices</h2>
              <p className="leading-relaxed mb-4">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access, update, or delete your personal information</li>
                <li>Object to processing of your personal information</li>
                <li>Request restriction of processing your personal information</li>
                <li>Request transfer of your personal information</li>
                <li>Withdraw consent at any time</li>
                <li>Lodge a complaint with a supervisory authority</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Third-Party Links</h2>
              <p className="leading-relaxed">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices or 
                content of these external sites. We encourage you to review the privacy policies of any third-party sites 
                you visit.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Children's Privacy</h2>
              <p className="leading-relaxed">
                Our services are not directed to children under 13 years of age. We do not knowingly collect personal 
                information from children under 13. If we learn that we have collected personal information from a child 
                under 13, we will delete that information promptly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">International Data Transfers</h2>
              <p className="leading-relaxed">
                Your information may be transferred to and processed in countries other than your country of residence. 
                These countries may have data protection laws that are different from the laws of your country. We take 
                appropriate safeguards to ensure that your personal information remains protected.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Changes to This Privacy Policy</h2>
              <p className="leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
                Privacy Policy on this page and updating the "Last Updated" date. Your continued use of our services after 
                any changes indicates your acceptance of the updated Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p className="leading-relaxed mb-4">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, 
                please contact us at:
              </p>
              <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-2">
                <p><strong className="text-white">Email:</strong> privacy@techvision.com</p>
                <p><strong className="text-white">Phone:</strong> +91 1234567890</p>
                <p><strong className="text-white">Address:</strong> India</p>
              </div>
            </section>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
