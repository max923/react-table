import React, { useMemo } from "react";
import PropTypes from 'prop-types';
import styled from '@emotion/styled'
import PageSquare from './PageSquare'
import { assign, times } from 'lodash'


function Pagination(props) {
  const { currentPage, lastPage, handlePageClick, pagination={} } = props
  const { customComponent } = pagination
  const renderPaginationSquare = useMemo(() => {
    if (lastPage > 9) {
      let squareInnerText = []
      if (currentPage > 5 && currentPage + 5 < lastPage) {
        squareInnerText = [
          { text: 1, value: 1 },
          { text: '…', value: currentPage - 5 },
          { text: currentPage - 2, value: currentPage - 2 },
          { text: currentPage - 1, value: currentPage - 1 },
          { text: currentPage, value: currentPage },
          { text: currentPage + 1, value: currentPage + 1 },
          { text: currentPage + 2, value: currentPage + 2 },
          { text: '…', value: currentPage + 5 },
          { text: lastPage, value: lastPage },
        ].map((obj, key) => (assign(obj, { id: key })))
      } else if (currentPage > 5) {
        squareInnerText = [
          { text: 1, value: 1 },
          { text: '…', value: currentPage - 5 },
          { text: lastPage - 6, value: lastPage - 6 },
          { text: lastPage - 5, value: lastPage - 5 },
          { text: lastPage - 4, value: lastPage - 4 },
          { text: lastPage - 3, value: lastPage - 3 },
          { text: lastPage - 2, value: lastPage - 2 },
          { text: lastPage - 1, value: lastPage - 1 },
          { text: lastPage, value: lastPage },
        ].map((obj, key) => (assign(obj, { id: key })))
      } else if (currentPage + 5 <= lastPage) {
        squareInnerText = [
          { text: 1, value: 1 },
          { text: 2, value: 2 },
          { text: 3, value: 3 },
          { text: 4, value: 4 },
          { text: 5, value: 5 },
          { text: 6, value: 6 },
          { text: 7, value: 7 },
          { text: '…', value: currentPage + 5 },
          { text: lastPage, value: lastPage },
        ].map((obj, key) => (assign(obj, { id: key })))
      }
      return squareInnerText.map(item => <PageSquare customComponent={customComponent} value={item.value} onClick={handlePageClick} isCurrent={item.value === currentPage} key={item.id} text={item.text} />)
    }
    return times(lastPage, key => (<PageSquare customComponent={customComponent} value={key + 1} onClick={handlePageClick} isCurrent={key + 1 === currentPage} key={key} text={ key + 1 } />))
  }, [currentPage])
  return (
    <Wrapper>
      <PageSquare customComponent={customComponent} text={'<'} value={currentPage - 1} onClick={handlePageClick} />
        { renderPaginationSquare }
      <PageSquare customComponent={customComponent} text={'>'} value={currentPage + 1} onClick={handlePageClick} />
    </Wrapper>
  )
}

export default Pagination

const Wrapper = styled.ul`
  margin: 20px auto;
  padding: 0;
`
Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired,
  handlePageClick: PropTypes.func.isRequired,
  pagination: PropTypes.object
}
Pagination.defaultProps = {
  pagination: {},
};
