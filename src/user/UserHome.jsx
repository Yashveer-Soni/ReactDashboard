import React from 'react'
import ItemsCard from './ItemsCard'
import { homebanner } from '../snippets/Image_load'

const username=()=> {
  return (
    <>
    <div className='center homepageBanner'>
      <div className='homebanner page-width' style={{backgroundImage: `url(${homebanner})`}}></div>
    </div>
      <ItemsCard />
    </>
  )
}
export default username
