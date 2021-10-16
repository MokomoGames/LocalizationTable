import {LocalizeType} from "./LocalizeType";
import {LocalizedDataRecord} from "../Sheets/LocalizedSheet";
import {KeyValueDataRecord} from "../Sheets/KeyValueSheet";
import {ExportConfig} from "./ExportConfig";

export class IOSStoreLocalizeConfigExporterDelegates
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
    exportDirectoryTable: ExportConfig[] = [
        new ExportConfig(LocalizeType.Arabic, "ar-SA"),
        new ExportConfig(LocalizeType.German, "de-DE"),
        new ExportConfig(LocalizeType.English, "en-AU"),
        new ExportConfig(LocalizeType.English, "en-CA"),
        new ExportConfig(LocalizeType.English, "en-GB"),
        new ExportConfig(LocalizeType.English, "en-US"),
        new ExportConfig(LocalizeType.English, "es-ES"),
        new ExportConfig(LocalizeType.Spanish, "es-MX"),
        new ExportConfig(LocalizeType.Russian, "ru"),
        new ExportConfig(LocalizeType.Swedish,"sv"),
        new ExportConfig(LocalizeType.Korean,"ko"),
        new ExportConfig(LocalizeType.Dutch,"nl-NL"),
        new ExportConfig(LocalizeType.Japanese,"ja"),
        new ExportConfig(LocalizeType.French,"fr-CA"),
        new ExportConfig(LocalizeType.French,"fr-FR"),
        new ExportConfig(LocalizeType.Portuguese, "pt-PT"),
        new ExportConfig(LocalizeType.Portuguese, "pt-BR"),
        new ExportConfig(LocalizeType.SimplifiedChineseCharacters, "zh-Hans"),
        new ExportConfig(LocalizeType.TraditionalChineseCharacters, "zh-Hant"),
    ];
    delegates : IOSStoreLocalizeConfigExporterDelegates
    outputDistFolderId : string

    constructor(delegates : IOSStoreLocalizeConfigExporterDelegates, outputDistFolderId:string){
        this.delegates = delegates
        this.outputDistFolderId = outputDistFolderId
    }

    output(){
        // ストア情報
        const table = this.delegates.getAppStoreLocalizedRecordList()
        this.exportDirectoryTable.forEach(x => {
            const languageFolderId = this.delegates.createFolder(this.outputDistFolderId, x.directoryName)
            table.filter(x => x.language == x.language).forEach(record => {
                this.delegates.createFile(languageFolderId,
                    `${record.keyName}.txt`,
                    record.translatedWord)
            })
        })

        const storeTable = this.delegates.getAppStoreNonLocalizedRecordList()
        storeTable.forEach(record => {
            this.delegates.createFile(this.outputDistFolderId, `${record.key}.txt`, record.value)
        })

        // ストアレビュー情報
        const storeReviewTable = this.delegates.getAppStoreReviewRecordList()
        const reviewInfomationFolderId = this.delegates.createFolder(this.outputDistFolderId, "review_information")
        storeReviewTable.forEach(record => {
            this.delegates.createFile(reviewInfomationFolderId, `${record.key}.txt`, record.value)
        })
    }
}