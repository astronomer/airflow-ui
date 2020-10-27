import { useEffect, useState } from 'react';
import humps from 'humps';

const API_ENDPOINT_URL = 'http://127.0.0.1:28080/api/v1/';
const USERNAME = 'admin';
const PASSWORD = 'admin';
const authorization = `Basic ${btoa(`${USERNAME}:${PASSWORD}`)}`;

const useQuery = (q) => {
  const [status, setStatus] = useState('idle');
  // const [query, setQuery] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!q) return;

    const fetchData = async () => {
      setStatus('fetching');
      const response = await fetch(
        API_ENDPOINT_URL + q,
        {
          method: 'GET',
          headers: new Headers({
            Authorization: authorization,
            accept: 'application/json',
            'Content-type': 'application/json',
          }),
        },
      );
      const res = await response.json();
      setData(humps.camelizeKeys(res));
      setStatus('fetched');
    };

    fetchData();
  }, [q]);

  return { status, data };
};

export default useQuery;
