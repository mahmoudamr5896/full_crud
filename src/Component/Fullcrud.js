import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CrudComponent = () => {
  const [items, setItems] = useState([]);
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [selectValue, setSelectValue] = useState('default');
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('https://retoolapi.dev/HwZNt6/data');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const addItem = async () => {
    try {
      const newItem = { field1: inputValue1, field2: inputValue2, select: selectValue };
      await axios.post('https://retoolapi.dev/HwZNt6/data', newItem);
      fetchItems();
      setInputValue1('');
      setInputValue2('');
      setSelectValue('default');
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const removeItem = async (id) => {
    try {
      await axios.delete(`https://retoolapi.dev/HwZNt6/data/${id}`);
      fetchItems();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const updateItem = async (id) => {
    try {
      const updatedItem = { field1: inputValue1, field2: inputValue2, select: selectValue };
      await axios.put(`https://retoolapi.dev/HwZNt6/data/${id}`, updatedItem);
      fetchItems();
      setInputValue1('');
      setInputValue2('');
      setSelectValue('default');
      setEditIndex(null);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredItems = items.filter(item =>
    (item.field1 && item.field1.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.field2 && item.field2.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.select && item.select.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container">
      <div className="row mt-3">
        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Open Modal To Add items
        </button>
        <div class="container modal modal-dialog modal-xxl fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Add Item</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <label>Field 1</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Input 1"
                    value={inputValue1}
                    onChange={(e) => setInputValue1(e.target.value)}
                  />
                </div>
                <div className="row">
                  <label>Field 2</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Input 2"
                    value={inputValue2}
                    onChange={(e) => setInputValue2(e.target.value)}
                  />
                </div>
                <div className="row">
                  <label>Field 3</label>
                  <select
                    className="form-control"
                    value={selectValue}
                    onChange={(e) => setSelectValue(e.target.value)}
                  >
                    <option value="default">Select</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={editIndex === null ? addItem : () => updateItem(editIndex)}>
                  {editIndex === null ? "Add Item" : "Update"}
                </button>
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <table className="table">
            <thead>
              <tr>
                <th>Field 1</th>
                <th>Field 2</th>
                <th>Select</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.field1}</td>
                  <td>{item.field2}</td>
                  <td>{item.select}</td>
                  <td>
                    <button
                      className="btn btn-success mr-2"
                      onClick={() => {
                        setInputValue1(item.field1);
                        setInputValue2(item.field2);
                        setSelectValue(item.select);
                        setEditIndex(index);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CrudComponent;
