import React, { useState, useEffect, useReducer, useRef } from 'react';
import { Card, Col, Row, Input, Form, Button, Space, message } from 'antd';
import { useRequest } from '@umijs/hooks';
import { getFreeApi } from '@/services/index';
import hljs from 'highlight.js';
import 'highlight.js/styles/vs2015.css';
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
  tableDate?: any;
}

const Index: React.FC = () => {
  /**
   * reducer
   */
  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case ActionKind.CHANGE:
        return { ...action.payload };
      case ActionKind.ADDMETADATA:
        return { ...state, tableDate: action.payload };
      case ActionKind.ADDAPIURL:
        return { ...state, tableDate: action.payload };
      default:
        return state;
    }
  }
  const codeBlock = useRef(null);
  const [state, dispatch] = useReducer(reducer, {});
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

  useEffect(() => {
    hljs.configure({
      ignoreUnescapedHTML: true,
    });
    hljs.highlightAll();
  }, []);
  return (
    <div style={{ padding: 24 }}>
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
                onChange={(event) =>
                  dispatch({
                    type: ActionKind.CHANGE,
                    payload: { tableDataPath: event.target.value },
                  })
                }
                style={{ width: 320 }}
              />
            </Space>
          </Col>
        </Row>
      </Card>
      <Card title="页面代码预览">
        <div className="language-javascript">
          <pre ref={codeBlock}>
            <code>{JSON.stringify(data)?.replaceAll(',', ',\n')}</code>
          </pre>
        </div>
      </Card>
    </div>
  );
};
export default Index;
