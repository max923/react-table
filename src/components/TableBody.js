import React from "react";
import PropTypes from 'prop-types';

const BodyCell = (({ text='', renderCell=false, rowIndex, fieldId, classes  }) => {  
  return renderCell ? <td className={classes}>{renderCell({ text , rowIndex, fieldId }) }</td> : <td className={classes}>{text}</td>
})

function TableBody(props) {
  const { data, columns } = props  
  const renderRow = () => data.map((item, rowIndex) => (
    <tr key={`${JSON.stringify(item)}_${rowIndex}`}>
      { columns.map(({ fieldId, hidden=false, renderCell, classes }) =>{
        if(hidden) return
        return (
          <BodyCell
            rowIndex={rowIndex}
            fieldId={fieldId}
            key={`${item[fieldId]}`}
            text={item[fieldId]}
            renderCell={renderCell}
            className={classes}
          />
        )
      })}
    </tr>
  ))
  return (
    <tbody>
      { renderRow() }
    </tbody>
  )
}

export default TableBody

BodyCell.propTypes = {
  fieldId: PropTypes.string.isRequired,
}