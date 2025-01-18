"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { Logo } from "./logo";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import Link from "next/link";



export const Navbar=()=>{
    const {isAuthenticated,isLoading}=useConvexAuth()
    const scrolled=useScrollTop(); 
    return(
        <div className={cn( 
            "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full",
            scrolled && "border-b shadow-sm"
        )}>
        <div className="max-w-screen-2xl mx-auto flex items-center px-4 py-3">
         <Logo />
        <div className="flex items-center gap-x-2 ml-auto">
            {isLoading && (
             <Spinner />
            )}
            {!isAuthenticated && !isLoading &&(
                <div className="flex items-center gap-x-2">
                <SignInButton mode="modal">
                    <Button variant="ghost" size="sm" className="hidden md:flex">
                       Log in 
                    </Button>
                </SignInButton>
                <SignInButton mode="modal">
                    <Button size="sm">
                       Get Inceptify 
                    </Button>
                </SignInButton>
                </div>
            )}
            {isAuthenticated && !isLoading && (
                <div className="flex items-center gap-x-2">
                <Button variant="ghost" size="sm" asChild className="hidden md:flex">
                    <Link href="/documents">
                    Enter Inceptify
                    </Link>
                </Button>
                <UserButton 
                afterSignOutUrl="/"
                />
                </div>
            )}
           <ModeToggle />
           </div>
        </div>
        </div>
    )
}