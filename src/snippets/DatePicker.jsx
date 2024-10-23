import React from 'react';
import { Datepicker } from "flowbite-react";

const DatePickerComponent = ({ value, onChange }) => {
    return (
        <div className="flex flex-col mt-2 items-center">
            <Datepicker
                className="w-full datepicker font-medium"
                selected={value} // Use the value prop
                onChange={onChange} // Use the onChange prop
                todayButton="Today"
                placeholder="Choose a date"
                dateFormat="MM/dd/yyyy"
            />
        </div>
    );
};

export default DatePickerComponent;
