import React, { useState, useEffect } from 'react';
import Uppy from '@uppy/core';
import Dashboard from '@uppy/dashboard';
import Compressor from '@uppy/compressor';
import Webcam from '@uppy/webcam';
import ScreenCapture from '@uppy/screen-capture';
import GoogleDrive from '@uppy/google-drive';
import GooglePhotos from '@uppy/google-photos';
import Unsplash from '@uppy/unsplash';
import XHR from '@uppy/xhr-upload';
import Url from '@uppy/url';
import ImageEditor from '@uppy/image-editor';
import StatusBar from '@uppy/status-bar';
import ProgressBar from '@uppy/progress-bar';
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import '@uppy/webcam/dist/style.min.css';
import '@uppy/screen-capture/dist/style.min.css';
import '@uppy/url/dist/style.min.css';
import '@uppy/image-editor/dist/style.min.css';
import '@uppy/status-bar/dist/style.min.css';


const FileUpload = ({ onFilesUpdate }) => {
    useEffect(() => {
      const uppy = new Uppy({
        restrictions: {
          maxNumberOfFiles: 5,
          allowedFileTypes: ['image/*', 'video/*', 'application/pdf'],
        },
        autoProceed: false, 
      });
  
      uppy.use(Dashboard, {
        inline: true, 
        target: '#uppy-dashboard', 
        replaceTargetContent: true,
        showProgressDetails: true, 
        hideUploadButton: false, 
        proudlyDisplayPoweredByUppy: false, 
        restrictions:true,
        height:720,
      }).use(Compressor).use(Webcam).use(ScreenCapture).use(GoogleDrive, { companionUrl: 'https://your-companion.com' }).use(GooglePhotos, {
      target: Dashboard,
      companionUrl: 'https://your-companion.com',
    }).use(Unsplash, { companionUrl: 'https://your-companion.com' }).use(Url, { companionUrl: 'https://your-companion.com' }).use(XHR, { endpoint: 'https://your-domain.com/upload' }).use(ImageEditor).use(ProgressBar, { target: '#status-bar' });

     uppy.on('file-added', (file) => {
        onFilesUpdate(uppy.getFiles());
      });
  
      uppy.on('file-removed', (file) => {
        onFilesUpdate(uppy.getFiles());
      });
      return () => uppy.destroy();
    }, []);
  
    return (
        <>
         <div id="uppy-dashboard" ></div>
         <div id="status-bar"></div>
        </>
    )

  };
  
  export default FileUpload;
  
    
    

