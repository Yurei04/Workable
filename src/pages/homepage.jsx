"use client";
import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import Link from "next/link";
import UserProfile from "./user";

export default function Homepage() {
  return (
    <div className="flex flex-col items-center py-5 px-4 md:px-8 lg:px-16">
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-center">
        {/* Animated Text Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-12 sm:col-span-7 text-center sm:text-left"
        >
          <h3 className="text-black dark:text-white text-3xl sm:text-5xl lg:text-7xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-white">
              Workable{" "}
            </span>
            <br />
            <TypeAnimation
              sequence={[
                "Reliable",
                1500,
                "Work, Accessible",
                1500,
                "Reliable, Work, Accessible",
                1500,
                "Work, Accessible",
                1500,
                "Reliable",
                1500,
                "",
                1500,
              ]}
              wrapper="span"
              style={{ fontSize: "0.5em" }}
              speed={50}
              repeat={Infinity}
            />
          </h3>
          <p className="text-black dark:text-[#ADB7BE] text-base sm:text-lg lg:text-xl">
            Your go-to platform for accessible job searching.
          </p>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-12 sm:col-span-5 flex justify-center sm:justify-end mt-6 sm:mt-0"
        >
          <div className="relative w-48 h-48 sm:w-60 sm:h-60 lg:w-72 lg:h-72 rounded-full bg-[#181818] overflow-hidden">
            <Image
              src="/your-image-path.jpg"
              alt="Workable Logo"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </motion.div>
      </div>

      {/* Cards Section */}
      <div className="flex flex-wrap gap-6 justify-center mt-8">
        {/* Job Find Card */}
        <Card className="w-full sm:w-[350px]">
          <CardHeader>
            <CardTitle>Job Find</CardTitle>
            <CardDescription>
              Find jobs according to your wants and needs.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-2 items-center">
            <Button>
              <Link href="/layoutPage/jobFindLayout">Let's Go!</Link>
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Details</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>What is Job Find?</DialogTitle>
                  <DialogDescription>
                    Job Find is a page where you can find jobs applicable to
                    your circumstances.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button type="button">Close</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
          <CardFooter className="flex justify-between">
            <CardDescription>Workable</CardDescription>
          </CardFooter>
        </Card>

        {/* Resource Hub Card */}
        <Card className="w-full sm:w-[350px]">
          <CardHeader>
            <CardTitle>Resource Hub</CardTitle>
            <CardDescription>
              A page where you can find information and tools.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-2 items-center">
            <Button>
              <Link href="/layoutPage/resourceHubLayout">Let's Go!</Link>
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Details</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>What is Resource Hub?</DialogTitle>
                  <DialogDescription>
                    Get information and resources to help accommodate your
                    needs, no matter your circumstances.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button type="button">Close</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
          <CardFooter className="flex justify-between">
            <CardDescription>Workable</CardDescription>
          </CardFooter>
        </Card>
      </div>

      <UserProfile />
    </div>
  );
}
