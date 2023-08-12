import { useState} from 'react'
import './App.css'

function App() {
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log(`Searching for: ${searchText}`);
  };

  return (
    <>
      <div className="App">
      <header className="App-header">
        <h1>HNEWS</h1>
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            type="text"
            placeholder="Enter your search..."
            value={searchText}
            onChange={handleSearchChange}
          />
          <button type="submit">Search</button>
        </form>
      </header>
    </div>
    </>
  )
}

export default App
