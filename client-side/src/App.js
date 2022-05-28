import React,{useState,createContext,useEffect} from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Nav from './Nav';
import Register from './Register';
import Login from './Login';
import Myprofile from './Myprofile';

export const store = createContext();

const App = () => {


  const [token,setToken] = useState(null);
  return (
    <div>
      <store.Provider value={[token,setToken]}>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/myprofile' element={<Myprofile/>} />
        </Routes>
      </BrowserRouter>
      </store.Provider>
    </div>
  )
}

export default App