import useSWR from 'swr'
import he from 'he'
import {useEffect, useState} from "react";
import { useRouter } from 'next/router'
import _ from "lodash";
import ClipLoader from "react-spinners/ClipLoader";

export default function Index() {
    const router = useRouter();

    const
        [trivia, setTrivia] = useState(null),
        [index, setIndex] = useState(0),
        [choice, setChoice] = useState(null),
        [score, setScore] = useState(0);

    const fetcher = (url) => fetch(url).then((res) => res.json());

    const {data, error} = useSWR('https://opentdb.com/api.php?amount=10&category=31&type=multiple', fetcher, {
        revalidateOnFocus: false,
    });

    const handleClick = () => {
        if (choice === trivia[index].correctAnswer) setScore(score + 1);
        if (index >= trivia.length - 1) {
            alert('Your score is ' + score + '/' + trivia.length);
            router.replace('/');
        } else {
            setIndex(index + 1);
        }
    }

    useEffect(() => {
        if (data) {
            setTrivia(data.results.map((result) => {
                return {
                    question: result.question,
                    answers: _.shuffle([...result.incorrect_answers, result.correct_answer]),
                    correctAnswer: result.correct_answer
                }
            }));
            setIndex(0);
        }
    }, [data]);

    if (error) return (
        <div className='h-full flex justify-center items-center flex-col p-4'>
            <p className='text-lg md:text-2xl text-center font-semibold pb-6'>Something went wrong with the server. Please try again later.</p>
            <div className='text-4xl md:text-6xl'>😑</div>
        </div>
    )
    if (!trivia) return <div className='loader-container h-full flex justify-center items-center'><ClipLoader/></div>

    return (
        <>
            {
                trivia.map((subject, key) => (
                    <div key={key}
                         className={`h-full rounded ${key === index ? 'flex md:block' : 'hidden'} flex-col justify-between overflow-hidden`}>
                        <span className='circle ml-3 mt-3'>{key + 1}</span>
                        <h1 className='text-lg md:text-2xl font-bold px-6 py-6'>
                            {he.decode(subject.question)}
                        </h1>
                        <form className='flex-grow px-6'>
                            {
                                subject.answers.map((answer, key) => (
                                    <label key={key} htmlFor={answer}
                                           className='input-container p-1 mb-2 md:mb-0 block'>
                                        <input type="radio" name={subject.question} id={answer}
                                               value={answer} className='mr-2'
                                               onChange={(e) => setChoice(e.target.value)}/>
                                        <span>{he.decode(answer)}</span>
                                    </label>
                                ))
                            }
                        </form>
                        <button
                            className='btn p-5 font-semibold md:mx-6 md:mt-14 md:w-36 md:rounded md:hover:bg-gray-800'
                            onClick={handleClick}>{key < trivia.length - 1 ? 'Next' : 'Finish'}</button>
                    </div>
                ))
            }
        </>
    )
}
