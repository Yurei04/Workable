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

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    return (
        <div className="m-2 flex items-center justify-center">
            {/* Button to Open Dialog */}
            <Button onClick={handleOpenDialog}>Recommended</Button>

            {/* Job Recommendation Dialog */}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="max-w-full w-full h-[90vh]">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Software Engineer</DialogTitle>
                        <DialogClose />
                    </DialogHeader>

                    {/* Job Image */}
                    <div className="w-full h-56 bg-gray-200 rounded-md overflow-hidden">
                        <img src="" alt="Job" className="w-full h-full object-cover" />
                    </div>

                    {/* Job Description */}
                    <div className="mt-4 space-y-2">
                        <p className="text-lg font-semibold">Description:</p>
                        <p>A software engineer designs, develops, and maintains software applications.</p>
                    </div>

                    {/* Qualifications */}
                    <div className="mt-4 space-y-2">
                        <p className="text-lg font-semibold">Qualifications:</p>
                        <ul className="list-disc pl-5">
                            <li>Proficient in JavaScript and React</li>
                            <li>Experience with REST APIs</li>
                            <li>Strong problem-solving skills</li>
                        </ul>
                    </div>

                    {/* Apply Button & External Links */}
                    <div className="mt-6 flex justify-between">
                        <Button asChild>
                            <a href="#" target="_blank">Apply Now</a>
                        </Button>

                        <div className="flex gap-2">
                            <a href="https://www.betterhelp.com/" target="_blank" className="text-blue-500 hover:underline">
                                BetterHelp
                            </a>
                            <a href="https://www.psychologytoday.com/" target="_blank" className="text-blue-500 hover:underline">
                                Psychology Research
                            </a>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
