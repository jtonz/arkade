import React, { useEffect, useState } from 'react'
import { getCharacters } from '../../utils/api'

function User({ query }) {
  const [character, setCharacter] = useState(null)
  const [error, setError] = useState(false)


  useEffect(() => {
    const fetchData = async () => {
      const chr = await getCharacters({ name: query.id })

      if(chr && chr.data){
        setCharacter(chr.data.results[0])
      } else {
        setError(true)
      }
    }
    fetchData()
  }, [])

  if (!character) return <div>Loading...</div>

  return (
    <>
    <div class="media mb-4">
      <img 
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`} 
        class="align-self-start mr-3" 
        alt={character.name} 
        height="200px"
      />
      <div class="media-body">
        <h5 class="mt-0">{character.name}</h5>
        <p>{character.description}</p>
      </div>
    </div>
    <div className="row">
      <h3 className="col-xs-12 col-sm-3">Events</h3>
      <div className="col-xs-12 col-sm-9">
        { character.stories.items.map(stories => (
          <div key={stories.resourceURI}>{stories.name}</div>
        ))}
      </div>
    </div>
    <hr />
    <div className="row">
      <h3 className="col-xs-12 col-sm-3">Series</h3>
      <div className="col-xs-12 col-sm-9">
        { character.series.items.map(series => (
          <div key={series.resourceURI}>{series.name}</div>
        ))}
      </div>
    </div>
    </>
  )
}

User.getInitialProps = ({query}) => {
  return {query}
}

export default User
