import React from "react";
import "./Modal.css";
import PropTypes from 'prop-types';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueFrom: this.props.currentDate.toISOString().slice(0, 10),
      valueTo: this.props.currentDate.toISOString().slice(0, 10),
      isValid: true,
      difference: 1,
      vacType: "Pd",
    };
    this.handleChangeFrom = this.handleChangeFrom.bind(this);
    this.handleChangeTo = this.handleChangeTo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleVacationType = this.handleVacationType.bind(this);
  }
  render() {
    if (this.props.isLoading) {
      return (
        <div className="loader__block">
          <p className="loading__descr">Page is Loading</p>
          <div className="loader"></div>
        </div>
      );
    } else {
      return (
        <div
          className={this.props.isOpenModal ? "modal" : "modal modal-hidden"}
        >
          <div className="modal-wrapper">
            <div className="modal-header">
              <h4 className="modal__title">Vacation request</h4>
              <p className="modal__days-count">
                {this.state.isValid ? (
                  this.state.difference + " day(s)"
                ) : (
                  <span>Invalid Date</span>
                )}
              </p>
            </div>
            <div className="modal__form">
              <div className="modal__subtitle">Dates</div>
              <div className="modal__input-wrapper">
                <p className="modal__input-label">From</p>
                <p className="modal__input-label">To</p>
                <input
                  className="modal__input"
                  type="date"
                  value={this.state.valueFrom}
                  onChange={this.handleChangeFrom}
                ></input>
                <input
                  className="modal__input"
                  type="date"
                  value={this.state.valueTo}
                  onChange={this.handleChangeTo}
                ></input>
              </div>
              <div className="modal__subtitle">Vac Type</div>
              <select
                className="modal__select"
                value={this.state.vacType}
                onChange={this.handleVacationType}
              >
                <option value="Pd">Paid</option>
                <option value="UnPd">UnPaid</option>
              </select>
            </div>
            <div className="modal__buttons">
              <button
                className="modal__close"
                onClick={() => {
                  this.showModal();
                }}
              >
                Close
              </button>
              <input
                type="submit"
                className="modal__send"
                onClick={this.handleSubmit}
                value="Send"
                disabled={!this.state.isValid}
              ></input>
            </div>
          </div>
        </div>
      );
    }
  }

  handleChangeFrom(event) {
    let tempDifference =
      Date.parse(new Date(this.state.valueTo)) -
      Date.parse(new Date(event.target.value));

    if (tempDifference < 0) {
      this.setState({
        valueFrom: event.target.value,
        isValid: false,
      });
    } else {
      this.setState({
        valueFrom: event.target.value,
        isValid: true,
        difference: tempDifference / (60 * 60 * 1000 * 24) + 1,
      });
    }
  }

  handleChangeTo(event) {
    let tempDifference =
      Date.parse(new Date(event.target.value)) -
      Date.parse(new Date(this.state.valueFrom));
    if (tempDifference < 0) {
      this.setState({
        valueTo: event.target.value,
        isValid: false,
      });
    } else {
      this.setState({
        valueTo: event.target.value,
        isValid: true,
        difference: tempDifference / (60 * 60 * 1000 * 24) + 1,
      });
    }
  }

  handleVacationType(event) {
    this.setState({ vacType: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.send(this.generateNewVacation());
    this.props.showModal();
  }

  showModal() {
    this.props.showModal();
  }

  generateNewVacation() {
    let userId = 4;
    let teams = this.props.teams;

    let tempValueFrom =
      this.state.valueFrom.slice(8, 10) +
      "." +
      this.state.valueFrom.slice(5, 7) +
      "." +
      this.state.valueFrom.slice(0, 4);

    let tempValueTo =
      this.state.valueTo.slice(8, 10) +
      "." +
      this.state.valueTo.slice(5, 7) +
      "." +
      this.state.valueTo.slice(0, 4);

    teams.forEach((team) => {
      team.participants.forEach((member) => {
        if (member.id === userId) {
          let tempVacation = {
            duration: tempValueFrom + " - " + tempValueTo,
            type: this.state.vacType,
          };
          member.vacations.push(tempVacation);
        }
      });
    });

    return teams;
  }
}

Modal.propTypes = {
  isLoading: PropTypes.bool,
  isOpenModal: PropTypes.bool,
  showModal: PropTypes.func,
  currentDate: PropTypes.object,
  teams: PropTypes.array,
  send: PropTypes.func,
};
