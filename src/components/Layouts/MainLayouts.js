import React from 'react';
import PropTypes from 'prop-types';

const MainLayouts = ({children}) => {

    return (
        <div className="container mt-5 pb-5">
                {children}
        </div>
    );
};

MainLayouts.propTypes = {
    children: PropTypes.node.isRequired
};

export default MainLayouts;

