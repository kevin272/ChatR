import React from 'react';
import { ShipWheelIcon } from 'lucide-react';
import { Link } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios';
import { signup } from '../lib/api';

const SignUpPage = () => {
  const [signupData, setSignupData] = React.useState({
    fullName: '',
    email: '',
    password: '',
  })

  const queryClient = useQueryClient();

  const {mutate : signupMutation, isPending , error} = useMutation({
    mutationFn: signup,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  return (
  <div className="h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8" data-theme="forest">
    <div className= "border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
    {/*SignupFORM*/}
    <div className="w-full lg:w-1/2 p-6 sm:p-8 flex flex-col">
    
    {/*LOGO*/}
    <div className="mb-4 flex items-center justify-start gap-2">
      <ShipWheelIcon className="size-9 text-primary" />
      <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
        StreamR
      </span>
    </div>
    <div className = "w-full">
      <form onSubmit ={handleSignup} >
        <div className='space-y-4'>
          <div>
            <h2 className="text-2xl font-bold text-left mb-4">
              Create your account
            </h2>
            <p className="text-sm text-left text-gray-500 mb-6">
              Join us to start your journey with StreamR!
            </p>
          </div>

          {/* ERROR MESSAGE IF ANY */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response.data.message}</span>
            </div>
          )}

          {/*FULLNAME*/}
          <div className='space-y-3'>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="input input-bordered w-full"
                value={signupData.fullName}
                onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                required
                />
            </div>

            {/*Email*/}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                value={signupData.email}
                onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                required
              />
              </div>

            {/*password*/}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered w-full"
                value={signupData.password}
                onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Password must be at least 8 characters long.
              </p>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-2">
                <input type="checkbox" className="checkbox checkbox-sm" required />
                <span className="text-xs leading-tight">
                  I agree to the{""}
                <span className="text-primary hover: underline">terms of service</span> and{""}
                <span className="text-primary hover: underline">privacy policy</span>
                </span>
                </label>
                </div>
          </div>
          <button className='btn btn-primary w-full' type='submit'>{
          isPending? 
          (<>
          <span className="loading loading-spinner loading-xs">
            Loading..
          </span>
          </>)
          : "Create Account"}
          </button>
          <div className="text-center mt-4">
          <p className="text-sm">
            Already have an account?{" "}
          <Link to="/login" className="text-primary hover: underline">
          Sign in
          </Link>
          </p>
          </div>
        </div>
        </form>
    </div>
    </div>
     <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <img src="/signup.svg" alt="Language connection illustration" className="w-full h-full" />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">Connect with people worldwide</h2>
              <p className="opacity-70 *:text-sm *:text-gray-600 ">
                Join StreamR to share your thoughts, ideas, and experiences with a global community. 
                Whether you're looking to make new friends or connect with like-minded individuals, 
                StreamR is the place for you.
              </p>
            </div>
          </div>
        </div>
    </div>
    </div> );
}

export default SignUpPage