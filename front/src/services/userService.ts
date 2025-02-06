import axios from "axios";
const apiUrl = import.meta.env.VITE_API;

type AddLeanerInputs = {
    email: string;
    name: string;
    lastName: string;
};

interface ErrorResponse {
    message: string;
    statusCode: number;
}

class UserService {
    // COMMON

    // TUTOR
    // - Add Learner
    async addLeaner(inputs: AddLeanerInputs) {
        try {
            console.log();
            const response = await axios.post(
                `${apiUrl}user/tutor/add-learner`,
                inputs,
                {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(
                            localStorage.getItem("token") as string
                        )}`,
                    },
                }
            );

            console.log(response.data);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    // ADMIN

    private handleError(error: unknown) {
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
    }
}
export default new UserService();
