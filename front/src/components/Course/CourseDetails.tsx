import { Course } from "../../interfaces/courseInterface";

interface CourseDetailsProps {
    course: Course;
}
const CourseDetails: React.FC<CourseDetailsProps> = ({ course }) => {
    return (
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h1 className="text-xl font-bold text-blue-800">{course.title}</h1>
            <p className="text-sm text-gray-600 mt-2">{course.description}</p>
        </div>
    );
};

export default CourseDetails;
