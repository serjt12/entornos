import React, { Component } from "react";
import { Input, Modal, Table, Button, Form } from "antd";
import { connect } from "react-redux";
import actions from "../actions";

const ModalContent = props => {
  // console.log("props: ", props);
  const { form, loading, handleLoading, dispatch, showModal } = props;
  const { getFieldDecorator } = props.form;
  const handleOk = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        handleLoading();
        const { name, description } = values;
        console.log("Received values of form: ", values);
        dispatch(actions.addEnvironm(name, description));
        setTimeout(() => {
          handleLoading();
          // showModal();
        }, 3000);
      }
    });
  };
  return (
    <Form onSubmit={handleOk}>
      <Form.Item label="Name">
        {getFieldDecorator("name", {
          rules: [{ required: true, message: "Please input your name!" }]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="Description">
        {getFieldDecorator("description", {
          rules: [{ required: true, message: "Please input the description!" }]
        })(<Input />)}
      </Form.Item>
      <Form.Item wrapperCol={{ span: 6, offset: 10 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

const WrappedApp = Form.create({ name: "modal_content" })(ModalContent);

class DeviceList extends Component {
  columns = [
    { title: "Nombre", dataIndex: "name", key: "name" },
    { title: "Descripcion", dataIndex: "description", key: "description" },
    { title: "WiFi", dataIndex: "wifi", key: "wifi" },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: () => <a href="/">Delete</a>
    }
  ];

  state = {
    loading: false,
    visible: false
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleOnChange = field => (e, value) => {
    this.newDevice[field] = e.target.value;
  };

  componentWillMount() {
    this.props.dispatch(actions.fetchDevices());
  }

  render() {
    const { visible, loading, dispatch } = this.state;
    return (
      <div>
        <div className="table-operations">
          <Button onClick={this.showModal}>Agrega dispositivo</Button>
        </div>
        <Modal
          visible={visible}
          title="Nuevo entorno"
          onCancel={this.handleCancel}
          footer={null}
        >
          <WrappedApp
            loading={loading}
            dispatch={dispatch}
            handleLoading={this.handleLoading}
            showModal={this.showModal}
          />
        </Modal>
        <Table
          columns={this.columns}
          expandedRowRender={record => (
            <p style={{ margin: 0 }}>{record.descripcion}</p>
          )}
          dataSource={this.props.devices}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { devices: state.devices.map(e => ({ ...e, key: e._id })) };
}

export default connect(mapStateToProps)(DeviceList);
