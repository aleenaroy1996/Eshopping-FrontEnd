import React from "react";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({child}) =>{

    
    const auth=localStorage.getItem("isLoggedIn");
    console.log(auth);
    return auth==="Yes"? child :<Navigate to="/login"/>;
}