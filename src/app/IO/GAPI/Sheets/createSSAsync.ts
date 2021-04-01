import { withMustSignIn } from "../withMustSignIn";

interface IProps {
    title: string
}

interface ISProps extends IProps {
    scopes?: string
}

export default async function createSSAsync({scopes, ...props}:ISProps) {
    const res = await withMustSignIn((!!scopes)?scopes:'https://www.googleapis.com/auth/spreadsheets')(createSSGAPIAsync)({...props});
    return res;
}

async function createSSGAPIAsync({title}:IProps) {
    const res = await gapi.client.sheets.spreadsheets.create({
        resource: {
            properties: {title}
        }
    });

    if(res.status!=200) throw new Error(`createSSAsync Error status: ${res.status}, text: ${res.statusText}`);
    
    return res;
}