import {PlayFabAPI} from "./PlayfabAPI";
import {LocalizedDataRecord} from "../Sheets/LocalizedSheet";
import {Localize, LocalizeType} from "../Localize/LocalizeType";

export class PlayFabUploader{
    secretKey : string
    projectId : string

    constructor(secretKey:string, projectId:string) {
        this.secretKey = secretKey
        this.projectId = projectId
    }

    makePlayFabStringName(localizeType: LocalizeType){
        return `StringTable_${localizeType}`
    }

    convertStringTableForPlayFabStringTable(table: LocalizedDataRecord[], localizeTypes: LocalizeType[]){
        const contents : PlayFabAPI.KeyValue[] = []
        localizeTypes.forEach(localizeType => {
            const languageRecords = table.filter(record => record.language == localizeType)
            const data = {
                _keys: languageRecords.map(x => x.keyName),
                _values: languageRecords.map(x => x.translatedWord)
            }
            contents.push(
                new PlayFabAPI.KeyValue(
                    this.makePlayFabStringName(localizeType),
                    JSON.stringify(data)
                ))
        })
        return contents
    }
    uploadStringTable(table: LocalizedDataRecord[], localizeTypes: LocalizeType[]){
        new PlayFabAPI
            .API(this.secretKey, this.projectId)
            .setTitleData(this.convertStringTableForPlayFabStringTable(table, localizeTypes))
    }
}