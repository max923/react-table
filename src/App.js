import React from "react";
import ReactDOM from "react-dom";
import Table from './index'

function Home() {
  const Icon  = () => <span>^</span>
  const columns = [{
    fieldId: 'firstName',
    header: 'FirstName',
  }, {
    fieldId: 'lastName',
    header: 'LastName',
  }, {
    fieldId: 'age',
    header: 'Age',
    sort: {
      enable: true,
      icon: <Icon />,
      rule: () => {
        return (a,b) => a - b 
      }
    },
  }]
  const data = [{
    firstName: 'Max',
    lastName: 'Fang',
    age: 20
  },{
    firstName: 'Max',
    lastName: 'Fang',
    age: 5
  }]
  return (
    <Table
      data={data}
      columns={columns}
      theme="dark"
      pagination={{
        enable: true
      }}
    />
  )
}
ReactDOM.render(<Home />, document.getElementById("root"));