import React from 'react'
import LoadingGif from '../assets/loading.gif'
export default function Loading({ width , height }) {
  return (
    <img src={LoadingGif} alt="" width={width} height={height} />
  )
}
