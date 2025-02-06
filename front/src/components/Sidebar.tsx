import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    FaHome,
    FaUser,
    FaCog,
    FaBars,
    FaBook,
    FaUserGraduate,
} from "react-icons/fa";
import { IconType } from "react-icons";
import useLocalStorage from "../hooks/useLocalStorage";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => setIsOpen(!isOpen);
    const [user] = useLocalStorage("user");

    const isAdmin = user && user.role === "ADMIN";
    const isTutor = user && user.role === "TUTOR";

    return (
        <>
            {/* Mobile hamburger menu */}
            <button
                onClick={toggleSidebar}
                className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md md:hidden"
            >
                <FaBars />
            </button>

            {/* Sidebar */}
            <aside
                className={`left-0 h-full bg-gray-800 text-white transition-all duration-300 ease-in-out z-40
                    ${isOpen ? "max-w-64" : "w-0 md:w-35 lg:w-45"}
                `}
            >
                <nav className="flex flex-col h-full">
                    <div className="p-4 text-2xl font-bold text-center md:hidden">
                        Menu
                    </div>
                    <ul className="flex-grow space-y-2">
                        <SidebarItem
                            icon={<FaHome />}
                            text="Home"
                            link="/dashboard"
                        />

                        {isAdmin && (
                            <SidebarItem
                                icon={<FaCog />}
                                text="Admin"
                                link="/admin/users"
                            />
                        )}

                        {isTutor && (
                            <>
                                <SidebarItem
                                    icon={<FaUserGraduate />}
                                    text="Learners"
                                    link="/learners"
                                />
                            </>
                        )}

                        <SidebarItem
                            icon={<FaBook />}
                            text="Courses"
                            link="/courses"
                        />

                        <SidebarItem
                            icon={<FaUser />}
                            text="Profile"
                            link="/profile"
                        />
                        <SidebarItem
                            icon={<FaCog />}
                            text="Settings"
                            link="/settings"
                        />
                    </ul>
                </nav>
            </aside>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}
        </>
    );
};

const SidebarItem = ({
    icon,
    text,
    link,
}: {
    icon: React.ReactElement<IconType>;
    text: string;
    link: string;
}) => (
    <li>
        <Link
            to={link}
            className="flex items-center p-4 hover:bg-gray-700 transition-colors duration-200"
        >
            <span className="text-xl mr-4">{icon}</span>
            <span className="hidden md:inline lg:inline">{text}</span>
        </Link>
    </li>
);

export default Sidebar;
