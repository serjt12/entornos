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
          rules: [{ required: true, message: "Please input your note!" }]
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
class EntornoList extends Component {
  columns = [
    { title: "name", dataIndex: "name", key: "name" },
    { title: "description", dataIndex: "description", key: "description" },
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
      visible: !this.state.visible
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleLoading = () => {
    this.setState({ loading: true });
  };

  componentWillMount() {
    this.props.dispatch(actions.fetchEnvironms());
  }
  render() {
    const { dispatch } = this.props;
    const { visible, loading } = this.state;
    return (
      <div>
        <div className="table-operations">
          <Button onClick={this.showModal}>Agrega entorno</Button>
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
          rowKey="_id"
          columns={this.columns}
          expandedRowRender={record => (
            <p style={{ margin: 0 }}>{record.descripcion}</p>
          )}
          dataSource={this.props.entornos}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { entornos: state.entornos.map(e => ({ ...e, key: e._id })) };
}

export default connect(mapStateToProps)(EntornoList);
