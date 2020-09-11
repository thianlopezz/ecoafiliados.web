import React from 'react';

const DummyCards = ({
  size = 3,
  cols,
  disablePhoto,
  disableTitle,
  disableDescription,
}) => {
  if (!cols) {
    cols = 'col-sm-12 col-md-6 col-lg-4 col-xl-4';
  }

  let dummyCards = new Array(size).fill(1);

  return (
    <div className="text-center w-100 ps-dummyCardWrapper">
      <div className="lds-facebook" />
      {dummyCards.map((card, index) => (
        <div key={index}>
          <div className={'ps-dummyCard my-1 ' + cols}>
            {!disablePhoto && <div className="photo" />}
            {!disableTitle && <div className="title" />}
            {!disableDescription && <div className="description" />}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DummyCards;
