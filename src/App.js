import React from "react";
import "./App.css";
import MonthPicker from "./components/MonthPicker";
import Table from "./components/Table";
import teams from "./additions/teams"


export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentDate: new Date(),
      isLoading: true,
      teams: [],
    };
    this.changeDate = this.changeDate.bind(this);
  }

  componentWillMount() {
    this.send(teams);
  }

  render() {
    return (
      <div className="app-wrapper">
        <MonthPicker
          changeDate={this.changeDate}
          currentDate={this.state.currentDate}
        />
        <Table teams={this.state.teams} isLoading={this.state.isLoading} currentDate={this.state.currentDate} />
      </div>
    );
  }

  changeDate(direction) {
    if (direction === "next") {
      this.setState({
        currentDate: new Date(
          this.state.currentDate.setMonth(
            this.state.currentDate.getMonth() + 1,
          ),
        ),
      });
    } else {
      this.setState({
        currentDate: new Date(
          this.state.currentDate.setMonth(
            this.state.currentDate.getMonth() - 1,
          ),
        ),
      });
    }
  }

  send() {
    let context = this;
    setTimeout(() => {
      fetch("https://jsonplaceholder.typicode.com/posts/", {
        method: "get",
      })
        .then(function () {
          return teams;
        })
        .then(function (data) {
          context.setState({ isLoading: false });
          context.setState({ teams: data });
          console.log(context.state.isLoading);
          console.log(context.state.teams);
        })
        .catch(alert);
    }, 1000);
  }
}
