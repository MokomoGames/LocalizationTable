export class Config {
    project_name:string
    spreadsheet_id:string
    gas_url:string
    playfab_project_id:string
    playfab_secret_key:string
    drive_project_folder_id:string

    constructor(){
        this.project_name = ""
        this.spreadsheet_id = ""
        this.gas_url = ""
        this.playfab_project_id = ""
        this.playfab_secret_key = ""
        this.drive_project_folder_id = ""
    }
}