import Questions from './components/Questions';
  
  export default {
    path: '/dashboard/questions',
    name: 'Questions',
    childRoutes: [
      { path: 'questions',
        name: 'Questions',
        component: Questions,
        isIndex: true,
      },
    ],
  };