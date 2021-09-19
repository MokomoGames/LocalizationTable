import {LocalizeType} from "../Localize/LocalizeType";

export class LocalizedDataRecord
{
    language : LocalizeType
    keyName : string
    originWord : string
    translatedWord : string

    constructor(language:LocalizeType,keyName:string, originWord:string, translatedWord:string) {
        this.language = language
        this.keyName = keyName
        this.originWord = originWord
        this.translatedWord = translatedWord
    }
}

export class LocalizedSheetDelegates{
    getRecordValues : (key:string) => string[]

    constructor(
        getRecordValues : (key:string) => string[]
    ) {
        this.getRecordValues = getRecordValues
    }
}

export class LocalizedSheet {
    private readonly delegates : LocalizedSheetDelegates
    constructor(delegates:LocalizedSheetDelegates) {
        this.delegates = delegates
    }

    fetchLocalizedDataTable(localizeTypes : LocalizeType[]) : LocalizedDataRecord[] {
        const table : LocalizedDataRecord[] = []
        const keys = this.fetchKeys()
        const originWordList = this.delegates.getRecordValues("origin")
        for (const localizeType of localizeTypes) {
            const translatedWordList = this.delegates.getRecordValues(localizeType)
            for (let i = 0; i < keys.length; i++){
                table.push(
                    new LocalizedDataRecord(
                        localizeType,
                        keys[i],
                        originWordList[i],
                        translatedWordList[i])
                )
            }
        }
        return table
    }

    fetchKeys(){
        return this.delegates.getRecordValues("key")
    }
}