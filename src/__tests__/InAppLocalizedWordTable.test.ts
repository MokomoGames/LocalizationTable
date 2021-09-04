import {Localize, LocalizeType} from "../Localize/LocalizeType";
import {InAppLocalizedWordTable} from "../Localize/InAppLocalizedWordTable";
import {LocalizedSheet, LocalizedSheetDelegates} from "../Sheets/LocalizedSheet";

test("getCharactersAll", ()=>{
    const dummyCharacters = `0123456789abcdfg`
    const wordTable = new InAppLocalizedWordTable(
        [
            new LocalizedSheet(
                new LocalizedSheetDelegates(
                    ()=>{
                        return ["abc"]
                    }
                )
            ),
            new LocalizedSheet(
                new LocalizedSheetDelegates(
                    ()=>{
                        return ["df"]
                    }
                )
            ),
            new LocalizedSheet(
                new LocalizedSheetDelegates(
                    ()=>{
                        return ["abg"]
                    }
                )
            )
        ]
    )
    const characters = wordTable.getUniqueCharactersAll(Localize.getAllLanguage())
    expect(characters).toBe(dummyCharacters)
})