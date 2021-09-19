import {Accessability} from "./Accessability";

export class StringVariableElement
{
    accessability : Accessability
    variableName: string
    variableValue:string

    constructor(
        accessability : Accessability,
        variableName :string,
        variableValue :string
    ) {
        this.accessability = accessability
        this.variableName = variableName
        this.variableValue = variableValue
    }

    toString():string  {
        return `${this.accessability.toLowerCase()} string ${this.variableName} = "${this.variableValue}";\n`
    }
}