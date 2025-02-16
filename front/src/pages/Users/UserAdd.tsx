import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../../components/Sidebar";
import userService from "../../services/userService";
import { useHandleError } from "../../hooks/useHandleError";
import { toast } from "react-toastify";

type AddLearnerInputs = {
    email: string;
    name: string;
    lastName: string;
};

const UserAdd = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<AddLearnerInputs>();
    const [loading, setLoading] = useState(false);

    const handleError = useHandleError();

    const onSubmit: SubmitHandler<AddLearnerInputs> = async (data) => {
        setLoading(true);
        try {
            const response = await userService.addLeaner(data);
            if (response) {
                toast.success("Learner added successfully!");
                if (response.emailSent) {
                    toast.info(
                        "An invitation email has been sent to the learner."
                    );
                }
                reset(); // Reset form after successful submission
            }
        } catch (error) {
            console.error(error);
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="w-full p-6 md:p-10">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">
                    Add New Learner
                </h1>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white shadow-md rounded-lg p-6 space-y-6 max-w-lg mx-auto"
                >
                    {/* Name Field */}
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            First Name
                        </label>
                        <input
                            {...register("name", {
                                required: "First name is required",
                            })}
                            type="text"
                            id="name"
                            placeholder="Enter first name"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    {/* Last Name Field */}
                    <div>
                        <label
                            htmlFor="lastName"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Last Name
                        </label>
                        <input
                            {...register("lastName", {
                                required: "Last name is required",
                            })}
                            type="text"
                            id="lastName"
                            placeholder="Enter last name"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.lastName && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.lastName.message}
                            </p>
                        )}
                    </div>

                    {/* Email Field */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email Address
                        </label>
                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address",
                                },
                            })}
                            type="email"
                            id="email"
                            placeholder="Enter email address"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md shadow focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-offset-2 transition duration-200 sm:text-sm"
                        >
                            {loading ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            ) : (
                                "Add Learner"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default UserAdd;
