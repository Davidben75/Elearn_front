import { useEffect, useState } from "react";
import { useHandleError } from "../../hooks/useHandleError";
import courseService from "../../services/courseService";
import { Link } from "react-router-dom";

interface LearnerCourse {
    id: number;
    title: string;
    description: string;
    createdAt: string;
}

const CourseCard = ({ course }: { course: LearnerCourse }) => (
    <Link
        to={`/course/view/${course.id}`}
        className="block hover:shadow-lg transition-shadow"
    >
        <article className="bg-white rounded-lg shadow-md overflow-hidden">
            <header className="p-4 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-semibold">{course.title}</h3>
            </header>
            <div className="p-4">
                <p className="text-gray-600 mb-4">{course.description}</p>
                <footer className="text-sm text-gray-500">
                    <time dateTime={course.createdAt}>
                        Created: {course.createdAt}
                    </time>
                </footer>
            </div>
        </article>
    </Link>
);

const CourseGrid = () => {
    const [courses, setCourses] = useState<LearnerCourse[]>([]);

    const handleError = useHandleError();
    const fetchLearnersCourses = async () => {
        try {
            const response = await courseService.getLearnersEnrolledCourses();
            if (response) {
                setCourses(response.courses);
            }
        } catch (error) {
            handleError(error);
        }
    };

    useEffect(() => {
        fetchLearnersCourses();
    }, []);

    return (
        <section className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Courses</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course, index) => (
                    <CourseCard key={index} course={course} />
                ))}
            </div>
        </section>
    );
};

export default CourseGrid;
