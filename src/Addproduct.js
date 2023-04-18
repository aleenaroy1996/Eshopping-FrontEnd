import { useState } from "react";
import axios from 'axios'; 
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';


export const Addproduct = () =>{
    
    const [name,setName] = useState('');
    const [description,setDescription] =  useState('');
    const [feature,setFeature] =  useState('');
    const [price, setPrice] =  useState('');
    const [quantityAvailable, setQuantityAvailable] =  useState('');

    const [data,setData] = useState('');
    const [error,setError] = useState('');
    let navigate = useNavigate();

    const token = sessionStorage.getItem("token");
    const addProduct = (e)=>{
        e.preventDefault();
        const product ={
            name: name,
            description: description , 
            feature: feature,
            price: price,
            quantityAvailable: quantityAvailable, 
        }
        
        axios.post(`/eshopping/admin/api/v1.0/shopping/${name}/add`,product,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then(res =>{
            if(res.status ===201  ){
                setData(res.data.message);
                navigate('/products') 
            }else if(res.status ===200  ){
                setData(res.data.message);
            }
            else{
              setError("Something went wrong!! Please try later!!")
            }
            console.log(res.status);
            console.log(res.data);
          }
              
          )
        .catch((err)=>{
            /// console.log(err.message);        
            setError("Something went wrong!!" + err.message);}
          );
          // window.location.reload(); 
      }

        
    return (
        <div className="auth-form-container">
        <h2>Add New Product</h2>
        <form className="login-form" onSubmit={addProduct}>
            <label htmlFor="name">Product Name</label>
            <input onChange={(e)=>setName(e.target.value)} id="name" name="name" placeholder="Enter product name" required/>

            <label htmlFor="description">Product Description</label>
            <input onChange={(e)=>setDescription(e.target.value)} id="description" name="description"  placeholder="Enter product description" required/>
            
            <label htmlFor="feature">Feature</label>
            <input onChange={(e)=>setFeature(e.target.value)} id="feature" name="feature"  placeholder="Enter features of the product" required/>

            <label htmlFor="price" >Price</label>
            <input onChange={(e)=>setPrice(e.target.value)} type="number" min="0" id="price" name="price"  placeholder="Enter price of product" required/>                


            <label htmlFor="quantityAvailable" >Quantity Available</label>
            <input onChange={(e)=>setQuantityAvailable(e.target.value)} type="number" min="0" id="quantityAvailable" name="quantityAvailable"  placeholder="Enter available quantity" required/>                
        
        <button type="submit" className="search-button" >Add</button>
            <ToastContainer />
        </form>
        <br/>
        
        {data && <p>{data}</p>}
        {error && <p>{error}</p>}
        
    </div>
   ) 
}
