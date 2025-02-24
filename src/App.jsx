import {useEffect, useState} from 'react'
import './App.css'

function App() {
  useEffect(() => {
    fetch('/api/summoner/March of Time/Bit',{
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => console.log(data))
  });

  return (
    <>
      <h1>hello</h1>
    </>
  )
}

export default App
