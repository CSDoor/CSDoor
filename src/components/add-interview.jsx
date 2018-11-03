import React from 'react';
import autocomplete from '../autocomplete/autocomplete.js';
import axios from 'axios';

// material ui
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const radioStyle = {
  display: 'flex'
}

class AddInterview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company: '',
      createdBy: '',
      type: '',
      difficulty: '',
      language: '',
      question: '',
      companies: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleAddInterview = this.handleAddInterview.bind(this); 
    this.handleLanguages = this.handleLanguages.bind(this); 
    this.fetchCompanies = this.fetchCompanies.bind(this); 
    this.autocomplete = autocomplete.bind(this); 
  }

  fetchCompanies() {
    axios.get('/getCompanies')
    .then(response => {
      const newCompanies = response.data;
      const companies = this.state.companies
      const oldCompaniesLength = companies.length;  
      for (let i = oldCompaniesLength; i < newCompanies.length; i += 1) {
        companies.push(newCompanies[i].name)
      }
      console.log('fetched companies', companies); 
      this.setState({companies})
    })
    .catch(err => console.log(err))
  }

  handleAddInterview(e) {
    e.preventDefault(); 
    // define variables for entry verification 
    const companyLength = this.state.company.length;
    const createdByLength = this.state.createdBy.length;
    const typeLength = this.state.type.length;
    const diffculty = this.state.diffculty;
    const languageLength = this.state.language.length;
    const questionLength = this.state.question.length;

    // check for all fields being entered
    if (companyLength > 0 && createdByLength > 0 && typeLength > 0, diffculty >= 0, languageLength > 0, questionLength > 0) {
      const resetState = {
        company: '',
        createdBy: '',
        type: '',
        difficulty: '',
        language: '',
        question: ''
      }
      const interview = this.state
      axios.post('/addInterview', interview)
        .then(response => {
          // if a company was added, add to autocomplete
          if (response.data.length > 0) {
            const companies = this.state.companies;
            companies.push(response.data);
            this.setState({companies}); 
          }
        })
      this.setState(resetState); 
    } else {
      console.log('fill out the form!')
    }
  }

  handleLanguages(event, index, value) {
    this.setState({language: value})
  }

  handleChange(event, value) {
    let obj = {}
    // if radio button was selected
    if (value) {
      obj.type = value; 
    } 
    // input was entered
    else {
      obj[event.target.name] = event.target.value; 
    }
    this.setState(obj)
  }

  componentDidMount() {
    this.autocomplete(document.getElementById("select-company"), this.state.companies);
    this.fetchCompanies(); 
  }
  
  render() {
    return (
      <div id='add-interview-container'>
        <h2>Post Interview</h2>
        <form id='interview-form' onSubmit={this.handleAddInterview}>
        <div className='flex'>
          <div className='autocomplete-input-container'>
            <input
              value={this.state.company}
              name='company' 
              id='select-company' 
              placeholder='company'
              onChange={this.handleChange}
              ></input>
          </div>

          <input 
            id='question-difficulty'
            value={this.state.difficulty}
            name="difficulty" 
            placeholder="Difficulty"
            onChange={this.handleChange}
            >
          </input>
        </div>

          <input 
            value={this.state.createdBy}
            name="createdBy" 
            placeholder="Created By"
            onChange={this.handleChange}
          >
          </input>

      
            <SelectField 
                floatingLabelText='Language'
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

            <RadioButtonGroup style={radioStyle} onChange={this.handleChange}>
              <RadioButton
                label="System Design"
                value="System Design"
                id='button-test'
                />
              <RadioButton
                label="Algorithm"
                value="Algorithm"
                />
            </RadioButtonGroup>

          <input 
            value={this.state.question}
            id='post-question'
            name="question" 
            placeholder="Question"
            onChange={this.handleChange}
          >
          </input>
          
          <input className='submit' type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

export default AddInterview;