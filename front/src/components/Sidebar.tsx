import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
    FaHome,
    FaUser,
    FaCog,
    FaBars,
    FaBook,
    FaUserGraduate,
    FaSignOutAlt,
} from "react-icons/fa";
import useLocalStorage from "../hooks/useLocalStorage";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user] = useLocalStorage("user");

    const isAdmin = user?.role === "ADMIN";
    const isTutor = user?.role === "TUTOR";

    // Toggle sidebar with useCallback to memoize the function
    const toggleSidebar = useCallback(() => setIsOpen((prev) => !prev), []);

    return (
        <>
            {/* Mobile hamburger menu */}
            <button
                onClick={toggleSidebar}
                className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md md:hidden"
                aria-label="Toggle sidebar"
            >
                <FaBars />
            </button>

            {/* Sidebar */}
            <aside
                className={` left-0 h-full bg-gray-800 text-white transition-all duration-300 ease-in-out z-40 ${
                    isOpen ? "w-64" : "w-0 md:w-16 lg:w-20"
                }`}
                aria-expanded={isOpen}
            >
                <nav className="flex flex-col h-full">
                    <div className="p-4 text-2xl font-bold text-center md:hidden">
                        Menu
                    </div>
                    <ul className="flex-grow space-y-2">
                        <SidebarItem icon={<FaHome />} link="/dashboard" />

                        {isAdmin && (
                            <SidebarItem icon={<FaCog />} link="/admin/users" />
                        )}

                        {isTutor && (
                            <SidebarItem
                                icon={<FaUserGraduate />}
                                link="/learners"
                            />
                        )}

                        <SidebarItem icon={<FaBook />} link="/courses" />

                        <SidebarItem icon={<FaUser />} link="/profile" />
                        <SidebarItem icon={<FaCog />} link="/settings" />
                        <SidebarItem icon={<FaSignOutAlt />} link="/logout" />
                    </ul>
                </nav>
            </aside>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={toggleSidebar}
                    aria-hidden="true"
                ></div>
            )}
        </>
    );
};

const SidebarItem = ({ icon, link }) => (
    <li>
        <Link
            to={link}
            className="flex items-center p-4 hover:bg-gray-700 transition-colors duration-200"
        >
            <span className="text-xl mr-4">{icon}</span>
        </Link>
    </li>
);

export default Sidebar;
