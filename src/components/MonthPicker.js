import React from "react";
import "./MonthPicker.css";
import monthNames from "../additions/monthNames";


export default class MonthPicker extends React.Component {
  constructor(props) {
    super(props);
    ;
  }

  render() {
    return (
      <div className="month-picker">
        <svg
          className="month-picker__prev"
          width="9"
          height="8"
          viewBox="0 0 9 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => {
            this.changeDate("prev");
          }}
        >
          <path
            d="M0.646446 3.64645C0.451184 3.84171 0.451184 4.15829 0.646446 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659728 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646446 3.64645ZM9 3.5L1 3.5V4.5L9 4.5V3.5Z"
            fill="black"
          />
        </svg>

        <p className="month-picker__month">
          {monthNames[this.props.currentDate.getMonth()] +
            " " +
            this.props.currentDate.getFullYear()}
        </p>
        <svg
          className="month-picker__next"
          width="9"
          height="8"
          viewBox="0 0 9 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => {
            this.changeDate("next");
          }}
        >
          <path
            d="M0.646446 3.64645C0.451184 3.84171 0.451184 4.15829 0.646446 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659728 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646446 3.64645ZM9 3.5L1 3.5V4.5L9 4.5V3.5Z"
            fill="black"
          />
        </svg>
      </div>
    );
  }

  changeDate(direction) {
    this.props.changeDate(direction);
  }
}
