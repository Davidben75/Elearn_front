import { useForm } from "react-hook-form";
import { AddCourseInputs } from "../../interfaces/courseInterface";

interface AddCourseModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: AddCourseInputs) => void;
}

function AddCourseModal({ isOpen, onClose, onSubmit }: AddCourseModalProps) {
    const { register, handleSubmit, reset } = useForm<AddCourseInputs>({
        defaultValues: {
            title: "",
            description: "",
            status: "INACTIVE",
        },
    });

    const onFormSubmit = (data: AddCourseInputs) => {
        onSubmit(data);
        onClose();
        reset(); // Reset the form after submission
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
            id="my-modal"
        >
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3 text-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Add New Course
                    </h3>
                    <form
                        onSubmit={handleSubmit(onFormSubmit)}
                        className="mt-2 text-left"
                    >
                        <div className="mb-4">
                            <label
                                htmlFor="title"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Course Name
                            </label>
                            <input
                                type="text"
                                id="title"
                                {...register("title", { required: true })}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="description"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Description
                            </label>
                            <textarea
                                id="description"
                                {...register("description", { required: true })}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            ></textarea>
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Add Course
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddCourseModal;
