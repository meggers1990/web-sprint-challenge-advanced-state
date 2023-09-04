// ❗ You don't need to add extra action creators to achieve MVP
import axios from 'axios';
import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER, SET_INFO_MESSAGE, INPUT_CHANGE, RESET_FORM } from "./action-types";


export function moveClockwise() {
  return { type: MOVE_CLOCKWISE };
 }

export function moveCounterClockwise() {
  return { type: MOVE_COUNTERCLOCKWISE };
 }

export function selectAnswer(answer) { 
  return {type:SET_SELECTED_ANSWER, payload:answer}
}


export function setMessage(infoMessage) {
  return {type: SET_INFO_MESSAGE, payload:infoMessage}
 }

export function setQuiz(quiz) {
  return {type: SET_QUIZ_INTO_STATE, payload:quiz};
 }

export function inputChange(input) { 
  return {type: INPUT_CHANGE, payload:input}
}

export function resetForm() {
  return {type: RESET_FORM}
 }

export function fetchQuiz() {
  return function (dispatch) {
    dispatch (setQuiz(null))
    axios.get ('http://localhost:9000/api/quiz/next')
    .then(res => {
      dispatch(setQuiz(res.data))
    }) 
    .catch(err => console.log (err))
  }
}
export function postAnswer(quiz_id, answer_id) {
 
  return function (dispatch) {
      axios.post ('http://localhost:9000/api/quiz/answer', {quiz_id:quiz_id, answer_id: answer_id})
      .then(res => {
        dispatch(selectAnswer(null))
        dispatch(setMessage(res.data.message))
        dispatch(fetchQuiz())
      })
      .catch(err => console.log (err))
  }
}
export function postQuiz(quizDetail) {
  return function (dispatch) {
    axios.post ('http://localhost:9000/api/quiz/new', quizDetail)
    .then(res => {
      
      dispatch({type: SET_INFO_MESSAGE, payload:`Congrats: "${quizDetail.question_text}" is a great question!`})
    })
    .catch(err => console.log (err))
    
  }
}