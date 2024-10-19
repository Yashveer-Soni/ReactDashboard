import React from 'react'
import ItemsCard from './ItemsCard'
import { homebanner } from '../snippets/Image_load'
import { FetchProducts } from '../api/FetchProducts'

const username=()=> {
  return (
    <>
    <div className='center homepageBanner'>
      <div className='homebanner page-width' style={{backgroundImage: `url(${homebanner})`}}></div>
    </div>
    <FetchProducts>
      <ItemsCard />
    </FetchProducts>
    </>
  )
}
export default username
