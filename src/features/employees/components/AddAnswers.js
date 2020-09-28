import React,{Component} from 'react';
import * as Survey from 'survey-react';
import 'survey-react/survey.css';


// import 'bootstrap/dist/css/bootstrap.css'

class AddAnswers extends Component {
    componentWillMount() {    
      // Survey.Survey.cssType = "bootstrap";
      // Survey.defaultBootstrapCss.navigationButton = "btn btn-green";
      Survey
    .StylesManager
    .applyTheme("modern");
    }
  
      onComplete = (result) => {
  
      var test = JSON.stringify(result.data);
      console.log('test--->',test);
  }
   onValueChanged = (result) => {
      console.log("heyho");
  }
  
    render() {    

      const response = localStorage.getItem('questions');
      console.log('response ------>',response);
      const updatedREsponse = JSON.parse(response);
      console.log('updatedREsponse ->',updatedREsponse);
      var json = { title: "Add Answers", pages: [
          
      
          { questions: [
              { type: "text", name: "question",
              isRequired: true,
              title: "What programming languages have you used in the past? What are your top two programming languages?"},
              { type: "text", name: "question1",
              isRequired: true,
              title: "How much are you coding on a daily basis? If you do not code on a daily basis, what is typical in your role?"},
              { type: "text", name: "question2",
              isRequired: true,
              title: "How comfortable are you in a startup environment, or do you prefer working in a more established company? "},
              { type: "text", name: "question3",
              isRequired: true,
              title: "What distinguishes a great software engineer from a good one? Do you feel you have those qualities?"},
  
              { type: "text", name: "emp_id", isRequired: true,
                  title: "Enter your Employee ID ?"},
          ]},
      ]};
  
      var model = new Survey.Model(json);    
      return (
        <Survey.Survey model={model}
         onComplete={this.onComplete} 
         completedHtml  = "Thank you for submitting the answers"
         completeText = "Submit"
         onValueChanged={this.onValueChanged}/>
      );
    }
  }
export default AddAnswers;