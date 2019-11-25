import React, { Component } from "react";
import { Row, Col, List, Badge, Progress, Typography, Card, Tooltip } from "antd";

class Simulador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProcess: { nome: "" },
      progress: 0,
      result: [
        {
          nome: "Rodrigo",
          itens: 5
        },
        {
          nome: "Claudio",
          itens: 15
        },
        {
          nome: "Thiago",
          itens: 7
        },
        {
          nome: "Fernando",
          itens: 12
        },
        {
          nome: "Leonardo",
          itens: 17
        },
        {
          nome: "Claudio",
          itens: 10
        },
        {
          nome: "Thiago",
          itens: 2
        },
        {
          nome: "Fernando",
          itens: 7
        },
        {
          nome: "Leoanardo",
          itens: 12
        },
        {
          nome: "Claudio",
          itens: 5
        },
        {
          nome: "Fernando",
          itens: 2
        },
        {
          nome: "Leonardo",
          itens: 7
        },
        {
          nome: "Leonardo",
          itens: 2
        }
      ]
    };
  }

  updateProgress = currentProcess => {
    const { quantum } = this.props;
    debugger;
    const executionTime = currentProcess.itens > quantum ? quantum : currentProcess.itens;
    const speed = 15;
    let running = 0;

    const interval = setInterval(() => {
      running += ((executionTime * 100) / speed) * 10;

      const percentage = (100 * running) / (executionTime * 1000);
      this.setState({ progress: Math.round(percentage) });

      if (this.state.progress >= 100) {
        clearInterval(interval);
      }
    }, (executionTime * 1000) / speed);

    return new Promise(resolve => {
      setTimeout(() => {
        resolve("finalizado");
      }, executionTime * 1000 + 200);
    });
  };

  componentDidMount() {
    // this.updateProgress(:);
    this.processQueue();
  }

  async processQueue() {
    while (this.state.result.length > 0) {
      const currentObj = this.state.result[0];
      this.setState({ currentProcess: currentObj });

      const progress = await this.updateProgress(currentObj);
      this.setState({ result: this.state.result.slice(1) });
    }
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={4} offset={2}>
            <List
              header={<div>Fila do supermercado</div>}
              bordered
              dataSource={this.state.result}
              renderItem={item => (
                <List.Item>
                  <Tooltip placement="left" title="Itens restantes por pessoa">
                    <Badge count={item.itens}></Badge>
                  </Tooltip>
                  {item.nome}
                </List.Item>
              )}
            />
          </Col>
          <Col span={5} offset={5}>
            <Typography.Title level={3}>Execução</Typography.Title>
            <Progress percent={this.state.progress} type="circle"></Progress>
            <Typography.Title level={4}>{this.state.currentProcess.nome}</Typography.Title>
          </Col>
          <Col span={6} offset={1}>
            <Card title="Informações" style={{ width: "100%" }}>
              <p>Quantum: {this.props.quantum}</p>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Simulador;
