import axios from 'axios'
import type { NextPage } from 'next'
import { useEffect, useCallback } from 'react'

const Home: NextPage = () => {

  const loadRecords = useCallback(async() => {
      const {data} = await axios.get("/api/hello");
      console.log('res', data.name);
    },[])
  
  useEffect(() => {
    loadRecords();
  }, [loadRecords])

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  )
}

export default Home
