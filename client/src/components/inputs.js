import React, {useEffect, useState, useRef} from 'react';
import {InputLabel, OutlinedInput, Select} from '@material-ui/core';
import PropTypes from 'prop-types';

const handleSelect = (callback) => event => callback(event.target.value);

const OutlinedSelect = (props) => {
    const inputLabel = useRef(null);
    const [labelWidth, setLabelWidth] = useState(0);

    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth)
    }, []);

    return (
        <React.Fragment>
            <InputLabel ref={inputLabel} htmlFor={props.selectId} {...props.inputProps}>{props.labelText}</InputLabel>
            <Select
                native
                value={props.value}
                onChange={handleSelect(props.setState)}
                input={
                    <OutlinedInput
                        labelWidth={labelWidth}
                        name={props.selectName}
                        id={props.selectId}
                    />
                }
                disabled={props.disabled || false}
                {...props.selectProps}
            >
                {props.children}
            </Select>
        </React.Fragment>
    )
};

OutlinedSelect.propTypes = {
    children: PropTypes.node.isRequired,
    selectName: PropTypes.string.isRequired,
    selectId: PropTypes.string.isRequired,
    labelText: PropTypes.string,
    value: PropTypes.string.isRequired,
    setState: PropTypes.func.isRequired,
    selectProps: PropTypes.object,
    inputProps: PropTypes.object,
    disabled: PropTypes.bool
};

export { OutlinedSelect }