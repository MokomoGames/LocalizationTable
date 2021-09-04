import {DriveService} from "./GoogleDrive/DriveService";
import {Config} from "./Config";
import {SheetsRepository} from "./Sheets/SheetsRepository"
import {Localize, LocalizeType} from "./Localize/LocalizeType";
import {
    AndroidStoreLocalizeConfigExporter,
    AndroidStoreLocalizeConfigExporterDelegates
} from "./Localize/AndroidStoreLocalizeConfigExporter";

import {
    IOSStoreLocalizeConfigExporter,
    iOSStoreLocalizeConfigExporterDelegates
} from "./Localize/iOSStoreLocalizeConfigExporter";
import {PlayFabUploader} from "./PlayFab/PlayFabUploader";
import {LocalizedDataRecord} from "./Sheets/LocalizedSheet";

export let config: Config;
config = new Config();

function updateStringTableAll() {
    const repository = new SheetsRepository(config.spreadsheet_id)
    new PlayFabUploader().uploadStringTable(
        repository.getLocalizedWordTableList().getRecordsByLanguage(Localize.getAllLanguage()),
        Localize.getAllLanguage())
}

function outputUnityResources() {
    class UnityOutputConfig{
        fileName : string
        languageList : LocalizeType[]

        constructor(fileName:string, languageList:LocalizeType[]) {
            this.fileName = fileName
            this.languageList = languageList
        }
    }

    const outputConfigs = [
        new UnityOutputConfig("CharacterList_SC.txt", [LocalizeType.SimplifiedChineseCharacters]),
        new UnityOutputConfig("CharacterList_TC.txt", [LocalizeType.TraditionalChineseCharacters]),
        new UnityOutputConfig("CharacterList_AR.txt", [LocalizeType.Arabic]),
        new UnityOutputConfig("CharacterList_KR.txt", [LocalizeType.Korean]),
        new UnityOutputConfig("CharacterList_JP_EN_RU.txt",
            [
                LocalizeType.Japanese,
                LocalizeType.English,
                LocalizeType.Russian
            ]),
        new UnityOutputConfig("CharacterList_Umlaut.txt",
            [
                LocalizeType.Dutch,
                LocalizeType.French,
                LocalizeType.German,
                LocalizeType.Swedish,
                LocalizeType.Portuguese,
                LocalizeType.Spanish
            ])
    ]
    const sheetsRepository = new SheetsRepository(config.spreadsheet_id)
    const folder = DriveService.createFolder(config.drive_project_folder_id, "unity");
    for (const outputConfig of outputConfigs) {
        DriveService.createFile(
            folder.getId(),
            outputConfig.fileName,
            sheetsRepository
                .getLocalizedWordTableList()
                .getUniqueCharactersAll(outputConfig.languageList)
        )
    }
}

function outputIOSResources() {
    const rootFolder = DriveService.createFolder(config.drive_project_folder_id, "ios");
    const metadataFolder = DriveService.createFolder(rootFolder.getId(), "metadata");
    const sheetsRepository = new SheetsRepository(config.spreadsheet_id)
    const delegates = new iOSStoreLocalizeConfigExporterDelegates(
        (id:string, folderName:string) => {
            const folder = DriveService.createFolder(id, folderName)
            return folder.getId()
        },
        (id:string, fileName:string, fileContent:string)=>{
            DriveService.createFile(id, fileName, fileContent)
        },
        ()=>{
            return sheetsRepository
                .getAppStoreLocalizedConfigSheet()
                .fetchLocalizedDataTable(Localize.getAllLanguage())
        },
        ()=>{
            return sheetsRepository
                .getAppStoreNonLocalizedConfigSheet()
                .fetchKeyValueDataTable()
        },
        ()=>{
            return sheetsRepository
                .getAppStoreNonLocalizedReviewConfig()
                .fetchKeyValueDataTable()
        }
    )
    new IOSStoreLocalizeConfigExporter(delegates, metadataFolder.getId()).output()
}

function outputAndroidResources() {
    const sheetsRepository = new SheetsRepository(config.spreadsheet_id)
    const delegates = new AndroidStoreLocalizeConfigExporterDelegates(
        (id:string, folderName:string) => {
          const folder = DriveService.createFolder(id, folderName)
          return folder.getId()
        },
        (id:string, fileName:string, fileContent:string)=>{
            DriveService.createFile(id, fileName, fileContent)
        },
        () => {
            return sheetsRepository
                .getGooglePlayStoreLocalizedConfigSheet()
                .fetchLocalizedDataTable(Localize.getAllLanguage())
        }
    )
    const platformFolder = DriveService.createFolder(config.drive_project_folder_id, "android");
    const metadataFolder = DriveService.createFolder(platformFolder.getId(), "metadata");
    new AndroidStoreLocalizeConfigExporter(delegates, metadataFolder.getId()).output()
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
function doGet(e: GoogleAppsScript.Events.AppsScriptHttpRequestEvent) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const json = JSON.parse(e.parameter.json)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    config = JSON.parse(e.parameter.config)

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    const methodName : string = json["method_name"]
    switch (methodName) {
        case "updateStringTableAll":
            updateStringTableAll()
            break
        case "outputIOSResources":
            outputIOSResources()
            break
        case "outputAndroidResources":
            outputAndroidResources()
            break
        case "outputCharacterListForUnity":
            outputUnityResources()
            break
    }

    const result = ""
    return ContentService
        .createTextOutput(JSON.stringify(result))
        .setMimeType(ContentService.MimeType.JSON);
}