import React, { useContext, useEffect, useState } from 'react'
import { dataContext } from './components/context/ChatAppContext'
import NavBar from './components/NavBar';
import UserCard from './components/UserCard'
import Model from './components/Model';
const App = () => {
  const [view, setView] = useState(1);
  const [create, setCreate] = useState(0);

  // useEffect(()=>{
  //   setCreate(0);
  // })
  return (
   <>
   <NavBar view={view} setView={setView} create={create} setCreate={setCreate}/>
   {view === 0 && <UserCard />}
   
   {create === 1 ? <Model setCreate={setCreate} /> : ""}
   </>
  )
}

export default App;