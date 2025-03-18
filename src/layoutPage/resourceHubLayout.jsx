import ResourceFindSearch from "@/pages/resourceHubFind";
import ResourceHubTable from "@/pages/resourceHubTable";

export default function ResourceHubLayout () {
    return (
        <div className="w-full items-center justify-items-center">
            <ResourceFindSearch />
            <ResourceHubTable />
        </div>
    )
}