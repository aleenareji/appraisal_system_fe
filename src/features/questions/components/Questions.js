import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Box from '@material-ui/core/Box';

import {retrieveQuestions} from '../redux/question.effects'
import QuestionsListing from './QuestionsListing';
import { Dialog, DataTableHeader } from '../../shared-components';
import AddQuestion from './AddQuestion';



function Questions(props) {

  const [deptFilter, setDeptFilter] = useState(null);
  const [roleFilter, setRoleFilter] = useState(null);
  const [levelFilter, setLevelFilter] = useState(null);
  const [isAddQuestionModalOpen, setAddQuestionModal] = useState(false);
  const [question, setQuestion] = useState(props ? props.getQuestions :'');
  const [newQuestion, setNewQuestion] = useState('');

  useEffect(() => {
    const readQuestion = () => {
      if (localStorage.getItem('questions') !== '[]' && localStorage.getItem('questions') !== null) {
        setQuestion(JSON.parse(localStorage.getItem('questions')));
      }
      else
        setQuestion(props.getQuestions);
    }
    readQuestion()
  }, []);

  const retrieveQuestions = async () => {
    const { retrieveQuestions } = props.actions;
    await retrieveQuestions();
  };

  useEffect(() => {
    retrieveQuestions();
  }, []);

  const onAddQuestionModalOpen = () => {
    setAddQuestionModal(true);
  };

  const onCloseAddQuestionModal = () => {
    setAddQuestionModal(false);
  };

  const onCancelAddQuestion = () => {
    setAddQuestionModal(false);
  };


  const getDeleteQusetionData = (data) => {

    if (deptFilter.department === 'Delivery') {
      const queryData = question[0].roles.levels.questions;
      const formattedData = queryData.filter(item =>
        item.questionId !== data.questionId
      );
      setQuestion(question.map(item => {
        if (item.department === 'Delivery') {
          setLevelFilter(formattedData);
          return question[0].roles.levels.questions = formattedData
        }
        else
          return item;
      }))
      localStorage.setItem('questions', JSON.stringify(question));
    }

    if (deptFilter.department === 'Business and Development') {
      const queryData = question[1].roles.levels.questions;
      const formattedData = queryData.filter(item =>
        item.questionId !== data.questionId
      );
      setQuestion(question.map(item => {
        if (item.department === 'Business and Development') {
          setLevelFilter(formattedData);
          return question[1].roles.levels.questions = formattedData
        }
        else
          return item;
      }))
      localStorage.setItem('questions', JSON.stringify(question));
    }
  }

  const onCreateQuestion = (newQuestion) => {
    let questionId;
    if (deptFilter.department === 'Delivery') {
      question.map(item => {
        if (item.department === 'Delivery') {
          const getId = question[0].roles.levels.questions;
          const updatedId = getId.reduce((prev, current) => (+prev.questionId > +current.questionId) ? prev : current)
          const newId = updatedId.questionId + 1;
          const updatedQuestion = {
            questionId: newId,
            title: newQuestion.title,
            name: newQuestion.title,
            isRequired:true
          }
          question[0].roles.levels.questions.push(updatedQuestion);
          localStorage.setItem('questions', JSON.stringify(question));
          setNewQuestion('');
          setAddQuestionModal(false);
        }
      })
    }
    if (deptFilter.department === 'Business and Development') {
      const getId = question[1].roles.levels.questions;
      const updatedId = getId.reduce((prev, current) => (+prev.questionId > +current.questionId) ? prev : current)
      const newId = updatedId.questionId + 1;
      const updatedQuestion = {
        questionId: newId,
        title: newQuestion.title,
        name: newQuestion.title,
        isRequired:true
      }

      question.map(item => {
        if (item.department === 'Business and Development') {
          question[1].roles.levels.questions.push(updatedQuestion);
          localStorage.setItem('questions', JSON.stringify(question));
          setNewQuestion('');
          setAddQuestionModal(false);
        }
      })
    }
  }

  const addQuestionModal = () => {
    if (!isAddQuestionModalOpen) return '';
    return (
      <Dialog
        title="Add Question"
        open={isAddQuestionModalOpen}
        onClose={onCloseAddQuestionModal}
      >
        <AddQuestion onCancel={onCancelAddQuestion} onSaveQuestion={onCreateQuestion} />
      </Dialog>
    );
  };

  useEffect(() => console.log(deptFilter, 'filtered department value in dropdown'), [deptFilter]);
  useEffect(() => console.log(roleFilter, 'filtered role value in dropdown'), [roleFilter]);
  useEffect(() => console.log(levelFilter, 'filtered level value in dropdown'), [levelFilter]);


  const onFilterChange = (event, values) => {
    setDeptFilter(values);
  }

  const onRolesFilterChange = (event, values) => {
    setRoleFilter(values);
  }

  const onLevelsFilterChange = (event, values) => {
    setLevelFilter(values ? values.roles.levels.questions : '')
  }

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-4">
          <Autocomplete
            id="department"
            options={question}
            onChange={onFilterChange}
            getOptionLabel={(option) => option.department}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Select Department" variant="outlined" />}
          />
        </div>
        <div className="col-4">
          <Autocomplete
            id="roles"
            options={[deptFilter]}
            onChange={onRolesFilterChange}
            getOptionLabel={(option) => option ? option.roles.position : ""}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Select Roles" variant="outlined" />}
          />
        </div>
        <div className="col-4">
          <Autocomplete
            id="levels"
            options={[roleFilter]}
            onChange={onLevelsFilterChange}
            getOptionLabel={(option) => option ? option.roles.levels.grade : ""}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Select Levels" variant="outlined" />}
          />
        </div>
        <div className="col">
          {roleFilter && deptFilter && levelFilter ? (
            <React.Fragment>
              {addQuestionModal()}
              <DataTableHeader onClick={onAddQuestionModalOpen} />
            </React.Fragment>
          ) : ''
          }
        </div>

      </div>
      <Box pt={3}>
        <QuestionsListing
          onDeleteQuestion={getDeleteQusetionData}
          questionsList={[levelFilter]}
        />
      </Box>

    </React.Fragment>
  );

}

function mapStateToProps(state) {
  return {
    getQuestions: state.questions.getQuestions,

  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ retrieveQuestions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

