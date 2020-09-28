import React, { useState, useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { Dialog } from '../../shared-components';
import EditQuestion from './EditQuestion';


export default function QuestionsListing(props) {

  const _mapQuestionsToTable = (quires) => {
    const updatedQuires = quires[0].length ? quires[0].map(item => Object.values(item)) : null;
    return updatedQuires;
  }
  const pointer = { cursor: 'pointer' };
  const [questions, setQuestions] = useState(null);
  const [isEditModalOpen, setIsModalOpen] = useState(false);
  const [editQuestionData, setEditQuestionData] = useState(null);
  const [formattedArrayToDelete, setFormattedArrayToDelete] = useState(null);
  const [isDeleteQuestionModalOpen, setDeleQuestionModal] = useState(false);
  const [deleteQuestion, setDeleteQuestion] = useState({
    questionId: '',
    title: '',
  });

  const editQuestionModalOpen = (editQuestion) => {
    setEditQuestionData(editQuestion);
    setIsModalOpen(true);
  }

  const onEditQuestionSave = (dataOnSave) => {
    const formattedData = questions.map(question => {
      if (question[0] === dataOnSave[0]) {
        question[1] = dataOnSave[1];
        const _mapToEdit = {
          questionId:question[0],
          title:question[1]
        }
        return question;
      }
    })
    setIsModalOpen(false);
  }

  const onCloseDeleteModal = () => {
    setDeleQuestionModal(false);
  };

  const onRemoveModal = (removeQuestion) =>{
    setDeleteQuestion({questionId:removeQuestion[0],title:removeQuestion[1],})
    setDeleQuestionModal(true);
  }

  const onDelete = (deleteQuestion) => {
    props.onDeleteQuestion(deleteQuestion);
    setDeleQuestionModal(false);
  }

  const deleteQuestionModal = () => {
    const { questionId, title } = deleteQuestion;
    if (!isDeleteQuestionModalOpen) return '';
    return (
      <Dialog
        title="Delete Question"
        open={isDeleteQuestionModalOpen}
        onClose={onCloseDeleteModal}
      >
        <div className="questions-container">
          <div className="delete-confirmation">
            {title !== '' && questionId !== '' ? (
              <p>
                You are deleting <strong>'{title}'</strong>. This action cannot be undone.
                Proceed?
              </p>
            ) : (
              ''
            )}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn" data-dismiss="modal" onClick={onCloseDeleteModal}>
              CANCEL
            </button>
            <button
              type="submit"
              onClick={() => onDelete(deleteQuestion)}
              className="btn btn-delete"
            >
              DELETE
            </button>
          </div>
        </div>
      </Dialog>
    );
  }

  useEffect(() => {
    setFormattedArrayToDelete(formattedArrayToDelete)
  }, [formattedArrayToDelete])

  useEffect(() => {
    setEditQuestionData(editQuestionData)
  }, [editQuestionData])

  const editQuestionModalClose = () => {
    setIsModalOpen(false);
  }

  const editQuestionModal = () => {
    if (!isEditModalOpen) return '';
    return (
      <Dialog
        title="Edit Question"
        open={editQuestionModal} editQuestionModal
        onClose={editQuestionModalClose}
      >
        <EditQuestion onCancel={editQuestionModalClose} editData={editQuestionData} onSave={onEditQuestionSave} />
      </Dialog>
    )
  }

  useEffect(() => {
    if (props.questionsList[0] !== null) {
      setQuestions(_mapQuestionsToTable(props.questionsList));
    }
  }, [props.questionsList])
  const columns = [
    {
      name: "ID",
    },
    {
      name: "Questions",
    },
    {
      name: "Edit",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <EditIcon variant="contained" color="primary" style={pointer} onClick={() => editQuestionModalOpen(tableMeta.rowData)}></EditIcon>
          );
        },
      },
    },

    {
      name: "Delete",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const updatedQuestion = tableMeta.rowData;
          return (
            <DeleteIcon variant="contained" color="primary" style={pointer} onClick={() => {
              onRemoveModal(updatedQuestion)
            }}>
            </DeleteIcon>
          );
        },
      },
    }
  ];

  const options = {
    filterType: 'checkbox',
    textLabels: {
      body: {
        noMatch: 'Select Department, Role and Level',
      },
    },
  };
  return (
    <React.Fragment>
      {editQuestionModal()}
      {deleteQuestionModal()}
      <MUIDataTable
        title="Questions"
        data={questions !== null ? questions : []}
        columns={columns}
        options={options}
      />     
    </React.Fragment>
  )
}