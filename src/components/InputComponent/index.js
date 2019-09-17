import PropTypes from 'prop-types';
import React from 'react';

import {
    INPUT_TYPE_TEXT,
    INPUT_TYPES
} from './config';

import './styles.scss';

const InputComponent = (props) => {
    const {
        handleChange,
        name,
        placeholder,
        type
    } = props;

    return (
        <input
            className={InputComponent.displayName}
            name={name}
            onChange={handleChange}
            placeholder={placeholder}
            type={type}
        />
    );
};

InputComponent.displayName = 'InputComponent';

InputComponent.propTypes = {
    handleChange: PropTypes.func,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.oneOf(INPUT_TYPES)
};

InputComponent.defaultProps = {
    handleChange: () => { },
    placeholder: '',
    type: INPUT_TYPE_TEXT
};

export default InputComponent;
