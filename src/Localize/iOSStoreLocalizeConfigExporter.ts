import {LocalizeType} from "./LocalizeType";
import {LocalizedDataRecord} from "../Sheets/LocalizedSheet";
import {KeyValueDataRecord} from "../Sheets/KeyValueSheet";

export class iOSStoreLocalizeConfigExporterDelegates
{
    createFolder : (id:string, folderName:string) => string
    createFile : (id:string, fileName:string, fileContent:string) => void
    getAppStoreLocalizedRecordList : () => LocalizedDataRecord[]
    getAppStoreNonLocalizedRecordList : () => KeyValueDataRecord[]
    getAppStoreReviewRecordList : () => KeyValueDataRecord[]

    constructor(
        createFolder : (id:string, folderName:string) => string,
        createFile : (id:string, fileName:string, fileContent:string) => void,
        getAppStoreLocalizedRecordList : () => LocalizedDataRecord[],
        getAppStoreNonLocalizedRecordList : () => KeyValueDataRecord[],
        getAppStoreReviewRecordList : () => KeyValueDataRecord[]
    ) {
        this.createFolder = createFolder
        this.createFile = createFile
        this.getAppStoreLocalizedRecordList = getAppStoreLocalizedRecordList
        this.getAppStoreNonLocalizedRecordList = getAppStoreNonLocalizedRecordList
        this.getAppStoreReviewRecordList = getAppStoreReviewRecordList
    }
}

export class IOSStoreLocalizeConfigExporter
{
    expectedTableNames: { [id in LocalizeType]: string } = {
        [LocalizeType.Arabic]:"ar-SA",
        [LocalizeType.German]:"de-DE",
        [LocalizeType.English]:"en-AU",
        [LocalizeType.English]:"en-CA",
        [LocalizeType.English]:"en-GB",
        [LocalizeType.English]:"en-US",
        [LocalizeType.English]:"en-ES",
        [LocalizeType.Spanish]:"es-MX",
        [LocalizeType.Russian]:"ru",
        [LocalizeType.Swedish]:"sv",
        [LocalizeType.Korean]:"ko",
        [LocalizeType.Dutch]:"nl-NL",
        [LocalizeType.Japanese]:"ja",
        [LocalizeType.French]:"fr-CA",
        [LocalizeType.French]:"fr-FR",
        [LocalizeType.Portuguese]:"pt-BR",
        [LocalizeType.Portuguese]:"pt-PT",
        [LocalizeType.SimplifiedChineseCharacters]:"zn-Hans",
        [LocalizeType.TraditionalChineseCharacters]:"zn-Hant",
    };
    delegates : iOSStoreLocalizeConfigExporterDelegates
    outputDistFolderId : string

    constructor(delegates : iOSStoreLocalizeConfigExporterDelegates, outputDistFolderId:string){
        this.delegates = delegates
        this.outputDistFolderId = outputDistFolderId
    }

    output(){
        // ストア情報
        const table = this.delegates.getAppStoreLocalizedRecordList()
        table.forEach(record => {
            const localizedRootFolderId = this.delegates.createFolder(this.outputDistFolderId, record.language)
            this.delegates.createFile(localizedRootFolderId,
                `${record.keyName}.txt`,
                record.translatedWord)
        })

        const storeTable = this.delegates.getAppStoreNonLocalizedRecordList()
        storeTable.forEach(record => {
            this.delegates.createFile(this.outputDistFolderId, `${record.key}.txt`, record.value)
        })

        // ストアレビュー情報
        const storeReviewTable = this.delegates.getAppStoreReviewRecordList()
        storeReviewTable.forEach(record => {
            this.delegates.createFile(this.outputDistFolderId, `${record.key}.txt`, record.value)
        })
    }
}