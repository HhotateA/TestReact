import React,{ Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import './App.css';
import './index.css';

class App extends Component {
  constructor(){
    super()
    this.state = {
      todos: [ ],
      newId: 0,
      newTitle: "New Task",
    }
  }
  // タスクの完了処理
  changeState(clickTodo) {
    const todos = this.state.todos.slice();
    const todo = todos[clickTodo.id];
    todo.done = !todo.done;
    todos[clickTodo.id] = todo;
    console.log(todo.title + " : " + todo.done);
    console.log(this.state.todos);
    this.setState({todos});
  }
  
  // TextFieldの入力
  handleChange(e) {
    console.log(e.target.value);
    this.setState({newTitle: e.target.value});
  }

  // 新たなタスクの追加
  addNewTask() {
    const todos = this.state.todos.slice();
    let newId = this.state.newId;
    let newTitle = this.state.newTitle;
    var DD = new Date();
    var dateTime = DD.getHours()+"時 "+DD.getMinutes()+"分 "+DD.getSeconds()+"秒";
    const newTask = {
      id: newId,
      timeStamp: dateTime,
      title: newTitle,
      done: false
    }
    newId += 1;
    todos.push(newTask);
    this.setState({todos: todos});
    this.setState({newId: newId});
    this.setState({newTitle: newTitle});
  }

  render(){
    console.log("reload");
    return (
      <div className = "App">
        <h2> TodoList </h2>
        <TodoList
          todos = {this.state.todos}
          changeState = {this.changeState.bind(this)}
        />
        <div>
          <form>
            <TextField
              name = "aa"
              id = "NewTaskField"
              label = {this.state.newTitle}
              onChange = {this.handleChange.bind(this)}
            />
            <Button onClick={this.addNewTask.bind(this)}> AddTask </Button>
          </form>
        </div>
      </div>
    );
  }
}

class TodoList extends Component {
  render() {
    const todos = this.props.todos.map( todo =>
      <Todo
        key = {todo.id}
        id = {todo.id}
        timeStamp = {todo.timeStamp}
        title = {todo.title}
        done = {todo.done}
        changeState = {this.props.changeState}
      />
    );
    return(
      <ul>
        {todos}
      </ul>
    );
  }
}

class Todo extends Component {
  render() {
    if(this.props.done){
      return null;
    } else {
      return(
        <li className="Cell">
          <span style={{float:"left"}}> {this.props.timeStamp} </span>
          <span> {this.props.title} </span>
          <Button style={{float:"right"}} onClick={(e)=>{ e.preventDefault(); this.props.changeState(this.props)}}> 完了 </Button>
        </li>
      );
    }
  } 
}

export default App;
