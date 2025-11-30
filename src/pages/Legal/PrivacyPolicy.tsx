import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-background-500 text-white font-sans">
            <Header showNavLinks={false} />
            <main className="container mx-auto px-6 pt-32 pb-20 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-8">Privacy Policy</h1>
                <div className="prose prose-invert prose-lg space-y-6">
                    <p className="text-neutral-5/80 mb-6">Last updated: November 29, 2025</p>

                    <p className="text-neutral-5/80">
                        At Mune, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our application. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the application.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">1. Information We Collect</h2>

                    <h3 className="text-xl font-semibold mt-6 mb-3">1.1 Personal Information</h3>
                    <p className="text-neutral-5/80">
                        We collect information that you provide directly to us when you:
                    </p>
                    <ul className="list-disc pl-6 text-neutral-5/80 space-y-2">
                        <li>Register for an account (email address, username, password)</li>
                        <li>Create or modify your profile (profile picture, display name, bio)</li>
                        <li>Create or join collaborative rooms</li>
                        <li>Upload content (notes, images, files)</li>
                        <li>Interact with music features (playlists, favorites)</li>
                        <li>Communicate with other users</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-6 mb-3">1.2 Automatically Collected Information</h3>
                    <p className="text-neutral-5/80">
                        When you access Mune, we automatically collect certain information, including:
                    </p>
                    <ul className="list-disc pl-6 text-neutral-5/80 space-y-2">
                        <li>Device information (browser type, operating system, device identifiers)</li>
                        <li>Usage data (pages visited, features used, time spent)</li>
                        <li>IP address and location data</li>
                        <li>Cookies and similar tracking technologies</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-6 mb-3">1.3 Third-Party Services</h3>
                    <p className="text-neutral-5/80">
                        We use third-party services that may collect information:
                    </p>
                    <ul className="list-disc pl-6 text-neutral-5/80 space-y-2">
                        <li><strong>Firebase:</strong> Authentication, database, and storage services</li>
                        <li><strong>Deezer API:</strong> Music streaming and playlist data</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4">2. How We Use Your Information</h2>
                    <p className="text-neutral-5/80">
                        We use the information we collect to:
                    </p>
                    <ul className="list-disc pl-6 text-neutral-5/80 space-y-2">
                        <li>Provide, maintain, and improve our services</li>
                        <li>Create and manage your account</li>
                        <li>Enable real-time collaboration features</li>
                        <li>Personalize your experience</li>
                        <li>Process your requests and transactions</li>
                        <li>Send you technical notices and support messages</li>
                        <li>Communicate with you about products, services, and events</li>
                        <li>Monitor and analyze trends, usage, and activities</li>
                        <li>Detect, prevent, and address technical issues and security threats</li>
                        <li>Comply with legal obligations</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4">3. Information Sharing and Disclosure</h2>
                    <p className="text-neutral-5/80">
                        We may share your information in the following circumstances:
                    </p>
                    <ul className="list-disc pl-6 text-neutral-5/80 space-y-2">
                        <li><strong>With other users:</strong> When you collaborate in rooms, your username, profile picture, and shared content are visible to other room participants</li>
                        <li><strong>With service providers:</strong> We share information with third-party vendors who perform services on our behalf (Firebase, Deezer)</li>
                        <li><strong>For legal reasons:</strong> We may disclose information if required by law or in response to valid requests by public authorities</li>
                        <li><strong>Business transfers:</strong> In connection with any merger, sale of company assets, or acquisition</li>
                        <li><strong>With your consent:</strong> We may share information for any other purpose with your consent</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4">4. Data Storage and Security</h2>
                    <p className="text-neutral-5/80">
                        We use Firebase services to store your data securely. We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">5. Your Rights and Choices</h2>
                    <p className="text-neutral-5/80">
                        You have the following rights regarding your personal information:
                    </p>
                    <ul className="list-disc pl-6 text-neutral-5/80 space-y-2">
                        <li><strong>Access:</strong> Request access to your personal information</li>
                        <li><strong>Correction:</strong> Request correction of inaccurate data</li>
                        <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                        <li><strong>Data portability:</strong> Request a copy of your data in a structured format</li>
                        <li><strong>Withdraw consent:</strong> Withdraw consent for data processing at any time</li>
                        <li><strong>Opt-out:</strong> Opt-out of marketing communications</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4">6. Cookies and Tracking Technologies</h2>
                    <p className="text-neutral-5/80">
                        We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. See our <a href="/legal/cookie-policy" className="text-primary-500 hover:text-primary-400 underline">Cookie Policy</a> for more information.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">7. Children's Privacy</h2>
                    <p className="text-neutral-5/80">
                        Our service is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">8. International Data Transfers</h2>
                    <p className="text-neutral-5/80">
                        Your information may be transferred to and maintained on servers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ. By using Mune, you consent to such transfers.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">9. Changes to This Privacy Policy</h2>
                    <p className="text-neutral-5/80">
                        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">10. Contact Us</h2>
                    <p className="text-neutral-5/80">
                        If you have any questions about this Privacy Policy, please contact us:
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

export default PrivacyPolicy;
