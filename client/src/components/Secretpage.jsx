import React from 'react'
import { useNavigate } from 'react-router-dom'

const Secretpage = () => {
    const navigate = useNavigate();

    const Logouthandler=()=>{
        navigate("/signup");
    }
  return (
    <div className=''>
      <h1>Secret Page</h1>
      <button onClick={Logouthandler}>Logout</button>
    </div>
  )
}

export default Secretpage
