// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace PlayFabAPI {
    export class KeyValue {
        Key: string
        Value: string
        constructor(key: string, value: string) {
            this.Key = key;
            this.Value = value;
        }
    }

    export class API {
        secretKey : string
        projectId : string

        constructor(secretKey:string, projectId:string) {
            this.secretKey = secretKey
            this.projectId = projectId
        }

        setTitleData(sendValues: KeyValue[]) :void{
            const headers: unknown = {
                "X-SecretKey": this.secretKey
            }
            const payload: unknown = {
                "KeyValues": sendValues
            }
            const options: any = {
                method: "post",
                contentType: "application/json",
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                headers: headers,
                payload: JSON.stringify(payload),
            }
    
            const url = `https://${this.projectId}.playfabapi.com/Admin/SetTitleDataAndOverrides`
            UrlFetchApp.fetch(url, options)
        }
    }
}