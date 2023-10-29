import React, {ReactNode} from "react";

interface myCardInterface {
    title: string,
    value: number,
    IconComponent?: ReactNode
}

export default function Card({ title, value, IconComponent }: myCardInterface ) {
    return (
        <div 
            className="container flex flex-col p-5 mt-2 border rounded-lg dark:border-black bg-gray-700 bg-opacity-10 hover:border-green-600 dark:hover:border-green-600">
            <div className="flex flex-row justify-between">
                <span className="font-bold">{title}</span>
                <span>{IconComponent}</span>
            </div>

            <div className="flex flex-row justify-center mt-5 text-3xl font-bold">
                R$ {value}
            </div>

        </div>
    );
}