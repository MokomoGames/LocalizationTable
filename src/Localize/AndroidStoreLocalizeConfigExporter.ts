import {LocalizeType} from "./LocalizeType";
import {DriveService} from "../GoogleDrive/DriveService";
import {LocalizedDataRecord} from "../Sheets/LocalizedSheet";
import {ExportConfig} from "./ExportConfig";

export class AndroidStoreLocalizeConfigExporterDelegates
{
    createFolder : (id:string, folderName:string) => string
    createFile : (id:string, fileName:string, fileContent:string) => void
    getStoreLocalizedRecordList : () => LocalizedDataRecord[]

    constructor(
        createFolder : (id:string, folderName:string) => string,
        createFile : (id:string, fileName:string, fileContent:string) => void,
        getStoreLocalizedRecordList : () => LocalizedDataRecord[]
    ) {
        this.createFolder = createFolder
        this.createFile = createFile
        this.getStoreLocalizedRecordList = getStoreLocalizedRecordList
    }
}

export class AndroidStoreLocalizeConfigExporter
{
    exportDirectoryTable: ExportConfig[] = [
        new ExportConfig(LocalizeType.Arabic,"ar"),
        new ExportConfig(LocalizeType.German, "de-DE"),
        new ExportConfig(LocalizeType.English, "en-AU"),
        new ExportConfig(LocalizeType.English, "en-CA"),
        new ExportConfig(LocalizeType.English, "en-GB"),
        new ExportConfig(LocalizeType.English, "en-US"),
        new ExportConfig(LocalizeType.English, "en-ES"),
        new ExportConfig(LocalizeType.English, "en-IN"),
        new ExportConfig(LocalizeType.English, "en-SG"),
        new ExportConfig(LocalizeType.English, "en-ZA"),
        new ExportConfig(LocalizeType.Spanish, "es-419"),
        new ExportConfig(LocalizeType.Russian, "ru-RU"),
        new ExportConfig(LocalizeType.Swedish, "sv-SE"),
        new ExportConfig(LocalizeType.Korean, "ko-KR"),
        new ExportConfig(LocalizeType.Dutch, "nl-NL"),
        new ExportConfig(LocalizeType.Japanese, "ja-JP"),
        new ExportConfig(LocalizeType.French, "fr-CA"),
        new ExportConfig(LocalizeType.French, "fr-FR"),
        new ExportConfig(LocalizeType.Portuguese, "pt-BR"),
        new ExportConfig(LocalizeType.Portuguese, "pt-PT"),
        new ExportConfig(LocalizeType.SimplifiedChineseCharacters, "zh-CN"),
        new ExportConfig(LocalizeType.TraditionalChineseCharacters, "zh-TW"),
    ];

    delegates : AndroidStoreLocalizeConfigExporterDelegates
    outputDistFolderId : string

    constructor(delegates : AndroidStoreLocalizeConfigExporterDelegates, outputDistFolderId:string){
        this.delegates = delegates
        this.outputDistFolderId = outputDistFolderId
    }

    output(){
        const table = this.delegates.getStoreLocalizedRecordList()
        this.exportDirectoryTable.forEach(x => {
            const languageFolderId = this.delegates.createFolder(this.outputDistFolderId, x.directoryName)
            table.filter(x => x.language == x.language).forEach(record => {
                if(record.keyName == "changelogs"){
                    const changeLogFolder = DriveService.createFolder(languageFolderId, "changelogs")
                    DriveService.createFile(changeLogFolder.getId(), "default.txt", record.translatedWord)
                    return
                }

                DriveService.createFile(
                    languageFolderId,
                    `${record.keyName}.txt`,
                    record.translatedWord)
            })
        })

        table.forEach(record => {
            const localizedRootFolderId = this.delegates.createFolder(this.outputDistFolderId, record.language)
        })
    }
}