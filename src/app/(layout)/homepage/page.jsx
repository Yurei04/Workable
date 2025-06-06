import Hero from "@/pages/homePageComponents/hero";
import NavBar from "@/app/navbar";
import Footer from "@/pages/footer";
import About from "@/pages/homePageComponents/about";
import Goals from "@/pages/homePageComponents/goals";
import Initiatives from "@/pages/homePageComponents/initiatives";
import ChatBotAI from "@/pages/chatbotComponents/chatbot";

export default function Homepage () {
    return (
        <div className="flex flex-col p-0 m-0 items-center justify-center overflow-x-hidden">
            <Hero />
            <About />
            <Initiatives />
            <Goals />
            <ChatBotAI />
        </div>
    )
}