import { QuestionsProvider } from "../questionsProvider/QuestionsProvider";
import MainWrapper from "./MainWrapper";


function App() {

  return (
    <QuestionsProvider>
     <MainWrapper />
    </QuestionsProvider>
  );
}

export default App;
