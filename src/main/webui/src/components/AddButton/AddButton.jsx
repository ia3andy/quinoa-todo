import styled from 'styled-components';
import PropTypes from 'prop-types';

const AddButton = styled.button`
    cursor: pointer;
    color: #fff;
    position: relative;
    font-size: 16px;
    padding: 10px;
    flex-basis: 70px;
    border-radius: 0 5px 5px 0;
    background-color: ${props => props.disabled ? '#4695EB' : '#c00'};
    transition: background-color 0.3s ease;
    box-shadow: none;
    border none;
    &:active {
        top: 2px;
    }
    &:enabled:hover {
        background-color: #4f9cef;
    }
    &:focus {
        outline: none;
    } 
`

AddButton.propTypes = {
    /** Determines if a button is active or disabled */
    disabled: PropTypes.bool
}

export default AddButton;