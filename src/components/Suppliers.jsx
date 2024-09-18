import {React, useState} from "react";
import Model_Supplier from "../snippets/Model_Supplier";
const Suppliers = () => {
    const [modelopen, setmodelopen]=useState(false);
    
    const openModel=()=>{
        setmodelopen(true);
    }
    const closemodel=()=>{
        setmodelopen(false);
    }
    return (
        <>
            <Model_Supplier isOpen={modelopen} onClose={closemodel} />
            <div className="stocktables">
                <div className="topsellingstock">
                    <div className="">
                        <div className="headline flex3">
                            <h3>Suppliers</h3>
                            <div>
                                <button className="btn" id="addbutton2" type="button" onClick={openModel} style={{ backgroundColor: "#1366D9", color: "white", border: "none" }}>Add Supplier</button>
                                <button className="btn" type="button"><img src="{% static '/icons/filtericon.svg' %}" alt=""/> Filters</button>
                                <button className="btn" type="button">Download all</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <table>
                            <thead>
                                <tr style={{ borderTop: "transparent" }}>
                                    <th>Supplier Name</th>
                                    <th>Product</th>
                                    <th>Contact Number</th>
                                    <th>Email</th>
                                    <th>Type</th>
                                    <th>On the way</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ borderTop: "1px solid #F0F1F3" }}>
                                    <td>Richard Martin</td>
                                    <td>Kit Kat</td>
                                    <td>7687764556</td>
                                    <td>richard@gmail.com</td>
                                    <td style={{ color: "#10A760" }}>Taking Return</td>
                                    <td>13</td>
                                </tr>
                                <tr style={{ borderTop: "1px solid #F0F1F3" }}>
                                    <td>Richard Martin</td>
                                    <td>Kit Kat</td>
                                    <td>7687764556</td>
                                    <td>richard@gmail.com</td>
                                    <td style={{ color: "#DA3E33" }}>Not Taking Return</td>
                                    <td>13</td>
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

export default Suppliers;
