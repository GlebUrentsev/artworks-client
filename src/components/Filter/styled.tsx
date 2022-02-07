import styled from 'styled-components';

import { CheckMark } from '../../common/assets';
import { FilterLabel } from './Filter';

export const FilterCheckBox = styled.input`
  position: absolute;
  z-index: -1;
  opacity: 0;
  appearance: none;
  width: 23px;
  height: 23px;

  & + ${FilterLabel}::before {
    content: '';
    display: inline-block;
    width: 1em;
    height: 1em;
    flex-shrink: 0;
    flex-grow: 0;
    border: 1px solid #adb5bd;
    border-radius: 0.25em;
    margin-right: 0.5em;
    background-repeat: no-repeat;
    background-position: center center;
  }

  &:checked + ${FilterLabel}::before {
    background-image: ${`url(${CheckMark})`};
  }
`;
