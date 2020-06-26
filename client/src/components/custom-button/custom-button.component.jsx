import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({children,inverted, name, ...otherProps}) => (
    <button 
        className={`${inverted ? 'inverted':''} ${name} custom-button`} {...otherProps}>
        {children}
    </button>
);

export default CustomButton;