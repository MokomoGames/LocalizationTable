import {Sheet} from "./Sheet";
import {KeyValueSheet, KeyValueSheetDelegates} from "./KeyValueSheet";
import {LocalizedSheet, LocalizedSheetDelegates} from "./LocalizedSheet";
import {InAppLocalizedWordTable} from "../Localize/InAppLocalizedWordTable";

export class SheetsRepository {
    private readonly spreadsheet : GoogleAppsScript.Spreadsheet.Spreadsheet
    private readonly appStoreLocalizedConfigSheet: LocalizedSheet
    private readonly appStoreConfigSheet: KeyValueSheet
    private readonly appStoreReviewConfigSheet : KeyValueSheet
    private readonly googlePlayStoreLocalizedConfigSheet: LocalizedSheet
    private readonly inAppLocalizedWordTable! : InAppLocalizedWordTable

    getGooglePlayStoreLocalizedConfigSheet(){
        return this.googlePlayStoreLocalizedConfigSheet
    }
    getAppStoreLocalizedConfigSheet(){
        return this.appStoreLocalizedConfigSheet
    }
    getAppStoreConfigSheet(){
        return this.appStoreConfigSheet
    }
    getAppStoreReviewConfig(){
        return this.appStoreReviewConfigSheet
    }
    getLocalizedWordTableList() : InAppLocalizedWordTable{
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
            this.appStoreConfigSheet =
                new KeyValueSheet(
                    new KeyValueSheetDelegates(
                        sheet.getRecordValues.bind(sheet)
                    )
                )
        }

        {
            const sheet = new Sheet(this.spreadsheet.getSheetByName("AppStoreNonLocalizedReviewConfig")!)
            this.appStoreReviewConfigSheet =
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

        {
            const sheet = this.spreadsheet.getSheetByName("OutputLocalizeTableNameRepository")
            if(sheet == null){
                return
            }

            const sheetNames = new Sheet(sheet).getRecordValues("SheetName")
            const localizedSheets = sheetNames
                .map(sheetName => new Sheet(this.spreadsheet.getSheetByName(sheetName)!))
                .map(sheet => new LocalizedSheet(
                    new LocalizedSheetDelegates(
                        sheet.getRecordValues.bind(sheet)
                    )
                ))
            this.inAppLocalizedWordTable = new InAppLocalizedWordTable(localizedSheets)
        }
    }
}