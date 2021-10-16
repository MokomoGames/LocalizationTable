import {PlayFabUploader} from "../PlayFab/PlayFabUploader";
import {LocalizeType} from "../Localize/LocalizeType";
import {LocalizedDataRecord} from "../Sheets/LocalizedSheet";

test("convertStringTableForPlayFabStringTable",()=>{
    const records : LocalizedDataRecord[] = [
        new LocalizedDataRecord(
            LocalizeType.English,
            "dummyKey1",
            "dummyOrigin1",
            "dummyTranslatedWord1"
        ),
        new LocalizedDataRecord(
            LocalizeType.English,
            "dummyKey2",
            "dummyOrigin2",
            "dummyTranslatedWord2"
        ),
        new LocalizedDataRecord(
            LocalizeType.Japanese,
            "dummyKey3",
            "dummyOrigin3",
            "dummyTranslatedWord3"
        )
    ]

    const playfabUploader = new PlayFabUploader("","")
    const keyValuesEnglish = playfabUploader.convertStringTableForPlayFabStringTable(records, [LocalizeType.English])
    expect(keyValuesEnglish[0].Key).toBe("StringTable_English")
    expect(keyValuesEnglish[0].Value).toBe(JSON.stringify({
        _keys: ["dummyKey1","dummyKey2"],
        _values: ["dummyTranslatedWord1","dummyTranslatedWord2"]
    }))

    const keyValuesJapanese = playfabUploader.convertStringTableForPlayFabStringTable(records, [LocalizeType.Japanese])
    expect(keyValuesJapanese[0].Key).toBe("StringTable_Japanese")
    expect(keyValuesJapanese[0].Value).toBe(JSON.stringify({
        _keys: ["dummyKey3"],
        _values: ["dummyTranslatedWord3"]
    }))

    const keyValuesAll = playfabUploader.convertStringTableForPlayFabStringTable(records,
        [LocalizeType.Japanese,
            LocalizeType.English]
    )
    expect(keyValuesAll[0].Key).toBe("StringTable_Japanese")
    expect(keyValuesAll[0].Value).toBe(JSON.stringify({
        _keys: ["dummyKey3"],
        _values: ["dummyTranslatedWord3"]
    }))
    expect(keyValuesAll[1].Key).toBe("StringTable_English")
    expect(keyValuesAll[1].Value).toBe(JSON.stringify({
        _keys: ["dummyKey1","dummyKey2"],
        _values: ["dummyTranslatedWord1","dummyTranslatedWord2"]
    }))
})