import React from 'react'

const ScoreBar = ({points, dataFromApi, index}) => {
    const numQues = dataFromApi.length;
  return (
    <div className='scoreBar-container'>
        <div className='scoreBar'>
            <span className='fill-scoreBar' style={{width: `${points}%`}} ></span>
        </div>

        <div>
            <p>{index + 1}/{numQues} questions</p> 
            <p>{points}/100 points</p> 
        </div>
    </div>
  )
}

export default ScoreBar