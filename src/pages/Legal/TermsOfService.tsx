import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

const TermsOfService = () => {
    return (
        <div className="min-h-screen bg-background-500 text-white font-sans">
            <Header showNavLinks={false} />
            <main className="container mx-auto px-6 pt-32 pb-20 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-8">Terms of Service</h1>
                <div className="prose prose-invert prose-lg space-y-6">
                    <p className="text-neutral-5/80 mb-6">Last updated: November 29, 2025</p>

                    <p className="text-neutral-5/80">
                        Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the Mune website and application (the "Service") operated by Mune ("us", "we", or "our").
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
                    <p className="text-neutral-5/80">
                        By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service. These Terms apply to all visitors, users, and others who access or use the Service.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">2. Description of Service</h2>
                    <p className="text-neutral-5/80">
                        Mune is a collaborative workspace platform that combines interactive whiteboard features, note-taking capabilities, task management, and integrated music streaming. The Service allows users to:
                    </p>
                    <ul className="list-disc pl-6 text-neutral-5/80 space-y-2">
                        <li>Create and join collaborative rooms</li>
                        <li>Share and edit notes, tasks, and visual content in real-time</li>
                        <li>Stream music through Deezer integration</li>
                        <li>Collaborate with other users synchronously</li>
                        <li>Customize themes and preferences</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4">3. User Accounts</h2>

                    <h3 className="text-xl font-semibold mt-6 mb-3">3.1 Account Creation</h3>
                    <p className="text-neutral-5/80">
                        To use certain features of the Service, you must register for an account. You agree to:
                    </p>
                    <ul className="list-disc pl-6 text-neutral-5/80 space-y-2">
                        <li>Provide accurate, current, and complete information</li>
                        <li>Maintain and update your information to keep it accurate</li>
                        <li>Maintain the security of your password</li>
                        <li>Accept all responsibility for activities that occur under your account</li>
                        <li>Notify us immediately of any unauthorized use of your account</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-6 mb-3">3.2 Account Termination</h3>
                    <p className="text-neutral-5/80">
                        We reserve the right to suspend or terminate your account at any time, with or without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">4. Acceptable Use Policy</h2>
                    <p className="text-neutral-5/80">
                        You agree not to use the Service to:
                    </p>
                    <ul className="list-disc pl-6 text-neutral-5/80 space-y-2">
                        <li>Violate any applicable laws or regulations</li>
                        <li>Infringe upon the rights of others, including intellectual property rights</li>
                        <li>Upload or transmit viruses, malware, or other malicious code</li>
                        <li>Harass, abuse, or harm other users</li>
                        <li>Impersonate any person or entity</li>
                        <li>Collect or store personal data about other users without permission</li>
                        <li>Interfere with or disrupt the Service or servers</li>
                        <li>Attempt to gain unauthorized access to any portion of the Service</li>
                        <li>Use automated systems (bots, scrapers) without permission</li>
                        <li>Share inappropriate, offensive, or illegal content</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4">5. User Content</h2>

                    <h3 className="text-xl font-semibold mt-6 mb-3">5.1 Your Content</h3>
                    <p className="text-neutral-5/80">
                        You retain all rights to any content you submit, post, or display on or through the Service ("User Content"). By submitting User Content, you grant us a worldwide, non-exclusive, royalty-free license to use, copy, reproduce, process, adapt, modify, publish, transmit, display, and distribute such content in connection with providing the Service.
                    </p>

                    <h3 className="text-xl font-semibold mt-6 mb-3">5.2 Content Responsibility</h3>
                    <p className="text-neutral-5/80">
                        You are solely responsible for your User Content. We do not endorse, support, represent, or guarantee the completeness, truthfulness, accuracy, or reliability of any User Content. You understand that by using the Service, you may be exposed to content that might be offensive or objectionable.
                    </p>

                    <h3 className="text-xl font-semibold mt-6 mb-3">5.3 Content Removal</h3>
                    <p className="text-neutral-5/80">
                        We reserve the right to remove any User Content that violates these Terms or that we find objectionable, without prior notice.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">6. Intellectual Property</h2>
                    <p className="text-neutral-5/80">
                        The Service and its original content (excluding User Content), features, and functionality are and will remain the exclusive property of Mune and its licensors. The Service is protected by copyright, trademark, and other laws. Our trademarks may not be used in connection with any product or service without our prior written consent.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">7. Third-Party Services</h2>
                    <p className="text-neutral-5/80">
                        The Service integrates with third-party services, including:
                    </p>
                    <ul className="list-disc pl-6 text-neutral-5/80 space-y-2">
                        <li><strong>Firebase:</strong> For authentication, database, and storage</li>
                        <li><strong>Deezer:</strong> For music streaming functionality</li>
                    </ul>
                    <p className="text-neutral-5/80 mt-4">
                        Your use of these third-party services is subject to their respective terms of service and privacy policies. We are not responsible for the content, privacy policies, or practices of any third-party services.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">8. Disclaimers</h2>
                    <p className="text-neutral-5/80">
                        THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. WE MAKE NO WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">9. Limitation of Liability</h2>
                    <p className="text-neutral-5/80">
                        IN NO EVENT SHALL MUNE, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
                    </p>
                    <ul className="list-disc pl-6 text-neutral-5/80 space-y-2">
                        <li>Your access to or use of or inability to access or use the Service</li>
                        <li>Any conduct or content of any third party on the Service</li>
                        <li>Any content obtained from the Service</li>
                        <li>Unauthorized access, use, or alteration of your transmissions or content</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4">10. Indemnification</h2>
                    <p className="text-neutral-5/80">
                        You agree to defend, indemnify, and hold harmless Mune and its licensors and licensees, and their employees, contractors, agents, officers, and directors, from and against any claims, damages, obligations, losses, liabilities, costs, or debt, and expenses arising from your use of the Service or violation of these Terms.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">11. Changes to Terms</h2>
                    <p className="text-neutral-5/80">
                        We reserve the right to modify or replace these Terms at any time at our sole discretion. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after revisions become effective, you agree to be bound by the revised terms.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">12. Governing Law</h2>
                    <p className="text-neutral-5/80">
                        These Terms shall be governed and construed in accordance with applicable laws, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">13. Severability</h2>
                    <p className="text-neutral-5/80">
                        If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">14. Contact Us</h2>
                    <p className="text-neutral-5/80">
                        If you have any questions about these Terms, please contact us:
                    </p>
                    <ul className="list-none pl-0 text-neutral-5/80 space-y-2">
                        <li>• By creating an issue on our <a href="https://github.com/SmallCakekoo/Mune/issues" className="text-primary-500 hover:text-primary-400 underline" target="_blank" rel="noopener noreferrer">GitHub repository</a></li>
                        <li>• By messaging on Discord: smallcakeko</li>
                    </ul>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default TermsOfService;
