import React from "react";
import PropTypes from 'prop-types';
import styled from '@emotion/styled'
import { withTheme } from 'emotion-theming'

const PageSquare = React.memo(({ onClick, isCurrent, text, theme, value, customComponent }) => (
  customComponent ? (
    React.cloneElement(
      customComponent, 
      { text, value, isCurrent }
    )
  ) : (
    <Wrapper
      theme={theme}
      onClick={onClick(value)}
      isCurrent={isCurrent}
    >{ text }</Wrapper>
  )
))

export default withTheme(PageSquare)

const Wrapper = styled.li`
  display:flex;
  align-items:center;
  justify-content:center;
  width: 38px;
  height: 38px;
  background-color: ${({ isCurrent, theme }) => (isCurrent ? theme.pagination.backgroundColor : '#FFF')};
  color: ${({ isCurrent, theme }) => (isCurrent ? theme.pagination.textColor : 'rgba(0, 0, 0, .87)')};
  display: inline-flex;
  cursor: pointer;
  border: 1px solid ${({ isCurrent, theme }) => (isCurrent ? theme.pagination.borderColor : '#E9E9E8')};
  margin: -1px;
`
PageSquare.propTypes = {
  onClick: PropTypes.func,
  isCurrent: PropTypes.bool,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}
PageSquare.defaultProps = {
  onClick: () => false,
  isCurrent: false,
  text: ''
};