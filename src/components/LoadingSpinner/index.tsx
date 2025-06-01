import React from 'react';

export const LoadingSpinner = () => {
    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-40">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600"></div>
        </div>
    );
};