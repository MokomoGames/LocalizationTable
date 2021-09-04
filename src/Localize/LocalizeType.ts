export enum LocalizeType
{
    Japanese = 'Japanese',//日本語
    Arabic = 'Arabic',//アラビア語
    English = 'English', //英語US
    SimplifiedChineseCharacters = 'SimplifiedChineseCharacters', //簡体字
    TraditionalChineseCharacters = 'TraditionalChineseCharacters', //繁体字
    Dutch = 'Dutch', //オランダ語
    French = 'French', //フランス語
    German = 'German', //ドイツ語
    Korean = 'Korean', //韓国語
    Swedish = 'Swedish', //スウェーデン語
    Portuguese = 'Portuguese', //ポルトガル語
    Russian = 'Russian', //ロシア語
    Spanish = 'Spanish', //スペイン語
}

export class Localize
{
    static getAllLanguage() : LocalizeType[]{
        return [
            LocalizeType.Japanese,
            LocalizeType.Arabic,
            LocalizeType.English,
            LocalizeType.SimplifiedChineseCharacters,
            LocalizeType.TraditionalChineseCharacters,
            LocalizeType.Dutch,
            LocalizeType.French,
            LocalizeType.German,
            LocalizeType.Korean,
            LocalizeType.Swedish,
            LocalizeType.Portuguese,
            LocalizeType.Russian,
            LocalizeType.Spanish,
        ]
    }
}