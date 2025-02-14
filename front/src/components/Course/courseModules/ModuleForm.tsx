import React, { ChangeEvent, FormEvent } from "react";
import { Module } from "../../../interfaces/courseInterface";

interface ModuleFormProps {
    module: Module;
    onSubmit: (e: FormEvent) => void;
    onInputChange: (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void;
    onCancel: () => void;
}

const ModuleForm: React.FC<ModuleFormProps> = ({
    module,
    onSubmit,
    onInputChange,
    onCancel,
}) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
                {module.id ? "Edit Module" : "Add Module"}
            </h2>
            <form className="space-y-4" onSubmit={onSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={module.title}
                        onChange={onInputChange}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Content Type
                    </label>
                    <select
                        name="contentType"
                        value={module.contentType}
                        onChange={onInputChange}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="WEBLINK">WebLink</option>
                        <option value="PDF">PDF</option>
                        <option value="VIDEO">Video</option>
                    </select>
                </div>
                {(module.contentType === "WEBLINK" ||
                    module.contentType === "VIDEO") && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            URL
                        </label>
                        <input
                            type="text"
                            name="url"
                            value={
                                module.videoContent?.url || module.webLink?.url
                            }
                            onChange={onInputChange}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                )}
                {module.contentType === "PDF" && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Upload PDF
                        </label>
                        <input
                            type="file"
                            name="file"
                            onChange={onInputChange}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                )}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
                >
                    {module.id ? "Update Module" : "Add Module"}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="w-full bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600 transition"
                >
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default ModuleForm;
