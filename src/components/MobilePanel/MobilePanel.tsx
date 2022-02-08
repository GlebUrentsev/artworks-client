import React from 'react';
import styled from 'styled-components';
import { COLORS, fontSizeLm, INDENT } from '../../common/tokens';
import { ActionButton } from '../ActionButton';

const BUTTON_WRAPPER_HEIGHT = 104;

const MobilePanelOverlay = styled.div`
  position: fixed;
  inset: 0;
  opacity: 0.2;
  background-color: ${COLORS.black};
  width: 100%;
  z-index: 1;
`;

const ButtonsContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  height: ${BUTTON_WRAPPER_HEIGHT}px;
  border-top: 4px solid ${COLORS.light};
  position: fixed;
  bottom: 0;
  z-index: 3;
  width: 100%;
  right: 0;
  background-color: ${COLORS.white};
`;

const FilterActionButton = styled(ActionButton)<{ isLight?: boolean }>`
  border: none;
  outline: none;
  cursor: pointer;
  ${fontSizeLm}
  background-color: ${({ isLight }) => (isLight ? 'transparent' : COLORS.black)};
  color: ${({ isLight }) => (isLight ? COLORS.black : COLORS.white)};
  text-transform: uppercase;
  padding: ${INDENT.xxs};
`;

const MobilePanelComponent = styled.div`
  position: fixed;
  top: 50px;
  bottom: 0;
  right: 0;
  width: 100%;
  z-index: 2;
  background-color: ${COLORS.white};
  padding: ${INDENT.s} ${INDENT.m};
`;

const Content = styled.div`
  width: 100%;
  max-height: calc(100vh - ${BUTTON_WRAPPER_HEIGHT * 2}px);
  overflow-y: auto;
  padding-bottom: ${INDENT.l};
`;

type MobilePanelProps = {
  onClear: () => void;
  onSave: () => void;
  isOpen: boolean;
};

export const MobilePanel = ({ children, isOpen, onClear, onSave }: React.PropsWithChildren<MobilePanelProps>) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.removeAttribute('style');
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  // TODO - better to do buttons like bottomSlot prop
  return (
    <>
      <MobilePanelOverlay />
      <MobilePanelComponent>
        <Content>{children}</Content>
      </MobilePanelComponent>
      <ButtonsContainerWrapper>
        <FilterActionButton isLight onClick={onClear}>
          Clear
        </FilterActionButton>
        <FilterActionButton onClick={onSave}>Save</FilterActionButton>
      </ButtonsContainerWrapper>
    </>
  );
};
