import React, { Component } from 'react'
import { Input, Modal, Table, Button } from 'antd'
import { connect } from 'react-redux'
import actions from '../actions'

const {TextArea} = Input

class DeviceList extends Component{
  
    columns = [

      { title: 'Nombre', dataIndex: 'name', key: 'name' },
      { title: 'Descripcion', dataIndex: 'description', key: 'description' },
      { title: 'WiFi', dataIndex: 'wifi', key: 'wifi' },
      { title: 'Action', dataIndex: '', key: 'x', render: () => <a href="#">Delete</a> },
    ]
      
    state = {
      loading: false,
      visible: false,
    }

    newDevice= {
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
      const {name, description} = this.newDevice
      this.props.dispatch(actions.addDevice(name, description))
      console.log(name, description)
      setTimeout(() => {
        this.setState({ loading: false, visible: false });
      }, 3000);
    }

    handleCancel = () => {
      this.setState({ visible: false });
    }

    handleOnChange = (field) => (e, value) => {
      
     this.newDevice[field] = e.target.value   


    }

  componentWillMount() {
    this.props.dispatch(actions.fetchDevices())

  }

    render () {
      const {visible, loading} = this.state
      return(

        <div>

          <div className="table-operations">

          <Button onClick={this.showModal}>Agrega dispositivo</Button>

          </div>

          <Modal

            visible={visible}
            title="Nuevo dispositivo"
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

          <Table
            columns={this.columns}
            expandedRowRender={record => <p style={{ margin: 0 }}>{record.descripcion}</p>}
            dataSource={this.props.devices}
          />

        </div>
      )

    }
}

function mapStateToProps(state) {

  return { devices : state.devices.map(e => ({ ...e, key: e._id})) }
}

export default connect(mapStateToProps)(DeviceList);

