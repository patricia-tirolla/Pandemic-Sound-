import './App.css';

import SpotifyAuth from './Api-auth/ApiAuthComponent';

function App() {
  const clientId = "bab8a1bc1b6348759c3cd4efb8b959e9";

  return (
    <div className="App">
      
      <main>
        <SpotifyAuth clientId={clientId} />
      </main>
    </div>
  );
}

export default App;
