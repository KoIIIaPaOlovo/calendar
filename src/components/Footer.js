import React from "react";
import dayNames from "../additions/dayNames";
import Team from "./Team";
import teams from "../additions/teams";
import "./Footer.css";

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
    if (
      prevProps.days !== this.props.days ||
      prevProps.teams.participants !== this.props.teams.participants ||
      prevProps.currentDate !== this.props.currentDate
    ) {
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
        <div className="footer__descr">
          <div className="footer__title">
            <p>September teams Summary</p>
          </div>
          <div className="footer__text">
            <p>On vacation</p>
            <div className="team__block">
              <div className="team__count"></div>
              <span className="team__quantity">{this.state.participants}</span>
            </div>
            <span className="team__vacation">
              {this.countTeamPercent() + "%"}
            </span>
          </div>
        </div>
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
      if (dayName === "Вс" || dayName === "Сб") {
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
          let endDate = this.sliceDate(member.duration, currentDate, "end");
          let startDate = this.sliceDate(member.duration, currentDate, "start");
          if (Date.parse(endDate) <= Date.parse(startDate)) {
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
      let startDateNumber = this.countDateNumber(item.startDate);
      let endDateNumber = this.countDateNumber(item.endDate);
      let currentDay = this.getDayFromNumber(currentDate, index);
      if (currentDay >= startDateNumber && currentDay <= endDateNumber) {
        sumDays++;
      }
    });
    return sumDays;
  }

  sliceDate(duration, currentDate, position) {
    let date = position === "end" ? duration.slice(13) : duration.slice(0, 10);
    let dateNumber = Date.parse(this.countDateFromString(date));

    if (
      dateNumber < Date.parse(this.getFirstDay(currentDate)) &&
      position === "start"
    ) {
      return this.getFirstDay(currentDate);
    }
    if (dateNumber > this.getLastDay(currentDate) && position === "end") {
      return this.getLastDay(currentDate);
    }
    return this.countDateFromString(date);
  }
  countDateFromString(dateString) {
    return new Date(
      dateString.slice(6, 10),
      +dateString.slice(3, 5) - 1,
      dateString.slice(0, 2),
    );
  }
  getLastDay(currentDate) {
    return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  }
  getFirstDay(currentDate) {
    return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  }

  getDayFromNumber(currentDate, dayNumber) {
    return new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      dayNumber,
    );
  }
  countTeamPercent() {
    let fullSum = 0;
    let fullDays = this.props.days * this.state.participants;
    this.state.vacations.forEach((vacation) => {
      fullSum += this.countSumWithoutHolidays(
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
  countSumWithoutHolidays(startDate, endDate) {
    let endDateNumber = this.countDateNumber(endDate);
    let startDateNumber = this.countDateNumber(startDate);

    let sumWithoutHolidays =
      (endDateNumber - startDateNumber) / (1000 * 60 * 60 * 24) + 1;

    return sumWithoutHolidays;
  }
  countDateNumber(date) {
    return Date.parse(
      new Date(date.getFullYear(), date.getMonth(), date.getDate()),
    );
  }
}
export default Footer;
