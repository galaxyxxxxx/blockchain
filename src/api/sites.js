import axios from 'axios';

export const getSites = async () => {
  const url =
    'http://cicd.blockchain.lenovo.com/screen/v1/network/fe0f6e13-25af-49ba-b85f-cd7febed68f7/testchan1/labPeers';
  const request = axios.create({
    baseUrl: 'http://cicd.blockchain.lenovo.com',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const resp = await request.get(url);
  console.log(resp);
  return resp;
};

getSites();
