import {Sheet} from "./Sheet";
import {KeyValueSheet, KeyValueSheetDelegates} from "./KeyValueSheet";
import {LocalizedSheet, LocalizedSheetDelegates} from "./LocalizedSheet";
import {InAppLocalizedWordTable} from "../Localize/InAppLocalizedWordTable";

export class SheetsRepository {
    spreadsheet : GoogleAppsScript.Spreadsheet.Spreadsheet
    private readonly appStoreLocalizedConfigSheet: LocalizedSheet
    private readonly appStoreNonLocalizedConfigSheet: KeyValueSheet
    private readonly appStoreNonLocalizedReviewConfig : KeyValueSheet
    private readonly googlePlayStoreLocalizedConfigSheet: LocalizedSheet
    private readonly inAppLocalizedWordTable! : InAppLocalizedWordTable

    getGooglePlayStoreLocalizedConfigSheet(){
        return this.googlePlayStoreLocalizedConfigSheet
    }
    getAppStoreLocalizedConfigSheet(){
        return this.appStoreLocalizedConfigSheet
    }
    getAppStoreNonLocalizedConfigSheet(){
        return this.appStoreNonLocalizedConfigSheet
    }
    getAppStoreNonLocalizedReviewConfig(){
        return this.appStoreNonLocalizedReviewConfig
    }
    getLocalizedWordTableList(){
        return this.inAppLocalizedWordTable
    }

    constructor(spreadSheetId:string) {
        this.spreadsheet = SpreadsheetApp.openById(spreadSheetId)

        {
            const sheet = new Sheet(this.spreadsheet.getSheetByName("AppStoreLocalizedConfig")!)
            this.appStoreLocalizedConfigSheet =
                new LocalizedSheet(sheet)
        }

        {
            const sheet = new Sheet(this.spreadsheet.getSheetByName("AppStoreNonLocalizedConfig")!)
            this.appStoreNonLocalizedConfigSheet =
                new KeyValueSheet(
                    new KeyValueSheetDelegates(
                        sheet.getRecordValues.bind(sheet)
                    )
                )
        }

        {
            const sheet = new Sheet(this.spreadsheet.getSheetByName("AppStoreNonLocalizedReviewConfig")!)
            this.appStoreNonLocalizedReviewConfig =
                new KeyValueSheet(
                    new KeyValueSheetDelegates(
                        sheet.getRecordValues.bind(sheet)
                    )
                )
        }

        {
            const sheet = new Sheet(this.spreadsheet.getSheetByName("GooglePlayStoreLocalizedConfig")!)
            this.googlePlayStoreLocalizedConfigSheet =
                new LocalizedSheet(
                    new LocalizedSheetDelegates(
                        sheet.getRecordValues.bind(sheet)
                    )
                )
        }

        const rawSheet = this.spreadsheet.getSheetByName("OutputLocalizeTableNameRepository")
        if(rawSheet == null){
            return
        }

        const sheetNames = new Sheet(rawSheet).getRecordValues("SheetName")
        this.inAppLocalizedWordTable =
            new InAppLocalizedWordTable(
                sheetNames
                    .map(x => this.spreadsheet.getSheetByName(x))
                    .map(x => new Sheet(x!))
                    .map(sheet => new LocalizedSheet(
                        new LocalizedSheetDelegates(
                            sheet.getRecordValues.bind(sheet)
                        )
                    ))
            )
    }
}