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
  } from "@/components/ui/card"
  
import {
      Dialog,
      DialogContent,
      DialogDescription,
      DialogHeader,
      DialogTitle,
      DialogTrigger,
      DialogFooter,
      DialogClose
} from "@/components/ui/dialog"

import Link from "next/link";



export default  function Homepage () {

  return (
    <div className="lg:py-5 items-center flex flex-col">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-center bg-opacity-80">
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="col-span-12 sm:col-span-8 text-center sm:text-left"
                >
                <h3 className="text-black dark:text-white mb-4 text-4xl sm:text-5xl lg:text-8xl">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-white  ">
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
                    <p className="text-black dark:text-[#ADB7BE] text-base sm:text-lg lg:text-xl mb-6">
                        
                    </p>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="col-span-12 sm:col-span-4 flex justify-center mt-4 lg:mt-0"
            >
            <div className="relative rounded-full bg-[#181818] w-60 h-60 lg:w-72 lg:h-72">
                <Image
                    src="/"

                    alt="logo image"
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 object-fill"
                    width={1000}
                    height={1000}
                    objectFit="cover"
                />
            </div>
        </motion.div>
    </div>
    <br />
    <div className="flex gap-2 justify-start flex-wrap">

                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Job Find</CardTitle>
                        <CardDescription>Find jobs in according to your want and needs</CardDescription>
                    </CardHeader>
                    <CardContent className="items-center flex gap-2">
                        <Button>
                            <Link href={"/layoutPage/jobFindLayout"}>Lets Go!</Link>
                        </Button>
                        <Dialog>
                        <DialogTrigger asChild>
                            <Button>Details</Button>    
                        </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                <DialogTitle>What is Job Find?</DialogTitle>
                                <DialogDescription>
                                    Job find is a page where you can find jobs that applicable to your circumstances.
                                </DialogDescription>
                                </DialogHeader>
                                <DialogFooter className="sm:justify-start">
                                    <DialogClose asChild>
                                        <Button type="button">
                                            Close
                                        </Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <CardDescription>Workable</CardDescription>
                    </CardFooter>
                </Card>


                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Resource Hub</CardTitle>
                        <CardDescription>Page where you can find your Information and Tools</CardDescription>
                    </CardHeader>
                    <CardContent className="items-center flex gap-2">
                        <Button >
                            <Link href={"/layoutPage/resourceHubLayout"}>
                            Lets Go!
                            </Link>

                        </Button>
                        <Dialog>
                        <DialogTrigger asChild>
                            <Button>Details</Button>    
                        </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                <DialogTitle>What is Resource Hub</DialogTitle>
                                <DialogDescription>
                                Get Information and resourcecs that can help you accomodate your need no matter your circumstances, for the future or now!
                                </DialogDescription>
                                </DialogHeader>
                                <DialogFooter className="sm:justify-start">
                                    <DialogClose asChild>
                                        <Button type="button">
                                            Close
                                        </Button>
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
    </div>
  );
};

