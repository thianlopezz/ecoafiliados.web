import React from 'react';

// import ErrorSpan from './errorSpan';

const File = ({ name, error, onChange, accept, hidden }) => {
  return (
    <div className="form-group">
      <input
        hidden={hidden}
        id={name}
        name={name}
        type="file"
        onChange={onChange}
        accept={accept}
      />
      {/* {error && <ErrorSpan error={error} />} */}
    </div>
  );
};

export default File;
