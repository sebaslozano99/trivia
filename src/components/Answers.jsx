import rightAnswerSound from "../assets/rightAnswerSound.mp3";
import wrongAnswerSound from "../assets/wrongAnswerSound.wav";


const Answers = ({dataFromApi, index, element, answer, dispatch}) => {

    const hasAnswer = answer !== null;
    const correctAnswer = dataFromApi[index]?.correct_answer;

    function update(element){
      if(element === correctAnswer){
        dispatch({type: "pickAnswer", payload: element});
        dispatch({type: "updatePoints"});
        new Audio(rightAnswerSound).play();
      }
      else{
        dispatch({type: "pickAnswer", payload: element});
        new Audio(wrongAnswerSound).play();
      }
    }

  return ( 
    <button 
    className={`answer-btn ${hasAnswer && element === correctAnswer ? "correct" : ""} ${hasAnswer && element !== correctAnswer ? "incorrect" : "" } ${hasAnswer && element === answer ? "picked" : ""}`} 
    onClick={() => update(element)}
    disabled={hasAnswer}
    >
      {element}
    </button>
  )
}

export default Answers