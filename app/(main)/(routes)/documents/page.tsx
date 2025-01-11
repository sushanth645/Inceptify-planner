"use client";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const DocumentsPage = () => {
   const router=useRouter();
   const create= useMutation(api.documents.create);

   const onCreate=()=>{
      const promise=create({title: "Untitled"})
      .then((documentId)=>router.push(`/documents/${documentId}`));
   toast.promise(promise,{
      loading:"Creating a new note...",
      success: "New note created!!",
      error:"Failed to create a new note.",
   });
   };
    return ( 
        <div className="h-full flex flex-col items-center justify-center space-y-4">
           <Image
           src="/note-dark.png"
           height="500"
           width="800"
           alt="note"
           className="dark:hidden"
           />
            <Image
           src="/note.png"
           height="500"
           width="800"
           alt="note"
           className="hidden dark:block"
           />
         <Button onClick={onCreate} className="font-bold">
            <PlusCircle className="h-4 w-4 mr-2"/>
            Create a note
         </Button> 
        </div>
     );
}
 
export default DocumentsPage;