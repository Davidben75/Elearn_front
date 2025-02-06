import { useState } from "react";

const CoursePageEdit = () => {
    const API_URL = "http://localhost:3000";
    // Course in BDD
    const [course, setCourse] = useState({
        id: 33,
        title: "Course 1",
        description: "About nothing",
        status: "INACTIVE",
        tutorId: 5,
        modules: [
            {
                id: 45,
                courseId: 33,
                title: "JS",
                contentType: "WEBLINK",
                order: 0,
                webLink: {
                    moduleId: 45,
                    url: "https://youtube.com",
                },
            },
            {
                id: 48,
                courseId: 33,
                title: "CSS",
                contentType: "PDF",
                order: 1,
                pdfContent: {
                    moduleId: 48,
                    filePath: "1738315602905-dummy.pdf",
                    originalName: "dummy.pdf",
                },
            },
            {
                id: 49,
                courseId: 33,
                title: "HTML",
                contentType: "VIDEO",
                order: 2,
                videoContent: {
                    moduleId: 49,
                    url: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Example YouTube embed URL
                },
            },
        ],
    });

    // State for adding/editing a module
    const [module, setModule] = useState({
        id: null, // Null for new modules, module.id for editing
        courseId: course.id,
        title: "",
        contentType: "WEBLINK",
        order: course.modules.length > 0 ? course.modules.length + 1 : 0,
        url: "",
        file: null, // For PDF file upload
    });

    // State to toggle form visibility
    const [showForm, setShowForm] = useState(false);

    // Handle selecting a module to edit
    const handleSelectModule = (module) => {
        setModule({
            ...module,
            id: module.id,
            title: module.title,
            contentType: module.contentType,
            url:
                module.contentType === "WEBLINK"
                    ? module.webLink.url
                    : module.contentType === "VIDEO"
                    ? module.videoContent.url
                    : "",
            file: null, // Reset file input when switching modules
        });
        setShowForm(true); // Show the form when a module is selected
    };

    // Handle content type change
    const handleSelectContentType = (e) => {
        setModule({
            ...module,
            contentType: e.target.value,
            url: "", // Reset URL when changing content type
            file: null, // Reset file input when changing content type
        });
    };

    // Handle input changes for title, URL, or file
    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setModule({
            ...module,
            [name]: name === "file" ? files[0] : value,
        });
    };

    // Handle form submission (add or update module)
    const handleSubmitModule = (e) => {
        e.preventDefault();

        const newModule = {
            id: module.id || Date.now(), // Use existing ID or generate a new one
            courseId: course.id,
            title: module.title,
            contentType: module.contentType,
            order: module.order,
            ...(module.contentType === "WEBLINK" && {
                webLink: {
                    moduleId: module.id || Date.now(),
                    url: module.url,
                },
            }),
            ...(module.contentType === "PDF" && {
                pdfContent: {
                    moduleId: module.id || Date.now(),
                    filePath: module.file
                        ? URL.createObjectURL(module.file)
                        : "",
                    originalName: module.file ? module.file.name : "",
                },
            }),
            ...(module.contentType === "VIDEO" && {
                videoContent: {
                    moduleId: module.id || Date.now(),
                    url: module.url,
                },
            }),
        };

        // Update or add the module
        if (module.id) {
            // Update existing module
            const updatedModules = course.modules.map((m) =>
                m.id === module.id ? newModule : m
            );
            setCourse({ ...course, modules: updatedModules });
        } else {
            // Add new module
            setCourse({ ...course, modules: [...course.modules, newModule] });
        }

        // Reset the form
        setModule({
            id: null,
            courseId: course.id,
            title: "",
            contentType: "WEBLINK",
            order: course.modules.length + 1,
            url: "",
            file: null,
        });
        setShowForm(false); // Hide the form after submission
    };

    // Handle module removal
    const handleRemoveModule = (moduleId) => {
        const updatedModules = course.modules.filter((m) => m.id !== moduleId);
        setCourse({ ...course, modules: updatedModules });
    };

    // Render content based on module type
    const renderModuleContent = (module) => {
        switch (module.contentType) {
            case "WEBLINK":
                return (
                    <iframe
                        src={module.webLink.url}
                        title={module.title}
                        className="w-full h-64 border rounded"
                        allowFullScreen
                    />
                );
            case "PDF":
                return (
                    <embed
                        src={`${API_URL}/course/files/${module.pdfContent.filePath}`}
                        type="application/pdf"
                        className="w-full h-screen border rounded"
                    />
                );
            case "VIDEO":
                return (
                    <iframe
                        src={module.videoContent.url}
                        title={module.title}
                        className="w-full h-screen border rounded"
                        allowFullScreen
                    />
                );
            default:
                return null;
        }
    };

    return (
        <main className="flex flex-col lg:flex-row h-screen bg-gray-100">
            {/* Sidebar */}
            <section className="w-full lg:w-1/4 bg-amber-100 p-4 lg:h-screen overflow-auto">
                {/* Course Details */}
                <article className="bg-amber-500 p-4 rounded-lg mb-4 text-white">
                    <h1 className="text-xl font-bold">{course.title}</h1>
                    <p>{course.description}</p>
                    <p className="text-sm mt-2">Status: {course.status}</p>
                </article>

                {/* Add Module Button */}
                <button
                    onClick={() => {
                        setModule({
                            id: null,
                            courseId: course.id,
                            title: "",
                            contentType: "WEBLINK",
                            order: course.modules.length + 1,
                            url: "",
                            file: null,
                        });
                        setShowForm(true); // Show the form when the button is clicked
                    }}
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition mb-4"
                >
                    Add Module
                </button>

                {/* Modules List */}
                <article className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-2">Modules</h2>
                    <ul className="space-y-2">
                        {course.modules.map((m) => (
                            <li
                                key={m.id}
                                className="p-2 border rounded shadow cursor-pointer hover:bg-gray-100"
                                onClick={() => handleSelectModule(m)}
                            >
                                <p className="font-medium">{m.title}</p>
                                <button
                                    className="text-red-500 text-sm mt-1"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent li onClick from firing
                                        handleRemoveModule(m.id);
                                    }}
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                </article>
            </section>

            {/* Editor for Course */}
            <section className="flex flex-col lg:h-screen overflow-auto w-full">
                <article className="bg-blue-950 text-white p-4">
                    <form className="space-y-4">
                        <label htmlFor="title" className="block">
                            <span className="block text-sm font-medium">
                                Title
                            </span>
                            <input
                                className="w-full p-2 border rounded bg-blue-900 text-white"
                                type="text"
                                name="title"
                                value={course.title}
                                onChange={(e) =>
                                    setCourse({
                                        ...course,
                                        title: e.target.value,
                                    })
                                }
                            />
                        </label>

                        <label htmlFor="description" className="block">
                            <span className="block text-sm font-medium">
                                Description
                            </span>
                            <input
                                className="w-full p-2 border rounded bg-blue-900 text-white"
                                type="text"
                                name="description"
                                value={course.description}
                                onChange={(e) =>
                                    setCourse({
                                        ...course,
                                        description: e.target.value,
                                    })
                                }
                            />
                        </label>
                    </form>
                </article>

                {/* Module Content Preview */}
                <article className="p-4">
                    <h2 className="text-lg font-semibold mb-2">
                        {module.title}
                    </h2>
                    {module.id ? (
                        <>
                            {renderModuleContent(module)}
                            <button
                                onClick={() => setShowForm(true)}
                                className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                            >
                                Update Module
                            </button>
                        </>
                    ) : (
                        <p className="text-gray-500">
                            Select a module to preview its content.
                        </p>
                    )}
                </article>

                {/* Module Form */}
                {showForm && (
                    <article className="p-4 bg-white rounded-lg shadow mt-4">
                        <h2 className="text-lg font-semibold mb-2">
                            {module.id ? "Edit Module" : "Add Module"}
                        </h2>
                        <form
                            className="space-y-4"
                            onSubmit={handleSubmitModule}
                        >
                            <input
                                type="text"
                                name="title"
                                placeholder="Module Title"
                                className="w-full p-2 border rounded"
                                value={module.title}
                                onChange={handleInputChange}
                            />
                            <select
                                name="contentType"
                                onChange={handleSelectContentType}
                                className="w-full p-2 border rounded"
                                value={module.contentType}
                            >
                                <option value="WEBLINK">WebLink</option>
                                <option value="PDF">PDF</option>
                                <option value="VIDEO">Video</option>
                            </select>
                            {module.contentType === "WEBLINK" ||
                            module.contentType === "VIDEO" ? (
                                <input
                                    type="text"
                                    name="url"
                                    placeholder="URL"
                                    className="w-full p-2 border rounded"
                                    value={module.url}
                                    onChange={handleInputChange}
                                />
                            ) : null}
                            {module.contentType === "PDF" && (
                                <input
                                    type="file"
                                    name="file"
                                    className="w-full p-2 border rounded"
                                    onChange={handleInputChange}
                                />
                            )}
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                            >
                                {module.id ? "Update Module" : "Add Module"}
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition"
                            >
                                Cancel
                            </button>
                        </form>
                    </article>
                )}
            </section>
        </main>
    );
};

export default CoursePageEdit;
