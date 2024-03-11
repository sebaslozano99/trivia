import { createContext, useReducer, useEffect, useContext } from "react";


const QuestionsContext = createContext();



const initialState = {
    category: 9,
    difficulty: "easy",
    start: false,
    status: "loading",
    dataFromApi: [],
    index: 0,
    answer: null,
    seconds: 10,
    minutes: 3,
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
          minutes: (action.payload === "easy" && 3) || (action.payload === "medium" && 2) || (action.payload === "hard" && 1),
          seconds: (action.payload === "easy" && 5) || (action.payload === "medium" && 25) || (action.payload === "hard" && 59),
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
          minutes: 3,
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

const QuestionsProvider = ({children}) => {

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
    <QuestionsContext.Provider  value={{
        category,
        difficulty,
        status,dataFromApi,
        index,
        answer,
        start,
        seconds,
        minutes,
        points,
        highscore,
        dispatch,
    }}>
      {children}
    </QuestionsContext.Provider>
  )
}

function UseQuestionContext(){
    const context = useContext(QuestionsContext);
    if(context === undefined) throw new Error("UseQuestionContext is being used outside QuestionsContext Provider");
    return context;
}


export { QuestionsProvider, UseQuestionContext }
