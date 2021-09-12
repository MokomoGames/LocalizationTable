export class Sheet {
    sheet : GoogleAppsScript.Spreadsheet.Sheet
    headerValues : string[]

    constructor(sheet: GoogleAppsScript.Spreadsheet.Sheet) {
        this.sheet = sheet
        this.headerValues = this.getHeaderValues()
    }

    getMaxInputedRowNum(): number {
        // カラム名分を抜くので-1
        return this.sheet.getLastRow() - 1;
    }

    getRecordValues(key: string): string[] {
        const keyColumn = this.headerValues.findIndex(x => x == key) + 1
        return this.sheet.getRange(2,keyColumn,this.getMaxInputedRowNum(),1).getValues().flat().map(x => x as string)
    }

    getHeaderValues(): string[] {
        const lastColumn: number = this.sheet.getLastColumn()
        return this.sheet.getRange(1, 1, 1, lastColumn).getValues().flat().map(x => x as string)
    }
}