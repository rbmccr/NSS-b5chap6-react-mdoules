import { Route } from 'react-router-dom'
import React, { Component } from "react"
import AnimalList from './animal/AnimalList'
import LocationList from './location/LocationList'
import EmployeeList from './employee/EmployeeList'
import OwnerList from './owner/OwnerList'
import AnimalManager from "./../modules/AnimalManager"
import EmployeeManager from "./../modules/EmployeeManager"
import OwnerManager from "./../modules/OwnerManager"
import LocationManager from "./../modules/LocationManager"

class ApplicationViews extends Component {

  componentDidMount() {

    AnimalManager.getAll().then(allAnimals => {
      this.setState({
        animals: allAnimals
      })
    })
    EmployeeManager.getAll().then(allEmployees => {
      this.setState({
        employees: allEmployees
      })
    })
    LocationManager.getAll().then(allLocations => {
      this.setState({
        locations: allLocations
      })
    })
    OwnerManager.getAll().then(allOwners => {
      this.setState({
        owners: allOwners
      })
    })

  }

  deleteAnimal = (id) => {
    return AnimalManager.delete(id)
    .then(animals => this.setState({
        animals: animals
      })
    )
  }


  fireEmployee = id => {
    return fetch(`http://localhost:5002/employees/${id}`, {
      method: "DELETE"
    })
      .then(e => e.json())
      .then(() => fetch(`http://localhost:5002/employees`))
      .then(e => e.json())
      .then(employees => this.setState({
        employees: employees
      })
      )
  }

  removeOwner = id => {
    return fetch(`http://localhost:5002/owners/${id}`, {
      method: "DELETE"
    })
      .then(e => e.json())
      .then(() => fetch(`http://localhost:5002/owners`))
      .then(e => e.json())
      .then(owners => this.setState({
        owners: owners
      })
      )
  }

  //join table
  animalsOwned = [
    { id: 1, animalId: 1, ownerId: 1 },
    { id: 2, animalId: 1, ownerId: 2 },
    { id: 3, animalId: 2, ownerId: 3 },
    { id: 4, animalId: 3, ownerId: 4 },
    { id: 5, animalId: 4, ownerId: 5 },
    { id: 6, animalId: 5, ownerId: 6 },
    { id: 7, animalId: 6, ownerId: 6 }
  ]

  state = {
    owners: [],
    locations: [],
    animals: [],
    employees: []
  }

  render() {
    return (
      <React.Fragment>
        <Route exact path="/" render={(props) => {
          return <LocationList locations={this.state.locations} />
        }} />
        <Route path="/animals" render={(props) => {
          return <AnimalList animals={this.state.animals} owners={this.state.owners} animalsOwned={this.animalsOwned} deleteAnimal={this.deleteAnimal} />
        }} />
        <Route path="/employees" render={(props) => {
          return <EmployeeList employees={this.state.employees} fireEmployee={this.fireEmployee} />
        }} />
        <Route path="/owners" render={(props) => {
          return <OwnerList owners={this.state.owners} removeOwner={this.removeOwner} />
        }} />
        <Route path="/search"></Route>
      </React.Fragment>
    )
  }
}

export default ApplicationViews