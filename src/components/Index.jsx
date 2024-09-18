
import {React, useEffect, useState} from "react";
import { 
    sales_icon,
    Revenue_icon,
    profit_icon,
    cost_icon,
    quantity_icon,
    categories_icon,
    Purchasebag_icon,
    cancel_icon,
    received_icon,

    } from '../snippets/Image_load';

import ApexCharts from 'react-apexcharts';



const Index=()=>{
    const [chartOptions, setChartOptions] = useState({
        chart: {
            height: 280,
            type: "area"
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth',
          },
          
          series: [
            {
              name: "Series 1",
              data: [45, 52, 38, 45, 19, 23, 2]
            }
          ],
          fill: {
            type: "gradient",
            gradient: {
                shade: 'dark',
                type: 'horizontal', 
                shadeIntensity: 1.5,
                gradientToColors: ['#CB5EEE', '#3900A6'], 
                inverseColors: false,
                opacityFrom: 2,
                opacityTo: 1.9,
                stops: [0, 50, 100]
              }
          },
          xaxis: {
            categories: [
              "01 Jan",
              "02 Jan",
              "03 Jan",
              "04 Jan",
              "05 Jan",
              "06 Jan",
              "07 Jan"
            ]
          }
    });
   
    return (
        <>
        <div className="cards">
            <div className="salesoverview">
            <div className="title">
                <h3 >Sales Overview</h3>
           
            </div>
            <div className="salescontainer flex3">
                <div className="tinydata ">
                    <div className="tinydatalogo">
                        <img src={sales_icon} alt=""/>
                    </div>
                    <div className="desc flex3">
                        <span className="rate">$ 832</span>
                        <span className="desctitle">Sales</span>
                    </div>
                </div>
                <div className="tinydata" >
                    <div className="tinydatalogo">
                        <img src={Revenue_icon} alt=""/>
                    </div>
                    <div className="desc flex3">
                        <span className="rate">$ 832</span>
                        <span className="desctitle">Revenue</span>
                    </div>
                </div>
                <div className="tinydata" >
                    <div className="tinydatalogo">
                        <img src={profit_icon} alt=""/>
                    </div>
                    <div className="desc flex3">
                        <span className="rate">$ 832</span>
                        <span className="desctitle">Profit</span>
                    </div>
                </div>
                <div className="tinydata">
                    <div className="tinydatalogo">
                        <img src={cost_icon} alt=""/>
                    </div>
                    <div className="desc flex3">
                        <span className="rate">$ 832</span>
                        <span className="desctitle">Cost</span>
                    </div>
                </div>
            </div>
            </div>
            <div className="inventory">
                <div className="title">
                    <h3 >Product Summary</h3>
                </div>
                <div className="salescontainer flex3">
                    <div className="tinydata " >
                        <div className="tinydatalogo">
                            <img src={quantity_icon} alt="" style={{filter: 'invert(42%) sepia(93%) saturate(1352%) hue-rotate(87deg) brightness(119%) contrast(119%)' }} />
                        </div>
                        <div className="desc flex" >
                            <span className="rate">525</span>
                            <span className="desctitle">Quantity in Hand</span>
                        </div>
                    </div>
                    <div className="tinydata" >
                        <div className="tinydatalogo">
                            <img src={categories_icon} alt=""/>
                        </div>
                        <div className="desc flex">
                            <span className="rate">200</span>
                            <span className="desctitle">To be received</span>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className="salesoverview" >
                <div className="title">
                    <h3 >Purchase Overview</h3>
                </div>
                <div className="salescontainer flex3">
                    <div className="tinydata " >
                        <div className="tinydatalogo">
                            <img src={Purchasebag_icon} alt=""/>
                        </div>
                        <div className="desc flex3">
                            <span className="rate">$ 832</span>
                            <span className="desctitle">Purchase</span>
                        </div>
                    </div>
                    <div className="tinydata" >
                        <div className="tinydatalogo">
                            <img src={cost_icon} alt=""/>
                        </div>
                        <div className="desc flex3">
                            <span className="rate">$ 832</span>
                            <span className="desctitle">Cost</span>
                        </div>
                    </div>
                    <div className="tinydata" >
                        <div className="tinydatalogo">
                            <img src={cancel_icon} alt=""/>
                        </div>
                        <div className="desc flex3">
                            <span className="rate">$ 832</span>
                            <span className="desctitle">Cancel</span>
                        </div>
                    </div>
                    <div className="tinydata">
                        <div className="tinydatalogo">
                            <img src={profit_icon} alt=""/>
                        </div>
                        <div className="desc flex3">
                            <span className="rate">$ 832</span>
                            <span className="desctitle">Return</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="inventory">
                <div className="title">
                    <h3 >Inventory Summery</h3>
                </div>
                <div className="salescontainer flex3">
                    <div className="tinydata " >
                        <div className="tinydatalogo">
                            <img src={quantity_icon} alt=""/>
                        </div>
                        <div className="desc flex" >
                            <span className="rate">525</span>
                            <span className="desctitle">Quantity in Hand</span>
                        </div>
                    </div>
                    <div className="tinydata" >
                        <div className="tinydatalogo">
                            <img src={received_icon} alt=""/>
                        </div>
                        <div className="desc flex" >
                            <span className="rate">200</span>
                            <span className="desctitle">To be received</span>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        <div className="chartssection">
            <div className="salesandpurchase">
                <div className="headline">
                    <h3>Sales & Purchase</h3>
                </div>
                <div style={{width: '100%', height: '100%'}}>
                   <ApexCharts options={chartOptions} series={chartOptions.series} type="line" height={350} />
                </div>
            </div>
            <div className="ordersummery">
                <div className="headline">
                    <h3>Order Summery</h3>
                </div>
                <div style={{width: '100%', height: '100%'}}>
                    <ApexCharts options={chartOptions} series={chartOptions.series} type="line" height={350} />
                </div>
            </div>
        </div>
        <div className="stocktables">
            <div className="topsellingstock">
                <div className="flex3">
                    <div className="headline">
                        <h3>Top Selling Stock</h3>
                    </div>
                    <a href="">Show all</a>
                </div>
                <div>
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Sold Quantity</th>
                            <th>Remaining Quantity</th>
                            <th>Price</th>
                        </tr>
                        <tr>
                            <td>Surf Excel</td>
                            <td>30</td>
                            <td>12</td>
                            <td>₹ 100</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div className="lowquantitystock">
                <div className="flex3">
                    <div className="headline">
                        <h3>Low Quantity Stock</h3>
                    </div>
                    <a href="">Show all</a>
                </div>
                <div>
                    <table>
                        <tr style={{border: 'transparent'}}>
                            <th className="ths">
                                <div className="lowstockimage">
                                    <img src="" alt=""/>
                                </div>
                            </th>
                            <th className="ths" style={{width: '1%'}}>
                                <div className="lowstockname">
                                    <h3>Tata Salt</h3>
                                    <h5>Remaining Quantity : 10 Packet</h5>
                                </div>
                            </th>
                            <th className="ths">
                                <span className="low">Low</span>
                            </th>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        </>
    )
}
export default Index;

        