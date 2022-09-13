import React from 'react'

const GenImg = ({image}) => {
  return (
    <img src={image[1]} alt={image[0]}/>
  )
}

export default GenImg