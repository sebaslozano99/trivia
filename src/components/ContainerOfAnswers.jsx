import React from 'react'
import { useState, useEffect } from 'react';
import Answers from "./Answers";
import { v4 as uuidv4 } from 'uuid';




function shuffler(array){
  for(let i = 0; i < array.length; i++){
    const randomElement = Math.floor(Math.random() * array.length);
    const firstElement = array[i];

    array[i] = array[randomElement];
    array[randomElement] = firstElement;
  }
  return array;
}


const ContainerOfAnswers = ({dataFromApi, index, answer, dispatch}) => {
  
  const [answers, setAnswers] = useState(shuffler([...dataFromApi[index]?.incorrect_answers ?? "hello", dataFromApi[index]?.correct_answer]));

  useEffect(() => {
    setAnswers(shuffler([...dataFromApi[index]?.incorrect_answers ?? "hello", dataFromApi[index]?.correct_answer]));
  }, [dataFromApi, index])


  return (
    <div className='one'>
        {
            answers.map(element => <Answers key={uuidv4()}  dataFromApi={dataFromApi} index={index} element={element} answer={answer} dispatch={dispatch}/>)
        }
    </div>
  )
}

export default React.memo(ContainerOfAnswers);