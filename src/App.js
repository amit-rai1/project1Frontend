import React from 'react';
import { Routes, Route } from "react-router-dom"
import RegistrationForm from './features/RegistrationForm';
import UserPageList from './features/UserPageList';



function App() {
  return (
      <div>
        <Routes>
        
        <Route path="/" element={ <RegistrationForm/> } />
          <Route path="/UserPageList" element={ <UserPageList/> } />

        </Routes>
      </div>
  );
}

export default App;
