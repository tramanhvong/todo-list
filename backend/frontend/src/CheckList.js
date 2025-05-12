import React, { useState } from 'react';
import redCircle from './static/images/redCircle-removebg-preview.png';
import stickyNote1 from './static/images/stickyNoteYellow-removebg-preview.png';
import stickyNote2 from './static/images/stickyNoteYellow-removebg-preview.png';
import './CheckList.css';

const CheckList = () => {
  const [items, setItems] = useState([]); // <--- This defines `items`

  const addItem = () => {
    setItems([...items, { id: Date.now() }]);
  };

  return (
    <div className="current-tasks">
      <div class="button-div">
        <img src={redCircle} alt="red circle" className="red-circle"/>
        {/* <button class="add-task-btn" onClick={this.createItem}>add tasks</button> */}
        <button class="add-task-btn" onClick={addItem}>add tasks</button>
      </div>
      <div className="lists-row">
        <div className="lists-col">
          {/* <img src={redCircle} alt="red circle" className="red-circle"/> */}
          <span className="incomplete-list">current tasks</span>
          <img src={stickyNote1} alt="sticky note" className="sticky-note1"/>
          <span className="incomplete-list" onClick={() => this.displayCompleted(false)}>
            current tasks
          </span>

          {items.map(item => (
            <div key={item.id} className="task-item">
              <input type="checkbox" className="checkbox" />
              <textarea
                placeholder="Enter text..."
                className="incomplete-list"
                rows={3}
              />
            </div>
          ))}
        </div>
      </div>
    </div>

  );
};

export default CheckList;
