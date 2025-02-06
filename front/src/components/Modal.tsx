const Modal = ({ children, onClose }) => {
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-1/3 p-6 relative">
                <button
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                    onClick={onClose}
                >
                    ✕
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
