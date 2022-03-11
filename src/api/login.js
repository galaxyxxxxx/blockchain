import { post } from './request';
import Auth from './auth';

export const login = async ({ username, password, network, org, channel }) => {
  const uri = `${network}/${channel}/${org}/enroll`;

  // set session
  sessionStorage.setItem('currentChannel', channel);
  sessionStorage.setItem('currentNetwork', network);

  const res = await post(uri, { username, password }).then((resp) => {
    const { data } = resp;
    if (data.success) {
      Auth.authenticateUser(data.data);
      return true;
    }
    return false;
  });
  return res;
};
