import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Poppins } from "next/font/google";
const font=Poppins({
    subsets:["latin"],
    weight:["400","600"]
})
export const Footer=()=>{
    return(
        <div className="flex items-center w-full p-6 bg-background dark:bg-[#1F1F1F] z-50">
          <p className={cn("font-semibold",font.className)}>
           Inceptify
          </p>
          <div className="md:ml-auto w-full justify-between
          md:justify-end flex items-center gap-x-2 text-muted-foreground">
           <Button variant="ghost" size="sm">
              Privay Policy
           </Button>
           <Button variant="ghost" size="sm">
              Terms & Conditions
           </Button>
          </div>
        </div>
    )
}