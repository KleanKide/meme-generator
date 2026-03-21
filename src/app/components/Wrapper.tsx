import React from 'react'

type Props = {
    children?: React.ReactNode
}

function Wrapper({children}: Props) {
  return (
    <div className="flex justify-center items-center h-screen">
        <div className='border-y-8 border-x-2 border-indigo-500 w-200 h-200  '>{children}</div>
    </div>
    
  )
}

export default Wrapper