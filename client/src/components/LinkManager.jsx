import React, { Component } from "react";
import { connect } from 'react-redux';
import "./CSS/App.css";
import Section from "./LinkManagerComponents/Section.jsx";
import Interface from "./LinkManagerComponents/Interface.jsx";
import Link from "./LinkManagerComponents/Link.jsx";
import Options from "./LinkManagerComponents/Options.jsx";
import api from '../api/index';
import { setEditing } from "./reducers/loginSys";
import { setFetchedData } from "./reducers/dataManagment";
import { compareStates } from './dataComparator/dataComparator';





let flag = true
let isEditing = false
class App extends Component {
  state = {
    createComponent: 0,
    temp: 0,
    linkArr: {},
    selectedSection: undefined,
    inputLinkValue: "",
    inputLinkNameValue: '',
    childeren: [],
    options: [],
    id: 0,
    config: [],
    sectionTitles: [],
    infoBoxMessage: { color: '', message: '', btnColor: '' },
  };

  isStatesEqual = (redux, state, parseLinks) => compareStates(redux, state, parseLinks)

  searchForTitle = (titles, config) => {
    let foundTitle = ''
    titles.forEach(title => {

      if (title.config == config) {

        foundTitle = title.value
      }
    })
    return foundTitle
  };


  parseLinks = (links) => {
    const modArr = {};

    for (let el in links) {
      let arr = [];
      links[el].forEach(i => { arr.push({ text: i.props.text, href: i.props.href }); });
      modArr[el] = arr;
    };

    return modArr
  }

  handleClickNewSection = (e) => {
    let number = this.state.createComponent;
    const hs = { ...this.state };
    hs.sectionTitles.push({ config: number, value: `Links ${number}` })
    hs.linkArr[number] = [];
    hs.createComponent += 1;
    hs.id += 1;
    hs.config.push(number);
    if (hs.config.length === 1) {
      hs.selectedSection = hs.config[0];
    }
    hs.options.push(<Options searchForTitle={this.searchForTitle} key={hs.id} lenght={number} title={this.state.sectionTitles} />);
    hs.childeren.push(
      <Section
        handleClickRemoveSection={this.handleClickRemoveSection}
        arr={hs.linkArr}
        number={number}
        title={`Links${number}`}
        key={hs.id}
        opener={this.handleClickOpenLinks}
        renamer={this.handleChangeSectionName}
      />
    );
    this.setState(hs);
    if (!this.isStatesEqual(this.props.mystate.dataManagment.fetchedData, this.state, this.parseLinks)) {
      this.setState({ infoBoxMessage: { color: 'red', message: 'some of your data is not saved', btnColor: '#992f27' } })
    } else { this.setState({ infoBoxMessage: { color: '', message: '', btnColor: '' } }) }
  };

  handleClickRemoveSection = (e, number) => {
    if (!isEditing) {
      const hs = { ...this.state };
      delete hs.linkArr[number];
      let childs = hs.childeren;
      let index = childs.findIndex((child) => child.props.number === number);
      hs.sectionTitles.splice(index, 1);
      hs.config.splice(index, 1);
      hs.childeren.splice(index, 1);
      let options = hs.options;
      let index2 = options.findIndex((option) => option.props.lenght === number);
      hs.options.splice(index2, 1);
      if (hs.options.length >= 1) {
        hs.selectedSection = hs.options[0].props.lenght;
      }

      this.setState(hs);
      if (!this.isStatesEqual(this.props.mystate.dataManagment.fetchedData, this.state, this.parseLinks)) {
        this.setState({ infoBoxMessage: { color: 'red', message: 'some of your data is not saved', btnColor: '#992f27' } })
      } else { this.setState({ infoBoxMessage: { color: '', message: '', btnColor: '' } }) }
    } else {
      this.setState({ infoBoxMessage: { color: 'red', message: 'end editing element' } })
    }
  };

  handleSelectSection = (e) => {
    this.setState({
      selectedSection: e.target.value * 1,
    });
  };

  handleLinkInputChange = (e) => {
    this.setState({
      inputLinkValue: e.target.value,
    });
  };
  handleLinkNameInputChange = (e) => {
    this.setState({
      inputLinkNameValue: e.target.value,
    });
  };

