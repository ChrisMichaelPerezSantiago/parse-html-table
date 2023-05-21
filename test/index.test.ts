import { describe, expect, it } from "vitest";
import { createTableParser, RowData, TableParserFactory } from "../dist";

interface PersonData extends RowData {
  name: string;
  age: string;
  country: string;
}

// Create a specific table parser factory
export const personTableParserFactory: TableParserFactory<PersonData> =
  createTableParser<PersonData>();

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

const html3 = "";

describe("Table Parser", () => {
  it("should parse the table correctly", () => {
    const tableParser = personTableParserFactory(html1);
    const tableData = tableParser();

    const expectedHeaders = ["name", "age", "country"];
    expect(tableData.headers).toEqual(expectedHeaders);

    const expectedRows = [
      { name: "John Doe", age: "30", country: "USA" },
      { name: "Jane Smith", age: "25", country: "Canada" },
    ];

    expect(tableData.rows).toEqual(expectedRows);
  });

  it("should parse the name of the columns if they have spaces as camelcase correctly", () => {
    const tableParser = personTableParserFactory(html2);
    const tableData = tableParser();

    const expectedHeaders = ["fullName", "fullAge", "fullCountry"];
    expect(tableData.headers).toEqual(expectedHeaders);

    const expectedRows = [
      { fullName: "John Doe", fullAge: "30", fullCountry: "USA" },
      { fullName: "Jane Smith", fullAge: "25", fullCountry: "Canada" },
    ];

    expect(tableData.rows).toEqual(expectedRows);
  });

  it("should parse the name of the columns if they have spaces as camelcase correctly", () => {
    const tableParser = personTableParserFactory(html3);
    const tableData = tableParser();

    expect(tableData.headers).empty;
    expect(tableData.rows).empty;
  });
});
