export class Config {
    spreadsheet_id:string
    drive_project_folder_id:string

    constructor(){
        this.spreadsheet_id = ""
        this.drive_project_folder_id = ""
    }
}

export class PlayFabConfig {
    project_id : string
    secret_key : string

    constructor() {
        this.project_id = ""
        this.secret_key = ""
    }
}