import React from 'react'

const CharacterTile = ({ name, description, thumbnail }) => {

  return (
    <div className="card m-2" style={{width: "200px"}}>
      <img className="card-img-top" src={`${thumbnail.path}.${thumbnail.extension}`} alt={name} width="100%" />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
      </div>
      <div className="card-footer">
        <a href={`/character/${name}`} className="btn btn-primary">View details</a>
      </div>
    </div>
  )
}

export default CharacterTile