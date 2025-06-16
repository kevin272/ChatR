import React from 'react';
import './index.css'; // Ensure Tailwind CSS is imported
import { Navigate, Route, Routes } from 'react-router';
import OnboardingPage from './pages/OnboardingPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import CallPage from './pages/CallPage';
import ChatPage from './pages/ChatPage';
import NotificationsPage from './pages/NotificationsPage';
import { Toaster, toast } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
// import { axiosInstance } from './lib/axios';
import PageLoader from './components/pageloader';
// import { getAuthUser } from './lib/api';
import useAuthUser from './hooks/useAuthUSer';


const App = () => {

  // const {data: authData, isLoading, error} = useQuery({
  //   queryKey:["authUser"],
    
  //   queryFn: getAuthUser,
    
  // retry:false});

  const {isLoading, authUser} = useAuthUser();
  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;


  // const authUser = authData?.user;
  
 if (isLoading) return <PageLoader />; // Show loader while fetching auth data
  

  return (
    <div className="h-screen " data-theme="night">

        <Routes>
          <Route path="/" element={ isAuthenticated && isOnboarded? <HomePage />: <Navigate to="/onboarding"/>} />
          <Route path="/signup" element={!isAuthenticated ?<SignUpPage />: <Navigate to="/"/>} />
          <Route path="/login" element={!isAuthenticated ?<LoginPage /> : <Navigate to="/"/>} />
          <Route path="/onboarding" element={isAuthenticated ?( !isOnboarded? (<OnboardingPage />) :( <Navigate to="/"/>)) : (<Navigate to="/login"/>)} />
          <Route path="/call" element={isAuthenticated ?<CallPage /> : <Navigate to="/login"/>} />
          <Route path="/chat" element={isAuthenticated ?<ChatPage /> : <Navigate to="/login"/>} />
          <Route path ="/notifications" element={isAuthenticated ?<NotificationsPage /> : <Navigate to="/login"/>}  />
          <Route path="*" element={ <Navigate to="/" /> } />
        </Routes>
      <Toaster />
    </div>
  )
}

export default App