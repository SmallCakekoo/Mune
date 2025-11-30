import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

const TermsOfService = () => {
    return (
        <div className="min-h-screen bg-background-500 text-white font-sans">
            <Header />
            <main className="container mx-auto px-6 pt-32 pb-20 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-8">Terms of Service</h1>
                <div className="prose prose-invert prose-lg">
                    <p className="text-neutral-5/80 mb-6">Last updated: November 29, 2025</p>
                    <p className="text-neutral-5/80 mb-4">
                        Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the Mune website and application operated by Mune ("us", "we", or "our").
                    </p>
                    {/* Placeholder content */}
                    <h2 className="text-2xl font-bold mt-8 mb-4">Acceptance of Terms</h2>
                    <p className="text-neutral-5/80 mb-4">
                        By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default TermsOfService;
