import React from "react";
import "./Modal.css";
import dateFunctions from "../utils/dateFunctions";

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
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
              <p className="modal__days-count">8 days</p>
            </div>
            <div className="modal__form">
              <div className="modal__subtitle">Dates</div>
              <div className="modal__input-wrapper">
                <p className="modal__input-label">From</p>
                <p className="modal__input-label">To</p>
                <input className="modal__input" type="date"></input>
                <input className="modal__input" type="date"></input>
              </div>
              <div className="modal__subtitle">Vac Type</div>
              <select className="modal__select">
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
              </select>
            </div>
            <div className="modal__buttons">
              <button
                className="modal__send"
                onClick={() => {
                  this.showModal();
                }}
              >
                Send{" "}
              </button>
              <button
                className="modal__close"
                onClick={() => {
                  this.showModal();
                }}
              >
                Close{" "}
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
  showModal() {
    this.props.showModal();
  }
}
