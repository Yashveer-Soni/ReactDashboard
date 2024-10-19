// import React, { useState, useEffect } from 'react';
// import { FilePond, registerPlugin } from 'react-filepond';
// import 'filepond/dist/filepond.min.css';
// import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

// // Import FilePond plugins
// import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
// import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
// import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
// import FilePondPluginImageResize from 'filepond-plugin-image-resize';
// import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
// import FilePondPluginImageTransform from 'filepond-plugin-image-transform';

// // Register the plugins
// registerPlugin(
//     FilePondPluginImagePreview,
//     FilePondPluginImageExifOrientation,
//     FilePondPluginImageCrop,
//     FilePondPluginImageResize,
//     FilePondPluginFileValidateType,
//     FilePondPluginImageTransform
// );

// function FileUpload({ onFilesUpdate, files }) {
//     const [pondFiles, setPondFiles] = useState([]);

//     useEffect(() => {
//         if (files && Array.isArray(files.images)) {
//             const newFiles = files.images.map(file => ({
//                 source: file.image, // Assuming file.image is the URL
//                 options: {
//                     type: 'remote' // Indicate that it's a remote URL
//                 }
//             }));
    
//             setPondFiles(newFiles);
//         } else {
//             console.error('Files prop is missing or images array is not available:', files);
//             setPondFiles([]); // Reset to empty array if files are missing
//         }
//     }, [files]);
    
    
    
//     return (
//         <div className="fileupload">
//            <FilePond
//                 files={pondFiles}
//                 allowMultiple={true}
//                 maxFiles={10}
//                 onupdatefiles={(fileItems) => {
//                     const updatedFiles = fileItems.map(fileItem => ({
//                         source: fileItem.file,
//                         options: {
//                             type: 'local'
//                         }
//                     }));
//                     setPondFiles(updatedFiles);
//                     onFilesUpdate(updatedFiles.map(file => file.source)); // Pass the files to parent component
//                 }}
//                 allowFileTypeValidation={true}
//                 acceptedFileTypes={['image/*', 'video/*']}
//                 labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
//                 imagePreviewHeight={300}
//                 imageCropAspectRatio='2:2'
//                 imageResizeTargetWidth={300}
//                 imageResizeTargetHeight={300}
//                 server={null} // Set to null, as we're uploading manually via axios
//                 name="file"
//             />

//         </div>
//     );
// }

// export default FileUpload;
