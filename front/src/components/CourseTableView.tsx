import { useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import useLocalStorage from "../hooks/useLocalStorage";
import AddCourseModal from "./AddCourseModal";

const StatusPill = ({
    status,
    onChange,
}: {
    status: string;
    onChange: (status: string) => void;
}) => {
    const colors = {
        ACTIVE: "bg-green-100 text-green-800",
        INACTIVE: "bg-yellow-100 text-yellow-800",
    };

    return (
        <select
            className={`px-2 py-1 rounded-full text-xs font-semibold ${colors[status]}`}
            value={status}
            onChange={(e) => onChange(e.target.value)}
        >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
        </select>
    );
};

const CourseTableView = () => {
    const [courses, setCourses] = useState([
        {
            id: 1,
            name: "Course 1",
            created: "2021-01-01",
            lastUpdate: "2021-02-01",
            status: "ACTIVE",
        },
        {
            id: 2,
            name: "Course 2",
            created: "2021-01-15",
            lastUpdate: "2021-03-01",
            status: "INACTIVE",
        },
    ]);

    const [user] = useLocalStorage("user");

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddCourse = (newCourse) => {
        // Logic to add the new course
        console.log("New course:", newCourse);
        // You would typically make an API call here to add the course to your backend
    };

    const isTutor = user && user.role === "TUTOR";
    const handleStatusChange = (courseId: number, newStatus: string) => {
        setCourses(
            courses.map((course) =>
                course.id === courseId
                    ? { ...course, status: newStatus }
                    : course
            )
        );
    };

    return (
        <div className="overflow-x-auto shadow-md rounded-lg w-full p-6">
            {/* Table */}
            <h2 className="text-2xl font-bold mb-4">Courses</h2>
            {isTutor && (
                <div className="mb-4">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Add Course
                    </button>
                </div>
            )}
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Course
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Created
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Last Update
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Status
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {courses.map((course) => (
                        <tr key={course.id} className="hover:bg-gray-50">
                            <td
                                className="px-6 py-4 whitespace-nowrap"
                                data-label="Course"
                            >
                                <div className="text-sm font-medium text-gray-900">
                                    {course.name}
                                </div>
                            </td>
                            <td
                                className="px-6 py-4 whitespace-nowrap"
                                data-label="Created"
                            >
                                <div className="text-sm text-gray-900">
                                    {course.created}
                                </div>
                            </td>
                            <td
                                className="px-6 py-4 whitespace-nowrap"
                                data-label="Last Update"
                            >
                                <div className="text-sm text-gray-900">
                                    {course.lastUpdate}
                                </div>
                            </td>
                            <td
                                className="px-6 py-4 whitespace-nowrap"
                                data-label="Status"
                            >
                                <StatusPill
                                    status={course.status}
                                    onChange={(newStatus) =>
                                        handleStatusChange(course.id, newStatus)
                                    }
                                />
                            </td>
                            <td
                                className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                                data-label="Actions"
                            >
                                <button className="text-indigo-600 hover:text-indigo-900 mr-2">
                                    <FaEdit />
                                </button>
                                <button className="text-red-600 hover:text-red-900 mr-2">
                                    <FaTrash />
                                </button>
                                <button className="text-green-600 hover:text-green-900">
                                    <FaEye />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <AddCourseModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddCourse}
            />
        </div>
    );
};

export default CourseTableView;
