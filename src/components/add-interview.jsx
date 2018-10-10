import React from 'react';

// styling
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

class AddInterview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createdBy: '',
      type: '',
      difficulty: '',
      language: '',
      question: ''
    }
    this.handleChange = this.handleChange.bind(this); 
  }

  handleChange(inputType, event, value) {
    let obj = {}
    obj[inputType] = value; 
    this.setState(obj)
  }

  render() {
    return (
      <div>
         <Dialog
          title="Post Interview"
          modal={false}
          open={this.props.addInterview}
          onRequestClose={this.props.handleCloseAddInterview}
        >
          <form>
            <TextField
              hintText="Created By"
              floatingLabelText="Created By"
              onChange={this.handleChange.bind(null, 'createdBy')}
            />
            <TextField
              hintText="Type of Question"
              floatingLabelText="Type of Question"
              onChange={this.handleChange.bind(null, 'type')}
            />
            <TextField
              hintText="Difficulty"
              floatingLabelText="Difficulty"
              onChange={this.handleChange.bind(null, 'difficulty')}
            />
            <TextField
              hintText="Lanuage"
              floatingLabelText="Language"
              onChange={this.handleChange.bind(null, 'language')}
            />
            <TextField
              hintText="Question"
              floatingLabelText="Question"
              onChange={this.handleChange.bind(null, 'question')}
            />
          </form>
        </Dialog>
      </div>
    );
  }
}

export default AddInterview;