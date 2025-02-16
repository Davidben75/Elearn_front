import axios from "axios";
import { PasswordsInputs } from "../interfaces/userInterface";
const apiUrl = import.meta.env.VITE_API;

type AddLeanerInputs = {
    email: string;
    name: string;
    lastName: string;
};

type UpdateUserInputs = {
    email: string;
    name: string;
    lastName: string;
};

class UserService {
    // COMMON
    async updateUser(inputs: UpdateUserInputs) {
        const response = await axios.patch(
            `${apiUrl}user/update-info`,
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
    }

    async changePassword(inputs: PasswordsInputs) {
        const response = await axios.patch(
            `${apiUrl}user/update-password`,
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
    }
    // TUTOR
    // - Add Learner
    async addLeaner(inputs: AddLeanerInputs) {
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
    }

    // - View all learners
    async getTutorCurrentLearners() {
        const response = await axios.get(`${apiUrl}collaboration/tutor`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(
                    localStorage.getItem("token") as string
                )}`,
            },
        });

        console.log(response.data);
        return response.data;
    }

    // ADMIN
}
export default new UserService();
