import { useEffect, useReducer } from "react";
import Header from "./Header";
import StartScreen from "./StartScreen";
import AnswerContainer from "./AnswerContainer";
import Loading from "./Loading";
import Timer from "./Timer";
import FinishScreen from "./FinishScreen";



const initialState = {
  category: 9,
  difficulty: "easy",
  start: false,
  status: "loading",
  dataFromApi: [],
  index: 0,
  answer: null,
  seconds: 10,
  minutes: 10,
  points: 0,
  highscore: JSON.parse(localStorage.getItem("highscore")),
}


function reducer(state, action){
  switch(action.type){

    case "start": // used in "StartScreen.jsx" 
      return {
        ...state,
        start: true,
      }
    
    case "ready":  // used in "App.jsx" within useEffect
      return {
        ...state,
        status: "ready",
      }

    case "dataArrived":  // used in "App.jsx" within useEffect
      return{
        ...state,
        dataFromApi: action.payload,
      }

    case "changeCategory":  //used in "StartScreen.jsx"
      return {
        ...state,
        category: action.payload,
      }
    
    case "changeDifficulty": //used in "StartScreen.jsx"
      return {
        ...state,
        difficulty: action.payload,
      }
    
    case "pickAnswer": // used in "Answers.jsx" 
      return {
        ...state,
        answer: action.payload,
      }

    case "updatePoints":
      return {
        ...state,
        points: state.points + 5
      }

    case "next":  // used in "AnswerContainer.jsx"
      return {
        ...state,
        index: state.index < 19 ? state.index + 1 : state.index,
        answer: null,
      }

    case "secondsDown": // used in "Timer.jsx"
      return {
        ...state,
        seconds: state.seconds - 1,
      }

    case "minutesDown": // used in "Timer.jsx"
      return {
        ...state,
        minutes: state.minutes > 0 ? state.minutes - 1 : state.minutes,
        seconds: state.minutes > 0 ? 59 : state.seconds,
        status: state.minutes === 0 && state.seconds === 0 ? "finished" : state.status, 
      }
    case "finished":
      return {
        ...state,
        status: "finished",

      }

    case "restart":
      return {
        category: 9,
        difficulty: "easy",
        start: false,
        status: "loading",
        dataFromApi: [],
        index: 0,
        answer: null,
        seconds: 10,
        minutes: 10,
        points: 0,
        highscore: JSON.parse(localStorage.getItem("highscore")) ?? 0, 
      }

    case "updateHighScore": 
      return {
        ...state,
        highscore: state.points > state.highscore ? state.points : state.highscore,
      }

    default:
      throw new Error("something went wrong!");
  }


}


function App() {

  const [{category, difficulty, status, dataFromApi, index, answer, start, seconds, minutes, points, highscore}, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetcher(){
      try{
        if(start){
          const res = await fetch(`https://opentdb.com/api.php?amount=20&category=${category}&difficulty=${difficulty}&type=multiple`);
          const data = await res.json();
          dispatch({type: "dataArrived", payload: data.results});
          dispatch({type: "ready"});
          console.log(data.results);
        }
      }
      catch(error){
        throw new Error(error);
      }
    }

    fetcher();

  },[start, category, difficulty])


  useEffect(() => {
    localStorage.setItem("highscore", JSON.stringify(highscore));   
  }, [highscore])


  return (
    <main className="App">
        <Header />
        {
          !start && <StartScreen en category={category} difficulty={difficulty} dispatch={dispatch} />
        }

        {status === "loading" && start && <Loading /> }

        {status === "ready" && start && <AnswerContainer dataFromApi={dataFromApi} index={index} answer={answer} dispatch={dispatch}  points={points}>
          <Timer minutes={minutes} seconds={seconds} dispatch={dispatch} />  
        </AnswerContainer> }

        {
          status === "finished" && <FinishScreen dispatch={dispatch} highscore={highscore} />
        }

    </main>
  );
}

export default App;
