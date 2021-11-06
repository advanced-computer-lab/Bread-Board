import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';

class updateFlight extends Component {
  constructor(props) {
    super(props);
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

  componentDidMount() {
    // console.log("Print id: " + this.props.match.params.id);
    axios
      .get('http://localhost:8000/admin/searchFlight')
      .then(res => {
        // this.setState({...this.state, book: res.data})
        this.setState({
          flightNumber: res.data.flightNumber,
          departureTime: res.data.departureTime,
          arrivalTime: res.data.arrivalTime,
          numberofEconomySeats: res.data.numberofEconomySeats,
          arrivalDate: res.data.arrivalDate,
          departureDate: res.data.departureDate,
          numberofBusinessSeats: res.data.numberofBusinessSeats,
          airport: res.data.airport
        })
      })
      .catch(err => {
        console.log("Error from Update Flight");
      })
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
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
    };

    axios
      .put('http://localhost:8000/admin/updateFlight'+this.props.match.params.id, data)
      .then(res => {
        this.props.history.push('/show-flight/'+this.props.match.params.id);
      })
      .catch(err => {
        console.log("Error in Update Flight!");
      })
  };


  render() {
    return (
      <div className="UpdateFlight">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Flight</h1>
              <p className="lead text-center">
                  Update Flight's Info
              </p>
            </div>
          </div>

          <div className="col-md-8 m-auto">
          <form noValidate onSubmit={this.onSubmit}>
            <div className='form-group'>
              <label htmlFor="flightNumber">Flight Number</label>
              <input
                type='Number'
                placeholder='Flight Number<'
                name='flightNumber'
                className='form-control'
                value={this.state.flightNumber}
                onChange={this.onChange}
              />
            </div>
            <br />

            <div className='form-group'>
            <label htmlFor="departureTime">departureTime</label>
              <input
                type='time'
                placeholder='departureTime'
                name='departureTime'
                className='form-control'
                value={this.state.departureTime}
                onChange={this.onChange}
              />
            </div>

            <div className='form-group'>
            <label htmlFor="arrivalTime">arrivalTime</label>
              <input
                type='time'
                placeholder='arrivalTime'
                name='arrivalTime'
                className='form-control'
                value={this.state.arrivalTime}
                onChange={this.onChange}
              />
            </div>

            <div className='form-group'>
            <label htmlFor="numberofEconomySeats">numberofEconomySeats</label>
              <input
                type='Number'
                placeholder='numberofEconomySeats'
                name='numberofEconomySeats'
                className='form-control'
                value={this.state.numberofEconomySeats}
                onChange={this.onChange}
              />
            </div>

            <div className='form-group'>
            <label htmlFor="arrivalDate">arrivalDate</label>
              <input
                type='date'
                placeholder='arrivalDate'
                name='arrivalDate'
                className='form-control'
                value={this.state.arrivalDate}
                onChange={this.onChange}
              />
            </div>
            <div className='form-group'>
            <label htmlFor="departureDate">departureDate</label>
              <input
                type='date'
                placeholder='departureDate'
                name='departureDate'
                className='form-control'
                value={this.state.departureDate}
                onChange={this.onChange}
              />
            </div>
            <div className='form-group'>
            <label htmlFor="numberofBusinessSeats">numberofBusinessSeats</label>
              <input
                type='number'
                placeholder='numberofBusinessSeats'
                name='numberofBusinessSeats'
                className='form-control'
                value={this.state.numberofBusinessSeats}
                onChange={this.onChange}
              />
            </div>
            <div className='form-group'>
            <label htmlFor="airport">airport</label>
              <input
                type='text'
                placeholder='airport'
                name='airport'
                className='form-control'
                value={this.state.airport}
                onChange={this.onChange}
              />
            </div>

            <button type="submit" className="btn btn-outline-info btn-lg btn-block">Update Flight</button>
            </form>
          </div>

        </div>
      </div>
    );
  }
}

export default updateFlight;