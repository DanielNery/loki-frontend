import React from "react";

interface DateFilterProps {
    setStartDate: (date: string) => void;
    setEndDate: (date: string) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ setStartDate, setEndDate }) => {
    return (
        <div className="flex justify-center my-4">
            <div className="flex flex-col mx-2">
                <input
                    type="date"
                    id="start-date"
                    className="p-2 border rounded bg-gray-800 text-white"
                    onChange={(e) => setStartDate(new Date(e.target.value).toISOString())}
                />
            </div>
            <div className="flex flex-col mx-2">
                <input
                    type="date"
                    id="end-date"
                    className="p-2 border rounded bg-gray-800 text-white"
                    onChange={(e) => setEndDate(new Date(e.target.value).toISOString())}
                />
            </div>
        </div>
    );
};

export default DateFilter;