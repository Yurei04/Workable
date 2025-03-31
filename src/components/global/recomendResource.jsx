import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

export default function Recommend() {
    const [openDialog, setOpenDialog] = useState(false);
    const [activeTab, setActiveTab] = useState("tools");

    return (
        <div className="flex items-center justify-center p-4">
            {/* Button to Open Dialog */}
            <Button onClick={() => setOpenDialog(true)}>
                Open Recommendations
            </Button>

            {/* Dialog with Tabs */}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="max-w-2xl w-full h-auto">
                    <DialogHeader>
                        <DialogTitle>Recommendations</DialogTitle>
                        <DialogClose />
                    </DialogHeader>

                    {/* Tab Navigation */}
                    <div className="flex space-x-4 border-b pb-2">
                        <button
                            className={`px-4 py-2 font-medium ${
                                activeTab === "tools" ? "border-b-2 border-blue-500" : "text-gray-500"
                            }`}
                            onClick={() => setActiveTab("tools")}
                        >
                            Tools
                        </button>
                        <button
                            className={`px-4 py-2 font-medium ${
                                activeTab === "info" ? "border-b-2 border-blue-500" : "text-gray-500"
                            }`}
                            onClick={() => setActiveTab("info")}
                        >
                            Info
                        </button>
                    </div>

                    {/* Content Section */}
                    <div className="mt-4">
                        {activeTab === "tools" && (
                            <div>
                                <p className="font-semibold">Recommended Tools:</p>
                                <ul className="list-disc pl-5 mt-2">
                                    <li>
                                        <a href="https://code.visualstudio.com/" target="_blank" className="text-blue-500 hover:underline">
                                            Visual Studio Code
                                        </a> - A powerful code editor.
                                    </li>
                                    <li>
                                        <a href="https://github.com/" target="_blank" className="text-blue-500 hover:underline">
                                            GitHub
                                        </a> - Version control and collaboration.
                                    </li>
                                    <li>
                                        <a href="https://postman.com/" target="_blank" className="text-blue-500 hover:underline">
                                            Postman
                                        </a> - API testing tool.
                                    </li>
                                </ul>
                            </div>
                        )}

                        {activeTab === "info" && (
                            <div>
                                <p className="font-semibold">Helpful Resources:</p>
                                <ul className="list-disc pl-5 mt-2">
                                    <li>
                                        <a href="https://www.betterhelp.com/" target="_blank" className="text-blue-500 hover:underline">
                                            BetterHelp
                                        </a> - Online counseling and therapy.
                                    </li>
                                    <li>
                                        <a href="https://www.psychologytoday.com/" target="_blank" className="text-blue-500 hover:underline">
                                            Psychology Research
                                        </a> - Articles and research on psychology.
                                    </li>
                                    <li>
                                        <a href="https://www.freecodecamp.org/" target="_blank" className="text-blue-500 hover:underline">
                                            freeCodeCamp
                                        </a> - Free coding tutorials and courses.
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
