import React, { useState, useEffect } from 'react'

import api from './services/api'

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories', {
      title: `Novo ${Date.now()}`,
      url: "Bergamo 1",
      techs: "['Node.JS']"
    })

    /*     const repositorie = response.data
     */
    setRepositories([...repositories, response.data])

    /* console.log(repositories) */
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`/repositories/${id}`)

    setRepositories(repositories.filter(repositorie => repositorie.id !== id))

    /* console.log(repositories) */


  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(repositorie =>
          <li key={repositorie.id}>
            {repositorie.title}
            <button key={repositorie.id} onClick={() => handleRemoveRepository(repositorie.id)}>
              Remover
              </button>
          </li>
        )}


      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
