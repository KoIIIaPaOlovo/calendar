import React from "react";
import dayNames from "../additions/dayNames";
import dateFunctions from "../utils/dateFunctions";
import monthNames from "../additions/monthNames";
import "./Footer.css";
import PropTypes from 'prop-types';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    let days = this.props.days;
    let vacations = this.generateVacationsArray(
      this.props.teams.participants,
      this.props.currentDate,
    );
    let participants = this.obtainParticipants(this.props.teams.participants);
    this.state = {
      days: days,
      vacations: vacations,
      participants: participants,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      let days = this.props.days;
      let vacations = this.generateVacationsArray(
        this.props.teams.participants,
        this.props.currentDate,
      );
      let participants = this.obtainParticipants(this.props.teams.participants);

      this.setState({
        days: days,
        vacations: vacations,
        participants: participants,
      });
    }
  }
  render() {
    return (
      <tfoot>
        <tr>
          <td className="tfoot__title">Day-person-starts </td>
          {this.outputDays()}
          <td></td>
        </tr>
        <tr className="footer__title">
          <td>
            {monthNames[this.props.currentDate.getMonth()]} teams Summary
          </td>
        </tr>
        <tr className="footer__text">
          <td className="footer__descr">On vacation</td>
          <td className="team__count"></td>
          <td className="team__quantity">{this.state.participants}</td>
          <td className="team__vacation">{this.countTeamPercent() + "%"}</td>
        </tr>
      </tfoot>
    );
  }

  outputDays() {
    let arrayOfElements = [];
    for (let index = 1; index <= this.props.days; index++) {
      let dayName =
        dayNames[
          new Date(
            this.props.currentDate.getFullYear(),
            this.props.currentDate.getMonth(),
            index,
          ).getDay()
        ];
      if (dayName === "Su" || dayName === "St") {
        arrayOfElements.push(<td key={index} className="weekend"></td>);
      } else {
        arrayOfElements.push(
          <td key={index}>
            {this.countMembersSum(index, this.props.currentDate)}
          </td>,
        );
      }
    }
    return arrayOfElements;
  }

  generateVacationsArray(index, currentDate) {
    let tempVacations = [];
    this.props.teams.forEach((member) => {
      member.participants.forEach((participant) => {
        participant.vacations.forEach((member) => {
          let endDate = dateFunctions.sliceDate(
            member.duration,
            currentDate,
            "end",
          );
          let startDate = dateFunctions.sliceDate(
            member.duration,
            currentDate,
            "start",
          );
          if (Date.parse(endDate) < Date.parse(startDate)) {
            return;
          }
          tempVacations.push({
            startDate: startDate,
            endDate: endDate,
          });
        });
      });
    });
    return tempVacations;
  }

  countMembersSum(index, currentDate) {
    let sumDays = 0;
    this.state.vacations.forEach((item) => {
      let startDateNumber = dateFunctions.countDateNumber(item.startDate);
      let endDateNumber = dateFunctions.countDateNumber(item.endDate);
      let currentDay = dateFunctions.getDayFromNumber(currentDate, index);
      if (currentDay >= startDateNumber && currentDay <= endDateNumber) {
        sumDays++;
      }
    });
    return sumDays;
  }

  countTeamPercent() {
    let fullSum = 0;
    let fullDays = this.props.days * this.state.participants;
    this.state.vacations.forEach((vacation) => {
      fullSum += dateFunctions.countSumWithoutHolidays(
        vacation.startDate,
        vacation.endDate,
      );
    });
    return Math.round((fullSum / fullDays) * 100);
  }

  obtainParticipants() {
    let participantsQuantity = this.props.teams.map((item) => {
      return item.participants.length;
    });
    let participants = participantsQuantity.reduce(add, 0);
    function add(accumulator, a) {
      return accumulator + a;
    }

    return participants;
  }
}
export default Footer;

Footer.propTypes = {
  currentDate: PropTypes.object,
  days: PropTypes.number,
  teams: PropTypes.array
};
