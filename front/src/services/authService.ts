import axios from "axios";
const apiUrl = import.meta.env.VITE_API;
import { LoginInputs } from "../pages/SignIn/SignInPage";
import { SignUpInputs } from "../pages/SignUp/SignUpPage";
import { handleError } from "./errorHandler";

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
            handleError(error);
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
            handleError(error);
        }
    }

    async logout() {
        try {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            return true;
        } catch (error) {
            handleError(error);
        }
    }
}

export default new AuthService();
