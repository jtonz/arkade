import React, { useState } from 'react'
import Autocomplete from 'react-autocomplete'
import {  getCharacters } from '../../utils/api'
import { useRouter } from 'next/router'

const Search = () => {
  const [character, setCharacter] = useState('')
  const [list, setCharacterList] = useState([])
  const router = useRouter()

  const lookupCharacters = async (characterString) => {
    const characters = await getCharacters({ nameStartsWith: characterString, limit: 10 })

    if(characters.data) {
      setCharacterList(characters.data.results)
    }
  }

  const selectCharacter = (value, item) => router.push(`/character/${value}`)

  const submitForm = () => router.push(`/?character=${character}`)

  return (
    <>
      <form className="input-group mb-3" onSubmit={submitForm}>
        <Autocomplete 
          className="form-control"
          inputProps={{ 
            id: 'states-autocomplete', 
            placeholder: 'Enter a name...', 
            className: 'form-control',
          }}
          wrapperStyle={{ position: 'relative', display: 'inline-block' }}
          value={character}
          items={list}
          getItemValue={(item) => item.name}
          onSelect={selectCharacter}
          onChange={(_, value) => {
            setCharacter(value)
            lookupCharacters(value)
          }}
          renderItem={(item, isHighlighted) => (
            <div
              className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
              key={item.abbr}
            >{item.name}</div>
          )}
        />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
        </div>
      </form>
      

      <style jsx>{`
        .menu {
          position: absolute;
          box-sizing: border-box;
          width: 100%;
          border: 1px solid #cccccc;
        }
        
        .item {
          padding: 2px 6px;
          cursor: default;
        }
        
        .item-highlighted {
          color: white;
          background-color: #4095bf;
        }
        
        .item-header {
          background-color: #eeeeee;
          color: #454545;
          font-weight: bold;
        }
      `}</style>
    </>
  )
}

export default Search