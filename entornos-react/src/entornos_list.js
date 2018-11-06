import React, {Component} from 'react';
import {Input, Modal, Table, Button } from 'antd';
import {connect} from 'react-redux'
import actions from './actions'

const {TextArea} = Input

class EntornoList extends Component{

  columns = [

    { title: 'name', dataIndex: 'name', key: 'name' },
    { title: 'description', dataIndex: 'description', key: 'description' },
    { title: 'Action', dataIndex: '', key: 'x', render: () => <a href="#">Delete</a> },

    ]


    state = {
      loading: false,
      visible: false,
    }

    newEnvironm= {
      name: null, 
      description: null 
    }

    showModal = () => {
      this.setState({
        visible: true,
      });
    }

    handleOk = () => {
      this.setState({ loading: true });
      const {name, description} = this.newEnvironm
      this.props.dispatch(actions.addEnvironm(name, description))
      console.log(name, description)
      setTimeout(() => {
        this.setState({ loading: false, visible: false });
      }, 3000);
    }

    handleCancel = () => {
      this.setState({ visible: false });
    }

    handleOnChange = (field) => (e, value) => {

      this.newEnvironm[field] = e.target.value   


    }

  componentWillMount (props) {
    console.log(props)
    this.props.dispatch(actions.fetchEnvironms())

  }
    render () {

      const {visible, loading} = this.state

      return(
        <div>
          <div className="table-operations">

            <Button onClick={this.showModal}>Agrega entorno</Button>

          </div>

          <Modal

            visible={visible}
            title="Nuevo entorno"
            onOk={this.handleOk}
            onCancel={this.handleCancel}

            footer={[
              <Button key="back" onClick={this.handleCancel}>Cancel</Button>,
              <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                Submit
              </Button>,
            ]}
          >
            <div className="modal-add-input">
              <Input onChange= {this.handleOnChange('name')} size="large" placeholder="nombre" />
              <TextArea  onChange= {this.handleOnChange('description')} size="large" placeholder="descripcion" autosize/>
            </div>
          </Modal>
          <Table rowKey='_id'
            columns={this.columns}
            expandedRowRender={record => <p style={{ margin: 0 }}>{record.descripcion}</p>}
            dataSource={this.props.entornos}
          />

        </div>
      )

    }
}

function mapStateToProps(state) {

  return { entornos : state.entornos.map(e => ({ ...e, key: e._id})) }
}

export default connect(mapStateToProps)(EntornoList);

