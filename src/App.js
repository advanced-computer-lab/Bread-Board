import './App.css';
import { Component, useState,useEffect } from 'react';
import axios from 'axios';

class createFlight extends Component {
  constructor() {
    super();
    this.state = {
      flightNumber: 0,
      departureTime: "",
      arrivalTime: "",
      numberofEconomySeats: 0,
      arrivalDate: "",
      departureDate: "",
      numberofBusinessSeats: 0,
      airport: ""
    };
  }
  onChange = e => {
    this.setState({[e.target.name]:e.target.value});
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      flightNumber: this.state.flightNumber,
    departureTime: this.state.departureTime,
    arrivalTime: this.state.arrivalTime,
    numberofEconomySeats: this.state.numberofEconomySeats,
    arrivalDate: this.state.arrivalDate,
    departureDate: this.state.departureDate,
    numberofBusinessSeats: this.state.numberofBusinessSeats,
    airport: this.state.airport
    }
    axios.post("http://localhost:8000/admin/createFlight", data).then(res=>{this.setState({
      flightNumber: 0,
    departureTime: "",
    arrivalTime: "",
    numberofEconomySeats: 0,
    arrivalDate: "",
    departureDate: "",
    numberofBusinessSeats: 0,
    airport: ""}).this.props.history.push('/');}).catch(err=>console.log(err));
  };

  
  render() {
    return (
      <div className="CreateUser">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Add Flight</h1>
              <p className="lead text-center">
                  Create new Flight
              </p>

              <form noValidate onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <input
                    type='number'
                    placeholder='Flight Number'
                    name='flightNumber'
                    className='form-control'
                    value={this.state.Name}
                    onChange={this.onChange}
                  />
                </div>
                <br />

                <div className='form-group'>
                  <input
                    type='time'
                    placeholder='departureTime'
                    name='departureTime'
                    className='form-control'
                    value={this.state.Email}
                    onChange={this.onChange}
                  />
                </div>

                

                <div className='form-group'>
                  <input
                    type='time'
                    placeholder='arrivalTime    '
                    name='arrivalTime'
                    className='form-control'
                    value={this.state.Age}
                    onChange={this.onChange}
                  />
                </div>

                <div className='form-group'>
                  <input
                    type='number'
                    placeholder='numberofEconomySeats'
                    name='numberofEconomySeats'
                    className='form-control'
                    value={this.state.BornIn}
                    onChange={this.onChange}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='date'
                    placeholder='arrivalDate'
                    name='arrivalDate'
                    className='form-control'
                    value={this.state.LivesIn}
                    onChange={this.onChange}
                  />
                </div>
                <div className='form-group'>
                  <input
                     type='date'
                    placeholder='departureDate'
                    name='departureDate'
                    className='form-control'
                    value={this.state.MartialStatus}
                    onChange={this.onChange}
                  />
                </div>
                <div className='form-group'>
                  <input
                     type='number'
                    placeholder='numberofBusinessSeats'
                    name='numberofBusinessSeats'
                    className='form-control'
                    value={this.state.PhoneNumber}
                    onChange={this.onChange}
                  />
                </div>
                <div className='form-group'>
                  <input
                     type='text'
                    placeholder='airport'
                    name='airport'
                    className='form-control'
                    value={this.state.Job}
                    onChange={this.onChange}
                  />
                </div>
                

                <input
                    type="submit"
                    className="btn btn-outline-warning btn-block mt-4"
                />
              </form>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default createFlight;
/*name : req.body.name,
            Email: req.body.email,
            Age : req.body.age,
            BornIn:req.body.bornin,
            LivesIn: req.body.job,
            MartialStatus:req.body.martialstatus,
            PhoneNumber: req.body.phonenumber,
            Job:req.body.job
            */