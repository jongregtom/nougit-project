import React, { useState, useEffect } from 'react';
import EntriesList from './Components/EntriesList';
import './App.css';

function App() {

  const [entryCountValue, setEntryCountValue] = useState(0);
  const [sortByValue, setSortByValue] = useState('date');
  const [entriesValue, setEntriesValue] = useState([]);

  useEffect(() => {
    getEntries();
  }, [])

  useEffect(() => {
    console.log('entriesValue', entriesValue, entriesValue.length);
  }, [entriesValue])

  function getEntries() {
   let query = `query GetEntries($entryCountValue: Int, $sortByValue: String) {
      getEntries(entryCount: $entryCountValue, sortBy: $sortByValue)
    }`;

    fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({query, variables: { entryCountValue, sortByValue }})
    })
      .then(r => r.json())
      .then(data => { 
        const entries = JSON.parse(data.data.getEntries);
        let prevState = [...entriesValue];
        let newEntries = [];
        for (const entry of entries) {
          newEntries.push(entry);
        }
        const newState = prevState.concat(newEntries);
        setEntriesValue(newState);
      })
        //setEntriesValue(prevState => [...prevState, JSON.parse(data.data.getEntries)])})
      //.then(data => console.log(JSON.parse(data.data.getEntries)))
  }

  return (
    <div className="App">
      <EntriesList entries={entriesValue}/>
    </div>
  );
}



export default App;
