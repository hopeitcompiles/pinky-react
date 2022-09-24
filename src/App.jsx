import { useEffect,React } from 'react';
import { Header } from './components/Header';
import { GamePage } from './components/games/GamePage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { AuthForm } from './components/authentication/AuthForm';
import { HomePage } from './pages/HomePage';
import { GameList } from './components/list/GameList';
import { UserList } from './components/list/UserList';
import { UserProvider } from './context/UserProvider';
import { ListFrame } from './components/list/ListFrame';
import { ProfilePage } from './pages/ProfilePage';
import { TestList } from './components/list/TestList';
import AdminPage from './pages/AdminPage';
import UsersPage from './pages/UsersPage';
import RootConfigPage from './pages/RootConfigPage';

export function App() {
  useEffect(()=>{
    console.log('rendered')
  }
  )
  return (
    <Router>
      <UserProvider >
        <Header/>
        <Routes>
        <Route path="/" element={
            <HomePage/> 
          }/>
        <Route path="/users" element={
              <UsersPage/>
          }/>
          <Route path="/games" element={
              <ListFrame> <GameList/>
              </ListFrame>
          }/>
          <Route path="/login" element={
              <AuthForm/>
          }/>
          <Route path="/register" element={
            <AuthForm/>
          }/>
          <Route path="/profile" element={
              <ProfilePage/>
          }/>
          <Route path="/tests" element={
            <ListFrame> <GameList/>
            </ListFrame>
          }/>
          <Route path="/games/:gameid" element={
              <GamePage/>
          }/> 
          <Route path="/user/:userid" element={
              <ProfilePage/>
          }/> 
          <Route path="/admin" element={
              <AdminPage/>
          }/>
           <Route path="/root" element={
              <RootConfigPage/>
          }/>
          <Route path="/*" element={
            <h1>404 not found</h1>
        }/>
        </Routes>    
      </UserProvider>
    </Router>
  );
}