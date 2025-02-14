import CourseGrid from "../../components/Course/CourseGrid";
import CourseTableView from "../../components/Course/CourseTableView";
import Sidebar from "../../components/Sidebar";
import useLocalStorage from "../../hooks/useLocalStorage";

const CoursePage = () => {
    const [user] = useLocalStorage("user");

    const isLearner = user && user.role === "LEARNER";
    return (
        <main className="flex h-screen bg-gray-100">
            <Sidebar />
            {isLearner ? <CourseGrid /> : <CourseTableView />}
        </main>
    );
};

export default CoursePage;
