"use client";
import DataTable from "@/pages/resourceComponents/dataTable";
import data from "./contents.json"
import ResourceFindSearch from "@/pages/resourceComponents/resourceHubFind";
import ResourceHubTable from "@/pages/resourceComponents/resourceHubTable";
import ChatBotAI from "@/pages/chatbotComponents/chatbot";

export default function ResourceHub () {
    return (
        <div className="flex flex-col w-full min-h-screen pt-20 items-center justify-center overflow-x-hidden">
            <ResourceFindSearch />
            <ResourceHubTable />
            <ChatBotAI />
        </div>
    )
}