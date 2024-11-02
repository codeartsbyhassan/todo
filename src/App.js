import React, { useState } from 'react';
import './App.css';
import logo from './assets/images/logo.png';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, { text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const toggleTodo = (index) => {
    const newTodos = todos.map((todo, i) => {
      if (i === index) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const confirmed = window.confirm("Are you sure you want to delete this todo?");
    if (confirmed) {
      const newTodos = todos.filter((_, i) => i !== index);
      setTodos(newTodos);
    }
  };

  const indexOfLastTodo = currentPage * itemsPerPage;
  const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  const totalPages = Math.ceil(todos.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="App">
      <img src={logo} className='logo' alt="Logo" />
      <h1 className='main-heading'>Todo List</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {currentTodos.map((todo, index) => (
          <li key={index + indexOfFirstTodo} className={todo.completed ? 'completed' : ''}>
            <strong>{index + indexOfFirstTodo + 1}.</strong>
            <span className="todo-text">{todo.text}</span>
            <div>
              <button onClick={() => toggleTodo(index + indexOfFirstTodo)} className="check-buttons">
                {todo.completed ? <i className="fas fa-undo"></i> : <i className="fas fa-check"></i>}
              </button>
              <button onClick={() => deleteTodo(index + indexOfFirstTodo)}>
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
      {todos.length >= itemsPerPage && (
        <div className="pagination-container">
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button key={index + 1} onClick={() => handlePageChange(index + 1)} className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}>
                {index + 1}
              </button>
            ))}
          </div>
          <div className="pagination-info">
            Showing {currentTodos.length} of {todos.length} tasks
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
