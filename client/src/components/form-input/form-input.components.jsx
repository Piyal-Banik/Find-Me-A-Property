import React from 'react';

import './form-input.styles.scss';

const FormInput = ({label, placeholder}) => (
    <div className='form-input-section'>
        {
            label ? <label className='label'>{label}</label>: null

        }

        {
            placeholder ? <input type="text" className="form-input" placeholder={placeholder} /> :
            <input type="text" className="form-input"/>
        }
    </div>
);

export default FormInput;