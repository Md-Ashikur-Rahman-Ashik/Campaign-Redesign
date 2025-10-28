// components/CandidateProfile.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ProfileData } from '@/types/profile';


interface CandidateProfileProps {
    data: ProfileData;
}

const CandidateProfile: React.FC<CandidateProfileProps> = ({ data }) => {
    const { title, description, buttonLink, imageUrl, imageAlt } = data;

    return (
        <section className="bg-white py-12 lg:py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">

                    <div className="w-full">
                        <div className="relative aspect-[4/5] w-full max-w-md mx-auto md:max-w-none">
                            <Image
                                src={imageUrl}
                                alt={imageAlt}
                                fill
                                className="rounded-2xl object-cover shadow-lg"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col items-start text-center md:text-left">
                        <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
                            {title}
                        </h2>

                        <p className="text-lg text-gray-600 leading-relaxed mb-8">
                            {description}
                        </p>

                        {/* <Link
                            href={buttonLink}
                            className="inline-block bg-green-600 text-white font-semibold py-3 px-8 rounded-full text-lg transition-transform duration-300 ease-in-out hover:bg-green-700 hover:scale-105 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                            {buttonText}
                        </Link> */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CandidateProfile;