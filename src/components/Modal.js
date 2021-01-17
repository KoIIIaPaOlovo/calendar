import React from "react";
import { Button, Header, Modal } from "semantic-ui-react";
import "./Modal.css";

function Modals() {
  const [open, setOpen] = React.useState(false);
  const [dateFrom, changeDateFrom] = React.useState(new Date());
  const [dateTo, changeDateTo] = React.useState(new Date());
  const [dateDiff, changeDateDiff] = React.useState(0);
  return (
    <Modal
      closeIcon
      open={open}
      trigger={<Button className="button-inner">+ Add Vacation</Button>}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <div className="modal-wrapper">
      <Header className="modal-header">
        <h4 className="modal__title">Vacation request</h4>
        <p className="modal__days-count">{Math.floor(Date.parse(dateTo)-Date.parse(dateFrom))} days</p>
      </Header>
      <Modal.Content>
        <div className="modal__form">
          <div className="modal__subtitle">Dates</div>
          <div className="modal__input-wrapper">
            <p className="modal__input-label">From</p>
            <p className="modal__input-label">To</p>
            <input className="modal__input" type="date" onChange={event => {changeDateFrom(event.target.value)}}></input>
            <input className="modal__input" type="date" onChange={event => {changeDateTo(event.target.value)}}></input>
          </div>
          <div className="modal__subtitle">Vac Type</div>
          <select className="modal__select">
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
          </select>
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)} className="modal__close">
          Cancel
        </Button>
        <Button onClick={() => setOpen(false)} className="modal__send">
          Send
        </Button>
      </Modal.Actions>
      </div>
    </Modal>
  );
}
export default Modals;
