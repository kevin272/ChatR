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
import PageLoader from './components/PageLoader';
// import { getAuthUser } from './lib/api';
import useAuthUser from './hooks/useAuthUser';
import Layout from './components/Layout';
import { useThemeStore } from './store/useThemeStore';
import FriendsPage from './pages/FriendsPage';


const App = () => {

  // const {data: authData, isLoading, error} = useQuery({
  //   queryKey:["authUser"],

  //   queryFn: getAuthUser,

  // retry:false});

  const { isLoading, authUser } = useAuthUser();
  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;
  const { theme, setTheme } = useThemeStore();


  // const authUser = authData?.user;

  if (isLoading) return <PageLoader />; // Show loader while fetching auth data


  return (
    <div className="h-screen " data-theme={theme}>

      <Routes>
        <Route path="/" element={isAuthenticated && isOnboarded ? (<Layout showSidebar={true}><HomePage /></Layout>) : <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />} />
        <Route path="/signup" element={!isAuthenticated ? <SignUpPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />} />
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />} />
        <Route path="/onboarding" element={isAuthenticated ? (!isOnboarded ? (<OnboardingPage />) : (<Navigate to="/" />)) : (<Navigate to="/login" />)} />
        <Route path="/call/:id" element={isAuthenticated && isOnboarded ?
          (<Layout showSidebar={false}>
            <CallPage /></Layout>)
          :
          (<Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />)} />
          <Route path="/friends" element={isAuthenticated && isOnboarded ? (<Layout showSidebar={true}><FriendsPage /></Layout>) : <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />} />
        <Route path="/chat/:id" element={isAuthenticated && isOnboarded ? (<Layout showSidebar={false}><ChatPage /></Layout>) : <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />} />
        <Route path="/notifications" element={isAuthenticated && isOnboarded ?
          (<Layout showSidebar={true}>
            <NotificationsPage /></Layout>)
          :
          (<Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />)} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App