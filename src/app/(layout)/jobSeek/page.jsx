"use client";
import DataTable from "@/pages/resourceComponents/dataTable";
import JobFindSearch from "@/pages/jobComponents/jobFindSearch";
import JobFindTableBack from "@/pages/jobComponents/jobFindTable";
import ChatBotAI from "@/pages/chatbotComponents/chatbot";

export default function JobSeek () {
    return (
        <div className="flex flex-col w-full min-h-screen pt-20  items-center justify-center overflow-x-hidden">
            <JobFindTableBack />
            <ChatBotAI />
        </div>
    )
}