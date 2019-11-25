import React, { Component } from "react";
import { Form, Input, InputNumber, Row, Col, Tooltip, Button, Table, Popconfirm } from "antd";

class Setup extends Component {
  constructor() {
    super();
    this.state = { itens: 0, nome: "", list: [], quantum: "" };

    this.columns = [
      {
        title: "Nome",
        dataIndex: "nome"
      },
      {
        title: "Itens",
        dataIndex: "itens"
      },
      {
        title: "",
        dataIndex: "operation",
        render: (text, record) => {
          return this.state.list.length >= 1 ? (
            <Popconfirm title="Tem certeza?" onConfirm={() => this.handleDelete(record.key)}>
              <a href="#">Excluir</a>
            </Popconfirm>
          ) : (
            ""
          );
        }
      }
    ];
  }

  handleSubmit = e => {
    e.preventDefault();
    const { itens, nome, list } = this.state;
    if (!itens || !nome) {
      return;
    }
    const key = list.length;
    const object = { nome, itens, key };
    this.setState({ list: [...list, object], nome: "", itens: 0 }, () => {
      this.props.updateQueue("queue", this.state.list);
    });
  };

  handleItens = e => {
    this.setState({ itens: e });
  };

  handleNome = e => {
    this.setState({ nome: e.target.value });
  };

  handleQuantum = e => {
    this.setState({ quantum: e }, () => {
      this.props.updateQueue("quantum", e);
    });
  };

  handleDelete = key => {
    const list = [...this.state.list];
    this.setState({ list: list.filter(item => item.key !== key) });
  };

  runSimulation = () => {
    this.props.updateStatus('running');
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={4} offset={2}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Item label="Nome do cliente">
                <Input placeholder="Nome" id="nome" value={this.state.nome} onChange={this.handleNome}></Input>
              </Form.Item>
              <Form.Item label="Quantidade de itens">
                <Tooltip title="Adicionar um valor de 0 a 100">
                  <InputNumber
                    size="large"
                    placeholder="Itens"
                    id="itens"
                    value={this.state.itens}
                    onChange={this.handleItens}
                  ></InputNumber>
                </Tooltip>
              </Form.Item>
              <Button htmlType="submit" type="primary">
                Adicionar
              </Button>
            </Form>
          </Col>
          <Col span={6} offset={3}>
            <Table pagination={false} columns={this.columns} dataSource={this.state.list}></Table>
          </Col>
          <Col span={6} offset={2}>
            <Form.Item label="Quantum">
              <InputNumber size="large" id="quantum" placeholder="Quantum" onChange={this.handleQuantum}></InputNumber>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={6} offset={9}>
            <Button
              type="primary"
              onClick={this.runSimulation}
              block
              disabled={this.state.list.length >= 1 && this.state.quantum ? false : true}
            >
              Iniciar Simulação
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Setup;
