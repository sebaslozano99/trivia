import React from 'react'

const FinishScreen = ({highscore, dispatch}) => {



  return (
    <div className='highscore-container'>
      <p>Your highscore is: {highscore}/100</p>
      <button onClick={() => dispatch({type: "restart"})} >Restart</button>
    </div>
  )
}

export default FinishScreen