import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import authService from "../../services/authService";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useAuth } from "../../context/AuthContext";
import { useHandleError } from "../../hooks/useHandleError";

export type LoginInputs = {
    email: string;
    password: string;
};

export const SignInPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInputs>();
    const [loginError, setLoginError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleError = useHandleError();

    const { setIsAuthenticated } = useAuth();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [user, setUser] = useLocalStorage("user", null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [token, setToken] = useLocalStorage("token", null);

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
        setIsLoading(true);
        setLoginError(null);

        try {
            const response = await authService.login(data, handleError);
            setUser(response.user);
            setToken(response.token);
            setIsAuthenticated(true);
            console.log("Login response: ", response);
            navigate("/dashboard");
        } catch (error) {
            if (error instanceof Error) {
                setLoginError(error.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="flex items-center justify-center h-screen bg-gray-100">
            <section className="w-full max-w-md bg-white p-8 shadow rounded">
                <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
                    Sign In
                </h1>

                {loginError && (
                    <div
                        className="text-sm text-red-600 text-center mb-4"
                        role="alert"
                    >
                        {loginError}
                    </div>
                )}

                <form
                    className="space-y-4"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                >
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
                            autoComplete="current-password"
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

                    {/* Display loading spinner */}
                    {isLoading && (
                        <div className="flex justify-center mt-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-2 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        disabled={isLoading}
                    >
                        {isLoading ? "Signing in..." : "Sign in"}
                    </button>
                </form>
            </section>
        </main>
    );
};
