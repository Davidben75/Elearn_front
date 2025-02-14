export interface Course {
    id: number;
    title: string;
    description: string;
    status: string;
    tutorId: number;
    created: string;
    updatedAt: string;
    modules: Module[];
}

export interface Courses {
    id: number;
    title: string;
    description: string;
    status: string;
    tutorId: number;
    createdAt: string;
    updatedAt: string;
}

export interface Module {
    id: number;
    courseId: number;
    title: string;
    contentType: string;
    order: number;
    webLink?: { id: string; moduleId: number; url: string };
    pdfContent?: {
        id: string;
        moduleId: number;
        filePath: string;
        originalName: string;
    };
    videoContent?: { id: string; moduleId: number; url: string };
}

export interface AddModuleInputs {
    courseId: number;
    title: string;
    contentType: string;
    order: number;
    url?: string;
    file?: File;
}

export interface AddCourseInputs {
    title: string;
    description: string;
    status: string;
}

export interface UpdateCourseInputs {
    id: number;
    title: string;
    description: string;
    status: string;
}
