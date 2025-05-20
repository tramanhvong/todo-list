import React, { useState } from 'react';
import redCircle from './static/images/redCircle-removebg-preview.png';
import stickyNote1 from './static/images/stickyNoteYellow-removebg-preview.png';
import stickyNote2 from './static/images/stickyNoteYellow-removebg-preview.png';
import './CheckList.css';

const CheckList = () => {
  const [items, setItems] = useState([]); // <--- This defines `items`

  const addItem = () => {
    if (items.length >= 7) {
      alert("You can only add up to 6 tasks.");
      return;
    }
    setItems([...items, { id: Date.now(), text: '', checked: false }]);
  };

  const changeItem = (id, text) => {
    setItems(items.map(item => (item.id === id ? { ...item, text } : item)));
  }

  const checkItem = (id) => {
    setItems(items.map(item => (item.id === id ? { ...item, checked: !item.checked } : item)));
  }

  return (
    <div className="current-tasks">

      <div className="button-div">
        <img src={redCircle} alt="red circle" className="red-circle"/>
        <button className="add-task-btn" onClick={addItem}>add tasks</button>
      </div>

      <div className="lists-row">
        <div className="lists-col">
          <span className="incomplete-list">current tasks</span>
          <img src={stickyNote1} alt="sticky note" className="sticky-note1"/>
          <span className="incomplete-list">
            current tasks
          </span>

          <div className="task-cols">
            {items.map(item => (
              <div key={item.id} className="task-item">
                <input 
                type="checkbox" 
                className="checkbox" 
                checked={item.checked} 
                onChange={() => checkItem(item.id)}
                />
                <textarea
                  placeholder="Enter text..."
                  className="list-item"
                  rows={1}
                  value={item.text}
                  onChange={e => changeItem(item.id, e.target.value)}
                />
              </div>
            ))}
          </div>
          
        </div>

        <div className="lists-col">
          <img src={stickyNote2} alt="sticky note" className="sticky-note2"/>
          <span className="completed-list">
            past tasks
          </span>
        </div>
      </div>
    </div>

  );
};

export default CheckList;
