import React, { useState } from 'react';
import { ShipWheelIcon } from 'lucide-react';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {login} from "../lib/api";
import { Link } from 'react-router';
import useLogin from '../hooks/useLogin';

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
   email:"",
   password: "",
  })
  //without custom hooks
  // const queryClient = useQueryClient();

  // const {mutate: loginMutation, isPending, error}= useMutation({
  //   mutationFn: login,
  //   onSuccess: () => queryClient.invalidateQueries({queryKey: ["authUser"]})
  // });

  const {error,isPending,loginMutation}=useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  }

  

  // const queryClient= 
  return (
      <div className="h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
    <div className= "border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
    {/*loginFORM*/}
    <div className="w-full lg:w-1/2 p-6 sm:p-8 flex flex-col">
    
    {/*LOGO*/}
    <div className="mb-4 flex items-center justify-start gap-2">
      <ShipWheelIcon className="size-9 text-primary" />
      <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
        StreamR
      </span>
    </div>
    <div className = "w-full">
      <form onSubmit ={handleLogin} >
        <div className='space-y-4'>
          <div>
            <h2 className="text-2xl font-bold text-left mb-4">
              Login to your account
            </h2>
            <p className="text-sm text-left text-gray-500 mb-6">
              Continue your journey with StreamR!
            </p>
          </div>

          {/* ERROR MESSAGE IF ANY */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response.data.message}</span>
            </div>
          )}
                <div className="flex flex-col gap-3">
                  <div className="form-control w-full space-y-2">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="hello@example.com"
                      className="input input-bordered w-full"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-control w-full space-y-2">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="input input-bordered w-full"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-full" disabled={isPending}>
                    {isPending ? (
                      <>
                        <span className="loading loading-spinner loading-xs"></span>
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </button>

                  <div className="text-center mt-4">
                    <p className="text-sm">
                      Don't have an account?{" "}
                      <Link to="/signup" className="text-primary hover:underline">
                        Create one
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
        </form>
    </div>
    </div>
     <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <img src="./login.svg" alt="Language connection illustration" className="w-full h-full" />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">Connect with people worldwide</h2>
              <p className="opacity-70 *:text-sm *:text-gray-600 ">
                Join StreamR to connect with a global community and share your thoughts by creating an account or logging in with your existing credentials. Once logged in, you can easily engage in discussions and make new friends.
              </p>
            </div>
          </div>
        </div>
    </div>
    </div> 
  )
}

export default LoginPage