import React from "react";

const Report = () => {
    return (
        <>
            <div className="cards">
                <div className="salesoverview" style={{ flex: 1, minWidth: "34rem", maxWidth: "47rem" }}>
                    <div className="title">
                        <h3>Overview</h3>
                    </div>
                    <div className="overviewfirst flex3">
                        <div className="totalprofile">
                            <h4>₹21,190</h4>
                            <h4>Total Profit</h4>
                        </div>
                        <div className="revenue">
                            <h4>₹18,300</h4>
                            <h4>Revenue</h4>
                        </div>
                        <div className="sales">
                            <h4>₹17,432</h4>
                            <h4>Sales</h4>
                        </div>
                    </div>
                    <div className="overviewsecond flex3">
                        <div className="netvalue">
                            <h4>₹1,17,432</h4>
                            <h4>Net purchase value</h4>
                        </div>
                        <div className="salesvalue">
                            <h4>₹1,17,432</h4>
                            <h4>Net sales value</h4>
                        </div>
                        <div className="momvalue">
                            <h4>₹1,17,432</h4>
                            <h4>MoM Profit</h4>
                        </div>
                        <div className="yoyvalue">
                            <h4>₹1,17,432</h4>
                            <h4>YoY Profit</h4>
                        </div>
                    </div>
                </div>
                <div className="salesoverview" style={{ flex: 1, minWidth: "34rem", maxWidth: "47rem" }}>
                    <div className="title flex3">
                        <h3>Best selling category</h3>
                        <a href="/">See all</a>
                    </div>
                    <div style={{ marginTop: "5px" }}>
                        <table>
                            <thead>
                                <tr style={{ borderTop: "transparent" }}>
                                    <th>Category</th>
                                    <th>Turn Over</th>
                                    <th>Increase By</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ borderTop: "1px solid #F0F1F3" }}>
                                    <td>Vegetable</td>
                                    <td>₹26,000</td>
                                    <td style={{ color: "#10A760" }}>3.2%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="chartssection">
                <div className="ordersummery">
                    <div className="headline">
                        <h3>Order Summary</h3>
                    </div>
                    <div style={{ width: "100%", height: "100%" }}>
                        <div id="chart"></div>
                    </div>
                </div>
            </div>
            <div className="stocktables">
                <div className="topsellingstock">
                    <div className="flex3">
                        <div className="headline">
                            <h3>Best selling product</h3>
                        </div>
                        <a href="/">See all</a>
                    </div>
                    <div>
                        <table>
                            <thead>
                                <tr style={{ borderTop: "transparent" }}>
                                    <th>Product</th>
                                    <th>Product ID</th>
                                    <th>Category</th>
                                    <th>Remaining Quantity</th>
                                    <th>Turn Over</th>
                                    <th>Increase By</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ borderTop: "1px solid #F0F1F3" }}>
                                    <td>Surf Excel</td>
                                    <td>23567</td>
                                    <td>Vegetable</td>
                                    <td>225 kg</td>
                                    <td>₹17,000</td>
                                    <td style={{ color: "#10A760" }}>2.3%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Report;
