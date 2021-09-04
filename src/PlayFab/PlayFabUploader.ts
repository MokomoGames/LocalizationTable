import {PlayFabAPI} from "./PlayfabAPI";
import {config} from "../Main";
import {LocalizedDataRecord} from "../Sheets/LocalizedSheet";
import {Localize, LocalizeType} from "../Localize/LocalizeType";

export class PlayFabUploader{
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
            .API(
                config.playfab_secret_key,
                config.playfab_project_id
            )
            .setTitleData(this.convertStringTableForPlayFabStringTable(table, localizeTypes))
    }
}