import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-background-500 text-white font-sans">
            <Header />
            <main className="container mx-auto px-6 pt-32 pb-20 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-8">Privacy Policy</h1>
                <div className="prose prose-invert prose-lg">
                    <p className="text-neutral-5/80 mb-6">Last updated: November 29, 2025</p>
                    <p className="text-neutral-5/80 mb-4">
                        At Mune, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclosure, and safeguard your information when you visit our website or use our application.
                    </p>
                    {/* Placeholder content */}
                    <h2 className="text-2xl font-bold mt-8 mb-4">Information We Collect</h2>
                    <p className="text-neutral-5/80 mb-4">
                        We collect information that you provide directly to us when you register for an account, create or modify your profile, set preferences, sign up for newsletters, or make a purchase.
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
