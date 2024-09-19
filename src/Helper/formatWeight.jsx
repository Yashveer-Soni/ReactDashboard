import PropTypes from 'prop-types';
import React, { memo } from 'react';

const FormatWeight = memo(({ weight }) => {
    const formattedWeight = weight.toString().includes('.')
        ? `${parseFloat(weight) * 1000} gram` 
        : `${weight} kg`; 

    return (
        <span>{formattedWeight}</span> 
    );
});

FormatWeight.propTypes = {
    weight: PropTypes.number.isRequired, 
};

export default FormatWeight;
