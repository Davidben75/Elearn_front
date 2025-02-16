import { useForm } from "react-hook-form";
import { PasswordsInputs } from "../../interfaces/userInterface";
import { useHandleError } from "../../hooks/useHandleError";
import userService from "../../services/userService";
import useLocalStorage from "../../hooks/useLocalStorage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const FirstLogin = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<PasswordsInputs>();
    const handleError = useHandleError();
    const navigate = useNavigate();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [user, setUser] = useLocalStorage("user", null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [token, setToken] = useLocalStorage("token", null);
    const onSubmit = async (data: PasswordsInputs) => {
        try {
            const response = await userService.changePassword(data);
            if (response.user && response.token) {
                setToken(response.token);
                setUser(response.user);
                toast.success(`Welcome on board ${user.name}`);
            }
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
            handleError(error);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100">
            <section className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    First Login
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label
                            htmlFor="newPassword"
                            className="block text-sm font-medium text-gray-700"
                        >
                            New Password
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            {...register("newPassword", {
                                required: "This field is required",
                                minLength: {
                                    value: 6,
                                    message:
                                        "Password must be at least 6 characters",
                                },
                            })}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.newPassword && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.newPassword.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            {...register("confirmPassword", {
                                required: "This field is required",
                                validate: (value) =>
                                    value === watch("newPassword") ||
                                    "Passwords do not match",
                            })}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.confirmPassword && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Set Password
                        </button>
                    </div>
                </form>
            </section>
        </main>
    );
};

export default FirstLogin;
