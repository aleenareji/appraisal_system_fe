import React, { Component } from 'react';
import * as Survey from 'survey-react';
import 'survey-react/survey.css';


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
    // this.model.reset();
    // window.location.reload();
    // Survey.render();
    console.log("Clear button clicked");
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
        {/* <button onClick={this.onClearButton}>
          TEST
        </button> */}
        </React.Fragment>
    );
  }
}
export default AddAnswers;