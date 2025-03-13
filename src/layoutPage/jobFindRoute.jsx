import JobFindSearch from "@/pages/jobFindSearch";
import JobFindTableBack from "@/pages/jobFindTable";

export default function JobLayoutRoute () {
    return (
        <div className="w-full items-center">
            <JobFindSearch />
            <JobFindTableBack />
        </div>
    )
}