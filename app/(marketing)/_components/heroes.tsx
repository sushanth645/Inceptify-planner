"use client"
import Image from "next/image";

export const Heroes=()=>{
    return(
        <div className="flex flex-col items-center justify-center max-w-5xl">
            <div className="flex items-center">
                <div className="relative w-[700px] h-[100px] sm:w-[750px] sm:h-[150px] md:w-[800px] md:h-[200px] ">
                    <Image 
                    src="/nav.png"
                    fill
                    className="object-contain dark:hidden"
                    alt="Documents"
                    />
                     <Image 
                    src="/nav-light.png"
                    fill
                    className="object-contain hidden dark:block "
                    alt="Documents"
                    />
                </div>
            </div>
        </div>
    )
}