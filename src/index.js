import React, { useState, useCallback } from "react";
import PropTypes from 'prop-types';
import "./style.css";
import themes from './themes'
import { ThemeProvider } from 'emotion-theming'
import styled from '@emotion/styled'
import Const from './const'
import TableHeader from './components/TableHeader'
import TableBody from './components/TableBody'
import Pagination from './components/Pagination'

function Table(props) {
  const { columns, id, className, theme, data, pagination } = props  
  const [ tableData, setTableData ] = useState(data)
  const [ currentPage, setCurrentPage ] = useState(pagination.currentPage || 1)
  const { sizePerPage=10 } = pagination
  const totalPage = Math.ceil(tableData.length / sizePerPage)

  const handleSorting = useCallback((fieldId, callback) => (event) => {
    const fn  = callback(fieldId, event)
    if(typeof callback === 'function') {
      const sortingData = data.sort((a, b) => fn(a[fieldId], b[fieldId]))
      setTableData([...sortingData])
    }
  }, [])

  const handlePageClick = useCallback((value) => () => {
    if(value < 1 || value > totalPage) return
    setCurrentPage(value)
  }, [currentPage])
  
  // Check is pagination, if true render the page data 
  const renderData = () => {
    if(pagination.enable) return tableData.slice((currentPage -1) * sizePerPage, currentPage * sizePerPage)
    return tableData
  }
  
  return (
    <ThemeProvider theme={themes[theme]} >
      <Wrapper className="react_table" theme={themes[theme]}>
        <table id={id} className={className} >
          <TableHeader
            columns={columns}
            handleSorting={handleSorting}
          />
          <TableBody
            columns={columns}
            data={renderData()}
            size={sizePerPage}
          />
        </table>
        { pagination.enable && (
          <Pagination
            pagination={pagination}
            currentPage={currentPage}
            lastPage={totalPage}
            handlePageClick={handlePageClick}
          />
        )}
      </Wrapper>
    </ThemeProvider>
  )
}
const Wrapper = styled.div`
  color: ${props => props.theme.table.textColor};
  > table{
    background: ${props => props.theme.table.backgroundColor};
    border-top: ${props => props.theme.table.border};
    border-left: ${props => props.theme.table.border};
  }
`

export default Table
Table.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  id: PropTypes.string,
  classes: PropTypes.string,
  wrapperClasses: PropTypes.string,
  theme: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  pagination: PropTypes.shape({
    enable: PropTypes.bool.isRequired,
    sizePerPage: PropTypes.number,
    currentPage: PropTypes.number,
  })
}
Table.defaultProps = {
  theme: Const.THEME_LIGHT,
  pagination: {
    enable: false,
    currentPage: 1,
    sizePerPage: 10,
  },
};