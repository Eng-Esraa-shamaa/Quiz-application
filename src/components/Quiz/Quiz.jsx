import React, {useRef, useState} from 'react'
import './Quiz.css'
import { questions } from '../../assets/questions'

const Quiz = () => {

  let[index, setIndex] = React.useState(0)
  let[question, setQuestion] = React.useState(questions[index])
  let[lock, setLock] = React.useState(false)
  let[score, setScore] = React.useState(0)
  let [result, setResult] = React.useState(false)

  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);

  let option_array = [option1, option2, option3, option4];


  const checkAnswer = (element, answer) => {
    if(lock === false) {
        if (question.answer === answer) {
          element.target.classList.add('correct');
          setLock(true);
          setScore(score + 1);
        } else {
          element.target.classList.add('wrong');
          setLock(true);
          option_array.forEach((option) => {
            if(option.current.innerText === question.answer) {
              option.current.classList.add('correct');
            }
          });
        }
    }
  };

  const next = () => {
    if(lock === true) {
      if(index + 1 === questions.length) {
        setResult(true);
      } else {
      setIndex(++index);
      setQuestion(questions[index]);
      setLock(false);
      option_array.map((option) => {
        option.current.classList.remove('correct');
        option.current.classList.remove('wrong');
        return null;
      });
    }
  }
};
  return (
    <div className='container'>
        <h1>Quiz App</h1>
        <hr />
        {result ? <h1>Result: {score} out of {questions.length}</h1> : <>
        
         <h2 className='question'>{index+1}. {question.question}</h2>
        <ul className='options'>
            <li ref={option1} onClick={(event) => {checkAnswer(event, question.option1)}}>{question.option1}</li>
            <li ref={option2} onClick={(event) => {checkAnswer(event, question.option2)}}>{question.option2}</li>
            <li ref={option3} onClick={(event) => {checkAnswer(event, question.option3)}}>{question.option3}</li>
            <li ref={option4} onClick={(event) => {checkAnswer(event, question.option4)}}>{question.option4}</li>
        </ul>

        <button onClick={next}>Next</button>
        <div className='index'>{index + 1} out of {questions.length} questions</div>
        </>}
       
    </div>
  )
};

export default Quiz