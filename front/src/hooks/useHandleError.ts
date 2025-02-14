import axios from "axios";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";

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
                throw new Error(error.response.data.message);
            }
            const serverError = error.response?.data as ErrorResponse;
            throw new Error(serverError.message || "Une erreur est survenue");
        } else if (error instanceof Error) {
            throw error;
        } else {
            throw new Error("Une erreur inattendue est survenue");
        }
    };
};
