import {Accessability} from "./Accessability";
import {StringVariableElement} from "./StringVariableElement";

export class ClassElement
{
    accessability : Accessability
    name :string
    variableElementList : StringVariableElement[]

    constructor(accessability:Accessability, name:string) {
        this.accessability = accessability
        this.name = name
        this.variableElementList = []
    }

    addVariable(variable: StringVariableElement) : void {
        this.variableElementList.push(variable)
    }

    toString() : string {
        return this.buildContent(()=>{
            let content = ""
            this.variableElementList.forEach(x => {
                content += `\t${x.toString()}`
            })
            return content
        })
    }

    buildContent(callback : ()=>string ) : string {
        let content =`${this.accessability.toLowerCase()} class ${this.name} {\n`
        content += callback()
        content += `}`
        return content
    }
}