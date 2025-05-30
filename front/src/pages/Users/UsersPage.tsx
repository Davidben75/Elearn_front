import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
import useLocalStorage from "../../hooks/useLocalStorage";
import { NavLink } from "react-router-dom";
import { useHandleError } from "../../hooks/useHandleError";
import userService from "../../services/userService";
import { UserList } from "../../interfaces/userInterface";

interface StatusPillProps {
    status: string;
    onChange: (status: string) => void;
}

const StatusPill = ({ status, onChange }: StatusPillProps) => {
    const colors: { [key: string]: string } = {
        ACTIVE: "bg-green-100 text-green-800",
        INACTIVE: "bg-yellow-100 text-yellow-800",
        SUSPENDED: "bg-red-100 text-red-800",
    };

    return (
        <select
            className={`px-2 py-1 rounded-full text-xs font-semibold ${colors[status]}`}
            value={status}
            onChange={(e) => onChange(e.target.value)}
        >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="SUSPENDED">Suspended</option>
        </select>
    );
};

const UsersPage = () => {
    const [user] = useLocalStorage("user");

    const handleError = useHandleError();
    const isAdmin = user && user.role === "ADMIN";
    const isTutor = user && user.role === "TUTOR";

    const [users, setUsers] = useState<UserList[]>([]);

    const handleStatusChange = (userId: number, newStatus: string) => {
        setUsers(
            users.map((user) =>
                user.id === userId ? { ...user, status: newStatus } : user
            )
        );
    };

    const fetchListLearners = async () => {
        try {
            const response = await userService.getTutorCurrentLearners();

            if (response) {
                console.log(response);
                setUsers(response.users);
            }
        } catch (error) {
            console.log(error);
            handleError(error);
        }
    };

    useEffect(() => {
        fetchListLearners();
    }, []);

    return (
        <main className="flex h-screen bg-grey-100">
            <Sidebar />
            <div className="flex-1 p-10 overflow-auto">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">
                    {isAdmin
                        ? "Manage Users"
                        : isTutor
                        ? "Manage Learners"
                        : "Learner"}
                </h1>

                {isTutor && (
                    <div className="mb-4">
                        <NavLink
                            to="/add-learner"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Add Learners
                        </NavLink>
                    </div>
                )}
                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Full name
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Email
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Status
                                </th>
                                {isAdmin && (
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Role
                                    </th>
                                )}

                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users &&
                                users?.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{`${user.name} ${user.lastName}`}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {user.email}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <StatusPill
                                                status={user.status}
                                                onChange={(newStatus) =>
                                                    handleStatusChange(
                                                        user.id,
                                                        newStatus
                                                    )
                                                }
                                            />
                                        </td>
                                        {isAdmin && (
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {user.role}
                                                </div>
                                            </td>
                                        )}

                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button className="text-red-600 hover:text-red-900 mr-2">
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
};

export default UsersPage;
