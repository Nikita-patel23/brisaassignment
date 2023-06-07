
import './App.css';



import React,{useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReposPage from './ReposPage';
import IssuePage from './IssuePage';

const App = () => {
  const [ username,setUsername] = useState("");
  useEffect(() => {
    const user = localStorage.getItem('user');
    if(user) setUsername(user);
  },[])
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ReposPage username={username} setUsername={setUsername}/>} />
        <Route path='/:user/:repo' element={<IssuePage/>} />
      </Routes>
    </Router>
  );
};

export default App;
