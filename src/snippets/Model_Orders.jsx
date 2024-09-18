import React from "react";

const Model_Orders = ({ isOpen, onClose }) => {
    
    return (
        <>
            <div className={`${isOpen ? 'modelorder' : 'hide'}`}>
                <div className="modelcontainer">
                    <div className="headline">
                        <h4>New Order</h4>
                    </div>
                    <form className="entries">
                        <div className="productname">
                            <h4>Product Name</h4>
                            <input type="text" placeholder="Enter product name" />
                        </div>
                        <div className="productname">
                            <h4>Product ID</h4>
                            <input type="text" placeholder="Enter product ID" />
                        </div>
                        <div className="productname">
                            <h4>Category</h4>
                            <input type="text" placeholder="Select product category" />
                        </div>
                        <div className="productname">
                            <h4>Order value</h4>
                            <input type="text" placeholder="Enter order value" />
                        </div>
                        <div className="productname">
                            <h4>Quantity</h4>
                            <input type="text" placeholder="Enter product quantity" />
                        </div>
                        <div className="productname">
                            <h4>Unit</h4>
                            <input type="text" placeholder="Enter product unit" />
                        </div>
                        <div className="productname">
                            <h4>Buying price</h4>
                            <input type="text" placeholder="Enter buying price" />
                        </div>
                        <div className="productname">
                            <h4>Date of delivery</h4>
                            <input type="text" pattern="(?:30))|(?:(?:0[13578]|1[02])-31))-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])" placeholder="DD-MM-YYYY" />
                        </div>
                        <div className="productname" style={{ justifyContent: 'flex-start' }}>
                            <input style={{ width: '20px' }} type="checkbox" />
                            <h4 style={{ marginLeft: '10px' }}>Notify on the date of delivery</h4>
                        </div>
                        <div className="submitbtn" style={{ float: 'right', marginTop: '15px' }}>
                            <button className="btn" id="discard3" type="button" onClick={onClose}>Discard</button>
                            <button className="btn" type="button" style={{ backgroundColor: '#1366D9', color: 'white', border: 'none' }}>Add Product</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
};

export default Model_Orders;
