import {LocalizeType} from "./LocalizeType";
import {DriveService} from "../GoogleDrive/DriveService";
import {LocalizedDataRecord} from "../Sheets/LocalizedSheet";

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
    exportDirectoryTable: { [id in LocalizeType]: string } = {
        [LocalizeType.Arabic]:"ar",
        [LocalizeType.German]:"de-DE",
        [LocalizeType.English]:"en-AU",
        [LocalizeType.English]:"en-CA",
        [LocalizeType.English]:"en-GB",
        [LocalizeType.English]:"en-US",
        [LocalizeType.English]:"en-ES",
        [LocalizeType.English]:"en-IN",
        [LocalizeType.English]:"en-SG",
        [LocalizeType.English]:"en-ZA",
        [LocalizeType.Spanish]:"es-419",
        [LocalizeType.Russian]:"ru-RU",
        [LocalizeType.Swedish]:"sv-SE",
        [LocalizeType.Korean]:"ko-KR",
        [LocalizeType.Dutch]:"nl-NL",
        [LocalizeType.Japanese]:"ja-JP",
        [LocalizeType.French]:"fr-CA",
        [LocalizeType.French]:"fr-FR",
        [LocalizeType.Portuguese]:"pt-BR",
        [LocalizeType.Portuguese]:"pt-PT",
        [LocalizeType.SimplifiedChineseCharacters]:"zh-CN",
        [LocalizeType.TraditionalChineseCharacters]:"zh-TW",
    };
    delegates : AndroidStoreLocalizeConfigExporterDelegates
    outputDistFolderId : string

    constructor(delegates : AndroidStoreLocalizeConfigExporterDelegates, outputDistFolderId:string){
        this.delegates = delegates
        this.outputDistFolderId = outputDistFolderId
    }

    output(){
        const table = this.delegates.getStoreLocalizedRecordList()
        Object.entries(this.exportDirectoryTable).forEach(([language, folderName]) => {
            const languageFolderId = this.delegates.createFolder(this.outputDistFolderId, folderName)
            table.filter(x => x.language == language).forEach(record => {
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