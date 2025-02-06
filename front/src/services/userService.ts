import axios from "axios";
import { handleError } from "./errorHandler";
const apiUrl = import.meta.env.VITE_API;

type AddLeanerInputs = {
    email: string;
    name: string;
    lastName: string;
};

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
            handleError(error);
        }
    }

    // ADMIN
}
export default new UserService();
