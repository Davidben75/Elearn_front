import { useEffect, useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import useLocalStorage from "../../hooks/useLocalStorage";
import AddCourseModal from "./AddCourseModal";
import courseService from "../../services/courseService";
import { Link, useNavigate } from "react-router-dom";
import { AddCourseInputs, Courses } from "../../interfaces/courseInterface";
import { useHandleError } from "../../hooks/useHandleError";
import { FaGraduationCap } from "react-icons/fa6";

const StatusPill = ({
    status,
    onChange,
}: {
    status: string;
    onChange: (status: string) => void;
}) => {
    const colors: { [key: string]: string } = {
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
    const [courses, setCourses] = useState<Courses[] | []>();

    const [user] = useLocalStorage("user");

    const isTutor = user && user.role === "TUTOR";
    const isAdmin = user && user.role === "ADMIN";

    const navigate = useNavigate();
    const handleError = useHandleError();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchCourses = async () => {
        try {
            if (isTutor) {
                const response = await courseService.getTutorCourses();

                if (response) {
                    console.log(response);
                    setCourses(response.courses);
                }
            } else if (isAdmin) {
                console.log("ADMni");
            }
        } catch (error) {
            console.log(error);
            handleError(error);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleAddCourse = async (newCourse: AddCourseInputs) => {
        try {
            const response = await courseService.createCourse(newCourse);
            if (response) {
                console.log(response.course.id);
                navigate(`/course-edit/${response.course.id}`);
            }
        } catch (error) {
            console.log(error);
            handleError(error);
        }
    };

    const handleStatusChange = (courseId: number, newStatus: string) => {
        setCourses(
            courses!.map((course) =>
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
                        {/* <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Last Update
                        </th> */}
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
                    {courses &&
                        courses.map((course) => (
                            <tr key={course.id} className="hover:bg-gray-50">
                                <td
                                    className="px-6 py-4 whitespace-nowrap"
                                    data-label="Course"
                                >
                                    <div className="text-sm font-medium text-gray-900">
                                        {course?.title}
                                    </div>
                                </td>
                                <td
                                    className="px-6 py-4 whitespace-nowrap"
                                    data-label="Created"
                                >
                                    <div className="text-sm text-gray-900">
                                        {new Date(
                                            course.createdAt
                                        ).toLocaleString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </div>
                                </td>
                                {/* <td
                                    className="px-6 py-4 whitespace-nowrap"
                                    data-label="Last Update"
                                >
                                    <div className="text-sm text-gray-900">
                                        {new Date(
                                            course.updatedAt
                                        ).toLocaleString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </div>
                                </td> */}
                                <td
                                    className="px-6 py-4 whitespace-nowrap"
                                    data-label="Status"
                                >
                                    <StatusPill
                                        status={course.status}
                                        onChange={(newStatus) =>
                                            handleStatusChange(
                                                course.id,
                                                newStatus
                                            )
                                        }
                                    />
                                </td>
                                <td
                                    className="flex flex-row px-6 py-4 whitespace-nowrap text-sm font-medium"
                                    data-label="Actions"
                                >
                                    <button className="text-red-600 hover:text-red-900 mr-2">
                                        <FaTrash />
                                    </button>
                                    <Link
                                        to={`/course-edit/${course.id}`}
                                        className="text-green-600 hover:text-green-900 mr-2"
                                    >
                                        <FaEye />
                                    </Link>
                                    <Link
                                        to={`/course-enrollment/${course.id}`}
                                        className="text-blue-600 hover:text-blue-900 mr-2"
                                    >
                                        <FaGraduationCap />
                                    </Link>
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
