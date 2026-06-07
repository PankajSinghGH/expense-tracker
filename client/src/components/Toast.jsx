import { useEffect } from 'react';

const STYLES = {
    success: 'bg-green-900/90 text-green-300 border-green-700/50',
    error: 'bg-red-900/90 text-red-300 border-red-700/50',
};

const ICONS = {
    success: '✅',
    error: '❗️',
};

const Toast = ({ message, type = 'success', onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl border shadow-xl backdrop-blur-md text-sm font-medium ${STYLES[type]}`}>
            <span>{ICONS[type]}</span>
            <span>{message}</span>
            <button
                onClick={onClose}
                className="ml-2 opacity-60 hover:opacity-100 transition"
            >
                ✕
            </button>
        </div>
    );
};

export default Toast;