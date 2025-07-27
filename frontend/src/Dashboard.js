import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

// 🚀 Axios interceptor to add token to every request
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

function Dashboard() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/items')
      .then(res => setItems(res.data))
      .catch(err => console.error('Fetch items failed:', err.response?.data || err.message));
  }, []);

  const createItem = (e) => {
    e.preventDefault(); // prevent page reload from form submit

    axios.post('http://localhost:5000/items', form)
      .then(() => {
        setForm({ name: '' });
        window.location.reload(); // or refetch items instead of reload
      })
      .catch(error => {
        console.error('Create item failed:', error.response?.data || error.message);
        alert('Failed to create item. Please add item name.');
      });
  };

  const updateItem = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:5000/items/${editId}`, form)
      .then(() => {
        setForm({ name: '' });
        setEditId(null);
        window.location.reload();
      })
      .catch(error => {
        console.error('Update item failed:', error.response?.data || error.message);
        alert('Update failed. Check token or API access.');
      });
  };

  const deleteItem = (id) => {
    axios.delete(`http://localhost:5000/items/${id}`)
      .then(() => window.location.reload())
      .catch(err => {
        console.error('Delete failed:', err.response?.data || err.message);
        alert('Could not delete item. Is token valid?');
      });
  };

  const startEditing = (id, name) => {
    setEditId(id);
    setForm({ name });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="dashboard-box">
        <h2 style={{ textAlign: 'center' }}>Dashboard</h2>

        <form className="form-row" onSubmit={editId !== null ? updateItem : createItem}>
          <input
            type="text"
            placeholder="Item name"
            value={form.name}
            onChange={e => setForm({ name: e.target.value })}
          />
          <button type="submit">
            {editId !== null ? 'Update' : 'Add'}
          </button>
        </form>
        <ul className="item-list">
          {items.map((item) => (
            <li key={item.id}>
              {item.id}. {item.name}
              <div>
                <button onClick={() => startEditing(item.id, item.name)}>Edit</button>
                <button onClick={() => deleteItem(item.id)}>Delete</button>
              </div>
            </li>
         ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;