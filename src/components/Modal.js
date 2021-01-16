import React from "react";
import { Button, Header, Modal } from "semantic-ui-react";
import "./Modal.css";

function Modals() {
  const [open, setOpen] = React.useState(false);
  return (
    <Modal
      closeIcon
      open={open}
      trigger={<Button className="button-inner">+ Add Vacation</Button>}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header className="modal-header">
        <h4 className="modal__title">Vacation request</h4>
        <p className="modal__days-count">8 days</p>
      </Header>
      <Modal.Content>
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
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)} className="modal__close">
          Cancel
        </Button>
        <Button onClick={() => setOpen(false)} className="modal__send">
          Send
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
export default Modals;
