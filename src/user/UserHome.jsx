import React from 'react'
import ItemsCard from './ItemsCard'
import { homebanner } from '../snippets/Image_load'

const username=()=> {
  return (
    <>
    <section className='center homepageBanner'>
      <div className='homebanner page-width' style={{backgroundImage: `url(${homebanner})`}}></div>
    </section>
      <ItemsCard />
      <ItemsCard />
    </>
  )
}
export default username
