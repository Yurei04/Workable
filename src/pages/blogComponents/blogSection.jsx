"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Newspaper, BookOpen, Lightbulb } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function BlogSection() {
  return (
    <div className="flex flex-col w-full min-h-screen mt-8 py-12 items-center justify-center ">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center justify-center gap-4 text-center max-w-3xl mx-auto"
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6 text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-500">
            From Our Blog
          </span>
        </h1>
        <p className="text-blue-200 text-base">
          Explore stories, tutorials, and behind-the-scenes insights from the Workable community.
        </p>
        <Separator orientation="horizontal" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 max-w-6xl mx-auto p-4"
      >
        <Card className="bg-white/5 border shadow-lg backdrop-blur-lg rounded-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-200">
              <Newspaper className="text-blue-400" /> Workable News
            </CardTitle>
            <CardDescription className="text-blue-300">
              Updates from our team, event announcements, and press features.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="mt-2 bg-blue-600 hover:bg-blue-500 text-white w-full">Read Updates</Button>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border shadow-lg backdrop-blur-lg rounded-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-200">
              <BookOpen className="text-blue-400" /> Tutorials & Guides
            </CardTitle>
            <CardDescription className="text-blue-300">
              Learn to build, code, and innovate with hands-on tutorials.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="mt-2 bg-blue-600 hover:bg-blue-500 text-white w-full">Start Learning</Button>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border shadow-lg backdrop-blur-lg rounded-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-200">
              <Lightbulb className="text-blue-400" /> Community Stories
            </CardTitle>
            <CardDescription className="text-blue-300">
              Real experiences from youth changemakers and volunteers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  Read a Story
                </Button>
              </DialogTrigger>
              <DialogContent className="text-sm text-left max-w-4xl bg-black/90 shadow-lg ring-1 ring-black/5 m-5">
                <DialogTitle className="sr-only">Story Highlight</DialogTitle>
                <h2 className="text-lg font-bold text-white">Meet Sophia – A Hack United Mentor</h2>
                <p className="text-blue-200 mt-2">
                  Sophia shares how volunteering with Hack United gave her a platform to inspire young coders across the globe.
                </p>
                <p className="text-muted-foreground text-xs italic mt-4">
                  Want to be featured? Reach out to{" "}
                  <a href="mailto:blog@hackunited.org" className="text-blue-400 underline">
                    blog@Workable.org
                  </a>
                </p>
                <DialogClose asChild>
                  <Button variant="outline" className="mt-4">
                    Close
                  </Button>
                </DialogClose>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto mt-24 space-y-12 px-4 w-full "
      >
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-blue-400">
            Why We Write
          </h2>
          <p className="text-blue-200 mt-2 max-w-3xl mx-auto text-sm sm:text-base">
            We believe stories inspire action. Our blog is where technology meets humanity — shared by those shaping tomorrow.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card className="bg-black/40 shadow-lg ring-1 ring-black/5 rounded-xl">
            <CardHeader>
              <CardTitle className="text-blue-200 text-xl">What We Cover</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-blue-300 text-sm space-y-2">
                <li>Event recaps and takeaways</li>
                <li>STEM learning resources</li>
                <li>Community achievements</li>
                <li>Behind-the-scenes insights</li>
                <li>Tips for aspiring developers</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-black/40 shadow-lg ring-1 ring-black/5 rounded-xl">
            <CardHeader>
              <CardTitle className="text-blue-200 text-xl">Want to Contribute?</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-blue-300 text-sm space-y-2">
                <li>We accept guest posts from students and mentors</li>
                <li>Highlight your work or research</li>
                <li>Pitch a tutorial or walkthrough</li>
                <li>Email us your idea to get featured</li>
                <li>Share your tech journey with our readers</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
