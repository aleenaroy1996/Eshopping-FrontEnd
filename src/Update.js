import { useState } from "react";
import {useLocation} from 'react-router-dom';
import axios from 'axios'; 
import { useNavigate } from "react-router-dom";


// axios.interceptors.request.use(config =>{
//     const token = sessionStorage.getItem("token");
//     config.headers.Authorization = `Bearer ${token}`;
     
//     return config;
//     },error=>{
//         return Promise.reject(error);
//     });

export const Update = () =>{
    const location = useLocation();
    console.log(location.state);
    let navigate = useNavigate();

    const [data,setData] = useState('');
    const [error,setError] = useState('');


    const [name,setName] = useState(location.state.itm.name);
    const [description,setDescription] = useState(location.state.itm.description);
    const [feature,setFeature] = useState(location.state.itm.feature);
    const [price, setPrice] = useState(location.state.itm.price);
    const [quantityAvailable, setQuantityAvailable] = useState(location.state.itm.quantityAvailable);



    const updateItem = (e)=>{
        e.preventDefault();
   
        

        //// GET REQUEST FOR REST API - working
        
        // axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("token");
        const token = sessionStorage.getItem("token");
        console.log(`Bearer ${token}`+"here");
        
        const product ={
            name: name,
            description: description , 
            feature: feature,
            price: price,
            quantityAvailable: quantityAvailable, 
        }

        axios.put(`/admin/api/v1.0/shopping/${name}/update/${location.state.itm.id}`,product,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then(res =>
          {
              if(res.status ===200 ){
                 setData(res.data.message);
                 navigate('/products') 
              }
              else{
                setError("Something went wrong!! Please try later!!")
              }
              console.log(res.status);
              console.log(res.data);
              
          })
        .catch((err)=>{
                /// console.log(err.message);        
                setError("Something went wrong!!" + err.message);});

    
    }
   

    return (
        <div className="auth-form-container">
            <h2>Update Product Details </h2>
            <form className="login-form" onSubmit={updateItem}>
                <label htmlFor="name">Product Name</label>
                <input onChange={(e)=>setName(e.target.value)} id="name" name="name" defaultValue={location.state.itm.name} required/>

                <label htmlFor="description">Product Description</label>
                <input onChange={(e)=>setDescription(e.target.value)} id="description" name="description" defaultValue={location.state.itm.description} required/>
                
                <label htmlFor="feature">Feature</label>
                <input onChange={(e)=>setFeature(e.target.value)} id="feature" name="feature" defaultValue={location.state.itm.feature} required/>

                <label htmlFor="price" >Price</label>
                <input onChange={(e)=>setPrice(e.target.value)} type="number" min="0" id="price" name="price" defaultValue={location.state.itm.price} required/>                


                <label htmlFor="quantityAvailable" >Quantity Available</label>
                <input onChange={(e)=>setQuantityAvailable(e.target.value)} type="number" min="0" id="quantityAvailable" name="quantityAvailable" defaultValue={location.state.itm.quantityAvailable} required/>                
                <button type="submit" className="search-button" >Update</button>
                </form>
            <br/>
            {data && <p>{data}</p>}
            {error && <p>{error}</p>}
        </div>
        
   ) 
}