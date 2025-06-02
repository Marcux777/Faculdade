const Input = ({ label, id, error, ...props }) => {
  return (
    <div className="mb-3">
      {label && <label htmlFor={id} className="form-label">{label}</label>}
      <input id={id} className={`form-control ${error ? 'is-invalid' : ''}`} {...props} />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default Input;
