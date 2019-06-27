
import React from 'react'

class SignIn extends React.Component{
	constructor(props){
		super(props)
		this.state={
			email: '',
			password: ''
		}
	}

	forMail=(event)=>{
		this.setState({email:event.target.value})
	}
	forPassword=(event)=>{
		this.setState({password:event.target.value})
	}

	forSubmit=()=>{
		fetch('http://localhost:3001/signin', {
			method: 'post',
			headers: {'Content-Type':'application/json'}, 
			body:JSON.stringify({
				email:this.state.email,
				password:this.state.password
			})
		})
			.then(resp=> resp.json())
			.then(user=>{
				if(user.id){
					this.props.loadUser(user);
					this.props.onRouteEffects('home')
				}
			})
				.catch(err=>console.log(err))
			this.props.onRouteEffects('home')
	}
	
	render() {
		const {onRouteEffects} = this.props
		return (
			<article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center">
			<main className="pa4 black-80 center">
			  <form className="measure ">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f2 fw6 ph0 mh0 tc">Sign In</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
			        <input onChange={this.forMail}
			        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        	type="email" 
			        	name="email-address"  
			        	id="email-address"
			         />
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
			        <input onChange= {this.forPassword}
			        	className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        	type="password" 
			        	name="password"  
			        	id="password" 
			        />
			      </div>
			    </fieldset>
			    <div className="">
			      <input 
			      	onClick={this.forSubmit} 
			      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
			      	type="submit" 
			      	value="Sign in" 
			    />
			    </div>
			    <div className="lh-copy mt3">
			      <p onClick={()=>onRouteEffects('register')} className="f6 link dim black db pointer tc">Register Here</p>
			    </div>
			  </form>
			</main>
			</article>

		)
	}	
			
}
export default SignIn;