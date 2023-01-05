import React, { useEffect } from 'react'
import axios from 'axios'
import { server } from '../index.js'
const Exchanges = () => {
  useEffect(() => {
    const fetchExchanges = async() => {
      const{data}= await axios.get(`${server}/exchanges`)
      console.log(data[0].id);
    }
  
    
    fetchExchanges()
  },[])
  
  return (
    <div>Exchanges</div>
  )
}

export default Exchanges