export class StringHelper {
    static convertChars: Array<{from: string, to: string}> = [
        {from: '/', to: '⁄'},
        {from: '\\', to: '＼'},
        {from: '?', to: '？'},
        {from: '%', to: '％'},
        {from: '*', to: '＊'},
        {from: ':', to: '：'},
        {from: '|', to: '｜'},
        {from: '"', to: '“'},
        {from: '<', to: '＜'},
        {from: '\'', to: '‘'},
        {from: '>', to: '＞'},
        {from: '.', to: '。'},
        {from: '~', to: '～'},
        {from: '`', to: '｀'},
        {from: '!', to: '！'},
        {from: '#', to: '＃'},
        {from: '$', to: '＄'},
        {from: '^', to: '＾'},
        {from: '&', to: '＆'}
    ];
    static toFileName(st: string): string {
        let result = (!!st) ? st : '';
        // Gotten from https://en.wikipedia.org/wiki/Filename
        StringHelper.convertChars.forEach(cha => {
            result = result.replace(new RegExp('\\' + cha.from, 'g'), cha.to);
        });
        return result;
    }
}
