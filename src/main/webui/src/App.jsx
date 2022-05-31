import React from 'react';
import Todo from './components/Todo';
import Title from './components/Title'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Button from "./components/Button";

const App = () =>  {
  return(
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/todo" element={<TodoPage />} />
          </Routes>
      </BrowserRouter>
    );
}

const HomePage = () => {
    return(
        <div style={{ margin: '0 auto', maxWidth: '500px', textAlign: 'center' }}>
            <Title>Hello Quinoa</Title>
            <Link to="/todo"><Button>Todo</Button></Link>
        </div>
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


