import axios from 'axios';
import { useEffect, useState } from 'react';

export default function useApiData(apiUrl, initValue = []) {
  const [dataArr, setDataArr] = useState(initValue);
  const [apiErr, setApiErr] = useState({});

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        console.log('response ===', response);
        const commFromAPI = response.data;
        setDataArr(commFromAPI);
      })
      .catch((error) => {
        console.log('error ===', error);
        setApiErr(error);
      });
  }, []);

  return [dataArr, setDataArr, apiErr];
}
