import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import authService from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { useHandleError } from "../../hooks/useHandleError";

export type SignUpInputs = {
    name: string;
    lastName: string;
    email: string;
    password: string;
    companyName: string;
};

const SignUpPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpInputs>();

    const handleError = useHandleError();

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onSubmit: SubmitHandler<SignUpInputs> = async (data) => {
        setLoading(true);
        setError(null);
        try {
            const response = await authService.register(data, handleError);
            if (response) {
                setLoading(false);
                navigate("/login");
            }
        } catch (error) {
            if (error instanceof Error) {
                setError(`${error.message}`);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex items-center justify-center h-screen bg-gray-100">
            <section className="w-full max-w-md bg-white p-8 shadow rounded">
                <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
                    Create your account
                </h1>
                <form
                    className="space-y-4"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                >
                    {/* FIRST NAME */}
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            First Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            autoComplete="given-name"
                            {...register("name", {
                                required: "First name is required",
                            })}
                            className="mt-1 w-full px-3 py-2 border rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            aria-invalid={errors.name ? "true" : "false"}
                        />
                        {errors.name && (
                            <p
                                className="text-sm text-red-600 mt-1"
                                role="alert"
                            >
                                {errors.name.message}
                            </p>
                        )}
                    </div>
                    {/* LAST NAME */}
                    <div>
                        <label
                            htmlFor="lastName"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Last Name
                        </label>
                        <input
                            id="lastName"
                            type="text"
                            autoComplete="family-name"
                            {...register("lastName", {
                                required: "Last name is required",
                            })}
                            className="mt-1 w-full px-3 py-2 border rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            aria-invalid={errors.lastName ? "true" : "false"}
                        />
                        {errors.lastName && (
                            <p
                                className="text-sm text-red-600 mt-1"
                                role="alert"
                            >
                                {errors.lastName.message}
                            </p>
                        )}
                    </div>
                    {/* EMAIL */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address",
                                },
                            })}
                            className="mt-1 w-full px-3 py-2 border rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            aria-invalid={errors.email ? "true" : "false"}
                        />
                        {errors.email && (
                            <p
                                className="text-sm text-red-600 mt-1"
                                role="alert"
                            >
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    {/* COMPANY NAME */}
                    <div>
                        <label
                            htmlFor="companyName"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Company Name
                        </label>
                        <input
                            id="companyName"
                            type="text"
                            {...register("companyName", {
                                required: "Your company name is required",
                            })}
                            className="mt-1 w-full px-3 py-2 border rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            aria-invalid={errors.companyName ? "true" : "false"}
                        />
                        {errors.companyName && (
                            <p
                                className="text-sm text-red-600 mt-1"
                                role="alert"
                            >
                                {errors.companyName.message}
                            </p>
                        )}
                    </div>
                    {/* PASSWORD */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            autoComplete="new-password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message:
                                        "Password must be at least 8 characters long",
                                },
                            })}
                            className="mt-1 w-full px-3 py-2 border rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            aria-invalid={errors.password ? "true" : "false"}
                        />
                        {errors.password && (
                            <p
                                className="text-sm text-red-600 mt-1"
                                role="alert"
                            >
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Display error message */}
                    {error && (
                        <p className="text-sm text-red-600 mt-1" role="alert">
                            {error}
                        </p>
                    )}

                    {/* Display loading spinner */}
                    {loading && (
                        <div className="flex justify-center mt-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-2 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Sign up
                    </button>
                </form>
            </section>
        </main>
    );
};

export default SignUpPage;
