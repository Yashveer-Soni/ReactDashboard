import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const TextEditor = ({ onChange }) => {
    const [content, setContent] = useState('');

    useEffect(() => {
        // Get the saved content from localStorage and set it as the initial state
        const desc = localStorage.getItem("editorContent");
        if (desc) {
            setContent(desc);
        }
    }, []); // This effect runs only once when the component mounts

    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' },
            { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image', 'video'],
            ['clean']
        ],
        clipboard: {
            matchVisual: false,
        }
    };

    const handleChange = (value) => {
        setContent(value);
        onChange(value); // Call the onChange prop to pass the value up

        // Save the content to localStorage
        localStorage.setItem("editorContent", value);
    };

    return (
        <div>
            <ReactQuill
                theme='snow'
                formats={['header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image', 'video']}
                placeholder=""
                modules={modules}
                onChange={handleChange}
                value={content}
            />

            {/* Uncomment the following block if you want to show a preview of the content */}
            {/* <div>
                <h2 className="text-xl font-bold flex justify-center mt-8">Preview</h2>
                <div dangerouslySetInnerHTML={{ __html: content }}></div>
            </div> */}
        </div>
    );
};

export default TextEditor;
