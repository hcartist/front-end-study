import { getPublicData } from "../service/api";
import { useState, useEffect } from 'react';

export default function Dashboard({ districtId, year }) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  async function fetchData() {
    try {

      const data = await getPublicData();
      console.log(data);


    } catch (error) {
      setError(error)
    } finally {
      setIsLoaded(true);
    }
  }

  useEffect(() => {
    fetchData();
  }, [districtId, year])
  
  console.log(districtId, year);
};