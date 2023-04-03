import './App.css';
import React, { useEffect, useState } from 'react';

function App() {

  const [movies, setMovies] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [addedMovie, setAddedMovie] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/movies')
      .then(response => response.json())
      .then(data => {
        setMovies(data)
      })
  }, [])

  useEffect(() => {
    fetch('http://localhost:8080/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data)
      })
  }, [])


  const addMovie = () => {
    fetch('http://localhost:8080/movies', {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify({ title: addedMovie })
    })
  }

  const deleteMovie = (id) => {
    fetch('http://localhost:8080/movies', {
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
        <div id='watchtoggle'>
          <label for='watched'>Watched</label>
          <input type='radio' id='watched' name='toggle' />
          <label for=' to watch'>To Watch</label>
          <input type='radio' id='to watch' name='toggle' />
          <label for='watched'>All</label>
          <input type='radio' id='all' name='toggle' />
        </div>
        <div id='searchdiv'>
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
        <div id='moviesdiv'>
          Movies
          {movies.map(movie => <ul id='movielistitem' key={movie.id}>
            {movie.title}
            <div>
              <label for='watch'>Watched:</label>
              <input id='watch' type="checkbox" onClick={() => { }} />
            </div>
            <button onClick={() => { deleteMovie(movie.title) }}>Delete</button>
            <label for='rating'>Rating:</label>
            <select name='rating' id='rating'>
            <option value="" disabled selected>Select Rating</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
          </ul>)}
          <div id='movieadd'>
            <input placeholder="add movie title" onChange={e => setAddedMovie(e.target.value)} />
            <button onClick={() => { addMovie() }}>Add Movie</button>
          </div>
        </div>
        <div id='userselect'>
          Select User
          {users.map(user => <ul key={user.id}>
            {/* <button onClick={() => { deleteMovie(movie.title) }}>Delete</button> */}
            <label for='user'>{user.user}</label>
            <input type='radio' id='user' name='user' />
          </ul>)}
        </div>
      </div>
    </>
  );
}

export default App;
