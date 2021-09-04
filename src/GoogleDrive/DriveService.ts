export class DriveService {
    static deleteFolder(folderId:string,folderName:string) :void{
        const folder = this.getFolderByName(folderId, folderName)
        if(folder == null){
            return
        }
        folder.setTrashed(true)
    }

    static createFile(folderId:string,fileName:string,content:string) :void {
        const folder = DriveApp.getFolderById(folderId)
        folder.createFile(fileName,content);
    }
    
    static createFolder(folderId:string,folderName:string) : GoogleAppsScript.Drive.Folder {
        const folder = DriveApp.getFolderById(folderId)
        this.deleteFolder(folderId, folderName)
        return folder.createFolder(folderName)
    }

    private static getFoldersByName(folderId:string, folderName:string) : GoogleAppsScript.Drive.Folder[] {
        const folders : GoogleAppsScript.Drive.Folder[] = []
        const foldersIterator = DriveApp.getFolderById(folderId).getFoldersByName(folderName);
        while(foldersIterator.hasNext()){
            const folder = foldersIterator.next()
            folders.push(folder)
        }

        return folders
    }

    static getFolderByName(folderId:string, folderName:string) : GoogleAppsScript.Drive.Folder | undefined {
        const folders = this.getFoldersByName(folderId, folderName)
        const folder = folders.find(x => x.getName() == folderName);
        return folder
    }
}