import {KeyValueSheet, KeyValueSheetDelegates} from "../Sheets/KeyValueSheet";

test("fetchKeyValueDataRecordList", ()=>{
    const keyValueSheet = new KeyValueSheet(
        new KeyValueSheetDelegates(
            (key)=>{
                switch (key) {
                    case "key":
                        return ["dummyKey1", "dummyKey2"]
                    case "value":
                        return ["dummyValue1", "dummyValue2"]
                }
                return []
            }
        )
    )

    const table = keyValueSheet.fetchKeyValueDataTable()
    expect(table.length).toBe(2)
    expect(table[0].key).toBe("dummyKey1")
    expect(table[1].key).toBe("dummyKey2")
    expect(table[0].value).toBe("dummyValue1")
    expect(table[1].value).toBe("dummyValue2")
})