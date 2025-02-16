// src/pages/CoursePageEdit/CoursePageEdit.tsx

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import courseService from "../../services/courseService";
import {
    AddModuleInputs,
    Course,
    Module,
    UpdateCourseInputs,
} from "../../interfaces/courseInterface";
import ModuleForm from "../../components/Course/courseModules/ModuleForm";
import ModulePreview from "../../components/Course/courseModules/ModulePreview";
import CourseEditor from "../../components/Course/CourseEditor";
import CourseDetails from "../../components/Course/CourseDetails";
import ModuleList from "../../components/Course/courseModules/ModuleList";
import { toast } from "react-toastify";
import { useHandleError } from "../../hooks/useHandleError";

const CoursePageEdit: React.FC = () => {
    const [course, setCourse] = useState<Course | null>(null);
    const [module, setModule] = useState<Module>({
        id: 0,
        courseId: course?.id || 0,
        title: "",
        contentType: "WEBLINK",
        order: course?.modules.length || 0,
        webLink: { id: "", moduleId: 0, url: "" },
    });

    const [currentModule, setCurrentModule] = useState<Module>(module);
    const [courseUpdate, setCourseUpdate] = useState<UpdateCourseInputs>({
        title: course?.title || "",
        description: course?.description || "",
        status: course?.status || "INACTIVE",
        id: course?.id || 0,
    });

    const handleError = useHandleError();

    const [timer, setTimer] = useState<number | null>(null);

    const [showForm, setShowForm] = useState(false);
    const { id } = useParams();

    const fetchCourse = async () => {
        try {
            const response = await courseService.getOneCourse(id as string);
            setCourse(response.course);
        } catch (error) {
            console.error(error);
            handleError(error);
        }
    };

    useEffect(() => {
        fetchCourse();
        if (course) {
            setCourseUpdate({
                title: course.title,
                description: course.description,
                status: course.status,
                id: course.id,
            });
        }
    }, [id, course]);

    const handleSelectModule = (module: Module) => {
        setModule({
            ...module,
            id: module.id,
            title: module.title,
            contentType: module.contentType,
            order: module.order,
        });

        setCurrentModule(module);
        setShowForm(true);
    };

    const handleSelectContentType = (e: ChangeEvent<HTMLSelectElement>) => {
        setModule({
            ...module,
            contentType: e.target.value,
        });
    };

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setModule((prevModule) => {
            let updatedModule = { ...prevModule, [name]: value };

            if (name === "contentType") {
                updatedModule = {
                    ...updatedModule,
                    webLink:
                        value === "WEBLINK"
                            ? { id: "", moduleId: prevModule.id, url: "" }
                            : undefined,
                    pdfContent:
                        value === "PDF"
                            ? {
                                  id: "",
                                  moduleId: prevModule.id,
                                  filePath: "",
                                  originalName: "",
                              }
                            : undefined,
                    videoContent:
                        value === "VIDEO"
                            ? { id: "", moduleId: prevModule.id, url: "" }
                            : undefined,
                };
            }

            if (name === "url") {
                if (prevModule.contentType === "WEBLINK") {
                    updatedModule = {
                        ...updatedModule,
                        webLink: { ...prevModule.webLink, url: value },
                    };
                } else if (prevModule.contentType === "VIDEO") {
                    updatedModule = {
                        ...updatedModule,
                        videoContent: {
                            ...prevModule.videoContent,
                            url: value,
                        },
                    };
                }
            }

            return updatedModule;
        });
    };

    // Submit module
    const handleSubmitModule = (e: FormEvent) => {
        e.preventDefault();

        const fileInput = (e.target as HTMLFormElement)
            .file as HTMLInputElement;

        let file;

        console.log(module, file);

        if (module.contentType === "PDF") {
            file = fileInput.files?.[0];
        }

        if (module.contentType === "PDF" && !file) {
            toast.info("Please select a file");
            return;
        }

        if (
            (module.contentType === "VIDEO" &&
                module.videoContent?.url == "") ||
            (module.contentType === "WEBLINK" && module.webLink?.url == "")
        ) {
            toast.info("URL is required");
            return;
        }

        if (!module.id) {
            // API CALL TO CREATE MODULE
            const newModule: AddModuleInputs = {
                courseId: course!.id,
                title: module.title,
                contentType: module.contentType,
                order: module.order,
                url: module.videoContent?.url || module.webLink?.url,
                file: file,
            };
            handleSubmitNewModule(newModule);
            console.log("API CALL TO CREATE MODULE");
        } else {
            // API CALL TO UPDATE MODULE
            console.log(module);
            console.log("API CALL TO UPDATE MODULE");
        }

        // const newModule = {
        //     courseId: course.id,
        //     title: module.title,
        //     contentType: module.contentType,
        //     order: module.order,
        //     ...(module.contentType === "WEBLINK" && {
        //         webLink: {
        //             moduleId: module.id || Date.now(),
        //             url,
        //         },
        //     }),
        //     ...(module.contentType === "PDF" && {
        //         pdfContent: {
        //             moduleId: module.id || Date.now(),
        //             filePath: module.file
        //                 ? URL.createObjectURL(module.file)
        //                 : "",
        //             originalName: module.file ? module.file.name : "",
        //         },
        //     }),
        //     ...(module.contentType === "VIDEO" && {
        //         videoContent: {
        //             moduleId: module.id || Date.now(),
        //             url: module.url,
        //         },
        //     }),
        // };

        // if (module.id) {
        //     const updatedModules = course.modules.map((m) =>
        //         m.id === module.id ? newModule : m
        //     );
        //     setCourse({ ...course, modules: updatedModules });
        // } else {
        //     setCourse({
        //         ...course,
        //         modules: [...course.modules, newModule],
        //     });
        // }

        // setModule({
        //     id: null,
        //     courseId: course.id,
        //     title: "",
        //     contentType: "WEBLINK",
        //     order: course.modules.length + 1,
        //     url: "",
        //     file: null,
        // });
    };

    // Update module
    const handleUpdateModule = (moduleId: number) => {};

    // Add new module
    const handleSubmitNewModule = async (data: AddModuleInputs) => {
        try {
            const response = await courseService.createModule(data);
            console.log(response);
            if (response) {
                console.log(response);
                fetchCourse();
            }
            toast.success("Module added successfully");
            setShowForm(false);
        } catch (error) {
            console.log(error);
            handleError(error);
        }
    };

    const handleRemoveModule = async (moduleId: number) => {
        try {
            const response = await courseService.deleteCourse(moduleId);
            if (response) {
                fetchCourse();
            }
            toast.success("Module deleted successfully");
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message || "An error occurred");
            } else {
                toast.error("An unexpected error occurred. Please try again.");
            }
        }
    };

    const handleCourseChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!course) return;
        const { name, value } = e.target;

        const updatedCourse = { ...courseUpdate, [name]: value };
        setCourseUpdate(updatedCourse);

        // Timer in 10 seconds check if update is different from course if yes
        // Triger API call
        if (timer) clearTimeout(timer);

        const newTimer = setTimeout(() => {
            console.log("timer");
            console.log(courseUpdate);
            checkAndUpdateCourse();
        }, 3000);

        setTimer(newTimer);
    };

    const checkAndUpdateCourse = () => {
        if (!course) return;
        const hasChanges = Object.keys(courseUpdate).some(
            (key) =>
                courseUpdate[key as keyof UpdateCourseInputs] !==
                course[key as keyof Course]
        );
        console.log(courseUpdate.title, course.title);
        console.log(hasChanges);

        if (hasChanges) {
            handleSubmitCouseChange();
        }
    };

    const handleSubmitCouseChange = async () => {
        toast.info("Updating course");
    };

    if (!course) {
        return <div>Loading...</div>;
    }

    return (
        <main className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <section className="bg-white border-b border-gray-200 p-4 overflow-y-auto">
                <CourseDetails course={course} />
                <button
                    onClick={() => {
                        setModule({
                            id: null ?? module.id,
                            courseId: course.id,
                            title: "",
                            contentType: "WEBLINK",
                            order: course.modules.length + 1,
                            url: "",
                            file: null,
                        });
                        setShowForm(true);
                    }}
                    className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition mb-4"
                >
                    Add Module
                </button>
                <ModuleList
                    modules={course.modules}
                    onSelectModule={handleSelectModule}
                    onRemoveModule={handleRemoveModule}
                />
            </section>

            {/* Main Content */}
            <section className="flex-1 p-4 overflow-y-auto">
                <CourseEditor
                    course={courseUpdate}
                    onCourseUpdate={handleCourseChange}
                />
                <ModulePreview module={currentModule} />
                {showForm && (
                    <ModuleForm
                        module={module}
                        onSubmit={handleSubmitModule}
                        onInputChange={handleInputChange}
                        onCancel={() => setShowForm(false)}
                    />
                )}
            </section>
        </main>
    );
};

export default CoursePageEdit;
