"use client";

import { useEffect } from "react";
import { useState } from "react";
import {SettingsModal} from "@/components/modals/settings-modal";
import { CoverImageModal } from "@/components/modals/cover-image-modal";
export const ModalProvider = ()=>{
    const [isMounted,setisMounted] = useState(false);

    useEffect(()=>{
        setisMounted(true);
    },[]);
    
    if(!isMounted){
        return null;
    }
    return (
        <>
        <SettingsModal />
        <CoverImageModal />
        </>
    );
};