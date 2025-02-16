import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Sidebar from "../../components/Sidebar";
import { useParams } from "react-router-dom";
import { useHandleError } from "../../hooks/useHandleError";
import courseService from "../../services/courseService";
import {
    EnrolledLearner,
    EnrollmentInputs,
    Learner,
} from "../../interfaces/enrollmentInterface";
import { toast } from "react-toastify";
import { Course } from "../../interfaces/courseInterface";

const CourseEnrollment = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const handleError = useHandleError();

    const [showForm, setShowForm] = useState(false); // State to toggle form visibility
    const [selectedLearners, setSelectedLearners] = useState<number[]>([]); // State to track selected learners
    const [course, setCourse] = useState<Course | null>(null);
    // Data for enrolled and unenrolled users
    const [enrolledUsers, setEnrolledUsers] = useState<EnrolledLearner[]>([]);

    const [unenrolledUsers, setUnenrolledUsers] = useState<Learner[]>([]);
    const { id } = useParams();
    const fetchEnrolledLearners = async () => {
        try {
            const response = await courseService.getEnrolledLearners(
                id as string
            );
            if (response) {
                console.log(response);
                setEnrolledUsers(response.users);
            }
        } catch (error) {
            console.log(error);
            handleError(error);
        }
    };

    const fetchUnenrolledLearners = async () => {
        try {
            const response = await courseService.getUnenrolledLearners(
                id as string
            );
            if (response) {
                console.log(response);
                setUnenrolledUsers(response.users);
            }
        } catch (error) {
            console.log(error);
            handleError(error);
        }
    };

    const fetchCourse = async () => {
        try {
            const response = await courseService.getOneCourse(id as string);
            if (response) {
                setCourse(response.course);
            }
        } catch (error) {
            console.log(error);
            handleError(error);
        }
    };

    useEffect(() => {
        fetchEnrolledLearners();
        fetchUnenrolledLearners();
        fetchCourse();
    }, []);

    const onSubmit = async () => {
        // Prepare the data to match the EnrollmentDto structure
        const enrollmentData: EnrollmentInputs = {
            courseId: id ? parseInt(id) : 0, // Replace with the actual course ID
            learners: unenrolledUsers
                .filter((user) => selectedLearners.includes(user.id)) // Filter selected learners
                .map((user) => ({
                    learnerId: user.id,
                    name: user.name,
                    email: user.email,
                })),
        };

        try {
            const response = await courseService.enrollLearnersToCourse(
                enrollmentData
            );

            if (response) {
                toast.success(response.message);
                fetchEnrolledLearners();
                fetchUnenrolledLearners();
            }
        } catch (error) {
            console.log(error);
            handleError(error);
        }

        reset(); // Reset the form after submission
        setShowForm(false); // Hide the form after submission
    };

    const handleLearnerSelection = (learnerId: number) => {
        setSelectedLearners(
            (prev) =>
                prev.includes(learnerId)
                    ? prev.filter((id) => id !== learnerId) // Deselect if already selected
                    : [...prev, learnerId] // Select if not already selected
        );
    };

    return (
        <main className=" flex h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />
            <div className="overflow-x-auto shadow-md rounded-lg w-full p-6">
                <h1 className="text-2xl font-bold mb-8 text-center text-gray-800">
                    {course?.title} Enrollment
                </h1>

                {/* Enrolled Users Section */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">
                        Enrolled Users
                    </h2>

                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <table className="min-w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Enrolled At
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {enrolledUsers.map((user) => (
                                    <tr key={user.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {user.learner?.name}{" "}
                                            {user.learner?.lastName}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {user.learner?.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {user.status}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {user.enrolledAt &&
                                                new Date(
                                                    user.enrolledAt
                                                ).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Enroll More
                    </button>
                </section>

                {/* Form to Enroll New Users (Conditionally Rendered) */}
                {showForm &&
                    (unenrolledUsers.length === 0 ? (
                        <section className="mb-8">
                            <h2 className="text-xl font-semibold mb-4 text-gray-700">
                                Enroll New Learners
                            </h2>
                            <p className="text-gray-600">
                                No learners to enroll.
                            </p>
                        </section>
                    ) : (
                        <section className="mb-8">
                            <h2 className="text-xl font-semibold mb-4 text-gray-700">
                                Enroll New Learners
                            </h2>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="bg-white p-6 rounded-lg shadow"
                            >
                                <div className="space-y-4">
                                    {unenrolledUsers.map((user) => (
                                        <div
                                            key={user.id}
                                            className="flex items-center"
                                        >
                                            <input
                                                type="checkbox"
                                                id={`user-${user.id}`}
                                                checked={selectedLearners.includes(
                                                    user.id
                                                )}
                                                onChange={() =>
                                                    handleLearnerSelection(
                                                        user.id
                                                    )
                                                }
                                                className="mr-2"
                                            />
                                            <label
                                                htmlFor={`user-${user.id}`}
                                                className="text-gray-700"
                                            >
                                                {user.name} {user.lastName} (
                                                {user.email})
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    type="submit"
                                    className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Enroll Selected Users
                                </button>
                            </form>
                        </section>
                    ))}
            </div>
        </main>
    );
};

export default CourseEnrollment;
