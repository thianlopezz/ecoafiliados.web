import React, { Fragment } from 'react';
import styled from 'styled-components';
import { MEDIA_SCREENS, palette, CSS_HELPERS_REACT } from '../../../theme';
import { LOADIE } from '../../../constants';

export default function LoadieWrap({ children, loading, mini }) {
  return (
    <>
      {mini ? (
        loading ? (
          <LoadieMini>
            <div
              style={{
                backgroundColor: palette.white.white0,
                zIndex: '-1',
                padding: '3em',
                borderRadius: '3em',
                ...CSS_HELPERS_REACT.BOX_SHADOW,
              }}
            >
              <i
                className="fas fa-circle-notch fa-spin fa-5x"
                style={{ color: palette.primary.main }}
              ></i>
            </div>
          </LoadieMini>
        ) : (
          children
        )
      ) : (
        <>
          {loading && (
            <Loadie>
              <div
                style={{
                  backgroundColor: palette.white.white0,
                  position: 'fixed',
                  zIndex: '-1',
                  padding: '3em',
                  borderRadius: '3em',
                  ...CSS_HELPERS_REACT.BOX_SHADOW,
                }}
              >
                <i
                  className="fas fa-circle-notch fa-spin fa-5x"
                  style={{
                    color: palette.primary.main,
                  }}
                ></i>
              </div>
            </Loadie>
          )}
          {children}
        </>
      )}
    </>
  );
}

const LoadieMini = styled.div`
  z-index: 20;
  align-items: center;
  background-color: rgba(0, 0, 0, 0); /* Black background with opacity */
  display: flex;
  justify-content: center;
`;

const Loadie = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 20;
  position: fixed;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6); /* Black background with opacity */
  display: flex;
  justify-content: center;
`;
