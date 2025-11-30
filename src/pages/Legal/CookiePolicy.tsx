import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

const CookiePolicy = () => {
    return (
        <div className="min-h-screen bg-background-500 text-white font-sans">
            <Header showNavLinks={false} />
            <main className="container mx-auto px-6 pt-32 pb-20 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-8">Cookie Policy</h1>
                <div className="prose prose-invert prose-lg space-y-6">
                    <p className="text-neutral-5/80 mb-6">Last updated: November 29, 2025</p>

                    <p className="text-neutral-5/80">
                        This Cookie Policy explains what cookies are and how we use them on Mune. You should read this policy so you can understand what type of cookies we use, the information we collect using cookies, and how that information is used.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">1. What Are Cookies?</h2>
                    <p className="text-neutral-5/80">
                        Cookies are small text files that are placed on your device (computer, smartphone, or tablet) when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners. Cookies allow websites to recognize your device and remember information about your visit.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">2. How We Use Cookies</h2>
                    <p className="text-neutral-5/80">
                        We use cookies for several reasons:
                    </p>
                    <ul className="list-disc pl-6 text-neutral-5/80 space-y-2">
                        <li>To enable certain functions of the Service</li>
                        <li>To provide analytics and track usage patterns</li>
                        <li>To store your preferences and settings</li>
                        <li>To authenticate users and prevent fraudulent use</li>
                        <li>To remember your login information</li>
                        <li>To improve the overall user experience</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4">3. Types of Cookies We Use</h2>

                    <h3 className="text-xl font-semibold mt-6 mb-3">3.1 Essential Cookies</h3>
                    <p className="text-neutral-5/80">
                        These cookies are necessary for the Service to function properly. They enable core functionality such as security, network management, and accessibility. You cannot opt-out of these cookies as the Service would not work without them.
                    </p>
                    <ul className="list-disc pl-6 text-neutral-5/80 space-y-2 mt-3">
                        <li><strong>Authentication cookies:</strong> Keep you logged in to your account</li>
                        <li><strong>Security cookies:</strong> Protect against fraudulent activity</li>
                        <li><strong>Session cookies:</strong> Maintain your session state across pages</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-6 mb-3">3.2 Functional Cookies</h3>
                    <p className="text-neutral-5/80">
                        These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.
                    </p>
                    <ul className="list-disc pl-6 text-neutral-5/80 space-y-2 mt-3">
                        <li><strong>Preference cookies:</strong> Remember your theme selection, language preferences</li>
                        <li><strong>User interface cookies:</strong> Store your layout and display preferences</li>
                        <li><strong>Room settings:</strong> Remember your collaborative room configurations</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-6 mb-3">3.3 Analytics Cookies</h3>
                    <p className="text-neutral-5/80">
                        These cookies help us understand how visitors interact with our Service by collecting and reporting information anonymously. This helps us improve the Service.
                    </p>
                    <ul className="list-disc pl-6 text-neutral-5/80 space-y-2 mt-3">
                        <li><strong>Usage analytics:</strong> Track which features are most used</li>
                        <li><strong>Performance monitoring:</strong> Identify technical issues and bottlenecks</li>
                        <li><strong>User behavior:</strong> Understand navigation patterns and user flows</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-6 mb-3">3.4 Third-Party Cookies</h3>
                    <p className="text-neutral-5/80">
                        We use third-party services that may set their own cookies:
                    </p>
                    <ul className="list-disc pl-6 text-neutral-5/80 space-y-2 mt-3">
                        <li><strong>Firebase:</strong> For authentication and data storage services</li>
                        <li><strong>Deezer:</strong> For music streaming functionality and user preferences</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4">4. Session vs. Persistent Cookies</h2>

                    <h3 className="text-xl font-semibold mt-6 mb-3">4.1 Session Cookies</h3>
                    <p className="text-neutral-5/80">
                        These are temporary cookies that expire when you close your browser. They help us maintain your session as you navigate through the Service.
                    </p>

                    <h3 className="text-xl font-semibold mt-6 mb-3">4.2 Persistent Cookies</h3>
                    <p className="text-neutral-5/80">
                        These cookies remain on your device for a set period or until you delete them. They help us recognize you when you return to the Service and remember your preferences.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">5. Local Storage</h2>
                    <p className="text-neutral-5/80">
                        In addition to cookies, we may use browser local storage to store data locally on your device. This includes:
                    </p>
                    <ul className="list-disc pl-6 text-neutral-5/80 space-y-2">
                        <li>User preferences and settings</li>
                        <li>Cached data for offline functionality</li>
                        <li>Temporary collaboration data</li>
                        <li>Theme and display configurations</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4">6. How to Control Cookies</h2>
                    <p className="text-neutral-5/80">
                        You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by:
                    </p>

                    <h3 className="text-xl font-semibold mt-6 mb-3">6.1 Browser Settings</h3>
                    <p className="text-neutral-5/80">
                        Most web browsers allow you to control cookies through their settings. You can:
                    </p>
                    <ul className="list-disc pl-6 text-neutral-5/80 space-y-2">
                        <li>Block all cookies</li>
                        <li>Block third-party cookies only</li>
                        <li>Delete cookies after each browsing session</li>
                        <li>Accept cookies from specific websites</li>
                    </ul>

                    <p className="text-neutral-5/80 mt-4">
                        Here's how to manage cookies in popular browsers:
                    </p>
                    <ul className="list-disc pl-6 text-neutral-5/80 space-y-2">
                        <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                        <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
                        <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
                        <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-6 mb-3">6.2 Impact of Blocking Cookies</h3>
                    <p className="text-neutral-5/80">
                        Please note that blocking or deleting cookies may impact your experience on Mune. Some features may not function properly, and you may need to re-enter your preferences each time you visit.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">7. Do Not Track Signals</h2>
                    <p className="text-neutral-5/80">
                        Some browsers include a "Do Not Track" (DNT) feature that signals to websites that you do not want to have your online activity tracked. Currently, there is no industry standard for how to respond to DNT signals. At this time, Mune does not respond to DNT browser signals.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">8. Updates to This Cookie Policy</h2>
                    <p className="text-neutral-5/80">
                        We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Cookie Policy on this page and updating the "Last updated" date.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">9. More Information</h2>
                    <p className="text-neutral-5/80">
                        For more information about how we use your data, please see our <a href="/legal/privacy-policy" className="text-primary-500 hover:text-primary-400 underline">Privacy Policy</a>.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">10. Contact Us</h2>
                    <p className="text-neutral-5/80">
                        If you have any questions about our use of cookies, please contact us:
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

export default CookiePolicy;
