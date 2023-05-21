import cheerio from "cheerio";

interface TableData<T> {
  headers: string[];
  rows: T[];
}

export interface RowData {
  [header: string]: string;
}

export type TableParserFactory<T extends RowData> = (
  html: string
) => TableParser<T>;

type TableParser<T extends RowData> = () => TableData<T>;

export function createTableParser<T extends RowData>(): TableParserFactory<T> {
  return (html: string) => {
    const $ = cheerio.load(html);
    let headers: string[] = [];

    const parseHeaders = () => {
      headers = $("th")
        .map((_, el) => {
          const headerText = $(el).text().trim();
          const words = headerText.split(/\s+/);
          const camelCaseText = words
            .map((word, index) => {
              if (index === 0) {
                return word.toLowerCase();
              } else {
                return (
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                );
              }
            })
            .join("");
          return camelCaseText;
        })
        .get();
    };

    const parseRows = (): T[] => {
      return $("tbody tr")
        .map((_, row) => {
          const rowData: RowData = {};
          const $cells = $(row).find("td");
          let isEmptyRow = true;
          $cells.each((index, cell) => {
            const cellText = $(cell).text().trim();
            if (cellText !== "") {
              rowData[headers[index]] = cellText;
              isEmptyRow = false;
            }
          });
          return isEmptyRow ? null : (rowData as T);
        })
        .get()
        .filter((rowData) => rowData !== null);
    };

    const parseTable: TableParser<T> = () => {
      parseHeaders();
      const rows = parseRows();
      return {
        headers,
        rows,
      };
    };

    return parseTable;
  };
}
