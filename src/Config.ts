export class Config {
    spreadsheet_id:string
    playfab_project_id:string
    playfab_secret_key:string
    drive_project_folder_id:string

    constructor(){
        this.spreadsheet_id = ""
        this.playfab_project_id = ""
        this.playfab_secret_key = ""
        this.drive_project_folder_id = ""
    }
}