import styled from 'styled-components';

const Button = styled.button`
    cursor: pointer;
    color: #fff;
    position: relative;
    font-size: 16px;
    padding: 10px;
    border-radius: 5px;
    background-color: #c00;
    transition: background-color 0.3s ease;
    box-shadow: none;
    border none;
    &:active {
        top: 2px;
    }
    &:hover {
        background-color: #4f9cef;
    }
    &:focus {
        outline: none;
    } 
`

export default Button;