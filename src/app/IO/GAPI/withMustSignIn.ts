import isSignedIn from "./isSignedIn";
import {isLoaded} from "./isLoaded";
import signInAsync from "./signInAsync";

export const withMustSignIn = (scopes: string, mustLoadScopes = false) => <I,J>(fn : (_:I)=> Promise<J>) => {
    return async (args:I) => {
        var isWithScopes = !!scopes;

        // * [2021-03-17 14:58] If can run is what we care, we don't have to load it with scopes. 
        if(mustLoadScopes === false) {
            try {
                const res = await fn(args);
                return res;
            } catch (error) {
                console.log(error);
            }
        }


        // * [2021-03-12 22:19] If it is not loaded
        if(!!!isLoaded) {
            alert('Google API 尚未 load');
            return null;
        }
        
        var user: gapi.auth2.GoogleUser;
        // * [2021-03-12 22:24] If it is not signedIn
        if(!!!isSignedIn()){
            try {
                user = await gapi.auth2.getAuthInstance()
                    .signIn((isWithScopes)?{scope: scopes}:undefined);
                isWithScopes = false; // 因為已經處理了，後續不需要再處理
            } catch (error) {
                alert(`請登入才能用 Google API: error: ${error.error}`);
                return null;
            }
        }
    
        // * [2021-03-13 10:50] If it has needs scopes to use
        user = gapi.auth2.getAuthInstance().currentUser.get();
        if(isWithScopes &&
            !!!user.hasGrantedScopes(scopes)
            ) {
            const result = await user.grant({scope: scopes});
        }

        return await fn(args);
    }
}

// 測試用
// let f = (x: {a:string}) => x.a;
// let a = withMustSignIn(['abc'])(f)