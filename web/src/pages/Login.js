import React, { useState } from 'react';
import logo from '../assets/logo.svg';
import './login.css';
import api from '../services/api'

export default function Login( {history} ) {
  const [username, setUsername]=useState('');

  async function Login(e){
    e.preventDefault();
    try {
      const response = await api.post('/login',{
      username,
    });
    const { _id }=response.data; 
      localStorage.setItem('@tindev/_id',_id)
      console.log(response.data)
      history.push('/devs');
    } catch (err) {
      alert('Dev não encontrado')
      console.error(err);
    }
   
  }
  return (
    <div className="login-container" >
      <form onSubmit={Login}> 
        <img src={logo} alt="tindev"/>
        <input placeholder="digite seu usario do Github"
        value={username}
        onChange={e => setUsername(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  
  );
}


