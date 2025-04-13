import React from 'react'

const SubmitTask = ({ setIsPopup, isPopup }) => {

  return (
    <div className='fixed top-4 '>
          {isPopup &&
          (
              <div className='fixed top-4'>
          <p>SubmitTask</p> 
                  <button onClick={() => setIsPopup(false)}>close</button></div>)
}
        </div>
  )
}

export default SubmitTask