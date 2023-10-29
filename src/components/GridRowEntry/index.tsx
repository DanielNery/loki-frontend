import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpWideShort } from "@fortawesome/free-solid-svg-icons";
import { faArrowDownWideShort } from "@fortawesome/free-solid-svg-icons";
import { faMoneyBillTransfer } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface myGridPropsInterface {
    title: string,
    value: number,
    type: string,
}

export default function GridRowEntry({title, value, type}: myGridPropsInterface){

    return (
        <div className=" mt-5 border dark:border-black hover:bg-gray-700 hover:bg-opacity-10  hover:border-green-600 dark:hover:border-green-600 ">
            <div className="grid grid-cols-4 m-5">
                <span>{title}</span>
                <span>{value}</span>
                {
                    type == "income" ? <span><FontAwesomeIcon icon={faArrowUpWideShort} /></span> : <span><FontAwesomeIcon icon={faArrowDownWideShort} className="text-red-600" /></span> 
                }
                <div className="flex flex-row justify-end">
                    <FontAwesomeIcon icon={faTrash} />
                </div>
                

            </div>
        </div>
    );

}