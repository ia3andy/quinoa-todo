import React, { Component } from 'react'
import styled from 'styled-components'
import AddButton from '../AddButton'
import InputText from '../TextInput'
import List from '../List';
import { EmojiSunglasses } from '@styled-icons/bootstrap';

const Loading = styled.div`
  text-align: center;
  padding: 20px;
  & svg {
    color: orange;
    animation: rotation 2s infinite linear;
  }

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
`

const Container = styled.div`
  position: relative;
  margin: 0 auto;
  overflow: auto;
  width: 25%;
  min-height: 250px;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  padding: 20px;


  @media (max-width: 1200px) {
    width: 40%
  };
  @media screen and (max-width: 600px) {
    overflow: auto;
    width: 85%;
    margin: auto;
  }
`

const InputForm = styled.form`
    display: flex;
    margin-bottom: 25px;
    & > :first-child{
        margin-right: 6px;
    }
`

export default class Todo extends Component {

    state = {
        todo: null,
        inputText: '',
        submitDisabled: true
    }

    componentDidMount() {
        this.updateTodoState([]);
    }

    addTodo = (text) => {
        const id = Math.floor((Math.random() * 10000)).toString();
        this.updateTodoState( [{ text, id }, ...this.state.todo]);
    }

    removeTodo = (id) => {
        this.updateTodoState(this.state.todo.filter(todo => todo.id !== id));
    }

    updateSubmitDisabledState = (submitDisabled) => {
        this.setState({ submitDisabled });
    }

    updateTodoState = (todo) => {
        this.setState({ todo });
    }

    updateInput = (event) => {
        let text = event.target.value.replace(/\s/g,'');
        this.setState({inputText: event.target.value})
        if (text) {
            this.updateSubmitDisabledState(false);
        } else {
            this.updateSubmitDisabledState(true);
        }
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        this.addTodo(this.state.inputText);
        this.setState({inputText: ''});
    }

    render() {
        return (
            <Container>
                {this.state.todo && (
                <InputForm onSubmit={this.handleSubmit}>
                    <InputText value ={this.state.inputText} onChange={this.updateInput} />
                    <AddButton disabled={this.state.submitDisabled} type="submit">Todo</AddButton>
                </InputForm>
                )}
                {this.state.todo ? (
                    <List items={this.state.todo} removeItem={this.removeTodo} />
                ): <Loading><EmojiSunglasses size={100} /></Loading>}
            </Container>
        )
    }
}