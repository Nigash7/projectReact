import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar.js";

function Home() {
  const [item, setItem] = useState("");
  const [list, setList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  const [deleteIndex, setDeleteIndex] = useState(null); // track which item to delete


  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const storageKey = loggedInUser ? `todoList_${loggedInUser.email}` : "todoList";

  // Add or update item
  const handleAdd = () => {
    if (item.trim() === "") return;

    const now = new Date();
    const dateOnly = now.toLocaleDateString(); // only date (no time)
    const dateStr = now.toLocaleString();

    // Check if today already exists
    const existingIndex = list.findIndex((entry) => entry.dateOnly === dateOnly);

    if (existingIndex !== -1) {
      // Replace today’s entry
      const updatedList = [...list];
      updatedList[existingIndex] = { text: item, date: dateStr, dateOnly };
      setList(updatedList);
    } else if (editIndex !== null) {
      // Manual edit
      const updatedList = [...list];
      updatedList[editIndex] = { text: item, date: dateStr, dateOnly };
      setList(updatedList);
      setEditIndex(null);
    } else {
      // Add new item at the beginning
      setList([{ text: item, date: dateStr, dateOnly }, ...list]);
    }

    setItem("");
  };

  const handleDelete = (index) => {
    if(window.confirm("Are you sure you want to delete this item?")){
    const updatedList = list.filter((_, i) => i !== index);
    setList(updatedList);
    setSelected(selected.filter((i) => i !== index));}
    
  };
  const handleDeleteClick = (index) => {
  setDeleteIndex(index); // set the item index to delete
  const modal = new window.bootstrap.Modal(document.getElementById("deleteModal"));
  modal.show();
};
const confirmDelete = () => {
  if (deleteIndex !== null) {
    const updatedList = list.filter((_, i) => i !== deleteIndex);
    setList(updatedList);
    setSelected(selected.filter((i) => i !== deleteIndex));
    setDeleteIndex(null);
  }
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

  const goToPage = (pageNumber) => setCurrentPage(pageNumber);

  const handleCheckbox = (absoluteIndex) => {
    if (selected.includes(absoluteIndex)) {
      setSelected(selected.filter((i) => i !== absoluteIndex));
    } else {
      if (selected.length < 2) setSelected([...selected, absoluteIndex]);
      else alert("You can select only 2 items for comparison.");
    }
  };

  const handleCompare = () => {
    if (selected.length !== 2) {
      alert("Please select exactly 2 items to compare.");
      return;
    }
    const itemsToCompare = selected.map((i) => list[i]);
    navigate("/compare", { state: { itemsToCompare } });
  };

  // Load list from localStorage on page load
  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem(storageKey));
    if (savedList) {
      setList(savedList);
    }
  }, [storageKey]);

  // Save list to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(list));
  }, [list, storageKey]);

  return (
   
    <div>
       {/* // ----------------------------------------------------------- ---------------*/}
    <div className="modal fade" id="deleteModal" tabIndex="-1" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Confirm Delete</h5>
        
      </div>
      <div className="modal-body">
        Are you sure you want to delete this weight?
      </div>
      <div className="modal-footer">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" >close</button>
        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={confirmDelete}>
          Delete
        </button>
      </div>
    </div>
  </div>
</div>
  {/* ---------------------------------------------------------------------------------------------- */}
      <Navbar />
      <hr />
      <div className="container mt-4 col-12">
        <h2 className="heading">Weight loss management site</h2>

        <div className="d-flex mb-3 col-6">
          <h4 className="col-4">Current weight</h4>
          <input
            type="number"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            placeholder="Enter weight"
            className="form-control me-2 col-5"
          />
          <button onClick={handleAdd} id="add" className="btn btn-primary">
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </div>

        
        <ul className="list-group col-6">
          {currentItems.map((liItem, index) => {
            const absoluteIndex = firstIndex + index;
            return (
              <li
                key={absoluteIndex}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <h5>
                    <strong>
                      {liItem.text} <small>kg</small>
                    </strong>
                  </h5>
                  <small className="text-muted">{liItem.date}</small>
                </div>
                <div>
                  <input
                    id="check"
                    type="checkbox"
                    className="me-2"
                    checked={selected.includes(absoluteIndex)}
                    onChange={() => handleCheckbox(absoluteIndex)}
                  />
                  <button
                    onClick={() => handleEdit(absoluteIndex)}
                    className="btn btn-sm btn-warning me-2"
                  >
                    Edit
                  </button>
                  <button 
                   onClick={() => handleDeleteClick(index)}
                    className="btn btn-sm btn-danger"
                     data-toggle="modal" data-target="#exampleModal"
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
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
      </div>
    </div>
  );
}

export default Home;
