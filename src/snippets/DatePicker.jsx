import React, { useEffect, useRef, useState } from 'react';
import { Datepicker } from "flowbite-react";

const DatePickerComponent = () => {
    const datepickerRef = useRef(null); // Reference to the datepicker element
    const [selectedDate, setSelectedDate] = useState('');


    return (
        <div className="flex flex-col items-center">
           <Datepicker />
        </div>
    );
};

export default DatePickerComponent;
