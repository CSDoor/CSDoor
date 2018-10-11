import React, { Component } from 'react';
import { SelectField, MenuItem, TextField, RadioButtonGroup, RadioButton, RaisedButton } from 'material-ui';
export default class Filter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      company: '',
      type: '',
      difficulty: {
        min: 0,
        max: 10
      },
      date: {
        startDate: '',
        endDate: ''
      },
      language: '',
      sort: '',
      order: ''
    }

    this.handleCompany = this.handleCompany.bind(this);
    this.handleType = this.handleType.bind(this);
    this.handleDifficulty = this.handleDifficulty.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleLanguages = this.handleLanguages.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleOrder = this.handleOrder.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCompany(event) {
    this.setState({
      company: event.target.value
    })
  }

  handleType(event) {
    this.setState({
      type: event.target.value
    })
  }

  handleDifficulty(event) {
    let obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  }

  handleDate(event) {
    let obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  }

  handleLanguages(event, index, value) {
    console.log('menu item?', value);
    this.setState({
      language: value
    })
  }

  handleSort(event, index, value) {
    this.setState({
      sort: value
    })
  }

  handleOrder(event) {
    console.log('value here?', event.target.value)
    this.setState({
      order: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      company: this.state.company,
      type: this.state.type,
      difficulty: this.state.difficulty,
      language: this.state.language,
      date: this.state.date,
      order: this.state.order,
      sort: this.state.sort
    }
    console.log('hellooo');
    console.log(data);


    fetch('/filter', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then (response => response.json())
      .then (data => console.log(data))
      .catch (err => console.log(err))
  }

  render() {
    return (
      <div className='column'>
        <form onSubmit={this.handleSubmit}>
          <input name='company' onChange={this.handleCompany} placeholder='Company'/>
          <div>
            <RadioButtonGroup name='type' onChange={this.handleType}>
              <RadioButton 
                value={'algorithm'}
                label='Algorithm' />
              <RadioButton
                value={'system design'}
                label='System Design' />
            </RadioButtonGroup>
          </div>
          <div>
            <label>Difficulty:</label>
            <div>
              <label>Min: <input name='min' onChange={this.handleDifficulty} placeholder='0' /></label>
              <br/>
              <label>Max: <input name='max' onChange={this.handleDifficulty} placholder='10' /></label>
            </div>
          </div>
          <div>
            <label>Date:</label>
            <div>
              <label>Start: <input onChange={this.handleDate} placeholder='YYYY-MM-DD'/></label>
              <br/>
              <label>End: <input onChange={this.handleDate} placeholder='YYYY-MM-DD'/></label>
            </div>
          </div>
          <div>
            <SelectField 
                floatingLabelText='Languages'
                value={this.state.language}
                onChange={this.handleLanguages}>
              <MenuItem value={''} primaryText='' />
              <MenuItem value={'c++'} primaryText='C++' />
              <MenuItem value={'c'} primaryText='C' />
              <MenuItem value={'java'} primaryText='Java' />
              <MenuItem value={'javascript'} primaryText='JavaScript' />
              <MenuItem value={'php'} primaryText='Php' />
              <MenuItem value={'python'} primaryText='Python' />
              <MenuItem value={'ruby'} primaryText='Ruby' />
            </SelectField>
          </div>
          <div>
            <SelectField
                floatingLabelText='Sort by'
                value={this.state.sort}
                onChange={this.handleSort}>
              <MenuItem value={''} primaryText={''} />
              <MenuItem value={'cohort'} primaryText='Cohort' />
              <MenuItem value={'company'} primaryText='Company' />
              <MenuItem value={'date'} primaryText='Date' />
              <MenuItem value={'difficulty'} primaryText='Difficulty' />
            </SelectField>
          </div>
          <RadioButtonGroup name='order' onChange={this.handleOrder}>
              <RadioButton 
                value={'ASC'}
                label='Ascending' />
              <RadioButton
                value={'DESC'}
                label='Descending' />
            </RadioButtonGroup>
          <RaisedButton type='submit' label='SUBMIT' primary={true} />
        </form>
      </div>
    )
  }
}