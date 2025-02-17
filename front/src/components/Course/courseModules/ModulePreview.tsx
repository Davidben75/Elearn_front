// src/components/ModulePreview/ModulePreview.tsx

import React from "react";
import { Module } from "../../../interfaces/courseInterface";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { Link } from "react-router-dom";

interface ModulePreviewProps {
    module: Module;
}

const ModulePreview: React.FC<ModulePreviewProps> = ({ module }) => {
    const getEmbedUrl = (url: string | undefined) => {
        if (!url) return "";
        const videoId = url.split("v=")[1]?.split("&")[0]; // Extract YouTube video ID
        return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    };

    const renderModuleContent = () => {
        switch (module.contentType) {
            case "WEBLINK":
                return (
                    <a
                        href={module.webLink?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className='text-blue-500 hover:text-blue-700"'
                    >
                        Open Web Page
                    </a>
                );
            case "PDF":
                return (
                    <embed
                        src={`${import.meta.env.VITE_API}course/files/${
                            module.pdfContent?.filePath
                        }`}
                        type="application/pdf"
                        className="w-full h-screen border rounded-lg shadow"
                    />
                );
            case "VIDEO":
                return (
                    <iframe
                        src={getEmbedUrl(module.videoContent?.url)}
                        title={module.title}
                        className="w-full h-96 border rounded-lg shadow"
                        allowFullScreen
                    />
                );
            default:
                return null;
        }
    };

    const renderLink = () => {
        if (module.id && module.contentType == "VIDEO") {
            return (
                <Link
                    className='text-blue-500 hover:text-blue-700"'
                    to={`${module.videoContent?.url ?? module.webLink?.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Visit link
                </Link>
            );
        }
    };
    const user = useLocalStorage("user");

    const isTutor = user.role === "TUTOR" ? true : false;
    return (
        <div className="bg-white p-4 rounded-lg shadow mb-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
                {isTutor ? `Module Preview` : `${module.title}`}
            </h2>
            {module.id ? (
                <>{renderModuleContent()}</>
            ) : (
                <p className="text-gray-500">
                    Select a module to preview its content.
                </p>
            )}
            <>{renderLink()}</>
        </div>
    );
};

export default ModulePreview;
