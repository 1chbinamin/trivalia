import useSWR from 'swr'
import he from 'he'
import {useEffect, useState} from "react";
import _ from "lodash";

export default function Index() {
    const
        [trivia, setTrivia] = useState(null),
        [index, setIndex] = useState(null),
        [score, setScore] = useState(0);

    const fetcher = (url) => fetch(url).then((res) => res.json());

    const {data, error} = useSWR('https://opentdb.com/api.php?amount=10&category=31&type=multiple', fetcher, {
        revalidateOnFocus: false,
    });

    useEffect(() => {
        if (data) {
            setTrivia(data.results.map((result) => {
                return {
                    question: result.question,
                    answers: _.shuffle([...result.incorrect_answers, result.correct_answer])
                }
            }));
            setIndex(0);
        }
    }, [data]);

    if (error) return <p>Something with wrong with the server. Please try again later.</p>
    if (!trivia) return <p>Loading ...</p>

    return (
        <>
            {
                trivia.map((subject, key) => (
                    <div key={key}
                         className={`h-full rounded flex flex-col justify-between overflow-hidden ${key === index ? 'block' : 'hidden'}`}>
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
                                               value={answer}
                                               className='mr-2'/>
                                        <span>{he.decode(answer)}</span>
                                    </label>
                                ))
                            }
                        </form>
                        <button className='bottom-btn p-5 font-semibold'>{key < trivia.length -1 ? 'Next' : 'Finish'}</button>
                    </div>
                ))
            }
        </>
    )
}
