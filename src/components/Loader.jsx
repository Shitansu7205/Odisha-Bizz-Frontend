
import React from "react";
import { LoaderIcon } from "lucide-react"; 

const Loader = () => {
    return (
        <div className="fixed inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center z-50">
            <LoaderIcon className="h-8 w-8 animate-spin text-gray-500" />
        </div>


    );
};

export default Loader;
