// src/components/ModulePreview/ModulePreview.tsx

import React from "react";
import { Module } from "../../../interfaces/courseInterface";

interface ModulePreviewProps {
    module: Module;
}

const ModulePreview: React.FC<ModulePreviewProps> = ({ module }) => {
    const renderModuleContent = () => {
        switch (module.contentType) {
            case "WEBLINK":
                return (
                    <iframe
                        src={module.webLink?.url}
                        title={module.title}
                        className="w-full h-96 border rounded-lg shadow"
                        allowFullScreen
                    />
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
                        src={module.videoContent?.url}
                        title={module.title}
                        className="w-full h-96 border rounded-lg shadow"
                        allowFullScreen
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow mb-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
                Module Preview
            </h2>
            {module.id ? (
                <>{renderModuleContent()}</>
            ) : (
                <p className="text-gray-500">
                    Select a module to preview its content.
                </p>
            )}
        </div>
    );
};

export default ModulePreview;
