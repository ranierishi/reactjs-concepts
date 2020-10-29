import React, { useState,useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([''])
  

  useEffect(()=>{
    api.get('repositories').then( response => {
      setRepositories(response.data)
    })

  },[repositories])


   /* useEffect(()=>{
    api.post('repositories').then( response =>{
      setRepositories([...repositories, response.data])

    })
  },[]) */
  

  async function handleAddRepository() {
    const repository = {
      title: `test ${Date.now()}`,
      url: 'http://lol.com',
      techs: ['react', 'node']


    }
    const response = await api.post('repositories',repository )
    setRepositories([...repositories, response.data])
    
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`)
    
      const result = repositories.findIndex(repository => repository.id ===id)
      setRepositories(repositories.splice(result, 1))    

    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => <li>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)}        
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
