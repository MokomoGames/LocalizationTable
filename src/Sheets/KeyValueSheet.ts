export class KeyValueDataRecord {
    key : string
    value : string

    constructor(key:string, value:string) {
        this.key = key
        this.value = value
    }
}

export class KeyValueSheetDelegates {
    getRecordValues : (key:string) => string[]

    constructor(
        getRecordValues : (key:string) => string[]
    ) {
        this.getRecordValues = getRecordValues
    }
}

export class KeyValueSheet {
    delegates: KeyValueSheetDelegates

    constructor(delegates: KeyValueSheetDelegates) {
        this.delegates = delegates
    }

    fetchKeyValueDataTable() : KeyValueDataRecord[]{
        const keys = this.delegates.getRecordValues("key")
        const values = this.delegates.getRecordValues("value")
        const recordList : KeyValueDataRecord[] = []
        for (let i = 0; i < keys.length; i++) {
            recordList.push(new KeyValueDataRecord(keys[i], values[i]))
        }
        return recordList
    }
}