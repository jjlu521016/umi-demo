import React, { Component } from 'react';
import { Row, Col, Form, Select, Button, DatePicker } from 'antd';
import { ItemInput, ItemSelect } from '../../component/FormItemComponent';
import moment from 'moment';
import 'moment/locale/zh-cn';
import styles from './search.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;

class HehTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false,
    };
  }


  submit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const options = this.props.options;

        options && options.forEach(item => {
          switch (item.type) {
            case 'date' :
              if (values[`${item.id}`]) {
                values[`${item.id}`] = values[`${item.id}`].format('YYYY-MM-DD HH:mm:ss');
              }
              break;
            case 'rangeDate' :
              if (values[item.id]) {
                const min_create_date = values[item.id][0].valueOf();
                const max_create_date = values[item.id][1].valueOf();
                values['min_create_date'] = min_create_date;
                values['max_create_date'] = max_create_date;
              }
              break;
            default :
              break;
          }
        });
        for (let i in values) {
          if (values.hasOwnProperty(i)) {
            if (values[i] === undefined || values[i] === 'created') {
              delete values[i];
            }
          }
        }
        this.props.getSearchValue(values);
      }
    });
  };
  reset = () => {
    this.props.form.resetFields();
    this.props.getSearchValue();
  };
  expand = () => {
    this.setState({ expand: !this.state.expand });
  };

  hehInput = (layout, item, index, disabled, defaultValue) => {
    const width = document.body.clientWidth;
    const { form } = this.props;
    const row = this.props.row === 3;
    const showLength = row ? 3 : 4;
    return (
      <Col
        span={width <= 768 ? 24 : row ? 8 : 6}
        key={item.key}
        style={{ display: index + 1 > showLength && this.state.expand !== true ? 'none' : 'block' }}
      >
        <ItemInput
          id={item.id}
          name={item.name}
          layout={layout}
          form={this.props.form}
          disabled={disabled}
          defaultValue={defaultValue}
        />
      </Col>
    );
  };
  hehSelect = (layout, item, index, disabled, defaultValue) => {
    const width = document.body.clientWidth;
    const { getFieldDecorator } = this.props.form;
    const row = this.props.row === 3;
    const showLength = row ? 3 : 4;
    return (
      <Col
        span={width <= 768 ? 24 : row ? 8 : 6}
        key={item.key}
        style={{ display: index + 1 > showLength && this.state.expand !== true ? 'none' : 'block' }}
      >
        <ItemSelect
          id={item.id}
          name={item.name}
          options={item.options}
          layout={layout}
          form={this.props.form}
          disabled={disabled}
          rule={{ required: false }}
          defaultValue={defaultValue}
        />
      </Col>
    );
  };
  hehData = (layout, item, index) => {
    const width = document.body.clientWidth;
    const { getFieldDecorator } = this.props.form;
    const row = this.props.row === 3;
    const showLength = row ? 3 : 4;
    return (
      <Col
        span={width <= 768 ? 24 : row ? 8 : 6}
        key={item.key}
        style={{ display: index + 1 > showLength && this.state.expand !== true ? 'none' : 'block' }}
      >
        <FormItem
          {...layout}
          label={item.name}
        >
          {
            getFieldDecorator(item.id)(
              <DatePicker style={{ width: '100%' }}/>,
            )
          }
        </FormItem>
      </Col>
    );
  };
  hehRangeData = (layout, item, index) => {
    const width = document.body.clientWidth;
    const { getFieldDecorator } = this.props.form;
    const row = this.props.row === 3;
    const showLength = row ? 3 : 4;
    return (
      <Col
        span={width <= 768 ? 24 : row ? 8 : 6}
        key={item.key}
        style={{ display: index + 1 > showLength && this.state.expand !== true ? 'none' : 'block' }}
      >
        <FormItem
          {...layout}
          label={item.name}
        >
          {
            getFieldDecorator(item.id)(
              <RangePicker placeholder={['开始时间', '结束时间']} style={{ width: '100%' }}/>,
            )
          }
        </FormItem>
      </Col>
    );
  };

  render() {
    const { options, row, searchLoading } = this.props;
    const { expand } = this.state;
    const layout = {
      labelCol: { sm: { span: 10 }, xl: { span: 8 }, xxl: { span: 6 } },
      wrapperCol: { sm: { span: 14 }, xl: { span: 16 }, xxl: { span: 16 } },
    };
    return (
      <Row>
        <Form onSubmit={this.submit}>
          {/*组件*/}
          <Row>
            {
              options && options.map((item, index) => {
                return (
                  item.type === 'input' ?
                    this.hehInput(layout, item, index)
                    : item.type === 'select' ?
                    this.hehSelect(layout, item, index)
                    : item.type === 'date' ?
                      this.hehData(layout, item, index)
                      : item.type === 'rangeDate' ?
                        this.hehRangeData(layout, item, index)
                        : ''
                );
              })
            }
          </Row>
          {/*按钮组*/}
          <Row>
            <Col span={24} className={styles.btnGroup}>
              <Button loading={searchLoading} htmlType="submit" onClick={this.submit} type='primary'
                      icon='search'>搜索</Button>
              <span> </span>
              <Button onClick={this.reset} icon='loading-3-quarters'>重置</Button>
              <span> </span>
              <Button
                onClick={this.expand}
                icon={!expand ? 'down' : 'up'}
                style={{ display: row === 3 && options.length > 3 ? 'inline-block' : row === 4 && options.length > 4 ? 'inline-block' : 'none' }}
              >
                {
                  !expand ? '展开所有' : '收起所有'
                }
              </Button>
            </Col>
          </Row>
        </Form>
      </Row>
    );
  }
}

const Search = Form.create()(HehTable);
export default Search;
