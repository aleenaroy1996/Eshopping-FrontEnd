import React,{useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


export const Register = () =>{
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [userName,setUserName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [role,setRole] = useState('');
    const [contactNumber,setContactNumber] = useState('');
   
    const [data,setData] = useState('');
    const [error,setError] = useState('');

    let navigate = useNavigate();

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(userName);

    
       

        //// GET REQUEST FOR REST API - working
        const user ={
            firstName: firstName,
            lastName: lastName , 
            userName: userName,
            email: email,
            password: password,
            role: role,
            contactNumber: contactNumber    
        }

        axios.post('/admin/api/v1.0/shopping/register',user)
        .then(res =>
          {
              if(res.status ===201 || res.status ===200 ){
                 setData(res.data);
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
           ;

      
       
    
    }

    const onInputChange = (e) => {
        const val = e.target.value;
        console.log('Input value: ', val);
     
        const re = /^[a-zA-Z ]*$/;
        if (val === "" || re.test(val)) {
          setFirstName(val);
        }
      }

    const onValueChange = (e) => {
        const val = e.target.value;
        console.log('Input value: ', val);
     
        const re = /^[a-zA-Z ]*$/;
        if (val === "" || re.test(val)) {
          setLastName(val);
        }
      }
    

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
            
            <form className="register-form" onSubmit={handleSubmit}>
                
                <label htmlFor="firstName">First Name</label>
                <input value={firstName} onChange={onInputChange} id="firstName" name="firstName" placeholder="Enter your first name" required/>

                <label htmlFor="lastName">Last Name</label>
                <input value={lastName} onChange={onValueChange} id="lastName" name="lastName" placeholder="Enter your last time" required/>
                
                <label htmlFor="userName">User Name</label>
                <input value={userName} onChange={(e)=>setUserName(e.target.value)} id="userName" name="userName" placeholder="Enter a username" required/>

                <label htmlFor="email">Email Address</label>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" id="email" name="email" placeholder="Youremail@example.com" required/>

                <label htmlFor="password">Password</label>
                <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="******" id="password" name="password" required/>

                <label htmlFor="role">Role</label>
                <select className ="dropdown-container" value={role} onChange={(e)=>setRole(e.target.value)} id="role" name="role" required>
                    <option className="dropdown-input" >--Select Role--</option>
                    <option className="dropdown-input" value="ADMIN" >ADMIN</option>
                    <option className="dropdown-input" value="CUSTOMER">CUSTMOER</option>
                </select>


                <label htmlFor="ccontactNumberontactNo">Contact Number</label>
                <input value={contactNumber} onChange={(e)=>setContactNumber(e.target.value)}  id="contactNumber" name="contactNo" pattern="\d{10}"  placeholder="Enter a valid 10 digit contact number" required/>
                
                
               
                
                
                

                <button type="submit">Register</button>
            </form>
            {data && <p>{data}</p>}
            {error && <p>{error}</p>}
            <button onClick={()=>navigate('/login')} className="link-btn" >Already have an account? Login here.</button>
        </div>
   ) 
}