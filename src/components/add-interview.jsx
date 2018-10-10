import React from 'react';
import autocomplete from '../autocomplete/autocomplete.js'

// styling
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

const modalStyle = {
  width: '90vw',
  height: '90vh',
  maxWidth: 'none',
  maxHeight: 'none'
};

class AddInterview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createdBy: '',
      type: '',
      difficulty: '',
      language: '',
      question: '',
      countries: ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"]
    }
    this.handleChange = this.handleChange.bind(this); 
  }

  handleChange(event, value) {
    let obj = {}
    obj[event.target.name] = event.target.value; 
    console.log(this.state); 
    this.setState(obj)
  }

  componentDidMount() {
    autocomplete(document.getElementById("select-company"), this.state.countries);
  }

  render() {
    return (
      <div id='add-interview-container'>
        <h2>Post Interview</h2>
        <form id='interview-form'>
          <div className='autocomplete-input-container'>
            <input
              name='company' 
              id='select-company' 
              placeholder='company'
              onChange={this.handleChange}
            ></input>
          </div>
          <input 
            name="createdBy" 
            placeholder="Created By"
            onChange={this.handleChange}
          >
          </input>
          <input 
            name="question" 
            placeholder="Type of Question"
            onChange={this.handleChange}
          >
          </input>
          <input 
            name="difficulty" 
            placeholder="Question Difficulty"
            onChange={this.handleChange}
          >
          </input>
          <input 
            name="language" 
            placeholder="Programming Language"
            onChange={this.handleChange}
          >
          </input>
          <input 
            id='post-question'
            name="question" 
            placeholder="Question"
            onChange={this.handleChange}
          >
          </input>
        </form>
      </div>
    );
  }
}

export default AddInterview;