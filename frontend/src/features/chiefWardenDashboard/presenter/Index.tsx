import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserAuth } from '../../context/UserAuthContext'

function Index() {
  const navigate = useNavigate()
  const { user } = useUserAuth()
  useEffect(() => {
    navigate("/chief-warden/student-list")
  }, [])
  return (
    <div>
      chief Waren Dashboard
    </div>
  )
}

export default Index