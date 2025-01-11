// 
// import { cn } from "@/lib/utils";
import Image from "next/image";

export const Logo=()=>{
    return(
        <div className="hidden md:flex items-center gap-x-2">
          <Image
          src="/logo-dark.png"
          height="40"
          width="40"
          alt="logo"
          className="dark:hidden"
         />
         <Image
          src="/logo.png"
          height="40"
          width="40"
          alt="logo"
          className="hidden dark:block"
         />
        </div>
    )
}