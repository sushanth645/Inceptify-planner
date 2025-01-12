"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Toolbar } from "@/components/toolbar";
import { Cover } from "@/components/cover";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import { useMemo } from "react";
interface DocumentIdPageProps {
    params : {
        documentId:string;
    };
};


const DocumentIdPage = ({
   params
}:DocumentIdPageProps) => {
    const documentId = params.documentId as Id<"documents">;
    const Editor = useMemo(()=>dynamic(()=>import("@/components/editor"),{ssr:false}),[]);
    const document=useQuery(api.documents.getById,{
        documentId 
    });

    const onChange = ()=>{
     
    };

    if(document === undefined){
        return <p>
            <Cover.Skeleton />
            <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
                <div className="space-y-4 pl8 pt-4">
                   <Skeleton className="h-14 w-[50%]"/>
                   <Skeleton className="h-4 w-[80%]"/>
                   <Skeleton className="h-4 w-[40%]"/>
                   <Skeleton className="h-4 w-[6 0%]"/>
                </div>
            </div>
        </p>
    };

    if(document === null){
        return <p>
            Not found
        </p>
    };

    return ( 
            <div className="pb-40">
                <Cover preview url={document.coverImage}/>
              <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
                  <Toolbar preview initialData={document}/>
                  <Editor 
                  editable={false}
                  onChange={onChange}
                  initialContent={document.content}
                  />
              </div>
            </div>
    )
}
 
export default DocumentIdPage;