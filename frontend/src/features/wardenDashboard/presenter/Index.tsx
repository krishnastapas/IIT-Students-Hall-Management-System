import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserAuth } from '../../context/UserAuthContext'

function Index() {

  const navigate = useNavigate()
  const { user } = useUserAuth()
  useEffect(() => {
    navigate("/warden/hall-management/" + user._id)
  }, [])
  return (
    <div>

    </div>
  )
}

export default Index