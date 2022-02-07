import React from 'react';
import styled from 'styled-components';

import { ArrowLeft, ArrowRight } from '../../common/assets';
import { adaptive, COLORS, fontSizeXLX, INDENT } from '../../common/tokens';

const BUTTON_WIDTH = 23;
const BUTTON_HEIGHT = 23;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-left: ${INDENT.l};
  margin: ${INDENT.xxxs} ${INDENT.none};
  align-items: center;
  margin-top: ${INDENT.xxxl};

  ${adaptive.maxWidth.desktopS} {
    padding-left: ${INDENT.none};
  }
`;

const PaginationControl = styled.button.attrs({
  type: 'button',
})`
  border: none;
  outline: none;
  cursor: pointer;
  background-color: transparent;
  width: ${BUTTON_WIDTH}px;
  height: ${BUTTON_HEIGHT}px;
  line-height: 45px;
  margin: ${INDENT.none} ${INDENT.xxs};

  &:disabled svg path {
    stroke: ${COLORS.disabled};
  }
`;

const PaginationButton = styled.button.attrs({
  type: 'button',
})<{ isSelected?: boolean }>`
  border: none;
  outline: none;
  cursor: pointer;
  background-color: transparent;
  width: ${BUTTON_WIDTH}px;
  height: ${BUTTON_HEIGHT}px;
  font-family: 'Archivo';
  ${fontSizeXLX};

  color: ${({ isSelected }) => (isSelected ? COLORS.black : COLORS.disabled)};
`;

type PaginationProps<T> = {
  onPageChange: (value: React.SetStateAction<number>) => void;
  currentPage: number;
  items: T[];
  paginationOffset: number;
};

const getItemsArray = (count: number) => Array.from(Array(count).keys());

export const Pagination = <T,>({ onPageChange, currentPage, items, paginationOffset }: PaginationProps<T>) => {
  const itemsLength = items.length;
  const count = Math.ceil(itemsLength / paginationOffset);

  if (count === 0 || itemsLength <= paginationOffset) {
    return null;
  }

  return (
    <PaginationWrapper>
      <PaginationControl onClick={() => onPageChange((prev) => prev - 1)} disabled={currentPage === 1}>
        <ArrowLeft />
      </PaginationControl>
      {getItemsArray(count).map((item) => (
        <PaginationButton key={item} type="button" isSelected={currentPage === item + 1}>
          {item + 1}
        </PaginationButton>
      ))}
      <PaginationControl onClick={() => onPageChange((prev) => prev + 1)} disabled={currentPage === count}>
        <ArrowRight />
      </PaginationControl>
    </PaginationWrapper>
  );
};
