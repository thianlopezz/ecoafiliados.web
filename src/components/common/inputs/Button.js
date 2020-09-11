import React from 'react';

import MButton from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const Button = ({
  text,
  type,
  className,
  loading,
  disabled,
  children,
  variant,
  size,
  color,
  onClick,
  style, //alternative colors fb/google/etc
  startIcon,
}) => {
  return (
    <MButton
      startIcon={!loading && startIcon}
      type={type || 'button'}
      variant={variant}
      className={className}
      color={color}
      size={size}
      disabled={disabled || loading}
      onClick={onClick || null}
      style={style}
    >
      {loading ? (
        <CircularProgress size={24} />
      ) : (
        <div>
          {children}
          {text && <span className="mx-1">{text}</span>}
        </div>
      )}
    </MButton>
  );
};

export default Button;
