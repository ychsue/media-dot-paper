import * as JSZip from "jszip";

export default async function export2ZipAsync(props:Array<{
    path: string, // Don't start a path with '/', this is a related path
    data: string| Blob| File,
}>) {
    const zip = new JSZip();
    props.forEach(({path, data})=> {
        zip.file(path, data);
    })
    
    const result = await zip.generateAsync({type:'blob'});

    return result;
}