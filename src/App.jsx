import Homepage from './Components/Homepage/Homepage';
import Nav from './Components/Nav/Nav';
import Sidebar from './Components/Sidebar/Sidebar';
import './styles/App.css';




function App() {
  return (
    <div className="App">
        <Nav/>
        <Sidebar/>
        <Homepage/>
    </div>
  );
}

export default App;
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
