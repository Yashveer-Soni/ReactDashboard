import React, { useState } from 'react';

const TagSelect = ({onChangeTags}) => {
    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && inputValue) {
            event.preventDefault(); // Prevent form submission
            if (!tags.includes(inputValue)) { // Prevent duplicates
                setTags([...tags, inputValue]);
                setInputValue('');
            }
        } else if (event.key === 'Backspace' && !inputValue && tags.length) {
            setTags(tags.slice(0, -1));
        }
    };

    const handleTagRemove = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    return (
        <div className="flex mt-2 gap-2 border border-gray-600 flex-wrap items-center  rounded-md shadow-sm p-2.5 px-3 dark:bg-gray-700">
            {tags.map((tag, index) => (
                <div
                    key={index}
                    className="flex text-sm py-1 font-medium items-center bg-black text-white rounded-full  px-3"
                >
                    <span>{tag}</span>
                    <button
                        className="ml-2 text-white hover:text-white"
                        onClick={() => handleTagRemove(tag)}
                    >
                        &times;
                    </button>
                </div>
            ))}
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add a tag..."
                className="flex-1 text-sm  border-none p-0 font-medium focus:ring-0 focus:outline-none dark:bg-gray-700 dark:text-white"
            />
        </div>
    );
};

export default TagSelect;
