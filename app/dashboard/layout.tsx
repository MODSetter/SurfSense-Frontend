"use client"
import {
    Book,
    Bot,
    Settings2,
    SquareTerminal,
} from "lucide-react"

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useState } from "react";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const [buttonclicked, setButtonClicked] = useState<number>(1)
    const onButtonClick = (id: number) => {
        setButtonClicked(id)

        if(id === 1){
            router.push('/dashboard/playground');
        }else if(id == 2){
            router.push('/dashboard/chat/searchspace');
        }else if(id == 3){
            router.push('/dashboard/chat/manage');
        }else if(id == 4){
            router.push('/dashboard/settings');
        }
    }
    return (
        <div className="grid h-screen w-full pl-[56px]">
            <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
                <nav className="grid gap-1 p-2">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className={buttonclicked === 1 ? "rounded-lg bg-muted" : "rounded-lg"}
                                    aria-label="Playground"
                                    onClick={() => onButtonClick(1)}
                                >
                                    <SquareTerminal className="size-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={5}>
                                Playground
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className={buttonclicked === 2 ? "rounded-lg bg-muted" : "rounded-lg"}
                                    aria-label="Models"
                                    onClick={() => onButtonClick(2)}
                                >
                                    <Bot className="size-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={5}>
                                Search Space Chat
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    {/* <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-lg"
                                    aria-label="API"
                                >
                                    <Code2 className="size-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={5}>
                                API
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider> */}
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className={buttonclicked === 3 ? "rounded-lg bg-muted" : "rounded-lg"}
                                    aria-label="Documentation"
                                    onClick={() => onButtonClick(3)}
                                >
                                    <Book className="size-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={5}>
                                Saved Chats
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className={buttonclicked === 4 ? "rounded-lg bg-muted" : "rounded-lg"}
                                    aria-label="Settings"
                                    onClick={() => onButtonClick(4)}
                                >
                                    <Settings2 className="size-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={5}>
                                Settings
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>


                </nav>
                {/* <nav className="mt-auto grid gap-1 p-2">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="mt-auto rounded-lg"
                                    aria-label="Help"
                                >
                                    <LifeBuoy className="size-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={5}>
                                Help
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="mt-auto rounded-lg"
                                    aria-label="Account"
                                >
                                    <SquareUser className="size-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={5}>
                                Account
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>


                </nav> */}
            </aside>
            <div className="flex flex-col">
                {children}
            </div>
        </div>
    )
}

