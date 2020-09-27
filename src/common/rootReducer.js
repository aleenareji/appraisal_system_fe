import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import homeReducer from '../features/home/redux/reducer';
import commonReducer from '../features/common/redux/reducer';
import questionReducer from '../features/questions/redux/reducer';
import usersReducer from '../features/sendNotification/redux/reducer';

const reducerMap = {
  router: routerReducer,
  home: homeReducer,
  common: commonReducer,
  questions: questionReducer, 
  users: usersReducer,
};

export default combineReducers(reducerMap);
