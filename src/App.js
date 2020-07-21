import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

import data from './data'


class App extends React.Component{

  state = {
    toys: [],
    display: false, 
    newToy: {likes: 0}
  }

    componentDidMount(){
      fetch('http://localhost:3000/toys')
      .then(r=>r.json())
      .then(toys=>{
        this.setState({toys})
      })
    }

    handleLike=(id)=>{
      
      fetch(`http://localhost:3000/toys/${id}`,{
        method: 'PATCH',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          likes: parseInt(this.state.toys.find(toy=>toy.id==id).likes)+1
        })
      })
      .then(res=>res.json())
      .catch(error=>console.log(error))
      .then(updatedToy=>{
        this.setState({toys: this.state.toys.map(toy=>{
          if(toy.id==id){
            return updatedToy
          }else return toy
        })})
      })
    }
    handleDelete=id=>{
      fetch(`http://localhost:3000/toys/${id}`,{method: "DELETE"})
      this.setState({toys: this.state.toys.filter(toy=> toy.id!=id)})
    }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }
   handleNewToyChange=e=>{
     this.setState({newToy: {...this.state.newToy, [e.target.name]: e.target.value}})
   }
   
   handleNewToySubmit=e=>{
     e.preventDefault()
     fetch('http://localhost:3000/toys', {
       method: 'POST',
       headers: {
         accept: 'application/json',
         'content-type': 'application/json'
       },
       body: JSON.stringify(this.state.newToy)
     })
     .then(res=>res.json())
     .then(createdToy=>{
       this.setState({toys: [...this.state.toys, createdToy],
      newToy: {likes: 0, 
                name: '',
                image: ''},
              display: !this.state.display})
     })

   }

  render(){
    console.log(this.state.newToy)
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm newToy={this.state.newToy}
          handleChange={this.handleNewToyChange}
          handleSubmit={this.handleNewToySubmit}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} 
        handleLike={this.handleLike}
        handleDelete={this.handleDelete}/>
      </>
    );
  }

}

export default App;
