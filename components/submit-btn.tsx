import React from 'react'
import { FaPaperPlane } from 'react-icons/fa'
import { useFormStatus } from "react-dom"

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button className='group bg-gray-800 text-white text-lg font-medium flex items-center justify-center gap-2 w-[200px] outline-none px-3 py-3 rounded-full text-center hover:tracking-wider hover:bg-gray-900 hover:scale-110 focus:scale-110 active:scale-105 transition-all disabled:bg-opacity-65 disabled:scale-100' type='submit'
        disabled={pending}>
            {
                pending
                    ? <div className='h-5 w-5 animate-spin rounded-full border-b-2 border-white'/>
                    :
                    <>
                        Send<FaPaperPlane className='text-base opacity-75 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all' />
                    </>
            }
        </button>
    )
}

export default SubmitButton
