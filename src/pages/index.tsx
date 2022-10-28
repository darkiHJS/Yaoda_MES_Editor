import React, { useState, useEffect, useReducer, useRef } from 'react';
import { Card, Col, Row, Input, Form, Button, Space, message } from 'antd';
import { useRequest } from '@umijs/hooks';
import { getFreeApi } from '@/services/index';
import CodeBox from '@/components/CodeBox';
/**
 * reducer指令集
 */
enum ActionKind {
  CHANGE = 'CHANGE',
  ADDMETADATA = 'ADDMETADATA',
  ADDAPIURL = 'ADDAPIURL',
}
interface Action {
  type: ActionKind;
  payload: State;
}
interface State {
  apiUrl?: string;
  tableDataPath?: string;
  tableData?: any;
  tableConfigForm?: any;
}

const Index: React.FC = () => {
  /**
   * reducer
   */
  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case ActionKind.CHANGE:
        return { ...state, ...action.payload };
      case ActionKind.ADDMETADATA:
        return { ...state, tableData: action.payload };
      case ActionKind.ADDAPIURL:
        return { ...state, tableData: action.payload };
      default:
        return state;
    }
  }
  const [process, setProcess] = useState(0);
  const [state, dispatch] = useReducer(reducer, {
    apiUrl: '/api/mock/table',
  });
  const { data, run } = useRequest(getFreeApi, {
    manual: true,
    onSuccess(res) {
      if (res.code === 200) {
        dispatch({
          type: ActionKind.ADDMETADATA,
          payload: res,
        });
      } else {
        message.error('无效的url');
      }
    },
    onError(rej) {
      message.error('无效的url');
    },
  });

  return (
    <div style={{ padding: 24 }}>
      {process === 0 ? (
        <>
          <Card title="页面信息" style={{ marginBottom: 24 }}>
            <Row justify="start" gutter={24}>
              <Col>
                <Space align="baseline">
                  页面数据接口:
                  <Input
                    value={state.apiUrl}
                    onChange={(event) =>
                      dispatch({
                        type: ActionKind.CHANGE,
                        payload: { apiUrl: event.target.value },
                      })
                    }
                    style={{ width: 320 }}
                  />
                  <Button
                    type="primary"
                    onClick={() => {
                      if (state.apiUrl) run(state.apiUrl);
                      else message.info('必须输入url');
                    }}
                  >
                    调用接口
                  </Button>
                </Space>
              </Col>
              <Col>
                <Space align="baseline">
                  数据定位:
                  <Input
                    value={state.tableDataPath}
                    onChange={(event) => {
                      const pathMap = event.target.value.split('.');
                      let metaData: unknown = null;
                      pathMap.forEach((v) => {
                        console.log(v);
                        if (!metaData) {
                          metaData = data[v] || null;
                        } else {
                          metaData = (metaData as any)[v] || metaData;
                        }
                      });
                      dispatch({
                        type: ActionKind.CHANGE,
                        payload: {
                          tableDataPath: event.target.value,
                          tableData: metaData,
                        },
                      });
                    }}
                    style={{ width: 320 }}
                  />
                </Space>
              </Col>
            </Row>
          </Card>
          <Card
            title="接口数据预览"
            extra={
              <Button
                type="primary"
                onClick={() => {
                  setProcess(1);
                }}
              >
                数据定位完成
              </Button>
            }
          >
            <div>
              <CodeBox
                code={JSON.stringify(state.tableData, null, 2)}
                language="js"
                plugins={['line-numbers']}
              />
            </div>
          </Card>
        </>
      ) : null}
      {process === 1 ? (
        <>
          <Card title="表单数据编辑">
            <Form.List name="tableItemConfig">
              {(fields, { add, remove }) => {}}
            </Form.List>
          </Card>
        </>
      ) : null}
    </div>
  );
};
export default Index;
