import { useState } from 'react'
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addUser } from './utils/userslice';

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();

  const handlelogin = async () => {
    try {
      const res = await axios.post("http://localhost:7777/login",
        { email, password },
        { withCredentials: true }
      );
     
      dispatch(addUser(res.data)); 
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-base-200 px-4 '>
      <div className="card w-full max-w-md bg-base-100 shadow-xl p-6">
        <div className="card-body space-y-6">
          <h2 className="card-title justify-center text-2xl font-semibold">Login</h2>

          <div className='space-y-4'>
            <div className='form-control w-full'>
              <label className='label'>
                <span className='label-text'>Email Id</span>
              </label>
              <input
                type="email"
                placeholder='Type your email'
                value={email}
                onChange={(e) => setemail(e.target.value)}
                className='input input-bordered w-full'
              />
            </div>

            <div className='form-control w-full'>
              <label className='label'>
                <span className='label-text'>Password</span>
              </label>
              <input
                type="password"
                placeholder='Type your password'
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                className='input input-bordered w-full'
              />
            </div>
          </div>

          <div className="card-actions justify-center mt-4">
            <button onClick={handlelogin} className="btn btn-primary w-full">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
