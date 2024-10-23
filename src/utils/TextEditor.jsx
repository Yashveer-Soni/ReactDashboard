import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const TextEditor = ({ onChange }) => {
    const [content, setContent] = useState('');

    useEffect(() => {
        const desc = localStorage.getItem("editorContent");
        if (desc) {
            setContent(desc);
        }
    }, []);

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
        onChange(value); 

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
                className='bg-white rounded-[10px] text-black '
            />
        </div>
    );
};

export default TextEditor;
