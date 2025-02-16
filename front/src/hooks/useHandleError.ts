import axios from "axios";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { toast } from "react-toastify";

interface ErrorResponse {
    message: string;
    statusCode: number;
}

export const useHandleError = () => {
    const navigate = useNavigate();

    return (error: unknown) => {
        if (axios.isAxiosError(error)) {
            if (error.response?.data.message) {
                console.log(error.response.data.message);
                if (
                    error.response.data.message ===
                    "Session not validated. Please login"
                ) {
                    authService.logout();
                    navigate("/login");
                }
                toast.error(error.response.data.message);
            } else {
                const serverError = error.response?.data as ErrorResponse;
                toast.error(
                    serverError.message || "An unexpected error occurred"
                );
            }
        } else if (error instanceof Error) {
            toast.error(error.message);
        } else {
            toast.error("An unexpected error occurred");
        }
    };
};
