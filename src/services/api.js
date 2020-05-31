import axios from 'axios';

export async function getApiDeals(searchTerm, pageNum) {
  const data = await axios.get(`http://localhost:3001/deals/${searchTerm}/${pageNum}`).then((res) => {
    if (res.data.error) return null;
    return res.data.results;
  }).catch((err) => {
    return null;
  });

  return data;
}