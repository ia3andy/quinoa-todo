import React from 'react';
import Todo from './components/Todo';
import Title from './components/Title';

const App = () =>  {
  return(
      <TodoPage />
    );
}

const TodoPage = () => {
    return(
        <div>
            <Title>Ola Quinoa</Title>
            <Todo />
        </div>
    );
}

export default App;


