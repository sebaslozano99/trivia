import Header from "./Header";
import StartScreen from "./StartScreen";
import AnswerContainer from "./AnswerContainer";
import Loading from "./Loading";
import Timer from "./Timer";
import FinishScreen from "./FinishScreen";
import { UseQuestionContext } from "../questionsProvider/QuestionsProvider";



const MainWrapper = () => {
  

  const { start, status } = UseQuestionContext();

  return (
    <main className="App">


        <Header />
        {
          !start && <StartScreen />
        }

        {status === "loading" && start && <Loading /> }

        {
        status === "ready" && start && 
        <AnswerContainer >
            <Timer />  
        </AnswerContainer> 
        }

        {
          status === "finished" && <FinishScreen  />
        }

    </main>
  )
}

export default MainWrapper
