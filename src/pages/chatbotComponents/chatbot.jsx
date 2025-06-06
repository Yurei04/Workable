"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileChartLine, MessageCircle, Send } from "lucide-react";
import { useEffect, useState, useRef } from "react";

export default function ChatBotAI() {
  const [messages, setMessages] = useState([
    { role: "bot", content: "Greetings, how can I help you today?" },
  ]);
  const chatEndRef = useRef(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!query.trim()) return;
    const userMessage = { role: "user", content: query };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      });

      const data = await res.json();
      const botMessage = {
        role: "bot",
        content: data.response || "Sorry, I do not understand.",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("API error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Server error. Please try again later." },
      ]);
    }

    setQuery("");
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="rounded-full p-8 bg-blue-600 hover:bg-blue-500 shadow-xl">
              <MessageCircle className="w-6 h-6 text-white" />
            </Button>
          </DialogTrigger>

          <DialogContent className="p-0 max-w-lg bg-black border border-white/10 shadow-2xl">
            <DialogHeader className="bg-gradient-to-r from-blue-700 to-cyan-600 px-6 py-4">
              <DialogTitle className="text-white text-lg">Vox AI Assistant</DialogTitle>
            </DialogHeader>

            <Card className="bg-white/5 backdrop-blur-xl border-none shadow-none rounded-none h-[70vh] flex flex-col">
              <CardContent className="flex-1 overflow-hidden p-4">
                <ScrollArea className="h-full flex flex-col-reverse p-5">
                  <div className="flex flex-col gap-3">
                    {messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg max-w-[80%] text-sm ${
                          msg.role === "user"
                            ? "self-end bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
                            : "self-start bg-white/10 text-blue-100 border border-white/10 shadow"
                        }`}
                      >
                        {msg.content}
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>
                </ScrollArea>
              </CardContent>

              <CardFooter className="p-4 border-t border-white/10">
                <div className="flex w-full gap-3">
                  <Input
                    type="text"
                    placeholder="Type your message..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    className="flex-1 bg-white/10 text-white border border-white/20 placeholder:text-blue-300"
                  />
                  <Button
                    onClick={sendMessage}
                    className="bg-blue-600 hover:bg-blue-500 text-white"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                  <Button className="bg-blue-900 hover:bg-blue-800 text-blue-200">
                    <FileChartLine className="w-4 h-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
