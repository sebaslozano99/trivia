
const Answers = ({dataFromApi, index, element, answer, dispatch}) => {

    const hasAnswer = answer !== null;
    const correctAnswer = dataFromApi[index]?.correct_answer;

    function update(element){
      if(element === correctAnswer){
        dispatch({type: "pickAnswer", payload: element});
        dispatch({type: "updatePoints"});
      }
      else{
        dispatch({type: "pickAnswer", payload: element});
      }
    }

  return ( 
    <button 
    className={`answer-btn ${hasAnswer && element === correctAnswer ? "correct" : ""} ${hasAnswer && element !== correctAnswer ? "incorrect" : "" } ${hasAnswer && element === answer ? "picked" : ""}`} 
    onClick={() => update(element)}
    disabled={hasAnswer}
    >{element}</button>
  )
}

export default Answers