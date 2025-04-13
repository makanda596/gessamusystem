import React from 'react'
import { useAuthStore } from '../store/auth'
import { useEffect } from 'react'

const MyProjects = () => {
    const { alluserProjects ,getUserProjetcs}= useAuthStore()

    useEffect(()=>{
        getUserProjetcs()
    },[])
  return (
<>
    <div>MyProjects</div>
    <div>
              {alluserProjects.map((item)=>{
                return <div key={item._id}>
                    <h1>{item.title}</h1>
                </div>
              })}
    </div>
      </>
  )
}

export default MyProjects