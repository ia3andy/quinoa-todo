import React from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types';
import { Check2Circle } from '@styled-icons/bootstrap';

const Li = styled.li`
    border-bottom: 1px #97A8CB solid;
    border-right: 1px #97A8CB solid;
    border-left: 1px #97A8CB solid;
    &:first-child{
        border-top: 1px #97A8CB solid;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }
    &:last-child {
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const Text = styled.span`
    position: relative;
    font-family: 'Indie Flower', "Comic Sans MS", sans-serif;
    font-size: 20px;
    color: #0D1C2C;
    transition: position 0.8 ease-out;
`
const DelButton = styled.div`
    padding: 5px;
    cursor: pointer;
    background-color: transparent;
    border: 0;
    color: #97A8CB;
    transition: transform .8s;
    &:hover{
        color: orange;
        transform: rotate(180deg);
    }
`


const Item = (props) => {
    const {id, text, removeItem}  = props;
    return(
        <Li>
           <Text>{text}</Text>
           { (removeItem && id) && 
            <DelButton onClick={() => removeItem(id)}><Check2Circle size="30"/></DelButton>
            }      
        </Li>
    )
}

Item.propTypes = {
    /**
     * The items's ID
     */
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * The item's text
     */
    text: PropTypes.string.isRequired,
    /**
     * A callback to be exectuted on a remove-item event
     */
    removeItem: PropTypes.func
}

export default Item;