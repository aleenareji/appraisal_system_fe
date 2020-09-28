import React, { useState } from 'react';

const AddQuestion = (props) => {
  const [question, setQuestion] = useState({
    title: ''
  })

  const onQuestionChange = (event) => {
    setQuestion({ ...question, title: event.target.value })
  }

  const onSaveAddQuestion = (questionsOnSave) => {
    questionsOnSave.preventDefault();
    setQuestion(...question, questionsOnSave.title)
    props.onSaveQuestion(question);
  }

  const onCancelAddQuestion = () => {
    props.onCancel();
  };

  return (
    <form onSubmit={onSaveAddQuestion}>
      <div className="row">
        <div className="col">
          <label className="form-group">Enter your Question*:</label>
          <textarea className="form-control" as="textarea" onChange={onQuestionChange} />
        </div>
      </div>
      <div className="modal-footer">
        <button type="submit" className="btn btn-submit" disabled={!question.title} >
          ADD
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

export default AddQuestion;