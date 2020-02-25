import React, { useState } from 'react';
import { Button } from 'antd';
import { Row, Col, Typography, List, Empty, Select, InputNumber, Input, Form} from 'antd';
import './App.css';

const { Title, Text } = Typography;
const { Option } = Select;

const infiniteScroll = {
  height: '150px',
  overflow: 'auto'
}

const App = () => {
  const [resources, setResources] = useState({
    expenses: [],
    income: []
  })
  const [source, setSource] = useState({
    amount: 0,
    note: ''
  });
  const [type, setType] = useState('expenses');
  const onChange = value => setSource({ ...source, amount: parseInt( value ) });
  const addNote = e => setSource({ ...source, note: e.target.value });
  const onChangeType = value => setType(value);
  const submit = (e) => {
    e.preventDefault();
    if(source.amount <= 0 || source.note === '' ) return;
    if(type === 'expenses'){
      setResources({ ...resources, expenses: [ source, ...resources.expenses ]})
    } else {
      setResources({ ...resources, income: [ source, ...resources.income ]})
    }
    setSource(0);
  }
  return (
    <div className="App">
      <Row type="flex" justify='center' align="middle">
        <Col span={8}>
          <Title level={2}>Expenses List</Title>
          <div style={ infiniteScroll }>
            { !resources.expenses.length ? (
                <Empty />
              ) : (
                <List
                bordered
                dataSource={resources.expenses}
                renderItem={ item => (
                  <List.Item>
                     ₱{ item.amount } - { item.note }
                  </List.Item>
                )}
              />
              )}
          </div>
        </Col>
      </Row>
      <Row type="flex" justify='center' align="middle">
        <Col span={8}>
          <Title level={2}>Income List</Title>
          <div style={ infiniteScroll }>
            { !resources.income.length ? (
                <Empty />
              ) : (
                <List
                bordered
                dataSource={resources.income}
                renderItem={ item => (
                  <List.Item>
                     ₱{ item.amount } = { item.note }
                  </List.Item>
                )}
              />
              )}
          </div>
        </Col>
      </Row>
      <Row type="flex" justify='center' align='middle'>
        <Col span={8}>
          <Title level={2}>Add Income / Expense</Title>
          <Form onSubmit={submit}>
            <Row>
              <Col span={12}>
                <Form.Item>
                  <Select defaultValue="expenses" onChange={onChangeType}>
                    <Option value="expenses">Expense</Option>
                    <Option value="income">Income</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item>
                   <InputNumber
                    value={source.amount}
                    formatter={ value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={ value => value.replace(/\₱\s?|(,*)/g, '')}
                    onChange={onChange}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Input.TextArea
                placeholder="Add some notes..."
                value={ source.note }
                type="text"
                allowClear
                onChange={addNote}
                rows={3}
                maxLength={50}
              />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary">Add</Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default App;
