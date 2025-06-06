import BlogSection from "@/pages/blogComponents/blogSection";
import ChatBotAI from "@/pages/chatbotComponents/chatbot";

export default function Blog() {
    return (
        <div className="flex flex-col w-full min-h-screen mt-6 py-20 items-center justify-center overflow-x-hidden">
            <BlogSection />
            <ChatBotAI />
        </div>
    )
}