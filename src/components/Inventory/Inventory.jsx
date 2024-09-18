import { React, useState } from "react";
import ModelInventory from "../../snippets/Model_Inventory";
import ShowInventoryProductsList from "./ShowInventoryProductsList";
import {  NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Inventory = () => {
    const [modelopen, setmodelopen] = useState(false);

    const openModel = () => {
        setmodelopen(true);
    }

    const closemodel = () => {
        setmodelopen(false);
    }

    return (
        <>
        <ToastContainer />
            <ModelInventory isOpen={modelopen} onClose={closemodel} />
            <div className="overall">
                <div className="overallinventory">
                    <div className="headline">
                        <h3 style={{ margin: '0px' }}>Overall Inventory</h3>
                    </div>
                    <div className="overallinventoryitem">
                        <NavLink to="/Inventory/Categories" className="categories flex tpborder">
                            <h4 style={{ margin: '0', color: '#1570EF' }}>Categories</h4>
                            <h5>14</h5>
                            <span className="desctitle">Last 7 days</span>
                        </NavLink>
                        <div className="totalproduct tpborder">
                            <h4 style={{ margin: '0', color: '#E19133' }}>Total Products</h4>
                            <div className="tspace flex3">
                                <div className="tspace1">
                                    <h4>868</h4>
                                    <span className="desctitle">Last 7 days</span>
                                </div>
                                <div className="tspace2">
                                    <h4>₹25000</h4>
                                    <span className="desctitle">Revenue</span>
                                </div>
                            </div>
                        </div>
                        <div className="topselling tpborder">
                            <h4 style={{ color: '#845EBC', margin: '0' }}>Top Selling</h4>
                            <div className="tspace flex3">
                                <div className="tspace1">
                                    <h4>5</h4>
                                    <span className="desctitle">Last 7 days</span>
                                </div>
                                <div className="tspace2" style={{ textAlign: 'right' }}>
                                    <h4>₹2500</h4>
                                    <span className="desctitle">Cost</span>
                                </div>
                            </div>
                        </div>
                        <div className="lowstock">
                            <h4 style={{ color: '#F36960', margin: '0' }}>Low Stocks</h4>
                            <div className="tspace flex3">
                                <div className="tspace1">
                                    <h4>12</h4>
                                    <span className="desctitle">Ordered</span>
                                </div>
                                <div className="tspace2">
                                    <h4 style={{ textAlign: 'right' }}>2</h4>
                                    <span className="desctitle">Not in stock</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    <ShowInventoryProductsList openModel={openModel} />
            </div>
        </>
    )
}

export default Inventory;
