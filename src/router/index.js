import Vue from 'vue'
import Router from 'vue-router'
import SurveyList from '../components/SurveyList'
import SurveyEdit from '../components/SurveyEdit'
import AnswerList from '../components/AnswerList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/survey',
      component: SurveyList
    },
    {
      path: '/survey/:id/answers',
      component: AnswerList
    },
    {
      path: '/survey/create',
      component: SurveyEdit
    }
  ]
})
