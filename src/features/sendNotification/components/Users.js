import React, { useState, useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import SendIcon from '@material-ui/icons/Send';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';


const Users = (props) => {
  const [users, setUsers] = useState(null);
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState(null);
  const [isChecked,setIsChecked] = useState(false);
  const pointer = { cursor: 'pointer' };

  const _mapUsersToTable = (user) => {
    const updatedUsers = user[0].length ? user[0].map(item => Object.values(item)) : null;
    return updatedUsers;
  }

  useEffect(() => {
    if (props.usersList[0] !== null) {
      setUsers(_mapUsersToTable(props.usersList));
    }
  }, [props.usersList])
  console.log('users ---->',users);

  useEffect(() => {
    if((Array.isArray(selectedCheckbox) && selectedCheckbox.length)){
      setIsChecked(true);
    }
    if((selectedCheckbox === null || selectedCheckbox.length < 1)){
      setIsChecked(false);
    }
  },[selectedCheckbox])

  useEffect(() => {
    let checkedData = [];
    if (users !== null && selectedCheckbox !== null) {
      const selecteData = users.filter((item, index) => selectedCheckbox.filter((check) => {
        if (check === index) {
          checkedData.push(item);
          setSelectedUsers(checkedData);
        }
        if (typeof selectedCheckbox != "undefined" && selectedCheckbox != null
         && selectedCheckbox.length != null && selectedCheckbox.length > 0) {
      }
      }))
    }
  }, [users, selectedCheckbox])
  
  // console.log('checkedData ---->',checkedData);
  console.log('selectedUsers ------>',selectedUsers);

  const onSendActions = () => {
      setIsChecked(false)
      console.log("TEST");
      // const selectedName = selectedUsers[0];
      // console.log('test name ---->',selectedName[0]);
      const selectName = selectedUsers.map((name =>{
        return name[0];
      }))
      let _mapToStatus = users.filter(name =>{

        if( selectedUsers.includes(name)){
          return name[2]= "Active";

        }
      });
      console.log('_mapToStatus ----',_mapToStatus);
  }


  const columns = [
    {
      name: 'Full Name'
    },
    {
      name: 'Email'
    },
    {
      name: "Send Status",
      // options: {
      //   customBodyRender: (value, tableMeta, updateValue) => {
      //     console.log('tableMeta --->',tableMeta);
      //     const sendData = tableMeta.rowIndex;
      //     console.log(sendData,"111");
      //     const rowDataCheck = tableMeta.rowData;
      //     if(sendData === '3'){
      //       return (
      //         <Chip label="Basic"  onClick ={() => {onSendActions(sendData)}}/>
      //       );

      //     }
      //     else
      //     return (
      //       <Chip label="Else"  onClick ={() => {onSendActions(sendData)}}/>
      //     );
        
      //   },
      // },
    },
  ];

  const onRowSelectionChange = (currentRowsSelected, allRowsSelected, rowsSelected) => {
    setSelectedCheckbox(rowsSelected)
  }
  console.log("selectedCheckbox  ---->",selectedCheckbox);

  // const customToolbarSelect = (selectedRows,displayData,setSelectedRows) => {
  //   console.log('selectedRows ---->',selectedRows);
  //   console.log('displayData ---->',displayData);
  //   console.log('setSelectedRows ----->',setSelectedRows);

  // }
  const options = {
    filterType: 'checkbox',
    onRowSelectionChange: onRowSelectionChange,
    textLabels: {
      body: {
        noMatch: 'Select Department, Role and Level',
      },
    },
  };
  return (
    <React.Fragment>
      { 
      (isChecked) ?
          <Box m={2}>
             <Tooltip title="Send">
             <SendIcon variant="contained" color="primary" style={pointer} onClick={ onSendActions}/>
             </Tooltip>
          </Box>
         :''}
    <MUIDataTable
      title="Users"
      data={users !== null ? users : []}
      columns={columns}
      options={options}
      displaySelectToolbar={false}
      // customToolbarSelect ={customToolbarSelect}
    />
    </React.Fragment>
  )
}

export default Users;