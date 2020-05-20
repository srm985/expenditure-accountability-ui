import PropTypes from 'prop-types';
import React from 'react';

import {
    INPUT_TYPES,
    INPUT_TYPE_TEXT
} from './config';

import classNames from '../../utils/classNames';

import './styles.scss';

const InputComponent = (props) => {
    const {
        className,
        defaultValue,
        handleChange,
        isRequired,
        label,
        name,
        placeholder,
        type,
        value
    } = props;

    const {
        displayName
    } = InputComponent;

    const componentClassNames = classNames(
        displayName,
        className
    );

    return (
        <label
            className={componentClassNames}
            htmlFor={name}
        >
            {
                label
                && (
                    <span className={`${displayName}__label`}>
                        {label}
                        {
                            isRequired
                            && (
                                <span className={`${displayName}__required-indicator`}>
                                    {'*'}
                                </span>
                            )
                        }
                    </span>
                )
            }
            <input
                className={`${displayName}__input`}
                defaultValue={defaultValue}
                id={name}
                name={name}
                onChange={handleChange}
                placeholder={placeholder}
                required={isRequired}
                type={type}
                value={value}
            />
        </label>
    );
};

InputComponent.displayName = 'InputComponent';

InputComponent.propTypes = {
    className: PropTypes.string,
    defaultValue: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    handleChange: PropTypes.func,
    isRequired: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.oneOf(INPUT_TYPES),
    value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ])
};

InputComponent.defaultProps = {
    className: '',
    defaultValue: '',
    handleChange: () => { },
    isRequired: false,
    label: '',
    placeholder: '',
    type: INPUT_TYPE_TEXT,
    value: undefined
};

export default InputComponent;
