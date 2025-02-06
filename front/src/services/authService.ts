import axios from "axios";
const apiUrl = import.meta.env.VITE_API;
import { LoginInputs } from "../pages/SignIn/SignInPage";
import { SignUpInputs } from "../pages/SignUp/SignUpPage";

interface ErrorResponse {
    message: string;
    statusCode: number;
}

class AuthService {
    async login(loginInputs: LoginInputs) {
        try {
            const response = await axios.post(
                `${apiUrl}auth/login`,
                loginInputs
            );

            console.log(response.data);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async register(registerInputs: SignUpInputs) {
        try {
            const response = await axios.post(
                `${apiUrl}auth/register`,
                registerInputs
            );
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async logout() {
        try {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            return true;
        } catch (error) {
            this.handleError(error);
        }
    }

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

export default new AuthService();
