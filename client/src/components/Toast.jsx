import { useEffect } from 'react';

const STYLES = {
    success: 'bg-green-100 text-green-700 border-green-200',
    error: 'bg-red-100 text-red-700 border-red-200',
};

const ICONS = {
    success: '✅',
    error: '❌',
};

const Toast = ({ message, type = 'success', onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg border shadow-md text-sm font-medium ${STYLES[type]}`}>
            <span>{ICONS[type]}</span>
            <span>{message}</span>
            <button
                onClick={onClose}
                className="ml-2 opacity-60 hover:opacity-100"
            >
                ✕
            </button>
        </div>
    );
};

export default Toast;