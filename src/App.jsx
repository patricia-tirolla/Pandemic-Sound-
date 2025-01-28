import Main from './Components/Main/Main';
import Nav from './Components/Nav/Nav';
import Sidebar from './Components/Sidebar/Sidebar';
import './styles/App.css';

function App() {
  return (
    <div className="App">
        <Nav/>
        <Main/>
        <Sidebar/>
    </div>
   
  );
}

export default App;

