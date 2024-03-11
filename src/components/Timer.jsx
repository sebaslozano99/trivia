import React, { useEffect } from 'react'
import { UseQuestionContext } from '../questionsProvider/QuestionsProvider';

const Timer = () => {

    const { minutes, seconds, dispatch } = UseQuestionContext();

    useEffect(() => {
        const id = setInterval(() => {
            if(seconds > 0){
                dispatch({type: "secondsDown"});
            }
            if(seconds === 0){
                dispatch({type: "minutesDown"});
            }
        }, 1000);


        return () => {
            clearInterval(id);
        }
    }, [seconds, dispatch])

  return (
    <div className='timer'>
        {minutes < 10 && seconds < 10 && `0${minutes}:0${seconds}`}
        {minutes < 10 && seconds >= 10 && `0${minutes}:${seconds}`}
        {minutes >= 10 && seconds < 10 && `${minutes}:0${seconds}`}
        {minutes >= 10 && seconds >= 10 && `${minutes}:${seconds}`}
    </div>
  )
}

export default Timer