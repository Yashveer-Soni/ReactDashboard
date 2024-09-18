import {React, useState} from "react";
import Model_Orders from "../snippets/Model_Orders";

const Order = () => {
    const [modelopen, setmodelopen]=useState(false);
    
    const openModel=()=>{
        setmodelopen(true);
    }
    const closemodel=()=>{
        setmodelopen(false);
    }
    return (
        <>
            <Model_Orders isOpen={modelopen} onClose={closemodel} />
            <div className="overallinventory">
                <div className="headline">
                    <h3 style={{ margin: 0 }}>Overall Orders</h3>
                </div>
                <div className="overallinventoryitem">
                    <div className="categories flex tpborder">
                        <h4 style={{ margin: 0, color: "#1570EF" }}>Total Orders</h4>
                        <h5>14</h5>
                        <span className="desctitle">Last 7 days</span>
                    </div>
                    <div className="totalproduct tpborder">
                        <h4 style={{ margin: 0, color: "#E19133" }}>Total Received</h4>
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
                        <h4 style={{ color: "#845EBC", margin: 0 }}>Total Returned</h4>
                        <div className="tspace flex3">
                            <div className="tspace1">
                                <h4>5</h4>
                                <span className="desctitle">Last 7 days</span>
                            </div>
                            <div className="tspace2" style={{ textAlign: "right" }}>
                                <h4>₹2500</h4>
                                <span className="desctitle">Cost</span>
                            </div>
                        </div>
                    </div>
                    <div className="lowstock">
                        <h4 style={{ color: "#F36960", margin: 0 }}>On the way</h4>
                        <div className="tspace flex3">
                            <div className="tspace1">
                                <h4>12</h4>
                                <span className="desctitle">Ordered</span>
                            </div>
                            <div className="tspace2">
                                <h4 style={{ textAlign: "right" }}>2</h4>
                                <span className="desctitle">Cost</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="stocktables">
                <div className="topsellingstock">
                    <div className="">
                        <div className="headline flex3">
                            <h3>Orders</h3>
                            <div>
                                <button className="btn" id="addbutton3" type="button" onClick={openModel} style={{ backgroundColor: "#1366D9", color: "white", border: "none" }}>Add Order</button>
                                <button className="btn" type="button"><img src="{% static '/icons/filtericon.svg' %}" alt=""/> Filters</button>
                                <button className="btn" type="button">Download all</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <table>
                            <thead>
                                <tr style={{ borderTop: "transparent" }}>
                                    <th>Products</th>
                                    <th>Order Value</th>
                                    <th>Quantity</th>
                                    <th>Order ID</th>
                                    <th>Expected Delivery</th>
                                    <th>Status </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ borderTop: "1px solid #F0F1F3" }}>
                                    <td>Maggi</td>
                                    <td>₹4306</td>
                                    <td>43 Packets</td>
                                    <td>7535</td>
                                    <td>11/12/22</td>
                                    <td style={{ color: "#F79009" }}>Delayed</td>
                                </tr>
                                <tr style={{ borderTop: "1px solid #F0F1F3" }}>
                                    <td>Maggi</td>
                                    <td>₹4306</td>
                                    <td>43 Packets</td>
                                    <td>7535</td>
                                    <td>11/12/22</td>
                                    <td style={{ color: "#1570EF" }}>Confirmed</td>
                                </tr>
                                <tr style={{ borderTop: "1px solid #F0F1F3" }}>
                                    <td>Maggi</td>
                                    <td>₹4306</td>
                                    <td>43 Packets</td>
                                    <td>7535</td>
                                    <td>11/12/22</td>
                                    <td style={{ color: "#667085" }}>Returned</td>
                                </tr>
                                <tr style={{ borderTop: "1px solid #F0F1F3" }}>
                                    <td>Maggi</td>
                                    <td>₹4306</td>
                                    <td>43 Packets</td>
                                    <td>7535</td>
                                    <td>11/12/22</td>
                                    <td style={{ color: "#12B76A" }}>Out of delivery</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="prenextbtn flex3">
                            <button className="btn" type="button">Previous</button>
                            <h4>Page 1 of 10</h4>
                            <button className="btn" type="button">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Order;
