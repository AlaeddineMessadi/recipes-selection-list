import { useState, useEffect } from 'react';
import dataBox from '../data/box';

const useFetchData = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(dataBox);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [data]);

  return { data, loading };
};

export default useFetchData;
