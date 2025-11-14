import React from 'react';
import Image from 'next/image';

const navStyle = {
    fontFamily: '"Hind Siliguri", sans-serif',
} as React.CSSProperties;

const HomepageHero: React.FC = () => {
    return (
        <section className="container mx-auto mt-2" style={navStyle}>
            <div className="flex flex-col items-center justify-center text-center">
                <div className="w-full h-full mb-8">
                    <Image
                        src="https://i.ibb.co/vvzwJmFB/Profile-1.jpg"
                        alt="A person in modest attire standing, representing a brighter future"
                        width={100}
                        height={100}
                        priority
                        className="w-full h-full rounded-lg"
                        unoptimized={true}
                    />
                </div>

                {/* 2. Text Content (This now flows *after* the image container) */}
                <h1 className="mb-4 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl xl:text-6xl">
                    কাজী দিন মোহাম্মদ - কুমিল্লা-৬ প্রার্থী
                </h1>
                <p className="mb-8 max-w-2xl text-base md:text-lg lg:text-xl">
                    ন্যায়, সেবা ও উন্নয়নের প্রতিশ্রুতি
                </p>
                <button className="flex gap-2 rounded-full bg-green-500 px-8 py-3 font-semibold text-yellow-100 shadow-lg transition-colors duration-300 hover:bg-[#E0A000] md:px-10 md:py-4">
                    <span>কল্যাণ রাষ্ট্র</span>
                    دولة الرفاهية
                </button>
            </div>
        </section>
    );
};

export default HomepageHero;