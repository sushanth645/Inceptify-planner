"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useOrigin } from "@/hooks/use-origin";
import { useMutation } from "convex/react";
import { Check, Copy, Globe } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface PublishProps {
    initialData: Doc<"documents">
}
export const Publish =({
    initialData
}:PublishProps)=>{
    const origin=useOrigin();
    const update=useMutation(api.documents.update);

    const [copied,setCopied]=useState(false);
    const [isSubmitting,setisSubmitting]=useState(false);

    const url = `${origin}/preview/${initialData._id}`;

    const onPublish =()=>{
        setisSubmitting(true);

        const promise=update({
            id: initialData._id,
            isPublished:true,
        })
        .finally(()=> setisSubmitting(false));

        toast.promise(promise,{
            loading: "publishing...",
            success: "Note Published!!",
            error:"Failed to publish note"
        });
    };

    const onUnPublish =()=>{
        setisSubmitting(true);

        const promise=update({
            id: initialData._id,
            isPublished:false,
        })
        .finally(()=> setisSubmitting(false));

        toast.promise(promise,{
            loading: "unpublishing...",
            success: "Note unpublished!!",
            error:"Failed to unpublish note"
        });
    };

    const onCopy = ()=>{
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(()=>{
            setCopied(false);
        },1000);
    }
    return(
        <div>
            <Popover>
               <PopoverTrigger asChild>
                 <Button size="sm" variant="ghost">
                    Publish
                    {initialData.isPublished && (
                    <Globe 
                    className="text-sky-500 w-4 h-4 ml-2"
                    />)}
                 </Button>
               </PopoverTrigger>
               <PopoverContent
               className="w-72"
               align="end"
               alignOffset={8}
               forceMount
               >
                {initialData.isPublished ?(
                    <div className="space-y-4">
                       <div className="flex items-center gap-x-2">
                        <Globe className="text-sky-500 animate-pulse h-4 w-4" />
                        <p className="text-xs font-medium text-sky-500">
                            This note is live on web
                        </p>
                       </div>
                       <div className="flex items-center">
                           <Input 
                           className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
                           value={url}
                           disabled
                           />
                           <Button
                           onClick={onCopy}
                           disabled={copied}
                           className="h-8 rounded-l-none"
                           >
                            {copied?(
                                <Check className="h-4 w-4"/>
                            ):(
                            <Copy className="h-4 w-4"/>
                            )}
                           </Button>
                       </div>
                       <Button
                       size="sm"
                       disabled={isSubmitting}
                       className="w-full text-xs"
                       onClick={onUnPublish}
                       >
                        Unpublish
                       </Button>
                    </div>
                ):(
                <div className="flex flex-col items-center justify-center">
                    <Globe className="h-8 w-8 text-muted-foreground mb-2"/>
                    <p className="text-sm font-medium mb-2">
                    Publish this note
                    </p>
                    <span className="text-xs text-muted-foreground mb-4">
                        Share your work with others
                    </span>
                    <Button
                    disabled={isSubmitting}
                    onClick={onPublish}
                    className="w-full text-xs"
                    size="sm"
                    >
                        Publish
                    </Button>
                </div>
                )}
               </PopoverContent>
            </Popover>
        </div>
    )
}