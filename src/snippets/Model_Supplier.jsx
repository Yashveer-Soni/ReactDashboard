import React from "react";

const Model_Supplier = ({ isOpen, onClose }) => {
    return (
        <>
            <div className={`${isOpen ? 'modelsupplier' : 'hide'}`}>
                <div className="modelcontainer">
                    <div className="headline">
                        <h4>New Supplier</h4>
                    </div>
                    <div className="dragimage">
                        <img id="imagePreview" className="dim" style={{ borderRadius: '61px' }}></img>
                        <div className="dims">
                            <h4 style={{ margin: 0, textAlign: 'center' }}>Drag image here</h4>
                            <h4 style={{ margin: 0, textAlign: 'center' }}>or</h4>
                            <h4 style={{ margin: 0, textAlign: 'center', color: '#448DF2', cursor: 'pointer' }} id="browseimage">Browse image</h4>
                            <input type="file" id="fileInput" style={{ display: 'none' }} />
                        </div>
                    </div>
                    <form className="entries">
                        <div className="productname">
                            <h4>Supplier Name</h4>
                            <input type="text" placeholder="Enter supplier name" />
                        </div>
                        <div className="productname">
                            <h4>Product</h4>
                            <input type="text" placeholder="Enter product" />
                        </div>
                        <div className="productname">
                            <h4>Category</h4>
                            <input type="text" placeholder="Select product category" />
                        </div>
                        <div className="productname">
                            <h4>Buying Price</h4>
                            <input type="text" placeholder="Enter buying price" />
                        </div>
                        <div className="productname">
                            <h4>Contact Number</h4>
                            <input type="text" placeholder="Enter supplier contact number" />
                        </div>
                        <div className="productname">
                            <h4>Type</h4>
                            <div className="flex3" style={{ justifyContent: 'flex-end' }}>
                                <div style={{ width: '12rem', display: 'flex', justifyContent: 'flex-end', position: 'relative', marginRight: '14px' }}>
                                    <h4 className="tss" style={{ paddingLeft: '34px' }}>Not taking return</h4>
                                    <input style={{ width: '20px', position: 'absolute', left: '26px' }} type="checkbox" />
                                </div>
                                <div style={{ display: 'flex', width: '39%', justifyContent: 'flex-end', position: 'relative' }}>
                                    <h4 style={{ paddingLeft: '37px' }} className="tss">Taking return</h4>
                                    <input style={{ width: '20px', position: 'absolute', left: '7px' }} type="checkbox" />
                                </div>
                            </div>
                        </div>
                        <div className="submitbtn" style={{ float: 'right', marginTop: '15px' }}>
                            <button className="btn" id="discard2" type="button" onClick={onClose}>Discard</button>
                            <button className="btn" type="button" style={{ backgroundColor: '#1366D9', color: 'white', border: 'none' }}>Add Supplier</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Model_Supplier;
