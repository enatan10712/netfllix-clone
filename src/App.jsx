import Banner from './components/Banner';
import Row from './components/Row';
import './App.css';

function App() {
  return (
    <div className="app">
      <Banner />
      <Row title="NETFLIX ORIGINALS" isLargeRow />
      <Row title="Trending Now" />
      <Row title="Top Rated" />
      <Row title="Action Movies" />
      <Row title="Comedy Movies" />
    </div>
  );
}

export default App
