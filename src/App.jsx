import {useEffect, useState} from 'react'
function App() {
  const [summoner, setSummoner] = useState("");
  const [result, setResult] = useState(null);
  const getSummoner = () => {
    const summonerNameAndTag = summoner.split('#');
    console.log(summonerNameAndTag);
    fetch("/api/summoner/"+summonerNameAndTag[0]+"/"+summonerNameAndTag[1],{
      method: 'GET',
    })
    .then(res => res.json())
    .then(data => setResult(data))
  }
  const mainContainerStyle = {
    backgroundColor: '#1F2124',
    display: 'grid',
    height: '100vh',
    width: '100vw',
    margin: '0',
    padding: '0'
  };
  const searchContainerStyle = {

  };
  const resultContainerStyle = {

  };
  return (
    <main style={mainContainerStyle}>
      <div style={searchContainerStyle}>
        <input placeholder='이름#태그'
               onKeyPress={(e)=>{
                 if(e.key === 'Enter')
                   getSummoner()
               }}
               onChange={(e)=>{
                 setSummoner(e.target.value);
               }}
        />
      </div>
      {result?
        <div style={resultContainerStyle}>
          <h1>{result.name}#{result.tag}</h1>
          <h3>{result.soloTier} - {result.soloRank}</h3>
          <h3>{result.flexTier} - {result.flexRank}</h3>
        </div>
        :null
      }
    </main>
  )
};

export default App;
