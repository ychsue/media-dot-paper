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
    static refineLinkOfDGO(link: string): string {
        // for GoogleDrive
        // https://drive.google.com/open?id=1Ih4WybSRtP8RN_rdHocUn1Ud4OeiQH7x or
        // https://drive.google.com/file/d/1Ih4WybSRtP8RN_rdHocUn1Ud4OeiQH7x/view?usp=drivesdk=>
        // https://docs.google.com/uc?export=download&id=1Ih4WybSRtP8RN_rdHocUn1Ud4OeiQH7x
        const regExGoogle = /^https\:\/\/drive\.google\.com\/(?:open\?id=|file\/d\/)([^\&\/]+)/i;
        // for OneDrive
        // https://onedrive.live.com/embed?cid=0D39FB11249E9E67&resid=D39FB11249E9E67%2158505&authkey=ABnFphkC79i_Pbc =>
        // https://onedrive.live.com/download?cid=0D39FB11249E9E67&resid=D39FB11249E9E67%2158505&authkey=ABnFphkC79i_Pbc
        const regExOneDrive = /^https\:\/\/onedrive\.live\.com\/embed\?/i;
        // for Dropbox
        // https://www.dropbox.com/s/fzapl6v4019mxt3/DailySample.txt?dl=1
        const regExDropbox = /^https\:\/\/www\.dropbox\.com\/.*dl\=0/i;
        if (regExGoogle.test(link)) {
            link = `https://drive.google.com/uc?export=download&id=${link.match(regExGoogle)[1]}`;
        } else if (regExOneDrive.test(link)) {
            link = link.replace('embed', 'download');
        } else if (regExDropbox.test(link)) {
            link = link.replace(/dl=0/i, 'raw=1');
        }
        return link;
    }

    static isMDP(st: string): boolean {
        const reg = /(?:\&|\?)ismdp\=(\d)/i;
        const matchIsMDP = st.match(reg);
        const ismdp =  !!matchIsMDP && !!(+matchIsMDP[1]);
        return ismdp;
    }

    static getInfoFromProtocolString(uri: string): {action: ProtocolActionType, data: any} {
        const result = {action: ProtocolActionType.mdplink, data: ""};
        if (/case\=/.test(uri) === false) {
            const mData = uri.match(/^mdpyc\:\/\/[^\/]*\/(.*)/);
            if ( !!mData ) {
                const data = decodeURIComponent(mData[1]);
                result.data = data +
                ((data.toLowerCase().indexOf('ismdp=') >= 0) ? '' : (
                    ((data.indexOf('\?') >= 0) ? '&' : '?') +
                    'ismdp=1'));
            }
        }
        return result;
    }
}

export enum ProtocolActionType {
    mdplink = 0
}
