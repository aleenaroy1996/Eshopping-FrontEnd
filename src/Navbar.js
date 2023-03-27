import React, { useContext, useEffect } from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavbarElements';
import { authContext } from './App';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
	const {auth,setAuth} = useContext(authContext);
	useEffect(() => {
		setAuth( localStorage.getItem("isLoggedIn"))
		},[setAuth]);

	let navigate = useNavigate();
	const logout = (e)=>{
	
		e.preventDefault();
		sessionStorage.clear();
		localStorage.clear();
		setAuth("No")
		navigate('/login');
	}

return (
	<>
	<Nav>
		<Bars />

		<NavMenu>
		<NavLink to='/about' activestyle="true">
			ABOUT
		</NavLink>
		{auth==="Yes" ?null:
		<NavLink to='/login' activestyle="true">
			LOGIN
		</NavLink>
		}
		
		</NavMenu>

		{auth==="Yes" ? <NavBtn>
		<NavBtnLink onClick={logout}>Sign Out</NavBtnLink>
		</NavBtn> :
		<NavBtn>
		<NavBtnLink to='/register'>Sign Up</NavBtnLink>
		</NavBtn>}
		
	</Nav>
	</>
);
};

export default Navbar;
