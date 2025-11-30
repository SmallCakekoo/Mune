import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

const CookiePolicy = () => {
    return (
        <div className="min-h-screen bg-background-500 text-white font-sans">
            <Header />
            <main className="container mx-auto px-6 pt-32 pb-20 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-8">Cookie Policy</h1>
                <div className="prose prose-invert prose-lg">
                    <p className="text-neutral-5/80 mb-6">Last updated: November 29, 2025</p>
                    <p className="text-neutral-5/80 mb-4">
                        This Cookie Policy explains what cookies are and how we use them. You should read this policy so you can understand what type of cookies we use, or the information we collect using cookies and how that information is used.
                    </p>
                    {/* Placeholder content */}
                    <h2 className="text-2xl font-bold mt-8 mb-4">What are cookies?</h2>
                    <p className="text-neutral-5/80 mb-4">
                        Cookies are small text files that are sent to your web browser by a website you visit. A cookie file is stored in your web browser and allows the Service or a third-party to recognize you and make your next visit easier and the Service more useful to you.
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CookiePolicy;
