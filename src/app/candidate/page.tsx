import CandidateProfile from "@/components/CandidateProfile";
import { candidateData } from "@/types/profile";

export default function Candidate() {
    return (
        <>
            <CandidateProfile data={candidateData} />
        </>
    )
}