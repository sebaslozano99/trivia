import React from "react";
import ContainerOfAnswers from "./ContainerOfAnswers";
import ScoreBar from "./ScoreBar";


const AnswerContainer = ({dataFromApi, index, answer, dispatch, points, children}) => {

  const question = dataFromApi[index]?.question;

  function nextOrFinish(){
    if(index < 19){
      dispatch({type: "next"});
    }
    else{
      dispatch({type: "finished"});
      dispatch({type: "updateHighScore"});
    }
  }

  return (
    <div className='answer_container'>
      <h3>
        {index + 1 >= 10 && `${index + 1}) `} 
        {index + 1 < 10 && `0${index + 1}) `}
        {question}
      </h3>

      <ScoreBar points={points} dataFromApi={dataFromApi} index={index} />

      <ContainerOfAnswers dataFromApi={dataFromApi} index={index} answer={answer} dispatch={dispatch} />

      <div className="two">
        {children}
        {answer !== null && <button className="next-finish" onClick={() => nextOrFinish()}>{index < 19 ? "Next" : "Finish"}</button>}
      </div>


    </div>
  )
}

export default AnswerContainer