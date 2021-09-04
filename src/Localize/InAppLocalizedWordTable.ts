import {Localize, LocalizeType} from "./LocalizeType";
import {LocalizedDataRecord, LocalizedSheet} from "../Sheets/LocalizedSheet";

export class InAppLocalizedWordTable {
    private readonly localizedTableList : LocalizedSheet[]

    constructor(localizedTableList : LocalizedSheet[]){
        this.localizedTableList = localizedTableList
    }

    getTableList(){
        return this.localizedTableList
    }

    getRecordsByLanguage(languages : LocalizeType[]) : LocalizedDataRecord[] {
        let records : LocalizedDataRecord[] = []
        this.localizedTableList.forEach(sheet => {
            records = records.concat(sheet.fetchLocalizedDataTable(languages))
        })
        return records
    }

    getUniqueCharactersAll(languages : LocalizeType[]) : string{
        let characters = "0123456789"
        this.localizedTableList.forEach(table => {
            table.fetchLocalizedDataTable(languages).forEach(record => {
                characters += record.translatedWord
            })
        })

        const set = new Set<string>()
        for(let i = 0; i < characters.length; i++){
            set.add(characters[i])
        }

        let uniqueCharacters = ""
        set.forEach(x => {
            uniqueCharacters += x
        })

        return uniqueCharacters.replace(/\s+/g, "")
    }
}