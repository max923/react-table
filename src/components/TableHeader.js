import React from "react";
import { withTheme } from 'emotion-theming'
import PropTypes from 'prop-types';

const HeaderCell = React.memo(({ text='', isSorting=false, sortIcon=false, sorting, onClick, fieldId, maxWidth, classes }) => {    
  return isSorting ? (
    <th className={classes} width={maxWidth} onClick={onClick(fieldId, sorting)}>
      {text} { sortIcon && sortIcon } 
    </th>
  ) : <th className={classes} width={maxWidth} >{text}</th>
})

function TableHeader(props) {
  const { columns, handleSorting } = props
  const renderHeader = () => columns.map(({ fieldId, header, sort={}, hidden, maxWidth, classes }) => {
    if(hidden) return
    return <HeaderCell 
      key={fieldId}
      fieldId={fieldId}
      text={header}
      isSorting={sort.enable}
      sorting={sort.rule}
      sortIcon={sort.icon}
      onClick={handleSorting}
      maxWidth={maxWidth}
      className={classes}
    />
  })
  return (
    <thead>
      <tr>{ renderHeader() }</tr>
    </thead>
  )
}

export default withTheme(TableHeader)

TableHeader.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    fieldId: PropTypes.string.isRequired,
    sort: PropTypes.shape({
      enable: PropTypes.bool.isRequired,
      rule: PropTypes.func.isRequired,
    })
  })).isRequired,
}
HeaderCell.propTypes = {
  fieldId: PropTypes.string.isRequired,
  text: PropTypes.string,
  isSorting: PropTypes.bool,
  onClick: PropTypes.func,
}
HeaderCell.defaultProps = {
  text: '',
  isSorting: false,
  maxWidth: '',
};
