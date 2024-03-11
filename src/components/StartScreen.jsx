import { UseQuestionContext } from "../questionsProvider/QuestionsProvider"

const StartScreen = () => {

  const { category, difficulty, dispatch } = UseQuestionContext();

  return (
    <section className='start_screen'>

      <h2>Choose your Category and Difficulty</h2>


      <div>
        <label>Category</label>
        <select value={category} onChange={(e) => dispatch({type: "changeCategory", payload: e.target.value})}>
          <option value={9}>General Knowledge</option>
          <option value={21}>Sports</option>
          <option value={22}>Geography</option> 
        </select>
      </div>


      <div>
        <label>Difficulty</label>
          <select value={difficulty} onChange={(e) => dispatch({type: "changeDifficulty", payload: String(e.target.value)})} >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
      </div>


      <button onClick={() => dispatch({type: "start"})} >Start</button>

    </section>
  )
}

export default StartScreen