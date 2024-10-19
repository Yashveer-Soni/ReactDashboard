import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ProductContext } from "../api/FetchProducts";
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
    const { products, loading, error } = useContext(ProductContext);
    const { id } = useParams();
    const readableItemName = slugToString(id).toLowerCase();
    const product = products.find((product) => product.item.item_name === readableItemName);
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    if (!product || !product.item) return <div>Product not found</div>;

    const description = product.item.item_description || "";
    const item_description = sanitizeHtml(description);

    const product_images = product.item.images || [];

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="productinfocontainer" style={{ marginLeft: "0px", paddingLeft: "15px" }}>
            <div className="floatright" style={{ flexDirection: 'row', alignItems: 'flex-start', width: '100%' }}>
                <div className="flex4 product-img-slider" style={{ height: '100%' }}>
                    {product_images.length > 0 && product_images.every(image => image.image) ? (
                        <ProductImageSlider images={product_images} />
                    ) : (
                        <div>No images available</div>
                    )}
                </div>
                <div className='product-details'>
                    <h3>{product.item.item_name}</h3>
                </div>
            </div>
      
        </div>
    );
};

export default ProductPage;