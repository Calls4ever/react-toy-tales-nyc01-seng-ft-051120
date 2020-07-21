import React, { Component } from 'react';

class ToyForm extends Component {

  render() {
    const {name, handleChange, handleSubmit, image}=this.props
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={handleSubmit}>
          <h3>Create a toy!</h3>
          <input type="text" name="name" value={name} placeholder="Enter a toy's name..." className="input-text" onChange={handleChange}/>
          <br/>
          <input type="text" name="image" value={image}  placeholder="Enter a toy's image URL..." onChange={handleChange} className="input-text"/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
