// src/components/Header.js
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [user, setUser] = useLocalStorage("user", null);
    const [role, setRole] = useState("");

    useEffect(() => {
        switch (user?.role) {
            case "ADMIN":
                setRole("Admin");
                break;
            case "TUTOR":
                setRole("Tutor");
                break;
            case "LEARNER":
                setRole("Learner");
                break;
            default:
                setRole("");
        }
    }, [user]);

    const logout = () => {
        console.log(role);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        window.location.href = "/login";
    };

    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center">
                    <Link to="/" aria-label="Accueil">
                        <img
                            src="/path/to/your/logo.png"
                            alt="Logo de l'entreprise"
                            className="h-8 w-auto"
                        />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:block">
                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() =>
                                    setIsDropdownOpen(!isDropdownOpen)
                                }
                                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
                            >
                                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <span>{user.name}</span>
                                <svg
                                    className={`w-4 h-4 transition-transform ${
                                        isDropdownOpen ? "rotate-180" : ""
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            {isDropdownOpen && (
                                <div
                                    className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                                    onBlur={() => setIsDropdownOpen(false)}
                                >
                                    <div className="px-4 py-3 border-b border-gray-200">
                                        <p className="text-sm font-medium text-gray-900">
                                            {user.name}
                                        </p>

                                        <p className="text-xs text-gray-500 truncate">
                                            {user.companyName}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate">
                                            {role}
                                        </p>
                                    </div>
                                    <ul className="py-1">
                                        <li>
                                            <Link
                                                to="/profile"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                            >
                                                My Profil
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/settings"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                            >
                                                Settings
                                            </Link>
                                        </li>
                                        <li>
                                            <button
                                                onClick={logout}
                                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
                                            >
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        <ul className="flex space-x-4">
                            <li>
                                <Link
                                    to="/login"
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    Connexion
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/register"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                >
                                    Créer un compte
                                </Link>
                            </li>
                        </ul>
                    )}
                </nav>

                {/* Mobile Menu Button (Only for non-connected users) */}
                {!user && (
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    </button>
                )}
            </div>

            {/* Mobile Menu (Only for non-connected users) */}
            {!user && isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200 w-full">
                    <ul className="flex flex-col space-y-2 p-4">
                        <li>
                            <Link
                                to="/login"
                                className="block text-gray-600 hover:text-gray-900"
                            >
                                Connexion
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/register"
                                className="block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            >
                                Créer un compte
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Header;
