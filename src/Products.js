import React from "react";
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from "react";
import axios from 'axios';
import {Card } from 'react-bootstrap';
import { FaSistrix } from "react-icons/fa";
import './search.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Products = ()=>{
    //window.location.reload(); 
    let navigate = useNavigate();
    const [data,setData] = useState('');
    const [error,setError] = useState('');
    const [searchItem,setSearchItem] = useState('');
    const [items,setItems] = useState([]);

    useEffect(() => {
      axios.get(`/customer/api/v1.0/shopping/all`).then(res=>setItems(res.data.productEntityList));
      console.log("useeffect")
      },[]);

    // setUserName(sessionStorage.getItem("user"));
    console.log(items)
    // const getAllItem = (e)=>{
        
    //     e.preventDefault();
    //     // console.log(userName);
        
    //     axios.get('http://localhost:8522/api/v1.0/shopping/all').then(res =>{
    //         console.log(res.data)
           
    //     }).catch((err)=>{
    //         /// console.log(err.message);        
    //         setError("Something went wrong!!" + err.message);});
    //    ;

    //     // sessionStorage.clear();
    // }

    const getItem = (e)=>{
        
        e.preventDefault();
        // console.log(userName);
        
        axios.get(`/customer/api/v1.0/shopping/products/search/${searchItem}`)
        .then(res =>
          {
            console.log(res.data)
              if(res.status===200 && res.data.hasOwnProperty("productEntityList")){
                console.log(res.data.productEntityList);
                setItems(res.data.productEntityList);
              }else if(res.status===200 && res.data.hasOwnProperty("message")){
                setError(res.data.message);
                console.log(error);
              }
              else{
                setError("Something went wrong!! Please try later!!")
              }
          }).catch((err)=>{
            /// console.log(err.message);        
            setError("Something went wrong!!" + err.message);});
       ;

    //     // sessionStorage.clear();
    }

    function deleteItem (name,id){

      console.log("clicked delete button")
      if(sessionStorage.getItem("userrole")==="CUSTOMER"){
        toast.warning('Only ADMIN has the rights to Delete items!!',{position: toast.POSITION.TOP_CENTER})
      }else{
        const token = sessionStorage.getItem("token");
        console.log(`Bearer ${token}`);
        axios.delete(`/admin/api/v1.0/shopping/${name}/delete/${id}`,{
          headers:{
              Authorization: `Bearer ${token}`
          }
        })
        .then(res =>{
            if(res.status ===200 ){
                setData(res.data.message);
                window.location.reload();
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
     
    }

    function updateItem(item){
      console.log("clicked update button")
      console.log(item)
      if(sessionStorage.getItem("userrole")==="CUSTOMER"){
        toast.warning('Only ADMIN has the rights to Update items!!',{position: toast.POSITION.TOP_CENTER})
       }else{
        navigate('/update',{state:{ itm:item}});
       }
      
    }

    const addItem = (e)=>{
      e.preventDefault();
 
      if(sessionStorage.getItem("userrole")==="CUSTOMER"){
          toast.warning('Only ADMIN has the rights to Add items!!',{position: toast.POSITION.TOP_CENTER})
        }else{
        navigate('/addproduct');
        }
    }
    
    return (
      <div >
        <div>
          <div className="input-box">
                <div className="input-wrapper">
                  <FaSistrix id="search-icon"/>
                  <input className="input-focus input-search" type="text" placeholder="Type to search" onChange={(e) => setSearchItem(e.target.value)}/>
                  
                </div>
                <button className="searchbutton" disabled={!searchItem}onClick={getItem}>Search</button>
          </div>
          <br></br>
          {error && <p className="error">{error}</p>}
          {data && <p className="error">{data}</p>}
          <br></br>
           {items.map((item)=>(
            <div className="Product-display">
            <Card className="shadow p-3 m-2 bg-body-tertiary rounded" style={{ width: '18rem' }}>
              <Card.Img className="p-2" variant="top" style={{ height: '12rem' }}
               src={require(`C:/Users/2196078/OneDrive - Cognizant/Pictures/${item.name}.png`)} />
              <Card.Body >
                <Card.Title className="text-dark">{item.name}</Card.Title>
                <Card.Text className="text-dark">{item.description}</Card.Text>
                <Card.Text className="text-dark">{item.feature}</Card.Text>
                <h3 className="text-dark">Price: ₹ {item.price }</h3>
                <h6 className="text-dark">{item.status}</h6>
                <div className="Admin-button">
                <button onClick={()=>updateItem(item)} className="btn btn-primary">Update</button>
                <ToastContainer />
                <button onClick={()=>deleteItem(item.name,item.id)}  className="btn btn-primary">Delete</button>
                <ToastContainer />
                </div>
              </Card.Body>
            </Card>
            </div> 
            ))}
        
        </div> 
        <button onClick={addItem} className="search-button" >Add Product</button>
        </div>
        
    )
} 