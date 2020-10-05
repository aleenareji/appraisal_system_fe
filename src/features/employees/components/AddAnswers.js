import React, { Component } from 'react';
import * as Survey from 'survey-react';
import 'survey-react/survey.css';

import history from '../../../common/history';


class AddAnswers extends Component {
  componentWillMount() {
    Survey
      .StylesManager
      .applyTheme("modern");
  }

  onComplete = (result) => {

    var test = JSON.stringify(result.data);
    console.log('test--->', test);
  }
  onValueChanged = (result) => {
    console.log("heyho");
  }
  onClearButton =() => {
    history.push('/dashboard/answers');
  }

  render() {

    const response = localStorage.getItem('questions');
    console.log('response ------>', response);
    const updatedQuestions = JSON.parse(response);  
    console.log('updatedQuestions ->', updatedQuestions);
    const _mapToQuestions = updatedQuestions[0].roles.levels.questions;
    console.log('_mapToQuestions 1----->', _mapToQuestions);

    var json = {
      title: "Add Answers", 
      pages: [
        {questions:_mapToQuestions}
      ]
    };

    var model = new Survey.Model(json);
    console.log("model=--->",model);
    return (
      <React.Fragment>
      <Survey.Survey model={model}
        onComplete={this.onComplete}
        completedHtml="Thank you for submitting the answers"
        completeText="Submit"
        showCompletedPage={false}
        allowClear ={true}
        onValueChanged={this.onValueChanged} />
        <button className ="cancel-button" onClick={this.onClearButton}>
          Cancel
        </button>
        </React.Fragment>
    );
  }
}
export default AddAnswers;