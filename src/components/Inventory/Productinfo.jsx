import * as React from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { pen } from "../../snippets/Image_load";
import {FetchProducts} from "../../api/FetchProducts";
import FullScreenSlider from './FullScreenSlider';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
}
  
CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
  
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
  
const Productinfo = () => {
    const [value, setValue] = React.useState(0);
    const { products, loading, error } = FetchProducts();
    const { id } = useParams();
    const product = products.find((product) => product.item.id.toString() === id);
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    if (!product) return <div>Product not found</div>;

    const product_images = product.item.images || []; // Default to empty array if images is undefined

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="productinfocontainer">
            <div className="letsd">
                <div className="flex3">
                    <h3>{product.item.item_name}</h3>
                    <div className="flex3" style={{ gap: "10px" }}>
                        <button className="btn flex3" style={{ gap: "5px" }} type="button">
                            <img src={pen} alt="" /> Filters
                        </button>
                        <button className="btn" type="button">Download all</button>
                    </div>
                </div>
            </div>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Overview" {...a11yProps(0)} />
                        <Tab label="Purchases" {...a11yProps(1)} />
                        <Tab label="Adjustments" {...a11yProps(2)} />
                        <Tab label="History" {...a11yProps(3)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <div className="floating">
                        <div className="floatleft">
                            <div className="details1">
                                <div className="headline">
                                    <h3>Primary Detail</h3>
                                </div>
                                <div className="pdl flex3">
                                    <div className="pdl1">
                                        <h4>Product name</h4>
                                        <h4>Product ID</h4>
                                        <h4>Product category</h4>
                                        <h4>Expiry date</h4>
                                    </div>
                                    <div className="pdl2">
                                        <h4>{product.item.item_name}</h4>
                                        <h4>{product.item.bar_code}</h4>
                                        <h4>{product.item.sub_category.category.category_name}</h4>
                                        <h4>{product.expired_date}</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="details1">
                                <div className="headline">
                                    <h3>Supplier Details</h3>
                                </div>
                                <div className="flex3" style={{ width: "25rem" }}>
                                    <div className="pdl1">
                                        <h4>Supplier name</h4>
                                        <h4>Contact Number</h4>
                                    </div>
                                    <div className="pdl2">
                                        <h4>Ronald Martin</h4>
                                        <h4>98789 86757</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="details1">
                                <div className="headline">
                                    <h3>Stock Locations</h3>
                                </div>
                                <div className="flex3" style={{ background: "#F7F8F9", padding: "0 10px", borderRadius: "10px", height: "3rem" }}>
                                    <h4>Store Name</h4>
                                    <h4>Stock in hand</h4>
                                </div>
                                <div className="flex3" style={{ width: "auto", padding: "0 11px" }}>
                                    <div className="pdl1">
                                        <h4>Sulur Branch</h4>
                                        <h4>Singanallur Branch</h4>
                                    </div>
                                    <div className="pdl2">
                                        <h4 style={{ color: "#1366D9" }}>19</h4>
                                        <h4 style={{ color: "#1366D9" }}>19</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="floatright">
                            <div className="flex4 product-img-slider">
                                {product_images.length > 0 && <FullScreenSlider images={product_images} />}
                                {/* <img src={product.item.images[0]?.image} style={{ border: "dashed 2px #9D9D9D" }} alt="" /> */}
                            </div>
                            
                            <div className="frlist flex3">
                                <div className="frlistitem">
                                    <h4>Opening Stock</h4>
                                    <h4>Remaining Stock</h4>
                                    <h4>On the way</h4>
                                    <h4>Threshold value</h4>
                                </div>
                                <div className="frlistitem2">
                                    <h4>40</h4>
                                    <h4>34</h4>
                                    <h4>15</h4>
                                    <h4>12</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    Item Two
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    Item Three
                </CustomTabPanel>
            </Box>
        </div>
    );
};

export default Productinfo;
