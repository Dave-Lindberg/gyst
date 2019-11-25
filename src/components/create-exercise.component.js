import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class CreateExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangePush = this.onChangePush.bind(this);
    this.onChangeReps = this.onChangeReps.bind(this);
    this.onChangeTempo = this.onChangeTempo.bind(this);
    this.onChangeWeight = this.onChangeWeight.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      description: '',
      date: new Date(),
      duration: '',
      reps: '',
      tempo: '',
      weight: '',
      users: []
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
            username: response.data[0].username
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }
  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    });
  }
  onChangeDate(date) {
    this.setState({
      date: date
    });
  }
  onChangePush(e) {
    this.setState({
      push: e.target.value
    });
  }
  onChangeReps(e) {
    this.setState({
      reps: e.target.value
    });
  }
  onChangeTempo(e) {
    this.setState({
      tempo: e.target.value
    });
  }
  onChangeWeight(e) {
    this.setState({
      weight: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
      reps: this.state.reps,
      tempo: this.state.tempo,
      weight: this.state.weight
    };
    console.log(exercise);
    axios
      .post('http://localhost:5000/exercises/add', exercise)
      .then(res => console.log(res.data));
    // window.location = '/';
  }

  render() {
    return (
      <div>
        <h3>Create New Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <label>Username: </label>
            <select
              ref='userInput'
              required
              className='form-control'
              value={this.state.username}
              onChange={this.onChangeUsername}
            >
              {this.state.users.map(function(user) {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div className='form-group'>
            <label>Description: </label>
            <input
              type='text'
              required
              className='form-control'
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className='form-group'>
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>
          <div className='form-group'>
            <label>Duration (in minutes): </label>
            <input
              type='text'
              className=''
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>
          <div className='form-group'>
            <label>Reps : </label>
            <input
              type='text'
              className=''
              value={this.state.reps}
              onChange={this.onChangeReps}
            />
          </div>
          <div className='form-group'>
            <label>Push/Pull : </label>
            <input
              type='range'
              name='push'
              min='0'
              max='1'
              className=''
              value={this.state.push}
              onChange={this.onChangePush}
            />
          </div>
          <div className='form-group'>
            <label>Tempo: </label>
            <input
              type='text'
              className=''
              value={this.state.tempo}
              onChange={this.onChangeTempo}
            />
          </div>
          <div className='form-group'>
            <label>Weight (in pounds): </label>
            <input
              type='text'
              className=''
              value={this.state.weight}
              onChange={this.onChangeWeight}
            />
          </div>

          <div className='form-group'>
            <input
              type='submit'
              value='Create Exercise Log'
              className='btn btn-primary'
            />
          </div>
        </form>
      </div>
    );
  }
}
