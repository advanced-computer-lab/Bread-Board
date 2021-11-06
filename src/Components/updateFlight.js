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
              <label htmlFor="title">Flight Number</label>
              <input
                type='text'
                placeholder='Title of the Book'
                name='title'
                className='form-control'
                value={this.state.title}
                onChange={this.onChange}
              />
            </div>
            <br />

            <div className='form-group'>
            <label htmlFor="isbn">ISBN</label>
              <input
                type='text'
                placeholder='ISBN'
                name='isbn'
                className='form-control'
                value={this.state.isbn}
                onChange={this.onChange}
              />
            </div>

            <div className='form-group'>
            <label htmlFor="author">Author</label>
              <input
                type='text'
                placeholder='Author'
                name='author'
                className='form-control'
                value={this.state.author}
                onChange={this.onChange}
              />
            </div>

            <div className='form-group'>
            <label htmlFor="description">Description</label>
              <input
                type='text'
                placeholder='Describe this book'
                name='description'
                className='form-control'
                value={this.state.description}
                onChange={this.onChange}
              />
            </div>

            <div className='form-group'>
            <label htmlFor="published_date">Published Date</label>
              <input
                type='date'
                placeholder='published_date'
                name='published_date'
                className='form-control'
                value={this.state.published_date}
                onChange={this.onChange}
              />
            </div>
            <div className='form-group'>
            <label htmlFor="publisher">Publisher</label>
              <input
                type='text'
                placeholder='Publisher of this Book'
                name='publisher'
                className='form-control'
                value={this.state.publisher}
                onChange={this.onChange}
              />
            </div>

            <button type="submit" className="btn btn-outline-info btn-lg btn-block">Update Book</button>
            </form>
          </div>

        </div>
      </div>
    );
  }
}

export default updateFlight;