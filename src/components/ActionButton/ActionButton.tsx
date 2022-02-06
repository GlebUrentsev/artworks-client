import React from 'react';
import styled from 'styled-components';
import { INDENT } from '../../common/tokens/indent';

import { COLORS } from '../../common/tokens/palette';
import { fontSizeXL } from '../../common/tokens/typography';

const Button = styled.button<{ upperCase?: boolean }>`
  border: none;
  outline: none;
  background-color: ${COLORS.black};
  color: ${COLORS.white};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${INDENT.xxs} ${INDENT.l};
  cursor: pointer;

  ${fontSizeXL}

  text-transform: ${({ upperCase }) => (upperCase ? 'uppercase' : 'none')};
`;

type ButtonProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  upperCase?: boolean;
  className?: string;
};

export const ActionButton = ({ children, onClick, upperCase, className }: React.PropsWithChildren<ButtonProps>) => {
  return (
    <Button onClick={onClick} upperCase={upperCase} className={className}>
      {children}
    </Button>
  );
};
