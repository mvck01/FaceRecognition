
import React from 'react'

const navBar=({onRouteEffects, isUserOn})=> {
	if(isUserOn){
		return (
			<nav style={{display:'flex', justifyContent:'flex-end'}}>
				<p onClick={()=>onRouteEffects('signout')}className='f3 link dim black pointer pa3 underline'> Sign Out </p>
			</nav>
		)
	}else{
		return (
			<nav style={{display:'flex', justifyContent:'flex-end'}}>
				<p className='f3 link dim black pointer pa3 underline' onClick={()=>onRouteEffects('signin')}> Sign In </p>
				<p className='f3 link dim black pointer pa3 underline' onClick={()=>onRouteEffects('register')}> Register </p>
			</nav>
			)
			
		}
		
			
	
}
export default navBar;