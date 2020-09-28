import React, { useState, useEffect } from 'react';


const EditQuestion = (props) => {
  const _mapToForm = (value) => {
    const formattedQuestions = {
      questionId: value[0],
      title: value[1]
    }
    return formattedQuestions;
  }

  const [question, setQuestion] = useState(_mapToForm(props.editData));

  useEffect(() => {
    setQuestion(question);
  }, [props.editData])

  const onQuestionChange = (event) => {
    setQuestion({ ...question, title: event.target.value })
  }

  const onSaveEditQuestion = (questionsOnSave) => {
    questionsOnSave.preventDefault();
    setQuestion(...question,questionsOnSave.title);
    const saveData = [question.questionId, question.title]
    props.onSave(saveData);
  }

  const onCancelAddQuestion = () => {
    props.onCancel();
  };

  return (
      <form onSubmit={onSaveEditQuestion}>
        <div className="row">
          <div className="col">
            <label className="form-group">Enter your Question*:</label>
            <textarea  className="form-control" onChange={onQuestionChange} value={question.title}/>
          </div>
        </div>
        <div className="modal-footer">
          <button type="submit" className="btn btn-submit" disabled={!question.title}>
            SAVE
            </button>
          <button
            type="button"
            className="btn"
            onClick={onCancelAddQuestion}
            data-dismiss="modal"
          >
            CANCEL
            </button>
        </div>
      </form>
  )
}

export default EditQuestion;