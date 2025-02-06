import axios from "axios";

interface ErrorResponse {
    message: string;
    statusCode: number;
}

export const handleError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        if (error.response?.data.message) {
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
