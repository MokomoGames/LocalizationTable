import {Accessability} from "./Accessability";

export class StringVariableElement
{
    accessability : Accessability
    isStatic : boolean
    variableName: string
    variableValue:string

    constructor(
        isStatic : boolean,
        accessability : Accessability,
        variableName :string,
        variableValue :string
    ) {
        this.isStatic = isStatic
        this.accessability = accessability
        this.variableName = variableName
        this.variableValue = variableValue
    }

    toString():string  {
        return `${this.isStatic ? "static" : ""} ${this.accessability.toLowerCase()} string ${this.variableName} = "${this.variableValue}";\n`
    }
}