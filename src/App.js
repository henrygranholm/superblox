import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/home';
import NavBar from './components/navBar';
import MindMap from './pages/mindmap';
import Block from './pages/block';
import Team from './pages/team';
import Gallery from './pages/gallery';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact strict path="/" element={<Home />} />
        <Route exact strict path="/mindmap" element={<MindMap />} />
        <Route exact strict path="/gallery" element={<Gallery />} />
        <Route exact strict path="/block" element={<Block />} />
        <Route exact strict path="/team" element={<Team />} />
        <Route path="*" element={<Navigate to="/" />}/>
      </Routes>
    </div>
  );
}

export default App;
