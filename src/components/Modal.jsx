import './../styles/modal.css';

const Modal = ({ handleClose: handleAttack, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button type="button" onClick={handleAttack}>
          Attack
        </button>
        <button type="button" onClick={handleAttack}>
          Defend
        </button>
      </section>
    </div>
  );
};

export default Modal;
