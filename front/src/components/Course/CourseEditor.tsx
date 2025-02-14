// src/components/CourseEditor/CourseEditor.tsx

import React, { ChangeEvent } from "react";
import { UpdateCourseInputs } from "../../interfaces/courseInterface";

interface CourseEditorProps {
    course: UpdateCourseInputs;
    onCourseUpdate: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CourseEditor: React.FC<CourseEditorProps> = ({
    course,
    onCourseUpdate,
}) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow mb-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
                Course Editor
            </h2>
            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        defaultValue={course.title}
                        onChange={onCourseUpdate}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <input
                        type="text"
                        name="description"
                        defaultValue={course.description}
                        onChange={onCourseUpdate}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </form>
        </div>
    );
};

export default CourseEditor;
