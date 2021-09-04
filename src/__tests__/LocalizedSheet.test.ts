import {LocalizedSheet, LocalizedSheetDelegates} from "../Sheets/LocalizedSheet";
import {LocalizeType} from "../Localize/LocalizeType";

test("fetchMetadataList", ()=>{
    const dummyKeyList =
        [
            "test1Key",
            "test2Key",
            "test3Key",
        ]
    const dummyOriginList =
        [
            "test1Origin",
            "test2Origin",
            "test3Origin",
        ]
    const dummyJapaneseValues =
        [
            "test1ValueJapanese",
            "test2ValueJapanese",
            "test3ValueJapanese",
        ]
    const dummyEnglishValues =
        [
            "test1ValueEnglish",
            "test2ValueEnglish",
            "test3ValueEnglish",
        ]
    const localizedSheet = new LocalizedSheet(
        new LocalizedSheetDelegates(
            (key : string) => {
                switch (key){
                    case "key":
                        return dummyKeyList
                    case "origin":
                        return dummyOriginList
                    case LocalizeType.Japanese:
                        return dummyJapaneseValues
                    case LocalizeType.English:
                        return dummyEnglishValues
                }
                return []
            }
        )
    )
    const table = localizedSheet.fetchLocalizedDataTable([
        LocalizeType.Japanese,
        LocalizeType.English
    ])
    const japaneseRecord = table[0]
    expect(japaneseRecord.language).toBe(LocalizeType.Japanese)
    expect(japaneseRecord.keyName).toBe(dummyKeyList[0])
    expect(japaneseRecord.originWord).toBe(dummyOriginList[0])
    expect(japaneseRecord.translatedWord).toBe(dummyJapaneseValues[0])
})