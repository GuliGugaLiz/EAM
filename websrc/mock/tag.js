import { parse } from 'url';

// mock tableListDataSource
let tableListDataSource = [];
for (let i = 0; i < 46; i += 1) {
  tableListDataSource.push({
    id: i,
    disabled: ((i % 6) === 0),
    download: 'https://ant.design',
    avatar: ['https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png', 'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png'][i % 2],
    EPCCode: `TradeCode ${i}`,
    assetId: `一个任务名称 ${i}`,
    tagReaderId:`tagReaderId${i}`,
    memo: '备注',
    brand: '这是一段描述',
    currentValue: Math.floor(Math.random() * 1000),
    status: Math.floor(Math.random() * 10) % 2,
    purchaseDate: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    updatedAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    progress: Math.ceil(Math.random() * 100),
    siteId:Math.floor(Math.random() * 10) % 2 ? '武汉' : '珠海',
    userState:Math.floor(Math.random() * 10) % 2 ? '使用中' : '未使用',
  });
}

export function getTag(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  let dataSource = [...tableListDataSource];

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  if(params.userState) {
    const userState = params.userState.split(',');
    let filterDataSource = [];
    userState.forEach((s) => {
      filterDataSource = filterDataSource.concat(
        [...dataSource].filter(data => data.userState.indexOf(params.userState) > -1)
      );
    });
    dataSource = filterDataSource;
  }

  if (params.name) {
    dataSource = dataSource.filter(data => data.name.indexOf(params.name) > -1);
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export function postTag(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, no, description } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter(item => id.indexOf(item.id) === -1);      
      break;
    case 'post':
      const i = Math.ceil(Math.random() * 10000);
      tableListDataSource.unshift({
        id: i,
        disabled: ((i % 6) === 0),
        download: 'https://ant.design',
        avatar: ['https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png', 'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png'][i % 2],
        EPCCode: `TradeCode ${i}`,
        assetId: `一个任务名称 ${i}`,
        tagReaderId:`tagReaderId${i}`,
        memo: '备注',
        brand: '这是一段描述',
        currentValue: Math.floor(Math.random() * 1000),
        status: Math.floor(Math.random() * 10) % 2,
        purchaseDate: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
        updatedAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
        progress: Math.ceil(Math.random() * 100),
        siteId:Math.floor(Math.random() * 10) % 2 ? '武汉' : '珠海',
        userState:Math.floor(Math.random() * 10) % 2 ? '使用中' : '未使用',   
      });
      break;
    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export default {
  getTag,
  postTag,
};
