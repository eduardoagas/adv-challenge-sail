function Modal({ children, closeModal }: { children: React.ReactNode; closeModal: () => void }) {
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm dark:shadow-lg p-4 w-full max-w-md">
                <button
                    onClick={closeModal}
                    className="text-gray-600 hover:text-gray-900 absolute top-2 right-2"
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
}

export default Modal;