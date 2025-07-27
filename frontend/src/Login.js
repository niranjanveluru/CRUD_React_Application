// import React, { useState } from 'react';
// import axios from 'axios';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post('http://localhost:5000/login', { email, password });
//       localStorage.setItem('token', res.data.token);
//       window.location.href = '/dashboard';
//     } catch {
//       alert('Invalid credentials');
//     }
//   };

//   return (
//     <div>
//       <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
//       <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// }

// export default Login;


import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });

 const handleSubmit = () => {
  // Replace this with your backend URL
  axios.post('http://localhost:5000/login', form)
    .then(res => {
      const token = res.data.token;  // Get token from response
      localStorage.setItem('token', token);  // Store token
      window.location.href = '/dashboard';   // Redirect to dashboard
    })
    .catch(err => {
      console.error('Login failed:', err);
      alert('Invalid username or password');
    });
};

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>CRUD Test Application</h2>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email : e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
        <button onClick={handleSubmit}>Login</button>
      </div>
    </div>
  );
}

export default Login;