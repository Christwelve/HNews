import SearchArticles from './components/SearchArticles';

import './App.css'

function App() {

  return (
    <>
      <div className="App">
      <header className="App-header">
        <a href='/'>
          <h1>HNEWS</h1>
        </a>
        <SearchArticles />
      </header>
    </div>
    </>
  )
}

export default App
