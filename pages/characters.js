import Search from '../components/search'
import CharacterTile from '../components/characterTile'
import { getCharacters } from '../utils/api'

const HomePage = ({ characters }) => {
  return (
    <div className="home-page">
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4">Marvel character search</h1>
          <p className="lead">Use the search fields below to look up your favourite Marvel characters</p>
          <Search />
        </div>
      </div>
      <div className="d-flex flex-wrap">
      { !!characters && characters.map(character => <CharacterTile {...character} />)}
      </div>
    </div>
  )
}
export default HomePage

export async function getStaticProps() {
  const characters = await getCharacters()

  if(characters.data.results) {
    return { 
      props: {
        characters: characters.data.results
      }
    }
  }
  return { 
    props: null
  }
}
