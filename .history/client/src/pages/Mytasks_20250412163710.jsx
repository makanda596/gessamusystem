import React from 'react'
import { useAuthStore } from '../store/auth'

const Mytasks = () => {
    const { getSubmittedTask, tasks, }=useAuthStore()
    getSubmittedTask()

  return (
    <div>
          <div>
              {tasks.map((item) => {
                  return <div key={item._id}>
                      <>{item.title || "nor"}</>
                      <>{item.status || "nor"}</>
                      <img src={item.image} alt="" className="h-20 w-20" />
                  </div>
              })}
          </div>
    </div>
  )
}

export default Mytasks