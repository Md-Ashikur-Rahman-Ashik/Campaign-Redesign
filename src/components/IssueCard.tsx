import Link from 'next/link';
import Image from 'next/image';
import { ISSUE_DATA, Issue } from '@/types/issues';

// const COLOR_DARK_GREEN = '#00331a';
// const COLOR_ACCENT_YELLOW = '#f8c057';

const IssueCard: React.FC<{ issue: Issue }> = ({ issue }) => {
    const {link, imageUrl } = issue;

    return (
        <Link
            href={link}
            passHref
            className="
        block h-full transition-transform duration-300 ease-in-out 
        hover:scale-[1.03] focus:scale-[1.03] active:scale-[0.98]
        rounded-xl overflow-hidden shadow-2xl group transform transition-all duration-300
      "
        >
            <div className="flex flex-col justify-between h-full">

                <div className="flex items-center mt-auto">
                    <div className="relative md:h-96 md:w-96 h-80 w-80 overflow-hidden">
                        <Image
                            src={imageUrl}
                            alt="logo"
                            fill
                            sizes="32px"
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </Link>
    );
};

const bengaliFontStyle = {
    fontFamily: '"Hind Siliguri", sans-serif'
};


const IssueCardGrid: React.FC = () => {
    return (
        <section className={`bg-[#00331a] py-12 sm:py-20 px-4`} style={bengaliFontStyle}>
            <div className="max-w-7xl mx-auto">

                <div className="text-center mb-12 sm:mb-16">
                    <h2
                        className={`
              text-4xl sm:text-5xl lg:text-6xl font-black 
              text-[#f8c057]
              leading-tight
            `}
                        style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
                    >
                        ৫ ইয়েস
                    </h2>
                </div>

                <div
                    className="
            grid gap-6 
            sm:grid-cols-2    /* Tablet/Small Laptop */
            lg:grid-cols-3    /* Desktop/Large Screen */
          "
                >
                    {ISSUE_DATA.map((issue) => (
                        <IssueCard key={issue.id} issue={issue} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default IssueCardGrid;