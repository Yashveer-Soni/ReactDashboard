import * as React from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {FetchProducts} from "../api/FetchProducts";
import ProductImageSlider from './ProductImageSlider';
import { sanitizeHtml } from '../Helper/sanitizeHtml';

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
function slugToString(slug) {
    return slug
        .split('-') // Split the slug by hyphens
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
        .join(' '); // Join the words back with spaces
}

  
const ProductPage = () => {
    const [value, setValue] = React.useState(0);
    const { products, loading, error } = FetchProducts();
    const { id } = useParams();
    const readableItemName = slugToString(id);

    // Find the product based on the readable item name
    const product = products.find((product) => product.item.item_name === readableItemName);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    // Check if product is found
    if (!product || !product.item) return <div>Product not found</div>;

    // Safely access and sanitize item_description
    const description = product.item.item_description || ""; // Default to empty string if not found
    const item_description = sanitizeHtml(description); // Sanitize only after confirming product exists

    const product_images = product.item.images || []; // Default to empty array if images are undefined

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="productinfocontainer" style={{ marginLeft: "0px", paddingLeft: "15px" }}>
            <div className="floatright" style={{ flexDirection: 'row', alignItems: 'flex-start', width: '100%' }}>
                <div className="flex4 product-img-slider" style={{ height: '100%' }}>
                    <ProductImageSlider images={product_images} />
                </div>
                <div className='product-details'>
                    <h3>{product.item.item_name}</h3>
                </div>
            </div>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Description" {...a11yProps(0)} />
                        <Tab label="Nutritional Information" {...a11yProps(1)} />
                        <Tab label="Disclaimer" {...a11yProps(2)} />
                        <Tab label="More Info" {...a11yProps(3)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <div className='description' dangerouslySetInnerHTML={{ __html: item_description }} />
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

export default ProductPage;
