import React from 'react';
import Homepage from './Components/Homepage/Homepage';
import Nav from './Components/Nav/Nav';
import Sidebar from './Components/Sidebar/Sidebar';
import './styles/App.css';
// import Songs from './Components/Songs/Songs';

function App() {
  return (
    <div className="App">
      {/* <Songs /> */}
        <Nav/>
        <Sidebar/>
        <Homepage/>
    </div>
  );
}

export default App;