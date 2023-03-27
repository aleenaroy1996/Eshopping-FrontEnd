import React ,{useState,createContext} from "react";
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import './App.css';
import {Login} from './Login';
import {About} from './About';
import {Update} from './Update';
import {Register} from './Register';
import {Products} from './Products';
import Navbar from './Navbar';
import { Addproduct } from "./Addproduct";
import {PrivateRoute} from "./PrivateRoute";

export const authContext = createContext();

function App() {
  const [auth, setAuth] = useState("No");
  return (
    <>
    <authContext.Provider value={{auth,setAuth}}>
    <div className="App">
        <Router>
          <Navbar/>
          <Routes>
              <Route path="/" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<About />} />
              <Route path="/register" element={<Register />} />

              <Route path="/update" element={<PrivateRoute child={<Update/>}/>} />
              <Route path="/addproduct" element={<PrivateRoute child={<Addproduct/>}/>} />
              <Route path="/products" element={<PrivateRoute child={<Products/>}/>} />
              
        </Routes>
        </Router>
    </div>
    </authContext.Provider>
    </>
  );
}

export default App;
