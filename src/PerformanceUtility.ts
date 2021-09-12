class PerformanceUtility{
    static calcPerformance(title:string, calcProcess:()=>void){
        const startTime = Date.now()
        calcProcess()
        const endTime = Date.now()
        console.log(`Performance [${title}] ${endTime - startTime}`)
    }
}