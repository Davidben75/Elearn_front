import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { FaEdit, FaKey } from "react-icons/fa";
import useLocalStorage from "../../hooks/useLocalStorage";
import ModalPasswordChange from "../../components/ModalPasswordChange";

const Profile = () => {
    const [user, setUser] = useLocalStorage("user", {
        name: "John Doe",
        email: "john@example.com",
        role: "LEARNER",
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState(user);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [passwords, setPasswords] = useState({
        current: "",
        new: "",
        confirm: "",
    });

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        setEditedUser(user);
    };

    const handleInputChange = (e) => {
        setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        setUser(editedUser);
        setIsEditing(false);
    };

    const handlePasswordChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        console.log("Password change submitted:", passwords);
        setIsPasswordModalOpen(false);
        setPasswords({ current: "", new: "", confirm: "" });
    };

    return (
        <main className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 p-10 overflow-auto">
                <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
                    <header className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold">Profile</h1>
                        <button
                            onClick={handleEditToggle}
                            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            <FaEdit className="mr-2" />
                            {isEditing ? "Cancel" : "Edit Profile"}
                        </button>
                    </header>

                    <section className="space-y-4">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Name
                            </label>
                            {isEditing ? (
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={editedUser.name}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                />
                            ) : (
                                <p className="mt-1 text-lg">{user.name}</p>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>
                            {isEditing ? (
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={editedUser.email}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                />
                            ) : (
                                <p className="mt-1 text-lg">{user.email}</p>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="role"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Role
                            </label>
                            <p id="role" className="mt-1 text-lg">
                                {user.role}
                            </p>
                        </div>
                        <div>
                            <label
                                htmlFor="bio"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Bio
                            </label>
                            {isEditing ? (
                                <textarea
                                    id="bio"
                                    name="bio"
                                    value={editedUser.bio}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    rows="3"
                                ></textarea>
                            ) : (
                                <p className="mt-1 text-lg">{user.bio}</p>
                            )}
                        </div>
                    </section>

                    {isEditing && (
                        <footer className="mt-6">
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                                Save Changes
                            </button>
                        </footer>
                    )}

                    <footer className="mt-8">
                        <button
                            onClick={() => setIsPasswordModalOpen(true)}
                            className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        >
                            <FaKey className="mr-2" />
                            Change Password
                        </button>
                    </footer>
                </article>
            </div>

            {isPasswordModalOpen && (
                <dialog
                    open
                    className=" bg-black bg-opacity-50 flex items-center justify-center z-50"
                >
                    <div className="bg-white p-8 rounded-lg max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-4">
                            Change Password
                        </h2>
                        <form
                            onSubmit={handlePasswordSubmit}
                            className="space-y-4"
                        >
                            <div>
                                <label
                                    htmlFor="current-password"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Current Password
                                </label>
                                <input
                                    id="current-password"
                                    type="password"
                                    name="current"
                                    value={passwords.current}
                                    onChange={handlePasswordChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="new-password"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    New Password
                                </label>
                                <input
                                    id="new-password"
                                    type="password"
                                    name="new"
                                    value={passwords.new}
                                    onChange={handlePasswordChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="confirm-password"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Confirm New Password
                                </label>
                                <input
                                    id="confirm-password"
                                    type="password"
                                    name="confirm"
                                    value={passwords.confirm}
                                    onChange={handlePasswordChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    required
                                />
                            </div>
                            <footer className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setIsPasswordModalOpen(false)
                                    }
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Change Password
                                </button>
                            </footer>
                        </form>
                    </div>
                </dialog>
            )}
        </main>
    );
};

export default Profile;
