"use client";
import {
    PartialBlock,
    BlockNoteEditor
} from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestore";
import { useEffect, useRef } from "react";

interface EditorProps {
    onChange: (value: string) => void;
    initialContent?: string;
}

const Editor = ({
    onChange,
    initialContent,
}: EditorProps) => {
    const { resolvedTheme } = useTheme();
    const { edgestore } = useEdgeStore();

    const handleUpload = async (file: File) => {
        const response = await edgestore.publicFiles.upload({
            file,
        });
        return response.url;
    };

    const editor = useCreateBlockNote({
        initialContent: 
            initialContent
            ? (JSON.parse(initialContent) as PartialBlock[])
            : undefined,
        defaultStyles: false,
        uploadFile: handleUpload,
    });

    const prevContentRef = useRef("");

    useEffect(() => {
        if (!editor) return;

        const intervalId = setInterval(() => {
            const currentContent = JSON.stringify(editor.topLevelBlocks, null, 2);

            if (currentContent !== prevContentRef.current) {
                prevContentRef.current = currentContent;
                onChange(currentContent);
            }
        }, 300); // Poll every 300ms

        // Cleanup interval on unmount
        return () => {
            clearInterval(intervalId);
        };
    }, [editor, onChange]);

    return (
        <div>
            <BlockNoteView
                editor={editor}
                theme={resolvedTheme === "dark" ? "dark" : "light"}
            />
        </div>
    );
};

export default Editor;
