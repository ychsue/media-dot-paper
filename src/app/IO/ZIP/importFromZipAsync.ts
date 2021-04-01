import * as JSZip from "jszip";
import { Subject } from "rxjs";
import { take, takeWhile } from "rxjs/operators";

//#region Gotten from JSZip
interface Metadata  {
    percent: number;
    currentFile: string;
}

type OnUpdateCallback = (metadata: Metadata) => void;
//#endregion Gotten from JSZip

interface IOptions extends JSZip.JSZipLoadOptions {
    decodeFileName? (bytes: Buffer) : void;
}

class WaitNTimes {
    subject: Subject<number>;
    n0:number; //initial value
    nEnd: number; //final value
    constructor (nEnd: number) {
        this.subject = new Subject<number>();
        this.n0 = 0;
        this.nEnd = nEnd;
    }

    WaitAsync () {
        return this.subject.pipe(
            takeWhile(n1=>n1 >=this.nEnd),
            take(1)
        ).toPromise();
    }

    Release () {
        this.subject.next(++this.n0);
    }
}

export default async function importFromZipAsync(props:{
    data: string| Blob| File,
    options?: IOptions
    progress?: OnUpdateCallback
}) {
    const {data, options, progress} = props;
    const zip = new JSZip();
    const resZip = await zip.loadAsync(data, options);

    const results: Array<{path:string, blob: Blob}> =[]; 
    
    // * [2021-03-30 15:03] Scan each file
    const n = Object.keys(resZip.files).length;
    const waitTimes = new WaitNTimes(n);
    resZip.forEach(async (path, file) => {
        if(file.dir === false){
            const blob = await file.async("blob", progress);
            results.push({path, blob});                
        }
        waitTimes.Release();
    })

    const n1 = await waitTimes.WaitAsync();
    return results;
}