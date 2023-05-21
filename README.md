# ✓ parse-html-table

> A lightweight library for parsing HTML tables into structured data using TypeScript.

## 📦 Installation

### npm

```shell
npm install parse-html-table
```

### yarn

```shell
yarn add parse-html-table
```

# 📚 Documentation

## Usage

```typescript
import {
  createTableParser,
  RowData,
  TableParserFactory,
} from "parse-html-table";

// Define the specific row data interface
interface PersonData extends RowData {
  name: string;
  age: string;
  country: string;
}

// Create a specific table parser factory
export const personTableParserFactory: TableParserFactory<PersonData> =
  createTableParser<PersonData>();

// Example HTML table 1
const html1 = `
  <table>
    <thead>
      <tr>
        <th>name</th>
        <th>age</th>
        <th>country</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>John Doe</td>
        <td>30</td>
        <td>USA</td>
      </tr>
      <tr>
        <td>Jane Smith</td>
        <td>25</td>
        <td>Canada</td>
      </tr>
    </tbody>
  </table>
`;

// Example HTML table 2
// Parse the name of the columns if they have spaces as cameoCase correctly
const html2 = `
  <table>
    <thead>
      <tr>
        <th>full name</th>
        <th>full age</th>
        <th>full country</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>John Doe</td>
        <td>30</td>
        <td>USA</td>
      </tr>
      <tr>
        <td>Jane Smith</td>
        <td>25</td>
        <td>Canada</td>
      </tr>
    </tbody>
  </table>
`;

// Example HTML table 3 (empty table)
const html3 = "";

// Parse table 1
const tableParser1 = personTableParserFactory(html1);
const tableData1 = tableParser1();
console.log("Table 1 Data:", tableData1);

// Parse table 2
const tableParser2 = personTableParserFactory(html2);
const tableData2 = tableParser2();
console.log("Table 2 Data:", tableData2);

// Parse table 3
const tableParser3 = personTableParserFactory(html3);
const tableData3 = tableParser3();
console.log("Table 3 Data:", tableData3);
```

```typescript
// table 1
{
  headers: [ 'name', 'age', 'country' ],
  rows: [
    { name: 'John Doe', age: '30', country: 'USA' },
    { name: 'Jane Smith', age: '25', country: 'Canada' }
  ]
}

// table 2
{
  headers: [ 'fullName', 'fullAge', 'fullCountry' ],
  rows: [
    { fullName: 'John Doe', fullAge: '30', fullCountry: 'USA' },
    { fullName: 'Jane Smith', fullAge: '25', fullCountry: 'Canada' }
  ]
}

// table 3
{ 
  headers: [], 
  rows: [] 
}
```

## **:handshake: Contributing**

- Fork it!
- Create your feature branch: `git checkout -b my-new-feature`
- Commit your changes: `git commit -am 'Add some feature'`
- Push to the branch: `git push origin my-new-feature`
- Submit a pull request

---

### **:busts_in_silhouette: Credits**

- [Chris Michael](https://github.com/ChrisMichaelPerezSantiago) (Project Leader, and Developer)

---

### **:anger: Troubleshootings**

This is just a personal project created for study / demonstration purpose and to simplify my working life, it may or may
not be a good fit for your project(s).

---

### **:heart: Show your support**

Please :star: this repository if you like it or this project helped you!\
Feel free to open issues or submit pull-requests to help me improving my work.

---

### **:robot: Author**

_*Chris M. Perez*_

> You can follow me on
> [github](https://github.com/ChrisMichaelPerezSantiago)&nbsp;&middot;&nbsp;[twitter](https://twitter.com/Chris5855M)

---

Copyright ©2023 [parse-html-table](https://github.com/ChrisMichaelPerezSantiago/parse-html-table).
