interface IPageTexts {
    homePage: IHomePage;
    appComp: IAppComp;
    NewStory: INewStory;
    storyComp: IStoryComp;
    dialogComp: IDialogComp;
    setSSComp: ISetSSComp;
}
interface IHomePage {
    newMedia: string;
    url: string;
    file: string;
    ttFile: string;
    storedMedia: string;
    errWrongFormat: string;
    errFileType: string;
}
interface IAppComp {
    chooseAMediaAtFirst: string;
}
interface INewStory {
    name: string;
    title: string;
}
interface IStoryComp {
    notYetFileExport: string;
    exportSBV: string;
    howtoUtter: string;
    noSS: string;
    actualSS: string;
    allSS: string;
    name: string;
    title: string;
    keywords: string;
    source: string;
    description: string;
}
interface IDialogComp {
    desireURL: string;
    load: string;
}
interface ISetSSComp {
    selLang: string;
}
