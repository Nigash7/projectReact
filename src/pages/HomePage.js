import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from './navbar.js'

function Home() {
  const [item, setItem] = useState("");
  const [list, setList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // change this to show more/less items per page
   
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const storageKey = loggedInUser ? `todoList_${loggedInUser.email}` : null;
  // Add or update item
  const handleAdd = () => {
  if (item.trim() === "") return;

  const now = new Date();
  const dateStr = now.toLocaleString();

  if (editIndex !== null) {
    // Update existing item
    const updatedList = [...list];
    updatedList[editIndex] = { text: item, date: dateStr };
    setList(updatedList);
    setEditIndex(null);
  } else {
    // Add new item **at the beginning**
    setList([{ text: item, date: dateStr }, ...list]);
  }

  setItem("");
};


  const handleDelete = (index) => {
    const updatedList = list.filter((_, i) => i !== index);
    setList(updatedList);
  };

  const handleEdit = (index) => {
    setItem(list[index].text);
    setEditIndex(index);
  };

  // Pagination logic
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = list.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(list.length / itemsPerPage);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
   const handleCheckbox = (index) => {
    if (selected.includes(index)) {
      setSelected(selected.filter((i) => i !== index));
    } else {
      if (selected.length < 2) setSelected([...selected, index]);
      else alert("You can select only 2 items for comparison.");
    }
  };
  const handleCompare = () => {
    if (selected.length !== 2) {
      alert("Please select exactly 2 items to compare.");
      return;
    }
    // Pass selected items to comparison page
    const itemsToCompare = selected.map((i) => list[i]);
    navigate("/compare", { state: { itemsToCompare } });
  };
   // Load list from localStorage on page load
  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem("todoList"));
    if (savedList) {
      setList(savedList);
    }
  }, []);

  //  Save list to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(list));
  }, [list]);

  return (
    <div>
    <Navbar />
    <hr></hr>
    <div className="container mt-4 col-12">
      <h2 className="heading" >Weight loss management sight </h2>

      <div className="d-flex mb-3 col-6">
        <h4 className="col-4"> Current weight</h4>
        <input
          type="number"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="Enter item"
          className="form-control me-2 col-5"
        />
        <button onClick={handleAdd} id="add" className="btn btn-primary">
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      {/* List */}
      <ul className="list-group col-6">
        {currentItems.map((liItem, index) => (
          <li
            key={firstIndex + index} // correct key for pagination
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>

              <h5 id="h5">  <strong >{liItem.text} <small> kg</small> </strong></h5>
              
              <medium className="text-muted">{liItem.date}</medium>
              
            </div>
            <div>
               <input
               id="check"
                type="checkbox"
                className="me-2"
                checked={selected.includes(index)}
                onChange={() => handleCheckbox(index)}
              />
              <button  id="edit"
                onClick={() => handleEdit(firstIndex + index)}
                className="btn btn-sm btn-warning me-2"
              >
                Edit
              </button>
              <button id="edit"
                onClick={() => handleDelete(firstIndex + index)}
                className="btn btn-sm btn-danger"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button
        className="btn btn-success mt-3"
        onClick={handleCompare}
        disabled={selected.length !== 2}
      >
        Compare Selected
      </button>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="mt-3">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`btn btn-sm me-1 ${
                currentPage === i + 1 ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => goToPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div></div>
  );
}

export default Home;
