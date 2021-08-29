import Link from "next/link";

export default function Index() {
    return (
        <div className='h-full flex flex-col justify-center items-center'>
            <h1 className='text-3xl md:text-4xl font-bold mb-6 md:mb-8'>Trivalia</h1>
            <Link href='/game'>
                <a className='uppercase font-bold btn p-3 rounded text-center w-40 shadow-lg md:p-4 md:w-60 md:hover:bg-gray-800'>Start</a>
            </Link>
        </div>
    )
}
