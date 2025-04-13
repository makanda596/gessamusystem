import React from 'react'
import { useAuthStore } from '../store/auth'
import { useEffect } from 'react'

const userProjectCount = () => {
    const { userProjects, countUserProjects } =useAuthStore()

    useEffect(()=>{
        countUserProjects()
    },[])
  return (
      <div>userProjectCount{userProjects}</div>
  )
}

export default userProjectCount