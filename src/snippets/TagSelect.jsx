import React, { useState, useRef } from 'react';

const TagSelect = ({ onChangeTags }) => {
    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null); // Ref for the input to focus

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && inputValue.trim()) {
            event.preventDefault(); // Prevent form submission
            if (!tags.includes(inputValue.trim())) { // Prevent duplicates
                const newTags = [...tags, inputValue.trim()];
                setTags(newTags);
                onChangeTags(newTags); // Notify parent component
                setInputValue('');
                inputRef.current.focus(); // Automatically focus input
            }
        } else if (event.key === 'Backspace' && !inputValue && tags.length) {
            // Remove the last tag on Backspace if input is empty
            const newTags = tags.slice(0, -1);
            setTags(newTags);
            onChangeTags(newTags);
        }
    };

    const handleTagRemove = (tagToRemove) => {
        const newTags = tags.filter(tag => tag !== tagToRemove);
        setTags(newTags);
        onChangeTags(newTags); // Notify parent component
    };

    return (
        <div className="flex mt-2 gap-2 border border-gray-600 flex-wrap items-center rounded-md shadow-sm p-2.5 px-3 dark:bg-gray-700">
            {tags.map((tag, index) => (
                <div
                    key={index}
                    className="flex text-sm py-1 font-medium items-center bg-black text-white rounded-full px-3"
                >
                    <span>{tag}</span>
                    <button
                        className="ml-2 text-white hover:text-white focus:outline-none"
                        onClick={() => handleTagRemove(tag)}
                        aria-label={`Remove tag ${tag}`}
                    >
                        &times;
                    </button>
                </div>
            ))}
            <input
                ref={inputRef} // Focus reference
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add a tag..."
                className="flex-1 text-sm border-none p-0 font-medium focus:ring-0 focus:outline-none dark:bg-gray-700 dark:text-white"
            />
        </div>
    );
};

export default TagSelect;
