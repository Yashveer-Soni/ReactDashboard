import React, { useEffect, useState } from 'react';

const MultiSelect = ({  onChangeSelections }) => {
    const [collections, setCollections] = useState([
        'Collection 1', 
        'Collection 2', 
        'Collection 3', 
        'Collection 4', 
        'Collection 5', 
        'Collection 6'
    ]);
    const [selectedCollections, setSelectedCollections] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [filteredCollections, setFilteredCollections] = useState(collections);

    useEffect(() => {
        // Filter collections based on the input value
        setFilteredCollections(
            collections.filter(
                (collection) =>
                    collection.toLowerCase().includes(inputValue.toLowerCase()) &&
                    !selectedCollections.includes(collection)
            )
        );
    }, [inputValue, collections, selectedCollections]);

    const handleSelect = (collection) => {
        if (!selectedCollections.includes(collection)) {
            const newSelections = [...selectedCollections, collection];
            setSelectedCollections(newSelections);
            setInputValue(''); // Clear input after selection
            onChangeSelections(newSelections); // Pass selections to parent component
        }
    };

    const handleRemove = (collectionToRemove) => {
        const newSelections = selectedCollections.filter(
            (collection) => collection !== collectionToRemove
        );
        setSelectedCollections(newSelections);
        onChangeSelections(newSelections);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && inputValue && filteredCollections.length) {
            event.preventDefault();
            handleSelect(filteredCollections[0]); // Select the first filtered option
        }
    };

    return (
        <div className="flex flex-col gap-2 mt-2">
            <div className="flex gap-2 border border-gray-600 flex-wrap items-center rounded-md shadow-sm p-2.5 px-3 dark:bg-gray-700">
                {selectedCollections.map((collection, index) => (
                    <div
                        key={index}
                        className="flex text-sm py-1 font-medium items-center bg-black text-white rounded-full px-3"
                    >
                        <span>{collection}</span>
                        <button
                            className="ml-2 text-white hover:text-white"
                            onClick={() => handleRemove(collection)}
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
                    placeholder="Select collections..."
                    className="flex-1 text-sm border-none p-0 font-medium focus:ring-0 focus:outline-none dark:bg-gray-700 dark:text-white"
                />
            </div>
            {inputValue && filteredCollections.length > 0 && (
                <ul className="border border-gray-300 rounded-md shadow-md bg-white max-h-40 overflow-y-auto dark:bg-gray-700 dark:border-gray-600">
                    {filteredCollections.map((collection, index) => (
                        <li
                            key={index}
                            className="font-medium text-sm cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-600"
                            onClick={() => handleSelect(collection)}
                        >
                            {collection}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MultiSelect;
