'use client'; 

import { usePathname } from 'next/navigation'; 
import Image from 'next/image';
import Link from 'next/link';
import { ISSUE_DATA, Issue } from '@/types/issues';

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

// We remove the props definition here and rely on hooks for parameter access
const IssueDetailsPage: React.FC = () => {
  // Use usePathname to get the current URL path
  const pathname = usePathname(); 
  
  // Extract the ID from the path. Assuming the path is '/issues/[id]'
  // Example: '/issues/1' -> ['', 'issues', '1'] -> '1'
  const pathSegments = pathname.split('/');
  const issueId = pathSegments[pathSegments.length - 1]; 

  // Find the issue data
  const issue: Issue | undefined = ISSUE_DATA.find(i => i.id.toString() === issueId);

  // --- Error/Fallback checks (Router is not needed for ID extraction anymore) ---
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
  
  // Get the current URL for sharing
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'your-site-url';
  const shareTitle = `Check out Issue`;

  return (
    <div className="min-h-screen relative flex flex-col bg-white">
      
      {/* Back Button (Floating on top-left) */}
      <Link 
        href="/" 
        className={`fixed top-4 left-4 z-20 p-2 text-white bg-black bg-opacity-50 rounded-full transition-colors hover:bg-opacity-70`}
        aria-label="Go back to the main issues grid"
      >
        <span className="text-2xl font-bold">←</span>
      </Link>

      <div className="md:h-96 md:w-96 h-80 w-80">
        <Image
          src={issue.detailsImageUrl}
          alt={`Details for issue`}
          fill
          sizes="32px"
          className="object-cover md:h-96 md:w-96 h-80 w-80 sm:object-cover"
          priority
        />
      </div>

      {/* Footer/Social Sharing Bar (Fixed to the bottom) */}
      <div 
        className={`fixed bottom-0 w-full bg-white shadow-2xl z-10 
        p-3 sm:p-4 border-t border-gray-200 flex flex-col sm:flex-row 
        justify-between items-center`}
      >

        {/* Social Icons */}
        <div className="flex space-x-4 text-2xl text-gray-500">
          <button 
            onClick={() => shareLink('facebook', currentUrl, shareTitle)} 
            className="hover:text-blue-600 transition-colors"
            aria-label="Share on Facebook"
          >
            F
          </button>
          <button 
            onClick={() => shareLink('twitter', currentUrl, shareTitle)} 
            className="hover:text-sky-400 transition-colors"
            aria-label="Share on X (Twitter)"
          >
            T
          </button>
          <button 
            onClick={() => shareLink('linkedin', currentUrl, shareTitle)} 
            className="hover:text-blue-700 transition-colors"
            aria-label="Share on LinkedIn"
          >
            L
          </button>
          <button 
            onClick={() => shareLink('whatsapp', currentUrl, shareTitle)} 
            className="hover:text-green-500 transition-colors"
            aria-label="Share on WhatsApp"
          >
            W
          </button>
          <button 
            onClick={() => shareLink('email', currentUrl, shareTitle)} 
            className="hover:text-gray-900 transition-colors"
            aria-label="Share via Email"
          >
            @
          </button>
        </div>
      </div>
    </div>
  );
};

export default IssueDetailsPage;