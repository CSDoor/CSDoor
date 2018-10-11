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
      // countries: ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"]
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