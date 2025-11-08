import { useUser } from '@clerk/clerk-react'
import { Navigate } from 'react-router-dom';


const ProtectedRoute=({children}:any)=>{

  const {user} = useUser();

  return (
    <>
      <div>
        {
          user ? children : <Navigate to='/' />
        }
      </div>
    </>
  )
}

export default ProtectedRoute
