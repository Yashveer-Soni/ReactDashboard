import React, {  useContext } from "react";
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import { pen } from "../../snippets/Image_load";
import {ProductContext} from "../../api/FetchProducts";
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
    const { products, loading, error } = useContext(ProductContext);
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
         
        </div>
    );
};

export default Productinfo;
