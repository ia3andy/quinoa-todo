import styled from 'styled-components';

const TextInput = styled.input`
    font-family: "Indie Flower", "Comic Sans MS", sans-serif;
    border-radius: 5px 0 0 5px;
    flex-grow: 1;
    padding: 10px 10px;
    border: 1px solid #4695EB;
    display: inline-block;
    font-size: 20px;
    transition: box-shadow 0.3s;
    &:focus {
        outline: none;
        border: 1px solid #4f9cef;
    } 
`

export default TextInput;