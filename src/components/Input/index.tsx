import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Input() {
    return(
        <div className=" m-2 flex justify-center items-center h-24">
            <input type="text" className="w-1/2 h-12 border-none focus:outline-none rounded-md bg-gray-700 bg-opacity-10 placeholder-center pl-4" placeholder="Procurar"/>
            <FontAwesomeIcon icon={faMagnifyingGlass}  className="ml-5" />
        </div>
    );
}