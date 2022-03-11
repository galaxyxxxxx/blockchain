import { get, post } from './request';

/**
 * 获取labs列表
 * @returns 返回清洗好的labs数组
 */
export const getLabs = async () => {
  const network = sessionStorage.getItem('currentNetwork');
  const channel = sessionStorage.getItem('currentChannel');
  const uri = `network/${network}/${channel}/labPeers`;
  const data = await get(uri).then((resp) => {
    const data = resp.data.data;

    // data clean
    const raw = data.value || [];

    const res = raw.split('","');
    res[0] = res[0].slice(2);
    res[res.length - 1] = res[res.length - 1].slice(0, res.length - 2);

    console.log(res);
    return res;
  });
  return data;
};

/**
 * 获取区块列表
 * @returns 返回区块列表
 */
export const getBlocks = async () => {
  const channel = sessionStorage.getItem('currentChannel');
  const uri = `transactions/${channel}/blockinfo`;
  console.log(uri);
  const data = await post(uri).then((resp) => {
    const data = resp.data.data;
  });
};
