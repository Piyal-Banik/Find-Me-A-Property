import React from 'react';

import './section-title.styles.scss';

const SectionTitle = ({title}) => {
    return (
        <div className='title-section'>
            <p className='title'>{title}</p>
            <div className='divider'></div>
        </div>
    )
}

export default SectionTitle;