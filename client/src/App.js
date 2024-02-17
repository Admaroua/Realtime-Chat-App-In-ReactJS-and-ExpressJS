
import './App.css';
import io from 'socket.io-client'

const socket=io.connect("http://localhost:5000") // create connection to the backend server
function App() {
  
  return (
    <div className="App">
      hello
    </div>
  );
}

export default App;
