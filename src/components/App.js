import React, { Component } from "react";
import "./App.css";
import Section from "./Section";
import Interface from "./Interface";
import Link from "./Link";
import Options from "./Options";

class App extends Component {
  state = {
    createComponent: 0,
    temp: 0,
    linkArr: {},
    selectedSection: undefined,
    inputValue: "",
    childeren: [],
    options: [],
    id: 0,
    config: [],
  };

  handleClickNewSection = (e) => {
    let number = this.state.createComponent;
    const hs = { ...this.state };
    hs.linkArr[number] = [];
    hs.createComponent += 1;
    hs.id += 1;
    hs.config.push(number);
    if (hs.config.length === 1) {
      hs.selectedSection = hs.config[0];
    }
    hs.options.push(<Options key={hs.id} lenght={number} />);
    hs.childeren.push(
      <Section
        handleClickRemoveSection={this.handleClickRemoveSection}
        arr={hs.linkArr}
        number={number}
        key={this.state.id}
        opener={this.handleClickOpenLinks}
      />
    );
    this.setState(hs);
  };

  handleClickRemoveSection = (e, number) => {
    const hs = { ...this.state };
    delete hs.linkArr[number];
    let childs = hs.childeren;
    let index = childs.findIndex((child) => child.props.number === number);
    hs.config.splice(index, 1);
    hs.childeren.splice(index, 1);
    let options = hs.options;
    let index2 = options.findIndex((option) => option.props.lenght === number);
    hs.options.splice(index2, 1);
    if (hs.options.length >= 1) {
      hs.selectedSection = hs.options[0].props.lenght;
    }

    this.setState(hs);
  };

  handleSelectSection = (e) => {
    this.setState({
      selectedSection: e.target.value * 1,
    });
  };

  handleInputChange = (e) => {
    this.setState({
      inputValue: e.target.value,
    });
  };

  handleClickAddElement = (selectedSection, link) => {
    if (link && this.state.childeren.length) {
      const hs = { ...this.state };
      hs.linkArr[selectedSection].push(
        <Link
          key={hs.id}
          remover={this.handleClickRemoveLink}
          number={selectedSection}
          text={link}
          id={hs.id}
        />
      );
      let arr = [];
      let number = 0;
      for (let i = 0; i < hs.childeren.length; i++) {
        arr.push(
          <Section
            handleClickRemoveSection={this.handleClickRemoveSection}
            arr={hs.linkArr}
            number={hs.config[number]}
            key={hs.id}
            opener={this.handleClickOpenLinks}
          />
        );
        ++number;
        hs.id += 1;
      }
      hs.childeren = arr;
      hs.inputValue = "";
      this.setState(hs);
    }
  };

  handleClickRemoveLink = (e, number, id) => {
    e.target.parentNode.remove();
    const hs = { ...this.state };
    let index = hs.linkArr[number].findIndex((child) => child.props.id === id);
    hs.linkArr[number].splice(index, 1);
    this.setState(hs);
  };

  handleClickOpenLinks = (number) => {
    const hs = { ...this.state };
    let i = 0;
    hs.linkArr[number].forEach((element) => {
      window.open(element.props.text, `new${i}`);
      ++i;
    });
  };

  render() {
    return (
      <>
        <div className="div">
          <Interface
            handleClickNewSection={this.handleClickNewSection}
            handleSelect={this.handleSelectSection}
            handleInput={this.handleInputChange}
            handleClick={this.handleClickAddElement}
            state={this.state}
          />
        </div>
        <hr />
        <div className="sections">{this.state.childeren}</div>
      </>
    );
  }
}

export default App;
