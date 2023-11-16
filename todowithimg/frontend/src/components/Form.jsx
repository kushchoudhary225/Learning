import React from 'react'

const From = () => {
  return (
    <>
        <div className="mt-4">
            <div className=''><h1 className='font-bold mx-2 rounded-xl shadow-md py-2 bg-blue-500 text-sm text-center'>Hello Upload your files here</h1> </div>
            <form className='border-red-500 border-2
            mt-4' action="">
            <div>
            <input type="file" />
            </div>
            <div>
                <textarea name="" id="" cols="30" rows="10" />
            </div>
            <button>Submit</button>
            </form>

        </div>

    </>


  )
}

export default From     