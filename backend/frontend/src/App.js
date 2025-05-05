import logo from './logo.svg';
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

  renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span 
          className={this.state.viewCompleted ? "nav-link active" : "nav-link"}
          onClick={() => this.displayCompleted(true)}
        >
          Complete
        </span>

        <span
          className={this.state.viewCompleted ? "nav-link" : "nav-link active"}
          onClick={() => this.displayCompleted(false)}>
            Incomplete
        </span>
      </div>
    );
  };

  renderItems = () => { 
    const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter(
      (item) => item.complted == viewCompleted
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
      <main className="container">
        <h1 class="mainHeading">ToDo App</h1>
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div class="button-div1">
                <button class="addTaskButton" onClick={this.createItem}>Add Task</button>
              </div>

              {this.renderTabList()}

              <ul class="todoList">{this.renderItems()}</ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
          activeitem={this.state.activeItem}
          toggle={this.toggle}
          onSave={this.handlSubmit}
          />
        ): null}
      </main>
    );
  }
}
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
