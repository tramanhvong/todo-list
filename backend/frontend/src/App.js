import './App.css';
import React, { Component } from 'react';
import Modal from "./components/Modal";
import axios from "axios";

import 'bootstrap/dist/css/bootstrap.min.css';
import stickyNote1 from './static/images/stickyNoteYellow-removebg-preview.png';
import stickyNote2 from './static/images/stickyNoteYellow-removebg-preview.png';
import redCircle from './static/images/redCircle-removebg-preview.png';
import boomshakalakaAudio from './static/audio/boomshakalaka.mp3';


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
    const audio = new Audio(boomshakalakaAudio);
    audio.play();
    // this.setState({ activeItem: item, modal: !this.state.modal });
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

  renderLists = () => {
    return (
      <div className="lists-row">
        <div className="lists-col">
          <img src={stickyNote1} alt="sticky note" className="sticky-note1"/>
          <audio src={boomshakalakaAudio} className="add-task-audio"/>
          <span className="incomplete-list"
            onClick={() => this.displayCompleted(false)}
          >
            current tasks
          </span>
        </div>


        <div className="lists-col">
        <img src={stickyNote2} alt="sticky note" className="sticky-note2"/>
          <span className="completed-list"
            onClick={() => this.displayCompleted(true)}
          >
            past tasks
          </span>
        </div>
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
          <img src={redCircle} alt="red circle" className="red-circle"/>
          <button class="add-task-btn" onClick={this.createItem}>add tasks</button>
        </div>

        {this.renderLists()}

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