  handleClickAddElement = (selectedSection, link) => {
    if (link && this.state.childeren.length && !isEditing) {
      const hs = { ...this.state };
      let index = hs.linkArr[selectedSection].length
      hs.linkArr[selectedSection].push(
        <Link
          key={hs.id}
          remover={this.handleClickRemoveLink}
          renamer={this.handleClickRenameLink}
          number={selectedSection}
          text={hs.inputLinkNameValue ? hs.inputLinkNameValue : link}
          href={/https:\/\/|http:\/\//.test(link) ? link : 'http://' + link}
          id={index}
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
            title={hs.sectionTitles[number].value}
            key={hs.id}
            opener={this.handleClickOpenLinks}
            renamer={this.handleChangeSectionName}
          />
        );
        ++number;
        hs.id += 1;
      }
      hs.childeren = arr;
      hs.inputLinkValue = "";
      hs.inputLinkNameValue = "";
      this.setState(hs);
      if (!this.isStatesEqual(this.props.mystate.dataManagment.fetchedData, this.state, this.parseLinks)) {
        this.setState({ infoBoxMessage: { color: 'red', message: 'some of your data is not saved', btnColor: '#992f27' } })
      } else { this.setState({ infoBoxMessage: { color: '', message: '', btnColor: '' } }) }
    } else {
      this.setState({ infoBoxMessage: { color: 'red', message: 'end editing element' } })
    }
  };

  handleClickRemoveLink = (e, number, id) => {
    e.target.parentNode.parentNode.parentNode.remove();
    const hs = { ...this.state };
    let index = hs.linkArr[number].findIndex((child) => child.props.id === id);
    hs.linkArr[number].splice(index, 1);
    this.setState(hs);
    if (!this.isStatesEqual(this.props.mystate.dataManagment.fetchedData, this.state, this.parseLinks)) {
      this.setState({ infoBoxMessage: { color: 'red', message: 'some of your data is not saved', btnColor: '#992f27' } })
    } else { this.setState({ infoBoxMessage: { color: '', message: '', btnColor: '' } }) }
  };

  handleClickRenameLink = (e, number, id) => {
    const { ...linkArr } = this.state.linkArr

    if (!isEditing) {
      if (e.target.innerText === 'rename') {

        e.target.parentNode.parentNode.parentNode.childNodes[0].style.display = 'none';
        const input = document.createElement('input');
        input.className = 'select-box'
        input.value = linkArr[number][id].props.text;
        e.target.innerText = 'ok';
        e.target.parentNode.parentNode.parentNode.prepend(input);
        isEditing = !isEditing
        this.props.setEdited(isEditing);
      }
    } else {
      if (e.target.innerText === 'ok') {
        e.target.innerText = 'rename';
        let inputText = e.target.parentNode.parentNode.parentNode.childNodes[0].value
        let inputHref = linkArr[number][id].props.href
        linkArr[number][id] = <Link
          key={id}
          remover={this.handleClickRemoveLink}
          renamer={this.handleClickRenameLink}
          number={number}
          text={inputText}
          href={inputHref}
          id={id}
        />
        e.target.parentNode.parentNode.parentNode.childNodes[0].remove();
        const a = e.target.parentNode.parentNode.parentNode.childNodes[0]

        a.innerText = inputText
        a.style.display = 'inline'
        this.setState({ linkArr })
        flag = !flag
        isEditing = !isEditing
        this.props.setEdited(isEditing);
      } else {
        this.setState({ infoBoxMessage: { color: 'red', message: 'end editing element' } })

      }
    }
  }

  handleChangeSectionName = (e, number) => {
    let stream = [...this.props.mystate.dataManagment.fetchedData.sectionTitles]
    const hs = { ...this.state }
    let index = hs.sectionTitles.findIndex(title => {

      return title.config == number
    })
    if (!isEditing) {
      if (e.target.innerText === 'rename') {
        hs.id += 1;
        e.target.parentNode.parentNode.parentNode.childNodes[0].style.display = 'none';
        const input = document.createElement('input');
        input.className = 'select-box'
        input.value = hs.sectionTitles[index].value
        e.target.innerText = 'ok';
        e.target.parentNode.prepend(input);
        isEditing = !isEditing
        this.props.setEdited(isEditing);
      }
    } else {
      if (e.target.innerText === 'ok') {
        e.target.innerText = 'rename';
        let inputText = e.target.parentNode.childNodes[0].value
        e.target.parentNode.childNodes[0].remove();
        const sectionTitle = e.target.parentNode.parentNode.parentNode.childNodes[0]

        sectionTitle.innerText = inputText
        sectionTitle.style.display = 'block'
        let config = hs.sectionTitles[index].config
        hs.sectionTitles[index] = { config, value: inputText }
        hs.options[index] = <Options searchForTitle={this.searchForTitle} key={Math.random()} lenght={number} title={this.state.sectionTitles} />
        this.setState(hs)
        flag = !flag
        isEditing = !isEditing
        this.props.setEdited(isEditing);
      } else {
        this.setState({ infoBoxMessage: { color: 'red', message: 'end editing element' } })

      }
    }
  }

