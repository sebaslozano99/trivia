import React from 'react'
import { UseQuestionContext } from '../questionsProvider/QuestionsProvider'

const FinishScreen = () => {

  const { highscore, dispatch } = UseQuestionContext();

  return (
    <div className='highscore-container'>
      <p>Your highscore is: {highscore}/100</p>
      <button onClick={() => dispatch({type: "restart"})} >Restart</button>
    </div>
  )
}

export default FinishScreen