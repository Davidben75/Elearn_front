import axios from "axios";
import { headersAuthorization } from "./headers";
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
    async updateUser(
        inputs: UpdateUserInputs,
        handleError: (error: unknown) => void
    ) {
        try {
            const response = await axios.patch(
                `${apiUrl}user/update-info`,
                inputs,
                {
                    headers: {
                        Authorization: headersAuthorization,
                    },
                }
            );
            console.log(response.data);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    }

    // TUTOR
    // - Add Learner
    async addLeaner(
        inputs: AddLeanerInputs,
        handleError: (error: unknown) => void
    ) {
        try {
            const response = await axios.post(
                `${apiUrl}user/tutor/add-learner`,
                inputs,
                {
                    headers: {
                        Authorization: headersAuthorization,
                    },
                }
            );

            console.log(response.data);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    }

    // - View all learners
    async getTutorCurrentLearners(handleError: (error: unknown) => void) {
        try {
            const response = await axios.get(`${apiUrl}collaboration/tutor`, {
                headers: {
                    Authorization: headersAuthorization,
                },
            });

            console.log(response.data);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    }

    // ADMIN
}
export default new UserService();