  handleClickOpenLinks = (number) => {
    const hs = { ...this.state };
    let i = 0;
    hs.linkArr[number].forEach((element) => {
      window.open(element.props.href, `new${i}`);
      ++i;
    });
  };

  handleUpdateChange = (data, links, config, titles) => {
    //create sections
    let number = config[data];

    const hs = { ...this.state };
    hs.linkArr[number] = [];
    hs.createComponent = config[data] + 1;
    hs.id = config[data];
    hs.sectionTitles = titles
    hs.config.push(number);
    if (hs.config.length >= 1) {
      hs.selectedSection = hs.config[0];
    }
    hs.options.push(<Options searchForTitle={this.searchForTitle} key={hs.id} lenght={config[data]} title={titles} />);
    hs.childeren.push(
      <Section
        handleClickRemoveSection={this.handleClickRemoveSection}
        arr={hs.linkArr}
        number={number}
        title={titles[data].value}
        key={data}
        opener={this.handleClickOpenLinks}
        renamer={this.handleChangeSectionName}
      />
    );
    //create links
    if (links[config[data]]) {
      let linkId = 0
      hs.linkArr[config[data]] = []
      links[config[data]].forEach(link => {

        hs.linkArr[config[data]].push(
          <Link
            key={linkId}
            remover={this.handleClickRemoveLink}
            renamer={this.handleClickRenameLink}
            number={config[data]}
            text={link.text}
            href={link.href}
            id={linkId}
          />
        );
        linkId++
      })
    }

    this.setState(hs);
  }

  handleSendUpdate = async () => {
    const { createComponent, linkArr, config, sectionTitles } = this.state;
    const links = { ...linkArr };
    const login = this.props.mystate.loginSys.userName.value;
    const pass = this.props.mystate.loginSys.userPass.value;
    const verify = this.props.mystate.loginSys.verified;
    const modArr = {};

    for (let el in links) {
      let arr = [];
      links[el].forEach(i => { arr.push({ text: i.props.text, href: i.props.href }); });
      modArr[el] = arr;
    };
    const payload = { login, pass, sectionsNumber: createComponent, links: modArr, config: config, sectionTitles: sectionTitles };
    const reduxPayload = { sectionsNumber: createComponent, links: modArr, config: config, sectionTitles: sectionTitles };

    if (verify) {
      api.updateLinks(payload).then(res => {
        this.props.setReduxData(reduxPayload);
        this.setState({ infoBoxMessage: { color: 'green', message: 'all data saved' } })


      })
    } else {
      this.setState({ infoBoxMessage: { color: 'red', message: 'you need acc to save your links' } })

    };
  };

  componentDidMount = () => {
    let redux = this.props.mystate.dataManagment.fetchedData;
    if (!this.props.mystate.dataManagment.fetchedData) {
      if (this.props.mystate.loginSys.verified) {
        const payload = { login: this.props.mystate.loginSys.userName.value, pass: this.props.mystate.loginSys.userPass.value };
        api.logInUser(payload).then(response => {
          if (response.data.data) {


            this.props.setReduxData(response.data.data[0].linkManager);
            let configurableTitlesArr = [...response.data.data[0].linkManager.sectionTitles];
            for (let i = 0; i < response.data.data[0].linkManager.config.length; i++) {

              this.handleUpdateChange(i, response.data.data[0].linkManager.links, response.data.data[0].linkManager.config, configurableTitlesArr);
            }
          } else {

            console.error('error occurred')
          }
        }).catch(err => console.log(err.message))
      }
    } else {
      let configurableRedux = [...redux.sectionTitles];
      for (let i = 0; i < redux.config.length; i++) {
        this.handleUpdateChange(i, redux.links, redux.config, configurableRedux);
      }
    }
  }

  render() {
    return (
      <>
        <div className="div">
          <Interface
            handleSendUpdate={this.handleSendUpdate}
            handleClickNewSection={this.handleClickNewSection}
            handleSelect={this.handleSelectSection}
            handleInputLink={this.handleLinkInputChange}
            handleLinkNameInputChange={this.handleLinkNameInputChange}
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

const mapStateToProps = state => ({
  mystate: state
})

const mapDispatchToProps = dispatch => {
  return {
    setEdited: payload => dispatch(setEditing(payload)),
    setReduxData: payload => dispatch(setFetchedData(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
