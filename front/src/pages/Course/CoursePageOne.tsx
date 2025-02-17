import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Course, Module } from "../../interfaces/courseInterface";
import { useHandleError } from "../../hooks/useHandleError";
import courseService from "../../services/courseService";
import { FaFilePdf, FaLink, FaVideo } from "react-icons/fa";
import ModulePreview from "../../components/Course/courseModules/ModulePreview";

const CoursePageOne = () => {
    const { id } = useParams();
    const handleError = useHandleError();
    const [course, setCourse] = useState<Course | null>();
    const [module, setModule] = useState<Module>({
        id: 0,
        courseId: course?.id || 0,
        title: "",
        contentType: "WEBLINK",
        order: course?.modules.length || 0,
        webLink: { id: "", moduleId: 0, url: "" },
    });

    const fetchOnecoure = async () => {
        try {
            const response = await courseService.getOneCourse(id as string);
            if (response) {
                setCourse(response.course);
            }
        } catch (error) {
            handleError(error);
        }
    };

    useEffect(() => {
        fetchOnecoure();
    }, []);

    const handleSelectModule = (module: Module) => {
        setModule({
            ...module,
            id: module.id,
            title: module.title,
            contentType: module.contentType,
            order: module.order,
        });
    };

    const getContentTypeIcon = (contentType: string) => {
        switch (contentType) {
            case "WEBLINK":
                return <FaLink />;
            case "PDF":
                return <FaFilePdf />;
            case "VIDEO":
                return <FaVideo />;
            default:
                return "📝";
        }
    };

    if (!course) {
        return <>Loading</>;
    }
    return (
        <main className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <section className="bg-white border-b border-gray-200 p-4 overflow-y-auto">
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <h1 className="text-xl font-bold text-blue-800">
                        {course.title}
                    </h1>
                    <p className="text-sm text-gray-600 mt-2">
                        {course.description}
                    </p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        Modules
                    </h2>
                    <ul className="space-y-2">
                        {course.modules.map((m) => (
                            <li
                                key={m.id}
                                className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition"
                                onClick={() => handleSelectModule(m)}
                            >
                                {getContentTypeIcon(m.contentType)}
                                <p className="font-medium text-gray-800">
                                    {m.title}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Main Content */}
            <section className="flex-1 h-screen p-4 overflow-y-auto">
                <ModulePreview module={module} />
            </section>
        </main>
    );
};

export default CoursePageOne;
