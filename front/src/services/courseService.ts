import axios from "axios";
import { AddModuleInputs } from "../interfaces/courseInterface";
import { EnrollmentInputs } from "../interfaces/enrollmentInterface";

const apiUrl = import.meta.env.VITE_API;

type CourseInput = {
    title: string;
    description: string;
    status: string;
};

class CourseService {
    async getTutorCourses() {
        const response = await axios.get(`${apiUrl}course/tutor`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(
                    localStorage.getItem("token") as string
                )}`,
            },
        });

        console.log(response.data);

        return response.data;
    }

    async getOneCourse(id: string) {
        const response = await axios.get(`${apiUrl}course/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(
                    localStorage.getItem("token") as string
                )}`,
            },
        });

        return response.data;
    }

    async createCourse(inputs: CourseInput) {
        const response = await axios.post(`${apiUrl}course/create`, inputs, {
            headers: {
                Authorization: `Bearer ${JSON.parse(
                    localStorage.getItem("token") as string
                )}`,
            },
        });

        console.log(response.data);
        return response.data;
    }

    async createModule(inputs: AddModuleInputs) {
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
                    Authorization: `Bearer ${JSON.parse(
                        localStorage.getItem("token") as string
                    )}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        console.log(response.data);
        return response.data;
    }

    async deletModule(moduleId: number) {
        const response = await axios.delete(
            `${apiUrl}course/delete-module/${moduleId}`,
            {
                headers: {
                    Authorization: `Bearer ${JSON.parse(
                        localStorage.getItem("token") as string
                    )}`,
                },
            }
        );
        return response.data;
    }

    async getUnenrolledLearners(id: string) {
        const response = await axios.get(
            `${apiUrl}enrollment/unenrolled-learners/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${JSON.parse(
                        localStorage.getItem("token") as string
                    )}`,
                },
            }
        );

        return response.data;
    }

    async getEnrolledLearners(id: string) {
        const response = await axios.get(
            `${apiUrl}enrollment/enrolled-learners/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${JSON.parse(
                        localStorage.getItem("token") as string
                    )}`,
                },
            }
        );

        return response.data;
    }

    async enrollLearnersToCourse(inputs: EnrollmentInputs) {
        const response = await axios.post(
            `${apiUrl}enrollment/add-learners`,
            inputs,
            {
                headers: {
                    Authorization: `Bearer ${JSON.parse(
                        localStorage.getItem("token") as string
                    )}`,
                },
            }
        );

        return response.data;
    }

    async deleteCourse() {}

    async updateModule() {}

    async updateCourse() {}
}

export default new CourseService();
