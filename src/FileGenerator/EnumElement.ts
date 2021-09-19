import {Accessability} from "./Accessability";
import {StringVariableElement} from "./StringVariableElement";

export class EnumElement
{
    accessability : Accessability
    name :string
    elementList : string[]

    constructor(accessability:Accessability, name:string) {
        this.accessability = accessability
        this.name = name
        this.elementList = ["none"]
    }

    addElement(element:string) : void {
        this.elementList.push(element)
    }

    toString() : string {
        return this.buildContent(()=>{
            let content = ""
            this.elementList.forEach(x => {
                content += `\t${x},\n`
            })
            return content
        })
    }

    buildContent(callback : ()=>string ) : string {
        let content =`${this.accessability.toLowerCase()} enum ${this.name} \n{\n`
        content += callback()
        content += `}`
        return content
    }
}