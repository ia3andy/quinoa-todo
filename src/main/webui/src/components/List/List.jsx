import React from 'react';
import PropTypes from 'prop-types';
import Item from "../Item";


const List = (props) => {
  const {items, removeItem} = props;
  return (
      <ul style={{paddingLeft: 0}}>
          {items.map(item =>  
              <Item key={item.id} text={item.text} id={item.id} removeItem={removeItem}/>
          )}
      </ul>
  )
}

List.propTypes = {
  /** List items.
   *  key: The item's unique key.
   *  text: The item's description. */ 
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        text: PropTypes.string.isRequired,
      })
    ),
    /** A collback to be executed on a remove-item event */
    removeItem: PropTypes.func
  };

  export default List;
