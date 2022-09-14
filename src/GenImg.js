import React from 'react'

const GenImg = ({image, index}) => {
  return (
    <img src={image && image[index][1]} alt={image && image[index][0]}/>
  )
}

export default GenImg