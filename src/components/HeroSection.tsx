import React from 'react';

interface HeroSectionProps {
    
}

const HeroSection: React.FC<HeroSectionProps> = () => {
    const title: string = "আমাদের ইশতেহার";
    const subtitle: string =
        "জাহাঙ্গীরনগর বিশ্ববিদ্যালয় কেন্দ্রীয় ছাত্র সংসদ (জাকসু) - ২০২৫ নির্বাচনের জন্য সমন্বিত শিক্ষার্থী জোটের নির্বাচনী ইশতেহার।";
    const buttonText: string = "সম্পূর্ণ ইশতেহার ডাউনলোড";

    // const handleDownloadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    //     e.preventDefault();
    //     console.log("Download button clicked (UI-only).");
    // };

    return (
        <section className="bg-gray-800 py-16 md:py-24 text-white font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1
                        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4"
                    >
                        {title}
                    </h1>

                    <p
                        className="mt-4 text-lg sm:text-xl lg:text-2xl max-w-4xl mx-auto opacity-90"
                    >
                        {subtitle}
                    </p>
                </div>

                <div className="mt-10 flex justify-center">
                    <button
                        // onClick={handleDownloadClick}
                        type="button"
                        className="
                            // Replaced 'bg-light-green' with 'bg-green-600' (Standard Green)
                            bg-green-600 text-white 
                            px-6 py-3 sm:px-8 sm:py-4 rounded-lg 
                            text-base sm:text-lg font-semibold 
                            hover:bg-green-700 transition duration-300 ease-in-out
                        "
                        aria-label="Download the full manifesto"
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;