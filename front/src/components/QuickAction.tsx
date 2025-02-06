import { Link } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import { FaUserEdit } from "react-icons/fa";
import { FaBookBookmark } from "react-icons/fa6";

interface ArticleProps {
    title: string;
    link: string;
    icon: React.ReactNode;
}

const Article = ({ title, link, icon }: ArticleProps) => (
    <Link
        to={link}
        className="flex flex-col items-center justify-center bg-white shadow-lg rounded-lg overflow-hidden transition-all hover:scale-105 hover:shadow-xl p-6 h-full"
    >
        <div className="text-4xl mb-4 text-blue-600">{icon}</div>
        <h3 className="text-2xl font-semibold text-gray-800 text-center">
            {title}
        </h3>
    </Link>
);

const QuickAction = () => {
    const [user] = useLocalStorage("user");

    const isAdmin = user?.role === "ADMIN";
    const isTutor = user?.role === "TUTOR";

    let content;

    if (isAdmin) {
        content = (
            <>
                <Article
                    title="Manage Users"
                    link="/manage-users"
                    icon={<FaUserEdit />}
                />
                <Article
                    title="Manage Courses"
                    link="/manage-courses"
                    icon={<FaBookBookmark />}
                />
            </>
        );
    } else if (isTutor) {
        content = (
            <>
                <Article
                    title="Add User"
                    link="/add-user"
                    icon={<FaUserEdit />}
                />
                <Article
                    title="Create Course"
                    link="/add-course"
                    icon={<FaBookBookmark />}
                />
            </>
        );
    } else {
        content = (
            <p className="col-span-full text-center text-lg text-gray-600">
                No quick actions available for your role.
            </p>
        );
    }

    return (
        <section className="p-4 md:p-8 lg:p-12 w-full">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
                Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
                {content}
            </div>
        </section>
    );
};

export default QuickAction;

// Placeholder icon components (replace with your actual icons)
