import {LocalizeType} from "./LocalizeType";

export class ExportConfig {
    public localizeType: LocalizeType
    public directoryName: string

    constructor(localizeType: LocalizeType, directoryName: string) {
        this.localizeType = localizeType
        this.directoryName = directoryName
    }
}