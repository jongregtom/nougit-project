import React, { useState, useEffect } from 'react';
import EntriesList from './Components/EntriesList';
import FilterWidget from './Components/FilterWidget';
import './App.css';

function App() {

  const [entryCountValue, setEntryCountValue] = useState(0);
  const [sortByValue, setSortByValue] = useState('date');
  const [entriesValue, setEntriesValue] = useState([]);

  let count = 0;
  let sortBy = 'date';
  let entries = [];

  useEffect(() => {
    setClickedButtonValue('All');
    console.log('INITIAL RENDER')
  }, [])

  useEffect(() => {
    console.log('count', entryCountValue)
    // getEntries(function(newState) {
    //   setEntriesValue(newState);
    // })
  }, [entryCountValue])

  useEffect(() => {
    console.log('entriesValue', entriesValue, entriesValue.length);
  }, [entriesValue])

  useEffect(() => {
    console.log('sortByValue', sortByValue)
  }, [sortByValue])

  async function getEntries() {
    let prevEntries = [...entries];
    //let count = entryCountValue;
    let query = `query GetEntries($count: Int, $sortBy: String) {
      getEntries(entryCount: $count, sortBy: $sortBy)
    }`;

    fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({query, variables: { count, sortBy }})
    })
      .then(r => r.json())
      .then(data => { 
        let newEntries = JSON.parse(data.data.getEntries);
        // let entryAcc = [];
        // for (const entry of newEntries) {
        //   entryAcc.push(entry);
        // }
        let newState = prevEntries.concat(newEntries);
        console.log('new State', newState)
        setEntriesValue(newState);
        entries = newState;
        setEntryCountValue(newState.length); 
        count = newState.length;       
      

      //   console.log('after set: ', entryCountValue, entriesValue)
      })  
      // .then(() => console.log('after Fetch', entryCountValue, entriesValue))
        //setEntriesValue(prevState => [...prevState, JSON.parse(data.data.getEntries)])})
      //.then(data => console.log(JSON.parse(data.data.getEntries)))
  }


  async function setClickedButtonValue(value) {
    switch(value) {
      case 'All':
        setSortByValue('date')
        sortBy = 'date';
        setEntriesValue([]);
        entries = [];
        setEntryCountValue(0);
        count = 0;
        getEntries(0);
        break;
      case 'Trending Tasks':
        setSortByValue('popularity');
        sortBy = 'popularity';
        setEntriesValue([]);
        entries = [];
        setEntryCountValue(0);
        count = 0;
        console.log('lkjsdflkj', entries)
        getEntries(count);
        break;
      case 'Open Tasks':
        setSortByValue('open');
        sortBy = 'open';
        setEntriesValue([]);
        entries = [];
        setEntryCountValue(0);
        count = 0;
        getEntries(count);
        break;
      case 'Completed Tasks':
        setSortByValue('closed');
        sortBy = 'closed';
        setEntriesValue([]);
        entries = [];
        setEntryCountValue(0);
        count = 0;
        getEntries(count);
        break;
    }
  }

  async function fetchMoreEntries(count) {
    console.log('fetchMore', entriesValue)
    console.log(entries)
    setEntryCountValue(count)
    count = count;
    console.log(entryCountValue)
    getEntries(count);
  }

  return (
    <div className="App">
      <FilterWidget setClickedButtonValue={setClickedButtonValue}/>
      <EntriesList entries={entriesValue} count={entryCountValue} sortBy={sortByValue} fetchMoreEntries={fetchMoreEntries}/>
    </div>
  );
}



export default App;
