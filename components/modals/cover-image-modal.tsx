"use client";
import { useCoverImage } from "@/hooks/user-cover-image";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { SingleImageDropzone } from "@/components/single-image-dropzone";
import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";

export const CoverImageModal= ()=>{
    const params= useParams();
    const update=useMutation(api.documents.update);
    const [file,setFile]=useState<File>();
    const [isSubmitting,setisSubmitting]=useState(false);
    const coverImage=useCoverImage();
    const {edgestore} = useEdgeStore();

    const onClose = ()=>{
        setFile(undefined);
        setisSubmitting(false);
        coverImage.onClose();
    }

    const onChange = async (file?: File) => {
        if(file) {
            setisSubmitting(true);
            setFile(file);
               const res=await edgestore.publicFiles.upload({
                file,
                options:{
                    replaceTargetUrl: coverImage.url,
                }
               });
            await update({
                id: params.documentId as Id<"documents">,
                coverImage:res.url
            });
            onClose(); 
        };
    };
    return(
        <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
         <DialogContent>
            <DialogHeader>
                <h2 className="text-center text-lg font-semibold">
                    Cover Image
                </h2>
            </DialogHeader>
            <SingleImageDropzone 
            className="w-full outline-none"
            disabled={isSubmitting}
            value={file}
            onChange={onChange}
            />
         </DialogContent>
        </Dialog>
    );
};