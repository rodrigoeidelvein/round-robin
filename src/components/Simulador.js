import React, { Component } from "react";
import { Row, Col, List, Badge, Progress, Typography, Card, Tooltip, Result, Button } from "antd";

class Simulador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProcess: { nome: "" },
      progress: 0,
      result: []
    };
  }

  updateProgress = currentProcess => {
    const { quantum } = this.props;
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
    this.setState({ result: this.props.queue }, () => {
      this.processQueue();
    });
  }

  async processQueue() {
    const { quantum } = this.props;
    while (this.state.result.length > 0) {
      const currentObj = this.state.result[0];
      this.setState({ currentProcess: currentObj });

      await this.updateProgress(currentObj);

      Object.assign(currentObj, { itens: currentObj.itens - quantum });

      if (currentObj.itens > 0) {
        this.setState({ result: this.state.result.slice(1) });
        this.setState({ result: [...this.state.result, currentObj] })
      } else {
        this.setState({ result: this.state.result.slice(1) });
      }
    }
  }

  reloadPage = () => {
    window.location.reload();
  };

  shouldRender() {
    if (this.state.result.length) {
      return (
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
      );
    } else {
      return (
        <div>
          <Result
            status="success"
            title="Simulação concluída com sucesso"
            extra={<Button onClick={() => this.reloadPage()}>Reiniciar</Button>}
          ></Result>
        </div>
      );
    }
  }

  render() {
    return <div>{this.shouldRender()}</div>;
  }
}

export default Simulador;
