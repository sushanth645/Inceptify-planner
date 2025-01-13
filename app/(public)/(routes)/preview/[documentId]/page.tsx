"use client";

import { useParams } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Toolbar } from "@/components/toolbar";
import { Cover } from "@/components/cover";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import { useMemo } from "react";
// interface DocumentIdPageProps {
//     params : {
//         documentId:Id<"documents">;
//     };
// };


const DocumentIdPage = () => {
    const { documentId } = useParams();
    const Editor = useMemo(()=>dynamic(()=>import("@/components/editor"),{ssr:false}),[]);
    const document=useQuery(api.documents.getById,{
        documentId : documentId as Id<"documents">,
    });

    const onChange = ()=>{
     
    };

    if(document === undefined){
        return <>
            <Cover.Skeleton />
            <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
                <div className="space-y-4 pl8 pt-4">
                   <Skeleton className="h-14 w-[50%]"/>
                   <Skeleton className="h-4 w-[80%]"/>
                   <Skeleton className="h-4 w-[40%]"/>
                   <Skeleton className="h-4 w-[6 0%]"/>
                </div>
            </div>
        </>
    };

    if(document === null){
        return <p>
            Not found
        </p>
    };

    if (!document.isPublished) {
        return (
            <div className="h-full flex flex-col items-center justify-center space-y-4">
                <h1 className="text-xl font-medium">
                    This document is no longer available
                </h1>
                <p className="text-sm text-muted-foreground">
                    The owner has unpublished this document.
                </p>
            </div>

        );
    } 

    return ( 
            <div className="pb-40">
                <Cover preview url={document.coverImage}/>
              <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
                  <Toolbar preview initialData={document}/>
                  <Editor
                  onChange={onChange}
                    initialContent={document.content}
                />
              </div>
            </div>
    )
}
 
export default DocumentIdPage;