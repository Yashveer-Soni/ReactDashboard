import {React, useEffect, useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Error=()=>{
    const defaulterror = () => toast("This is a toast notification !");
    const notifydanger = () => toast.error("This is a toast notification !");
    const notifyinfo = () => toast.info("This is a toast notification !");
    const notifysuccess = () => toast.success("This is a toast notification !");
    const notifywarning = () => toast.warning("This is a toast notification !");


    return (
        <>
        <div className="cards">
            <div>
                <button onClick={defaulterror}>Default Notify !</button>
                <ToastContainer />
            </div>
            <div>
                <button onClick={notifydanger}>danger Notify !</button>
                <ToastContainer />
            </div>
            <div>
                <button onClick={notifyinfo}>Info Notify !</button>
                <ToastContainer />
            </div>
            <div>
                <button onClick={notifysuccess}>success Notify !</button>
                <ToastContainer />
            </div>
            <div>
                <button onClick={notifywarning}>warning Notify !</button>
                <ToastContainer />
            </div>
        </div>
        </>
    )
}
export default Error