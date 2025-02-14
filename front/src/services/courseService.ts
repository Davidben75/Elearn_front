import axios from "axios";
import { headersAuthorization } from "./headers";
import { AddModuleInputs } from "../interfaces/courseInterface";

const apiUrl = import.meta.env.VITE_API;

type CourseInput = {
    title: string;
    description: string;
    status: string;
};

class CourseService {
    async getTutorCourses(handleError: (error: unknown) => void) {
        try {
            const response = await axios.get(`${apiUrl}course/tutor`, {
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

    async getOneCourse(id: string, handleError: (error: unknown) => void) {
        try {
            const response = await axios.get(`${apiUrl}course/${id}`, {
                headers: {
                    Authorization: headersAuthorization,
                },
            });

            return response.data;
        } catch (error) {
            handleError(error);
        }
    }

    async createCourse(
        inputs: CourseInput,
        handleError: (error: unknown) => void
    ) {
        try {
            const response = await axios.post(
                `${apiUrl}course/create`,
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

    async createModule(
        inputs: AddModuleInputs,
        handleError: (error: unknown) => void
    ) {
        try {
            const formData = new FormData();

            formData.append("courseId", inputs.courseId.toString());
            formData.append("title", inputs.title);
            formData.append("contentType", inputs.contentType);
            formData.append("order", inputs.order.toString());
            if (inputs.url) {
                formData.append("url", inputs.url);
            }
            if (inputs.file) {
                formData.append("file", inputs.file);
            }
            const response = await axios.post(
                `${apiUrl}course/add-module`,
                formData,
                {
                    headers: {
                        Authorization: headersAuthorization,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log(response.data);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    }

    async deleteCourse(
        moduleId: number,
        handleError: (error: unknown) => void
    ) {
        try {
            const response = await axios.delete(
                `${apiUrl}course/delete-module/${moduleId}`,
                {
                    headers: {
                        Authorization: headersAuthorization,
                    },
                }
            );
            return response.data;
        } catch (error) {
            handleError(error);
        }
    }

    async deletModule() {}

    async updateModule() {}

    async updateCourse() {}
}

export default new CourseService();
