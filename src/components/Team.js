import React from "react";
import dayNames from "../additions/dayNames";
import "./Team.css";

export default class Team extends React.Component {
  constructor(props) {
    super(props);
    let days = this.props.days;
    let vacations = this.generateVacationsArray(
      this.props.team.participants,
      this.props.currentDate,
    );
    let membersSum = this.countMembersSum(
      this.props.team.participants,
      vacations,
      this.props.currentDate,
      days,
    );
    this.state = {
      days: days,
      isShown: true,
      vacations: vacations,
      membersSum: membersSum,
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.days !== this.props.days ||
      prevProps.team.participants !== this.props.team.participants ||
      prevProps.currentDate !== this.props.currentDate
    ) {
      let days = this.props.days;
      let vacations = this.generateVacationsArray(
        this.props.team.participants,
        this.props.currentDate,
      );
      let membersSum = this.countMembersSum(
        this.props.team.participants,
        vacations,
        this.props.currentDate,
        days,
      );
      this.setState({
        days: days,
        vacations: vacations,
        membersSum: membersSum,
      });
    }
  }

  render() {
    return (
      <tbody>
        <tr>
          <td className="team__head-column">
            <div className="team__head">
              {this.props.team.realm}
              <div className="team-percent">
                {this.countTeamPercent() + "%"}
              </div>
              <button onClick={() => this.hideTeam()}>Hide</button>
            </div>
          </td>
          {this.outputDays()}
          <td></td>
        </tr>
        {this.state.isShown &&
          this.props.team.participants.map((member, index) => {
            return (
              <tr key={index}>
                <td className="team__head-column">{member.name}</td>
                {this.outputDays(member)}
                <td>
                  {this.state.membersSum.map((memberSum) => {
                    if (memberSum.userId === member.id) {
                      return memberSum.summary;
                    } else {
                      return "";
                    }
                  })}
                </td>
              </tr>
            );
          })}
      </tbody>
    );
  }

  generateVacationsArray(participants, currentDate) {
    let tempVacations = [];
    participants.forEach((member) => {
      member.vacations.forEach((vacation) => {
        let endDate = this.sliceDate(vacation.duration, currentDate, "end");
        let startDate = this.sliceDate(vacation.duration, currentDate, "start");
        if(Date.parse(endDate)<=Date.parse(startDate)){
          return;
        }
        tempVacations.push({
          userId: member.id,
          startDate: startDate,
          endDate: endDate,
          type: vacation.type,
        });
      });
    });
    return tempVacations;
    
  }

  countMembersSum(participants, vacations, currentDate, days) {
    let tempSumArray = [];
    participants.forEach((member) => {
      let memberSum = 0;
      vacations.forEach((vacation) => {
        if (vacation.userId === member.id) {
          memberSum += this.countDateDifference(
            vacation.startDate,
            vacation.endDate,
            currentDate,
            days,
          );
        }
      });
      tempSumArray.push({
        userId: member.id,
        summary: memberSum,
      });
    });
    return tempSumArray;
  }

  outputDays(member) {
    let arrayOfElements = [];
    for (let index = 1; index <= this.state.days; index++) {
      let dayName =
        dayNames[this.getDayFromNumber(this.props.currentDate, index).getDay()];
      if (dayName === "Вс" || dayName === "Сб") {
        if (member) {
          arrayOfElements.push(this.createOutputDay(member, index, "weekend"));
        } else {
          arrayOfElements.push(<td key={index} className="weekend"></td>);
        }
      } else {
        if (member) {
          arrayOfElements.push(this.createOutputDay(member, index, ""));
        } else {
          arrayOfElements.push(<td key={index}></td>);
        }
      }
    }
    return arrayOfElements;
  }

  createOutputDay(member, index, className) {
    return (
      <td key={index} className={"vacation-wrapper " + className}>
        {this.state.vacations.map((vacation, vacindex) => {
          if (
            vacation.userId === member.id &&
            Date.parse(vacation.startDate) ===
              Date.parse(this.getDayFromNumber(this.props.currentDate, index))
          ) {
            return this.createOutputVacation(vacindex, vacation);
          } else {
            return null;
          }
        })}
      </td>
    );
  }

  createOutputVacation(index, vacation) {
    return (
      <div
        key={index}
        style={{
          width:
            this.countSumWithoutHolidays(vacation.startDate, vacation.endDate) *
              34 -
            6 +
            "px",
        }}
        className={"vacation " + vacation.type.toLowerCase()}
      >
        {vacation.type}
      </div>
    );
  }

  hideTeam() {
    this.setState({ isShown: !this.state.isShown });
  }

  countTeamPercent() {
    let fullSum = 0;
    let fullDays = this.state.days * this.props.team.participants.length;
    this.state.vacations.forEach((vacation) => {
      console.dir(vacation);
      fullSum += this.countSumWithoutHolidays(
        vacation.startDate,
        vacation.endDate,
      );
    });
    
    return Math.round(fullSum / fullDays * 100);
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

  countDateDifference(startDate, endDate, currentDate, days) {
    let endDateNumber = this.countDateNumber(endDate);
    let startDateNumber = this.countDateNumber(startDate);
    let sumWithoutHolidays = this.countSumWithoutHolidays(startDate, endDate);

    for (let index = 1; index <= days; index++) {
      let tempDate = this.getDayFromNumber(currentDate, index);
      if (
        Date.parse(tempDate) >= startDateNumber &&
        Date.parse(tempDate) <= endDateNumber
      ) {
        if (
          dayNames[tempDate.getDay()] === "Вс" ||
          dayNames[tempDate.getDay()] === "Сб"
        ) {
          sumWithoutHolidays = sumWithoutHolidays - 1;
        }
      }
    }

    return sumWithoutHolidays >= 0 ? sumWithoutHolidays : 0;
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
}
