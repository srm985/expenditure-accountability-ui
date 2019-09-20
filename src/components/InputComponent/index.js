import PropTypes from 'prop-types';
import React from 'react';

import {
    INPUT_TYPE_TEXT,
    INPUT_TYPES
} from './config';

import './styles.scss';

const InputComponent = (props) => {
    const {
        defaultValue,
        handleChange,
        name,
        placeholder,
        type
    } = props;

    return (
        <input
            className={InputComponent.displayName}
            defaultValue={defaultValue}
            name={name}
            onChange={handleChange}
            placeholder={placeholder}
            type={type}
        />
    );
};

InputComponent.displayName = 'InputComponent';

InputComponent.propTypes = {
    defaultValue: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    handleChange: PropTypes.func,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.oneOf(INPUT_TYPES)
};

InputComponent.defaultProps = {
    defaultValue: '',
    handleChange: () => { },
    placeholder: '',
    type: INPUT_TYPE_TEXT
};

export default InputComponent;
