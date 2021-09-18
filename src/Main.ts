import {DriveService} from "./GoogleDrive/DriveService";
import {Config, PlayFabConfig} from "./Config";
import {SheetsRepository} from "./Sheets/SheetsRepository"
import {Localize, LocalizeType} from "./Localize/LocalizeType";
import {AndroidStoreLocalizeConfigExporter, AndroidStoreLocalizeConfigExporterDelegates} from "./Localize/AndroidStoreLocalizeConfigExporter";
import {IOSStoreLocalizeConfigExporter,  IOSStoreLocalizeConfigExporterDelegates } from "./Localize/iOSStoreLocalizeConfigExporter";
import {PlayFabUploader} from "./PlayFab/PlayFabUploader";

export let config: Config;
config = new Config();

function updateStringTableAll(playFabConfig:PlayFabConfig) {
    const repository = new SheetsRepository(config.spreadsheet_id)
    new PlayFabUploader(
        playFabConfig.secret_key,
        playFabConfig.project_id
    ).uploadStringTable(
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
    const delegates = new IOSStoreLocalizeConfigExporterDelegates(
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
                .getAppStoreConfigSheet()
                .fetchKeyValueDataTable()
        },
        ()=>{
            return sheetsRepository
                .getAppStoreReviewConfig()
                .fetchKeyValueDataTable()
        }
    )
    new IOSStoreLocalizeConfigExporter(delegates, metadataFolder.getId()).output()
}

function outputAndroidResources() {
    const sheetsRepository = new SheetsRepository(config.spreadsheet_id)
    const delegates = new AndroidStoreLocalizeConfigExporterDelegates(
        (id:string, folderName:string) => {
          const folder = DriveService.createFolder(id, folderName, false)
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
    config = JSON.parse(e.parameter.config)

    const methodName : string = e.parameter.method_name
    switch (methodName) {
        case "updateStringTableAll":
            const playfabConfig : PlayFabConfig = JSON.parse(e.parameter.playfab_config)
            updateStringTableAll(playfabConfig)
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

    const result : {[key:string] : string} = {}
    result['method_name'] = methodName
    result['config'] = JSON.stringify(config)

    return ContentService
        .createTextOutput(JSON.stringify(result))
        .setMimeType(ContentService.MimeType.JSON);
}