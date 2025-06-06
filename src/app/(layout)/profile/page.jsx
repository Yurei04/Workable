import ChatBotAI from "@/pages/chatbotComponents/chatbot";
import UserProfile from "@/pages/logSignComponents/user";

export default function Profile () {
    return (
        <div className="flex flex-col p-0 m-0 items-center justify-center overflow-x-hidden">
            <UserProfile />
            <ChatBotAI />
        </div>
    )
}