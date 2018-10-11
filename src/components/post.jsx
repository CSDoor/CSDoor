// import React, { Component } from 'react'

// export default class Post extends Component {
//   render() {
//     return (
//       <div className="post">
//         <text>
//           {this.props.interview}
//         </text>
//       </div>
//     )
//   }
// }

import React from 'react';
// import MobileTearSheet from './MobileTearSheet.jsx';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
    this.handleToggle = this.handleToggle.bind(this);
    this.handleNestedListToggle = this.handleNestedListToggle.bind(this);
  }

  handleToggle(){
    this.setState({
      open: !this.state.open,
    });
  };

  handleNestedListToggle(item) {
    this.setState({
      open: item.state.open,
    });
  };

  render() {
    const { interview } = this.props;
    return (
      <div className='post-container'>
          <List>
            <Subheader>{interview.question}</Subheader>
            <ListItem primaryText={'Type: ' + interview.type} />
            <ListItem primaryText={'Created By: ' + interview.createdBy}/>
            <ListItem
              primaryText={'Date: ' + Date(interview.date)}
              initiallyOpen={true}
              primaryTogglesNestedList={true}
              nestedItems={[
                <ListItem
                key={1}
                primaryText="Solutions"
                disabled={true}
                nestedItems={[
                  <ListItem key={1} primaryText="This is how I would approach it: ..." />,
                ]}
                />,
                <ListItem
                key={2}
                primaryText="Comments"
                open={this.state.open}
                onNestedListToggle={this.handleNestedListToggle}
                nestedItems={[
                  <ListItem key={1} primaryText="Bien hecho." />,
                ]}
                />,
              ]}
              />
          </List>
      </div>
    );
  }
}
