import React from 'react';

import './form-input.styles.scss';

const FormInput = ({type, label, placeholder, value, name, handleTextChange}) => (
    <div className='form-input-section'>
        {
            label ? <label className='label'>{label}</label>: null

        }

        {
            placeholder ? <input type={type} vale={value} name={name} onChange={handleTextChange} className="form-input" placeholder={placeholder} /> :
            <input type="text" className="form-input"/>
        }
    </div>
);

export default FormInput;