import React from 'react';
import Button from './inputs/Button';

const TitleAction = ({
  title,
  text1,
  text2,
  action1,
  disableAction1,
  action2,
  isOnAction,
}) => {
  return (
    <div className="d-flex mb-4">
      <h3>{title}</h3>
      {action1 && (
        <>
          {!isOnAction ? (
            <Button
              color="primary"
              disabled={disableAction1}
              className="ml-auto"
              onClick={action1}
            >
              {text1 || 'Edit'}
            </Button>
          ) : (
            <Button color="primary" className="ml-auto" onClick={action2}>
              {text2 || 'Cancel'}
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default TitleAction;
