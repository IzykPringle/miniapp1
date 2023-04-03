import logo from './logo.svg';
import './App.css';

function App() {

  const movies = [
    { title: 'Mean Girls' },
    { title: 'Hackers' },
    { title: 'The Grey' },
    { title: 'Sunshine' },
    { title: 'Ex Machina' },
  ];
  return (
    <>
      <div className="App">
        Movies
        {movies.map(movie => <ul> {movie.title}</ul>)}
      </div>
    </>
  );
}

export default App;
