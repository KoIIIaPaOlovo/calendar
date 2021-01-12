import React from "react";
import dayNames from "../additions/dayNames";
import "./Team.css";

export default class Team extends React.Component {
  constructor(props) {
    super(props);
    this.generateVacationsArray = this.generateVacationsArray.bind(this);
    this.countMembersSum = this.countMembersSum.bind(this);
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
                {this.outputDays()}
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
        let endDate = this.sliceEndDate(vacation.duration, currentDate);
        let startDate = this.sliceStartDate(vacation.duration, currentDate);
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

  outputDays() {
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
        arrayOfElements.push(<td key={index} className="weekend"></td>);
      } else {
        arrayOfElements.push(<td key={index}></td>);
      }
    }
    return arrayOfElements;
  }

  hideTeam() {
    this.setState({ isShown: !this.state.isShown });
  }

  sliceEndDate(duration, currentDate) {
    let endDate = duration.slice(13);
    let endDateNumber = Date.parse(
      new Date(
        endDate.slice(6, 10),
        +endDate.slice(3, 5) - 1,
        endDate.slice(0, 2),
      ),
    );

    if (
      endDateNumber >
      Date.parse(
        new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0),
      )
    ) {
      return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    } else {
      return new Date(
        endDate.slice(6, 10),
        +endDate.slice(3, 5) - 1,
        endDate.slice(0, 2),
      );
    }
  }

  sliceStartDate(duration, currentDate) {
    let startDate = duration.slice(0, 10);
    let startDateNumber = Date.parse(
      new Date(
        startDate.slice(6, 10),
        +startDate.slice(3, 5) - 1,
        startDate.slice(0, 2),
      ),
    );

    if (
      startDateNumber <
      Date.parse(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1))
    ) {
      return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    } else {
      return new Date(
        startDate.slice(6, 10),
        +startDate.slice(3, 5) - 1,
        startDate.slice(0, 2),
      );
    }
  }

  countDateDifference(startDate, endDate, currentDate, days) {
    let endDateNumber = Date.parse(
      new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()),
    );
    let startDateNumber = Date.parse(
      new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
      ),
    );

    let sumWithoutHolidays =
      (endDateNumber - startDateNumber) / (1000 * 60 * 60 * 24) + 1;

    for (let index = 0; index < days; index++) {
      let tempDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        index + 1,
      );
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
}
