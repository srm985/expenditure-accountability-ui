import PropTypes from 'prop-types';
import React from 'react';

import classNames from '../../utils/classNames';

import './styles.scss';

const SelectComponent = (props) => {
    const {
        className,
        handleChange,
        id,
        isRequired,
        label,
        name,
        options,
        value
    } = props;

    const {
        displayName
    } = SelectComponent;

    const generatedOptions = options.map((option) => {
        const {
            label: optionLabel,
            value: optionValue
        } = option;

        return (
            <option
                key={optionValue}
                value={optionValue}
            >
                {optionLabel}
            </option>
        );
    });

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
            <select
                className={`${displayName}__select`}
                id={id || name}
                name={name}
                onChange={handleChange}
                required={isRequired}
                value={value}
            >
                {generatedOptions}
            </select>
        </label>
    );
};

SelectComponent.displayName = 'SelectComponent';

SelectComponent.propTypes = {
    className: PropTypes.string,
    handleChange: PropTypes.func,
    id: PropTypes.string,
    isRequired: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),
        value: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ])
    })),
    value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ])
};

SelectComponent.defaultProps = {
    className: '',
    handleChange: () => { },
    id: '',
    isRequired: false,
    label: '',
    options: [],
    value: ''
};

export default SelectComponent;
