import { useState, useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!show) return null;

  const bgClass = type === 'error' ? 'bg-danger' : 'bg-success';

  return (
    <div
      className={`position-fixed bottom-0 end-0 p-3`}
      style={{ zIndex: 1050 }}
    >
      <div
        className={`toast show ${bgClass} text-white`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          <strong className="me-auto">
            {type === 'error' ? 'Erro' : 'Sucesso'}
          </strong>
          <button
            type="button"
            className="btn-close"
            onClick={() => {
              setShow(false);
              onClose();
            }}
          ></button>
        </div>
        <div className="toast-body">{message}</div>
      </div>
    </div>
  );
};

export default Toast;
