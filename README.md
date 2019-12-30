# React table

### summary
It's a simple component to make you generate a table.

**Component Props**
props				|type			|description  
:----				|:---			|:---	
className		|string		| Set own class name
id			    |string		| Set own id
theme		    |string \| object 	| Set the [theme](#theme) name with
pagination	|object		| A [pagination](#pagination) bar include first/last/previous/next functions
data	      |!array		| Data is required to create your table
columns     |!object  | Showing the [colums](#colums) of data

**Base Example**
It's a simple example to create your table for quick

```javascript
  const columns = [{
    fieldId: 'firstName',
    header: 'FirstName', 
  }, {
    fieldId: 'lastName',
    header: 'LastName',
  }, {
    fieldId: 'age',
    header: 'Age',
  }]

  <Table
    data={data}
    columns={columns}
  />
```
## `theme`

Theme provide two kind of colors, one is `light`, another is `dark`, you can set the theme string into the props, default is light.

```javascript
  const columns = [{
    fieldId: 'firstName',
    header: 'FirstName', 
  }, {
    fieldId: 'lastName',
    header: 'LastName',
  }, {
    fieldId: 'age',
    header: 'Age',
  }]

  <Table
    data={data}
    columns={columns}
    theme="dark"
  />
```

## `pagination`
Takes an object config to create of pagination bar.
 - **`!enable`**: enable is required, turn it with true if your want to using pagination, 
 - **`sizePerPage`**: A number for how many row data you want to show in per page.
 - **`customComponent`**: Allows you to have customize pagination component if you don’t like it. Your component will recieve the `text` 、`value` and `isCurrent` from props.
 - **`currentPage`**: This is useful to handle current status.

```javascript
  const paginationConfig = {
    enable: true,
    sizePerPage: 10,
    currentPage: 1,
    customComponent: <PageSquare/>
  }

  <Table
    data={data}
    columns={columns}
    pagination={paginationConfig}
  />
```
## `colums`
Passes an array and render colums of data in the table.
- **`!fieldId`**: The ID is required and also unique.
- **`header`**: A string content which is showing in the table header.
- **`classes`**: Edit table header calss name.
- **`maxWidth`**: Edit table header width.
- **`hidden`**: Hidden colum, default is `false`
```javascript
  const columns = [{
    fieldId: 'firstName',
    header: 'FirstName', 
    classes: 'first_name',
    maxWidth: '100'
    hidden: true,
  }]; 
```
### sort
- **`!enable`**: enable is required.
- **`!rule`**:  rule is required, accepts a funciton to handle table header click which recieves a fieldId from props, and return the function of sorting [rule]('https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) .
- **`icon`**: Customize the sorting icon by React component.
```javascript
  const columns = [{
    // ...
    sort: {
      enable: true,
      rule: (fieldId) => (a, b) => a - b,
      icon: <Icon/>
    },
  }]; 
```
### table cell
- **`renderCell`**: Passes a funciton and return your custom content with `fieldId`、`rowIndex` and `text` from props.
```javascript 
  const columns = [{
    // ...
    renderCell: ({text, rowIndex, fieldId}) => <button>Delete</button>
  }]; 
```

