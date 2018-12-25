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

    /**
     *
     * @param link The string that will be refined if it is a link gotten from OneDrive, GoogleDrive or Dropbox
     * @returns The refined string;
     */
    static refineLinkOfDGO(link: string, isAsMDP: boolean = false): string {
        // for GoogleDrive
        // https://drive.google.com/open?id=1Ih4WybSRtP8RN_rdHocUn1Ud4OeiQH7x =>
        // https://docs.google.com/uc?export=download&id=1Ih4WybSRtP8RN_rdHocUn1Ud4OeiQH7x
        const regExGoogle = /^https\:\/\/drive\.google\.com\/open\?/i;
        // for OneDrive
        // https://onedrive.live.com/embed?cid=0D39FB11249E9E67&resid=D39FB11249E9E67%2158505&authkey=ABnFphkC79i_Pbc =>
        // https://onedrive.live.com/download?cid=0D39FB11249E9E67&resid=D39FB11249E9E67%2158505&authkey=ABnFphkC79i_Pbc
        const regExOneDrive = /^https\:\/\/onedrive\.live\.com\/embed\?/i;
        // for Dropbox
        // https://www.dropbox.com/s/fzapl6v4019mxt3/DailySample.txt?dl=1
        const regExDropbox = /^https\:\/\/www\.dropbox\.com\/.*dl\=0$/i;
        if (regExGoogle.test(link)) {
            link = link.replace('drive', 'docs').replace('open?', 'uc?export=download&');
            if (isAsMDP) {link = link + '&ismdp=1'; }
        } else if (regExOneDrive.test(link)) {
            link = link.replace('embed', 'download');
            if (isAsMDP) {link = link + '&ismdp=1'; }
        } else if (regExDropbox.test(link)) {
            link = link.replace(/dl=0/i, 'dl=1');
            if (isAsMDP) {link = link + '&ismdp=1'; }
        }
        return link;
    }
}
