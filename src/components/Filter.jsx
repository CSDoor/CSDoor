import React, { Component } from 'react';
import { SelectField, MenuItem, TextField, RadioButtonGroup, RadioButton } from 'material-ui';
export default class Filter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      company: '',
      type: '',
      difficulty: {
        min: 0,
        max: 100
      },
      date: {
        startDate: '',
        endDate: ''
      },
      languages: '',
      sort: ''
    }

    this.handleCompany = this.handleCompany.bind(this);
    this.handleType = this.handleType.bind(this);
    this.handleDifficulty = this.handleDifficulty.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleLanguages = this.handleLanguages.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  handleCompany(event) {
    this.setState({
      company: event.target.value
    })
  }

  handleType(event, index, value) {
    this.setState({
      type: value
    })
  }

  handleDifficulty(event) {
    let obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  }

  handleDate(event) {
    let obj = {};
    obj[event.target.name] = event.target.valiue;
    this.setState(obj);
  }

  handleLanguages(event, index, value) {
    this.setState({
      languages: value
    })
  }

  handleSort(event, index, value) {
    this.setState({
      sort: value
    })
  }

  handleSubmit() {}

  render() {
    return (
      <div className='column'>
        <form>
          <input placeholder='Company'/>
          <div>
            <RadioButtonGroup onChange={this.handleType}>
              <RadioButton 
                value='algorithm'
                label='Algorithm' />
              <RadioButton
                value='system design'
                label='System Design' />
            </RadioButtonGroup>
          </div>
          <div>
            <label>Difficulty:</label>
            <div>
              <label>Min: <input name='min' onChange={this.handleDifficulty} placeholder='0' value='0' /></label>
              <br/>
              <label>Max: <input name='max' onChange={this.handleDifficulty} placholder='100' value='100' /></label>
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
                value={this.state.languages}
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
          <RaisedButton type='submit' label='SUBMIT' primary={true} />
        </form>
      </div>
    )
  }
}