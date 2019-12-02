import React, { Component } from "react";
import "./App.css";
import Instructions from "./components/Instructions";
import Setup from "./components/Setup";
import Simulador from "./components/Simulador";
import { Layout, Typography } from "antd";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const mockData = [
  { nome: "Rodrigo", itens: 5 },
  { nome: "Claudio", itens: 15 },
  { nome: "Thigao", itens: 7 },
  { nome: "Fernando", itens: 12 },
  { nome: "Leonardo", itens: 17 }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queue: [],
      // queue: mockData,
      quantum: "",
      status: "initial"
    };
  }

  updateQueue = (key, val) => {
    this.setState({ [key]: val });
  };

  updateStatus = status => {
    this.setState({ status });
  };

  isSimulationRunning = () => {
    return this.state.status === "running";
  };

  render() {
    return (
      <div className="App">
        <Layout className="layout">
          <Header className="header-page">
            <Title level={2} className="header-page__title">
              Supermercado Infotech
            </Title>
          </Header>
          <Content>
            {/* <Instructions></Instructions> */}
            {this.isSimulationRunning() ? (
              <Simulador queue={this.state.queue} quantum={this.state.quantum}></Simulador>
            ) : (
              <Setup updateQueue={this.updateQueue} updateStatus={this.updateStatus}></Setup>
            )}
          </Content>
          <Footer style={{ textAlign: "center" }}>FTEC Faculdades @ {new Date().getFullYear()}</Footer>
        </Layout>
      </div>
    );
  }
}

export default App;
