import axios from "axios";
const apiUrl = import.meta.env.VITE_API;
import { LoginInputs } from "../pages/SignIn/SignInPage";
import { SignUpInputs } from "../pages/SignUp/SignUpPage";

class AuthService {
    async login(loginInputs: LoginInputs) {
        const response = await axios.post(`${apiUrl}auth/login`, loginInputs);

        console.log(response.data);
        return response.data;
    }

    async register(registerInputs: SignUpInputs) {
        const response = await axios.post(
            `${apiUrl}auth/register`,
            registerInputs
        );
        return response.data;
    }

    async logout() {
        try {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            return true;
        } catch (error) {
            console.error("Error logging out:", error);
        }
    }
}

export default new AuthService();
