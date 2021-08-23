export default function Index() {
    return (
        <>
            <h1 className='text-xl font-bold px-6 pt-10 pb-5'>Who is the most powerful?</h1>
            <form className='flex-grow px-6'>
                <label htmlFor="superman" className='input-container p-1 mb-2 md:mb-0 block'>
                    <input type="radio" name="strongest" id="superman" value='superman' className='mr-2'/>
                    <span>Superman</span>
                </label>
                <label htmlFor="saitama" className='input-container p-1 mb-2 md:mb-0 block'>
                    <input type="radio" name="strongest" id="saitama" value='saitama' className='mr-2'/>
                    <span>Saitama</span>
                </label>
                <label htmlFor="goku" className='input-container p-1 mb-2 md:mb-0 block'>
                    <input type="radio" name="strongest" id="goku" value='goku' className='mr-2'/>
                    <span>Goku</span>
                </label>
                <label htmlFor="sinbad" className='input-container p-1 mb-2 md:mb-0 block'>
                    <input type="radio" name="strongest" id="sinbad" value='sinbad' className='mr-2'/>
                    <span>Sinbad</span>
                </label>
            </form>
            <button className='bottom-btn p-3 font-semibold'>Submit</button>
        </>
    )
}
