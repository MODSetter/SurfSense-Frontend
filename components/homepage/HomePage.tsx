"use client";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { AuroraBackground } from "../ui/aurora-background";

import icon from "../../public/SurfSense.png"
import Image from "next/image";
import Link from "next/link";
import { Github } from "lucide-react";
import FeaturesSectionDemo from "./StartSection";
import { ThreeDCardDemo } from "./FeatureSection";
import { LampDemo } from "./LampSection";

export function HomePage() {
    
    return (
        <>
        <AuroraBackground>
            <motion.div
                initial={{ opacity: 0.0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                }}
                className="relative flex flex-col gap-4 items-center justify-center px-4"
            >
                <motion.div
                transition={{ delay: 1 }}
                    animate={{
                        scale: [1, 2, 2, 1, 1],
                        rotate: [0, 0, 270, 270, 0],
                        borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                    }}
                    className="flex items-center mb-4 text-5xl font-semibold text-gray-900 dark:text-white">
                    <Image className="w-64 h-64 rounded-full" src={icon} alt="logo" />
                </motion.div>
                <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
                    SurfSense
                </div>
                <div className="text-xs font-semibold text-red-500"> 21st August 2024 : Chrome Extension is currently outdated on web store use offline build for the time being</div>
                <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
                    A Knowledge Graph 🧠 Brain 🧠 for World Wide Web Surfers.
                </div>
                <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                    <Link href={'/signup'} className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-8 py-4 text-2xl font-medium text-white backdrop-blur-3xl">
                        Sign Up
                    </Link>
                </button>
                <Link href={'https://github.com/MODSetter/SurfSense'}>
                    <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
                        <span className="absolute inset-0 overflow-hidden rounded-full">
                            <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        </span>
                        <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
                            <span>
                                Check Our GitHub
                            </span>
                            <Github />
                        </div>
                        <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
                    </button>
                </Link>

            </motion.div>
        </AuroraBackground>
        <FeaturesSectionDemo />
        <ThreeDCardDemo />
        <LampDemo />
        </>
        
    );
}
