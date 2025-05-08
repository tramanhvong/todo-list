import './App.css';
import React, { Component } from 'react';
import Modal from "./components/Modal";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      todoList: [],
      modal: false,
      activeItem: {
        title: "",
        description: "",
        completed: false,
      },
    };
  }

  componentDidMount() {
    this.refreshList();
  };

  refreshList=() => {
    axios
      .get("/api/todos/")
      .then((res) => this.setState({ todoList:res.data}))
      .catch((err) => console.log(err))
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle();

    if (item.ide) {
      axios
        .put(`/api/todos/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }
    axios
      .post("/api/todos/", item)
      .then((res) => this.refreshList());
  };

  handleDelete = (item) => {
    axios
      .delete(`/api/todos/${item.id}/`)
      .then((res) => this.refreshList());
  };

  createItem = () => {
    const audio = new Audio();
    const item = { title: "", description: "", completed: false };

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  displayCompleted = (status) => {
    if (status) {
      return this.setState({ viewCompleted: true});
    }
    return this.setState({ viewCompleted: false});
  }

  renderCompleteList = () => {
    return (
      <div className="complete-list">
        <span 
          className="complete-span">
          Complete
        </span>
      </div>
    );
  };

  renderIncompleteList = () => {
    return (
      <div className="incomplete-list">
        <span
          className="incomplete-span">
            Incomplete
        </span>
      </div>
    );
  };

  renderItems = () => { 
    const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter(
      (item) => item.completed === viewCompleted
    );

    return newItems.map((item) => (
      <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
        <span className={`todo-title mr-2 ${ this.state.viewCompleted?"completed-todo":""}`} title={item.description}>
          {item.title}
        </span>
        <span>
          <button className="btn btn-secondary mr-2" onClick={() => this.editItem(item)}>Edit</button>
          <button className="btn btn-danger" onClick={() => this.handleDelete(item)}>Delete</button>
        </span>
      </li>
    ));
  };

  render () {
    return (
      <main className="mainPage">
        <h1 class="mainHeading">to-do list</h1>
        <div class="button-div">
          <button class="add-task-btn" onClick={this.createItem}>Add Task</button>
        </div>

        <div class="view-row">
          {this.renderCompleteList()}
          {this.renderIncompleteList()}
        </div>
        

        <ul class="todoList">{this.renderItems()}</ul>
        {this.state.modal ? (
          <Modal
          activeItem={this.state.activeItem}
          toggle={this.toggle}
          onSave={this.handleSubmit}
          />
        ): null}
      </main>
    );
  }
}

export default App;
