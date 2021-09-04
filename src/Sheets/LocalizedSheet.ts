import { PlatformType } from "../Common/PlatformType";
import {LocalizeType} from "../Localize/LocalizeType";
import {Sheet} from "./Sheet";
import Language = GoogleAppsScript.Dfareporting.Schema.Language;

export class ExportLocalizedInfo
{
    private readonly iosFolderName : string
    private readonly androidFolderName : string
    private readonly language : LocalizeType

    constructor(iosFolderName : string, androidFolderName: string, language: LocalizeType){
        this.iosFolderName = iosFolderName;
        this.androidFolderName = androidFolderName
        this.language = language;
    }

    getFolderName(platform : PlatformType){
        switch(platform){
            case PlatformType.Android:
                return this.androidFolderName;
            case PlatformType.iOS:
                return this.iosFolderName;
        }
    }

    Language() : LocalizeType {return this.language}
}

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

export class KeyValueDataRecord {
    key : string
    value : string

    constructor(key:string, value:string) {
        this.key = key
        this.value = value
    }
}

const exportLocalizedInfo : ExportLocalizedInfo[] = [
    new ExportLocalizedInfo("ar-SA","ar",LocalizeType.Arabic),
    new ExportLocalizedInfo("de-DE","de-DE",LocalizeType.German),
    new ExportLocalizedInfo("en-AU","en-AU",LocalizeType.English),
    new ExportLocalizedInfo("en-CA","en-CA",LocalizeType.English),
    new ExportLocalizedInfo("en-GB","en-GB",LocalizeType.English),
    new ExportLocalizedInfo("en-US","en-US",LocalizeType.English),
    new ExportLocalizedInfo("es-ES","es-ES", LocalizeType.English),
    new ExportLocalizedInfo("","en-IN", LocalizeType.English),
    new ExportLocalizedInfo("","en-SG", LocalizeType.English),
    new ExportLocalizedInfo("","en-ZA", LocalizeType.English),
    new ExportLocalizedInfo("","es-419", LocalizeType.Spanish),
    new ExportLocalizedInfo("es-MX","", LocalizeType.Spanish),
    new ExportLocalizedInfo("ru","ru-RU",LocalizeType.Russian),
    new ExportLocalizedInfo("sv","sv-SE",LocalizeType.Swedish),
    new ExportLocalizedInfo("ko","ko-KR",LocalizeType.Korean),
    new ExportLocalizedInfo("nl-NL","nl-NL",LocalizeType.Dutch),
    new ExportLocalizedInfo("ja","ja-JP",LocalizeType.Japanese),
    new ExportLocalizedInfo("fr-CA","fr-CA",LocalizeType.French),
    new ExportLocalizedInfo("fr-FR","fr-FR",LocalizeType.French),
    new ExportLocalizedInfo("pt-BR","pt-BR",LocalizeType.Portuguese),
    new ExportLocalizedInfo("pt-PT","pt-PT",LocalizeType.Portuguese),
    new ExportLocalizedInfo("zh-Hans","zh-CN",LocalizeType.SimplifiedChineseCharacters),
    new ExportLocalizedInfo("zh-Hant","zh-TW",LocalizeType.TraditionalChineseCharacters),
]

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
        const keys = this.delegates.getRecordValues("key")
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
}