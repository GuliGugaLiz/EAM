import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Icon,
  Card,
  Tabs,
  Table,
  Radio,
  DatePicker,
  Tooltip,
  Menu,
  Dropdown,
} from 'antd';
import numeral from 'numeral';
import {
  ChartCard,
  yuan,
  MiniArea,
  MiniBar,
  MiniProgress,
  Field,
  Bar,
  Pie,
  TimelineChart,
} from 'components/Charts';
import Trend from 'components/Trend';
import NumberInfo from 'components/NumberInfo';
import { getTimeDistance } from '../../utils/utils';

import styles from './Analysis.less';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;


@connect(({ dashboard, loading }) => ({
  dashboard,
  loading: loading.effects['dashboard/fetch'],
}))
export default class Analysis extends Component {
  state = {
    pieType: 'all',
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'dashboard/fetch',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dashboard/clear',
    });
  }

  handleChangePieType = (e) => {
    this.setState({
      pieType: e.target.value,
    });
  };

  render() {
    const { rangePickerValue, pieType, currentTabKey } = this.state;
    const { dashboard, loading } = this.props;
    const {
      changeData,
      repairData,
      useDeptData,

      assetData,
      assetDataOnline,
      assetDataOffline,
      assetDataRepair,
    } = dashboard;

    let pieData = assetData;
    if(pieType === 'all'){
      pieData = assetData;
    } else if(pieType === 'online'){
      pieData = assetDataOnline;
    } else if(pieType=== 'offline'){
      pieData = assetDataOffline;
    } else if(pieType === 'repair'){
      pieData = assetDataRepair;
    }
    console.info(pieData)

    console.info(changeData)
    const menu = (
      <Menu>
        <Menu.Item>操作一</Menu.Item>
        <Menu.Item>操作二</Menu.Item>
      </Menu>
    );

    const iconGroup = (
      <span className={styles.iconGroup}>
        <Dropdown overlay={menu} placement="bottomRight">
          <Icon type="ellipsis" />
        </Dropdown>
      </span>
    );


    const columns = [
      {
        title: '排名',
        dataIndex: 'Idx',
        key: 'Idx',
      },
      {
        title: '部门名称',
        dataIndex: 'Name',
        key: 'Name',
      },
      {
        title: '资产数量',
        dataIndex: 'Count',
        key: 'Count',
        sorter: (a, b) => a.Count - b.Count,
        className: styles.alignRight,
      },
      {
        title: '占比',
        dataIndex: 'Range',
        key: 'Range',
        sorter: (a, b) => a.Range - b.Range,
        render: (text, record) => (
          <Trend flag={record.Status === 1 ? 'down' : 'up'}>
            <span style={{ marginRight: 4 }}>{text}%</span>
          </Trend>
        ),
        align: 'right',
      },
    ];

    //const activeKey = currentTabKey || (offlineData[0] && offlineData[0].name);

    const CustomTab = ({ data, currentTabKey: currentKey }) => (
      <Row gutter={8} style={{ width: 138, margin: '8px 0' }}>
        <Col span={12}>
          <NumberInfo
            title={data.name}
            subTitle="转化率"
            gap={2}
            total={`${data.cvr * 100}%`}
            theme={currentKey !== data.name && 'light'}
          />
        </Col>
        <Col span={12} style={{ paddingTop: 36 }}>
          <Pie
            animate={false}
            color={currentKey !== data.name && '#BDE4FF'}
            inner={0.55}
            tooltip={false}
            margin={[0, 0, 0, 0]}
            percent={data.cvr * 100}
            height={64}
          />
        </Col>
      </Row>
    );

    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 8,
      style: { marginBottom: 12 },
    };

    return (
      <Fragment>
        <Row gutter={24}>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="资产总数"
              action={
                <Tooltip title="查看详情">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={numeral(35356).format('0,0')}
              footer={<Field label="月增资产数" value={12345} />}
              contentHeight={46}
            >
              <Trend flag="up" style={{ marginRight: 16 }}>
                周同比<span className={styles.trendText}>12%</span>
              </Trend>
              <Trend flag="down">
                月同比<span className={styles.trendText}>11%</span>
              </Trend>
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="位置变动数"
              action={
                <Tooltip title="查看详情">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={numeral(6560).format('0,0')}
              footer={
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
              <Field style={{display:'inline-block'}} label="月均变动" value="460" />
              <Field style={{float:'right'}} label="日均变动" value="460" />
              </div>
            }
              contentHeight={43}
            >
              <MiniBar data={changeData} />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="维修数"
              action={
                <Tooltip title="查看详情">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={numeral(8846).format('0,0')}
              footer={
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                  <Trend flag="up" style={{ marginRight: 16 }}>
                    周同比<span className={styles.trendText}>12%</span>
                  </Trend>
                  <Trend flag="down">
                    日环比<span className={styles.trendText}>11%</span>
                  </Trend>
                </div>
              }
              contentHeight={46}
            >
              <MiniArea color="#975FE4" data={repairData} />
            </ChartCard>
          </Col>
       </Row>

        <Row gutter={24}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              className={styles.pieCard}
              bordered={false}
              title="资产占比"
              bodyStyle={{ padding: 24 }}
              extra={
                <div className={styles.pieCardExtra}>
                  {/*iconGroup*/}
                  <div className={styles.pieTypeRadio}>
                    <Radio.Group value={pieType} onChange={this.handleChangePieType}>
                      <Radio.Button value="all">全部状态</Radio.Button>
                      <Radio.Button value="online">使用中</Radio.Button>
                      <Radio.Button value="offline">闲置</Radio.Button>
                      <Radio.Button value="repair">维修中</Radio.Button>
                    </Radio.Group>
                  </div>
                </div>
              }
              style={{ marginTop: 2, minHeight: 509 }}
            >
              <h4 style={{ marginTop: 8, marginBottom: 32 }}>资产数</h4>
              <Pie
                hasLegend
                subTitle="资产数"
                total={numeral(pieData.reduce((pre, now) => now.y + pre, 0)).format('0,0')}
                data={pieData}
                //valueFormat={val => yuan(val)}
                height={248}
                lineWidth={4}
              />
            </Card>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              bordered={false}
              title="使用部门排行"
              //extra={iconGroup}
              style={{ marginTop: 2,  minHeight: 509  }}
            >
              <Table
                rowKey={record => record.Idx}
                size="small"
                columns={columns}
                dataSource={useDeptData}
                pagination={{
                  style: { marginBottom: 0 },
                  pageSize: 8,
                }}
              />
            </Card>
          </Col>

        </Row>
      </Fragment>
    );
  }
}
