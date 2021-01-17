import React from "react";
import dayNames from "../additions/dayNames";
import "./Table.css";
import Team from "./Team";
import teams from "../additions/teams";
import Footer from "../components/Footer";
import Modals from "../components/Modal";



export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.countDays = this.countDays.bind(this);
    this.state = {
      days: this.countDays(this.props.currentDate),
    };
  }
  render() {
    return (
      <table>
        <thead>
          <tr>
            <td className="firstColumn">
              <Modals/>    
            </td>
            {this.outputHead()}
            <td className="sum-column">Sum</td>
          </tr>
        </thead>
        {teams.map((team, index) => {
          return (
            <Team
              currentDate={this.props.currentDate}
              team={team}
              key={index}
              days={this.state.days}
            />
          );
        })}
        <Footer
          currentDate={this.props.currentDate}
          days={this.state.days}
          teams={teams}
        />
      </table>
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentDate !== prevProps.currentDate) {
      this.setState({ days: this.countDays(this.props.currentDate) });
    }
  }

  outputHead() {
    let arrayOfElements = [];
    for (let index = 1; index <= this.state.days; index++) {
      let dayName =
        dayNames[
          new Date(
            this.props.currentDate.getFullYear(),
            this.props.currentDate.getMonth(),
            index,
          ).getDay()
        ];
      if (dayName === "Вс" || dayName === "Сб") {
        arrayOfElements.push(
          <td key={index} className="head__day weekend">
            <p>{index}</p>
            <span>{dayName}</span>
          </td>,
        );
      } else {
        arrayOfElements.push(
          <td key={index} className="head__day">
            <p>{index}</p>
            <span>{dayName}</span>
          </td>,
        );
      }
    }
    return arrayOfElements;
  }

  countDays(date) {
    return 33 - new Date(date.getFullYear(), date.getMonth(), 33).getDate();
  }
}
