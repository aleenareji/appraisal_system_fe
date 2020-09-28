import AddAnswers from './components/AddAnswers';
  
export default {
  path: '/dashboard/answers',
  name: 'AddAnswers',
  childRoutes: [
    { path: 'answers',
      name: 'AddAnswers',
      component: AddAnswers,
      isIndex: true,
    },
  ],
};