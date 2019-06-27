import React,{Component} from 'react';
import NavBar from './components/NavBar/NavBar';
import Logo from './components/Logo/Logo';
import DataRank from './components/DataRank/DataRank';
import SearchBarButton from './components/SearchBarButton/SearchBarButton';
import ImageSpace from  './components/ImageSpace/ImageSpace';
import SignIn from  './components/SignIn/SignIn';
import Register from  './components/Register/Register';
import './App.css';
import 'tachyons';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: '0e6b29f0950e40f795ae85852e4667b0'
})

const particlesOpt={
  particles:{
    number: {
      value:80,
      density: {
        enable: true,
        value_area:800
      }
    }
  }  
}

const totalState= {
      searchBar: '',
      detectImg: '',
      box: {},
      route:'signin',
      isUserOn: false,
      user:{
        id:'',
        name:'',
        email:'',
        password: '' ,
        DateOpened:'',
        entries: ''
      }
    }

class App extends Component{
  constructor() {
    super()
    this.state=totalState
  }

  loadUser=(data)=>{
    this.setState({user:{
        id:data.id,
        name:data.name,
        email:data.email,
        password: data.password ,
        DateOpened:data.DateOpened,
        entries: data.entries
    }})
  }

  afterDetect=(data)=>{
      const result = data.outputs[0].data.regions[0].region_info.bounding_box ;
      const place= document.getElementById('ispace');
      const width= Number(place.width);
      const height= Number(place.height);
      return{
        topRow:result.top_row * height,
        rightCol: width - (result.right_col * width),
        leftCol: result.left_col * width,
        bottomRow: height -(result.bottom_row * height)
        
       }
    }

    workingBox=(box)=> {
      this.setState({box:box})
      
    }

  onSearchField=(event)=>{
    this.setState({searchBar:event.target.value})
    
  }

  onDetectField=()=>{
    this.setState({detectImg:this.state.searchBar})
    app.models.predict(Clarifai.FACE_DETECT_MODEL,this.state.searchBar)
    .then(response=> {
      if(response){
        fetch('http://localhost:3001/rank',{
          method: 'put',
          headers: {'Content-Type':'application/json'}, 
          body:JSON.stringify({
          id:this.state.user.id
          })
        })  
            .then(resp=>resp.json())
            .then(count=>{
              this.setState(Object.assign(this.state.user,{entries:count}))
            })
              .catch(err=>console.log(err))

        
      }
          this.workingBox(this.afterDetect(response))
              
    }).catch(err=>console.log(err));
  }

  onRouteEffects=(route)=> {
    if(route === 'signout' ){
      this.setState(totalState)
    }else if (route === 'home'){
      this.setState({isUserOn:true})
    }
    this.setState({route:route})
  }

render(){
    return (
      <div>
        <Particles params={particlesOpt} className='workPar' />
        <NavBar onRouteEffects={this.onRouteEffects} isUserOn={this.state.isUserOn}/>
        {this.state.route === 'home'
         ?<div>
        <Logo />
        <DataRank rank={this.state.user.entries} name={this.state.user.name} />
        <SearchBarButton onSearchField={this.onSearchField} onDetectField={this.onDetectField}/>
        <ImageSpace detectImg={this.state.detectImg} box={this.state.box}/>
          </div>
         :(
          this.state.route === 'signin' 
          ?<SignIn  onRouteEffects={this.onRouteEffects} loadUser={this.loadUser}/> 
          :<Register onRouteEffects={this.onRouteEffects} loadUser={this.loadUser} />
         )
        }
        
        
      </div>
      );
  }
}


export default App;
