import { useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';



const TextEditor = () => {

    //state to handle the changes in text editor
    const [content, setContent] = useState('')
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
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        }
    };

    return (
        <div>
            <ReactQuill
                theme='snow'
                formats={['header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image', 'video']}
                placeholder=""
                modules={modules}
                onChange={setContent}
                value={content}
            />

            {/* <div>
                <h2 className="text-xl font-bold flex justify-center mt-8">Preview</h2>
                <div dangerouslySetInnerHTML={{ __html: content }}></div>
            </div> */}
        </div>
    );
};

export default TextEditor;