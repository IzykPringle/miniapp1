import './App.css';
import React, { useEffect, useState } from 'react';

function App() {

  const [movies, setMovies] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [addedMovie, setAddedMovie] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/')
      .then(response => response.json())
      .then(data => {
        setMovies(data)
      })
  }, [])


  const addMovie = () => {
    fetch('http://localhost:8080', {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify({ title: addedMovie })
    })
  }

  const deleteMovie = (id) => {
    fetch('http://localhost:8080', {
      method: "DELETE",
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify({ title: id })
    })
  }



  return (
    <>
      <div className="App">
        
        Movies
        {movies.map(movie => <ul key={movie.id}>
          {movie.title}
          <button onClick={() => { deleteMovie(movie.title) }}>Delete</button>
          <label for='watch'>Watched:</label>
          <input id='watch' type="checkbox" onClick={() => {  }}/>
        </ul>)}
      </div>
      <div>
        <input
          type="search"
          placeholder="Search here"
          id="baseSearch"
          onChange={event => { setSearchInput(event.target.value) }}
          value={searchInput}>
        </input>
        <button onClick={() => { setFilteredMovies() }}>Search</button>

        {movies.filter((movie) => {
          if (searchInput === "") {
            return null;
          } else if (movie.title.toLowerCase().includes(searchInput.toLowerCase())) {
            //setFilteredMovies(movie.title)
            return movie.title;
          }
        }).map((movie) => {
          return (
            <div key={movie.id}>
              <button className="searchButton" onClick={() => {
                setSearchInput("")
                setFilteredMovies(movie.title)
                // navigate(`${base.Name}/equipment`)
              }}>{movie.title}</button>
            </div>
          )
        })
        }
      </div>
      <input placeholder="add movie title" onChange={e => setAddedMovie(e.target.value)} />
      <button onClick={() => { addMovie() }}>Add Movie</button>
    </>
  );
}

export default App;
