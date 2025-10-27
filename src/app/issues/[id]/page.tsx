'use client'; 

import { usePathname } from 'next/navigation'; 
import Image from 'next/image';
import Link from 'next/link';
import { ISSUE_DATA, Issue } from '@/types/issues'; 
import { FaFacebookSquare } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { BsLinkedin } from 'react-icons/bs';
import { IoLogoWhatsapp } from 'react-icons/io';
import { MdMarkEmailRead } from 'react-icons/md';

// Define the colors
const COLOR_DARK_GREEN = '#00331a';
const COLOR_ACCENT_YELLOW = '#f8c057';

// --- Social Sharing Utility Function (Unchanged) ---
const shareLink = (platform: string, url: string, title: string) => {
  let shareUrl = '';
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  switch (platform) {
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
      break;
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
      break;
    case 'linkedin':
      shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`;
      break;
    case 'whatsapp':
      shareUrl = `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`;
      break;
    case 'email':
      shareUrl = `mailto:?subject=${encodedTitle}&body=Check out this issue: ${encodedUrl}`;
      break;
    default:
      return;
  }
  
  window.open(shareUrl, '_blank', 'noopener,noreferrer');
};
// ----------------------------------------

const IssueDetailsPage: React.FC = () => {
  const pathname = usePathname(); 
  const pathSegments = pathname.split('/');
  const issueId = pathSegments[pathSegments.length - 1]; 

  const issue: Issue | undefined = ISSUE_DATA.find(i => i.id.toString() === issueId);

  if (!issue) {
    return (
      <div className={`min-h-screen pt-40 text-center text-white bg-[${COLOR_DARK_GREEN}]`}>
        <h1 className="text-3xl text-red-500">404 - Issue not found</h1>
        <Link href="/" className="mt-4 inline-block text-lg text-white hover:underline">
          Go back home
        </Link>
      </div>
    );
  }
  
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'your-site-url';
  const shareTitle = `Check out Issue`;

  return (
    // 1. Use flex-col and justify-center/items-center to center the image vertically and horizontally
    <div className="min-h-screen relative flex flex-col items-center justify-center bg-[#00331a] p-4">
      
      {/* Back Button (Fixed position remains) */}
      <Link 
        href="/" 
        className={`fixed top-4 left-4 z-20 p-2 text-white bg-black bg-opacity-50 rounded-full transition-colors hover:bg-opacity-70`}
        aria-label="Go back to the main issues grid"
      >
        <span className="text-2xl font-bold">←</span>
      </Link>

      {/* 2. Image Container: Centered, relative, and constrained */}
      <div 
        className="
          relative 
          w-full h-full 
          max-w-xl max-h-[80vh]
          md:max-w-3xl md:max-h-[70vh]
          aspect-square
        "
      >
        {/* The fill prop makes the image occupy the full size of this constrained div */}
        <Image
          src={issue.detailsImageUrl}
          alt={`Details for issue`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain"
          priority
          unoptimized={true}
        />
      </div>

      {/* Footer/Social Sharing Bar (Fixed to the bottom) */}
      <div 
        className={`fixed bottom-0 w-full shadow-2xl z-10 
        p-3 sm:p-4 flex flex-col sm:flex-row 
        justify-center items-center`}
      >
        {/* Social Icons - centered on the bottom */}
        <div className="flex space-x-4 text-2xl text-white">
          <button onClick={() => shareLink('facebook', currentUrl, shareTitle)} className="hover:text-green-500 transition-colors" aria-label="Share on Facebook"><FaFacebookSquare /></button>
          <button onClick={() => shareLink('twitter', currentUrl, shareTitle)} className="hover:text-green-500 transition-colors" aria-label="Share on X (Twitter)"><FaSquareXTwitter /></button>
          <button onClick={() => shareLink('linkedin', currentUrl, shareTitle)} className="hover:text-green-500 transition-colors" aria-label="Share on LinkedIn"><BsLinkedin /></button>
          <button onClick={() => shareLink('whatsapp', currentUrl, shareTitle)} className="hover:text-green-500 transition-colors" aria-label="Share on WhatsApp"><IoLogoWhatsapp /></button>
          <button onClick={() => shareLink('email', currentUrl, shareTitle)} className="hover:text-green-500 transition-colors" aria-label="Share via Email"><MdMarkEmailRead /></button>
        </div>
      </div>
    </div>
  );
};

export default IssueDetailsPage;