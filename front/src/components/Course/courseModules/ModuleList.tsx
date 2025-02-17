// src/components/ModuleList/ModuleList.tsx

import React from "react";
import { Module } from "../../../interfaces/courseInterface";
import { FaFilePdf, FaLink, FaVideo } from "react-icons/fa";

interface ModuleListProps {
    modules: Module[];
    onSelectModule?: (module: Module) => void;
    onRemoveModule: (moduleId: number) => void;
}

const ModuleList: React.FC<ModuleListProps> = ({
    modules,
    onSelectModule,
    onRemoveModule,
}) => {
    const getContentTypeIcon = (contentType: string) => {
        switch (contentType) {
            case "WEBLINK":
                return <FaLink />;
            case "PDF":
                return <FaFilePdf />;
            case "VIDEO":
                return <FaVideo />;
            default:
                return "📝";
        }
    };
    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Modules
            </h2>
            <ul className="space-y-2">
                {modules.map((m) => (
                    <li
                        key={m.id}
                        className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition"
                        onClick={() => onSelectModule(m)}
                    >
                        {getContentTypeIcon(m.contentType)}
                        <p className="font-medium text-gray-800">{m.title}</p>
                        <button
                            className="text-red-500 text-sm mt-1 hover:text-red-600"
                            onClick={(e) => {
                                e.stopPropagation();
                                onRemoveModule(m.id);
                            }}
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ModuleList;
