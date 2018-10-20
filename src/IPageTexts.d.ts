interface IPageTexts {
    homePage: IHomePage;
    appComp: IAppComp;
    NewStory: INewStory;
    InProgress: IInProgress;
    storyComp: IStoryComp;
    dialogComp: IDialogComp;
    setSSComp: ISetSSComp;
    fsService: IFsService;
    meManiPlateComp: IMeManiPlateComp;
    adService: IAdService;
    welcomePage: IWelcomePage;
    sGsetComp: ISGsetComp;
    iso639: IIso639;
    iso3166Country: IIso3166Country;
}
interface IHomePage {
    newMedia: string;
    url: string;
    file: string;
    ttFile: string;
    storedMedia: string;
    errWrongFormat: string;
    errFileType: string;
    mobileFileSelWarn: string;
    browserFileSelWarn: string;
}
interface IAppComp {
    chooseAMediaAtFirst: string;
}
interface INewStory {
    name: string;
    title: string;
}
interface IInProgress {
    inProgress: string;
    wait: string;
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
interface IFsService {
    fileSaved: string;
    noPermission: string;
    cannotShare: string;
    askSavingToFile: string;
}
interface IMeManiPlateComp {
    isUtterSubtitle: string;
    useDefVP: string;
}
interface IAdService {
    showAdLater: string;
}
interface IWelcomePage {
    title: string;
    pTitle: string;
    s1: string;
    l1: string;
    l2: string;
    l3: string;
}
interface ISGsetComp {
    title: string;
    mediaPara: string;
    setDefault: string;
    howToUse: string;
    plsSelOne: string;
    byEachMDP: string;
    oneForAll: string;
    tPlaySeq: string;
    rule: string;
    byTime: string;
    byMDP: string;
    tSubSyn: string;
    setDef2: string;
    isToUtter: string;
    no: string;
    byMDP2: string;
    all: string;
    tAction: string;
    rearrange: string;
}
interface IIso639 {
    ab: string;
    aa: string;
    af: string;
    ak: string;
    sq: string;
    am: string;
    ar: string;
    an: string;
    hy: string;
    as: string;
    av: string;
    ae: string;
    ay: string;
    az: string;
    bm: string;
    ba: string;
    eu: string;
    be: string;
    bn: string;
    bh: string;
    bi: string;
    bs: string;
    br: string;
    bg: string;
    my: string;
    ca: string;
    ch: string;
    ce: string;
    ny: string;
    zh: string;
    cv: string;
    kw: string;
    co: string;
    cr: string;
    hr: string;
    cs: string;
    da: string;
    dv: string;
    nl: string;
    dz: string;
    en: string;
    eo: string;
    et: string;
    ee: string;
    fo: string;
    fj: string;
    fi: string;
    fr: string;
    ff: string;
    gl: string;
    ka: string;
    de: string;
    el: string;
    gn: string;
    gu: string;
    ht: string;
    ha: string;
    he: string;
    hz: string;
    hi: string;
    ho: string;
    hu: string;
    ia: string;
    id: string;
    ie: string;
    ga: string;
    ig: string;
    ik: string;
    io: string;
    is: string;
    it: string;
    iu: string;
    ja: string;
    jv: string;
    kl: string;
    kn: string;
    kr: string;
    ks: string;
    kk: string;
    km: string;
    ki: string;
    rw: string;
    ky: string;
    kv: string;
    kg: string;
    ko: string;
    ku: string;
    kj: string;
    la: string;
    lb: string;
    lg: string;
    li: string;
    ln: string;
    lo: string;
    lt: string;
    lu: string;
    lv: string;
    gv: string;
    mk: string;
    mg: string;
    ms: string;
    ml: string;
    mt: string;
    mi: string;
    mr: string;
    mh: string;
    mn: string;
    na: string;
    nv: string;
    nd: string;
    ne: string;
    ng: string;
    nb: string;
    nn: string;
    no: string;
    ii: string;
    nr: string;
    oc: string;
    oj: string;
    cu: string;
    om: string;
    or: string;
    os: string;
    pa: string;
    pi: string;
    fa: string;
    pl: string;
    ps: string;
    pt: string;
    qu: string;
    rm: string;
    rn: string;
    ro: string;
    ru: string;
    sa: string;
    sc: string;
    sd: string;
    se: string;
    sm: string;
    sg: string;
    sr: string;
    gd: string;
    sn: string;
    si: string;
    sk: string;
    sl: string;
    so: string;
    st: string;
    es: string;
    su: string;
    sw: string;
    ss: string;
    sv: string;
    ta: string;
    te: string;
    tg: string;
    th: string;
    ti: string;
    bo: string;
    tk: string;
    tl: string;
    tn: string;
    to: string;
    tr: string;
    ts: string;
    tt: string;
    tw: string;
    ty: string;
    ug: string;
    uk: string;
    ur: string;
    uz: string;
    ve: string;
    vi: string;
    vo: string;
    wa: string;
    cy: string;
    wo: string;
    fy: string;
    xh: string;
    yi: string;
    yo: string;
    za: string;
    zu: string;
}
interface IIso3166Country {
    AF: string;
    AX: string;
    AL: string;
    DZ: string;
    AS: string;
    AD: string;
    AO: string;
    AI: string;
    AQ: string;
    AG: string;
    AR: string;
    AM: string;
    AW: string;
    AU: string;
    AT: string;
    AZ: string;
    BS: string;
    BH: string;
    BD: string;
    BB: string;
    BY: string;
    BE: string;
    BZ: string;
    BJ: string;
    BM: string;
    BT: string;
    BO: string;
    BQ: string;
    BA: string;
    BW: string;
    BV: string;
    BR: string;
    IO: string;
    BN: string;
    BG: string;
    BF: string;
    BI: string;
    CV: string;
    KH: string;
    CM: string;
    CA: string;
    KY: string;
    CF: string;
    TD: string;
    CL: string;
    CN: string;
    CX: string;
    CC: string;
    CO: string;
    KM: string;
    CG: string;
    CD: string;
    CK: string;
    CR: string;
    CI: string;
    HR: string;
    CU: string;
    CW: string;
    CY: string;
    CZ: string;
    DK: string;
    DJ: string;
    DM: string;
    DO: string;
    EC: string;
    EG: string;
    SV: string;
    GQ: string;
    ER: string;
    EE: string;
    ET: string;
    FK: string;
    FO: string;
    FJ: string;
    FI: string;
    FR: string;
    GF: string;
    PF: string;
    TF: string;
    GA: string;
    GM: string;
    GE: string;
    DE: string;
    GH: string;
    GI: string;
    GR: string;
    GL: string;
    GD: string;
    GP: string;
    GU: string;
    GT: string;
    GG: string;
    GN: string;
    GW: string;
    GY: string;
    HT: string;
    HM: string;
    VA: string;
    HN: string;
    HK: string;
    HU: string;
    IS: string;
    IN: string;
    ID: string;
    IR: string;
    IQ: string;
    IE: string;
    IM: string;
    IL: string;
    IT: string;
    JM: string;
    JP: string;
    JE: string;
    JO: string;
    KZ: string;
    KE: string;
    KI: string;
    KP: string;
    KR: string;
    KW: string;
    KG: string;
    LA: string;
    LV: string;
    LB: string;
    LS: string;
    LR: string;
    LY: string;
    LI: string;
    LT: string;
    LU: string;
    MO: string;
    MK: string;
    MG: string;
    MW: string;
    MY: string;
    MV: string;
    ML: string;
    MT: string;
    MH: string;
    MQ: string;
    MR: string;
    MU: string;
    YT: string;
    MX: string;
    FM: string;
    MD: string;
    MC: string;
    MN: string;
    ME: string;
    MS: string;
    MA: string;
    MZ: string;
    MM: string;
    NA: string;
    NR: string;
    NP: string;
    NL: string;
    NC: string;
    NZ: string;
    NI: string;
    NE: string;
    NG: string;
    NU: string;
    NF: string;
    MP: string;
    NO: string;
    OM: string;
    PK: string;
    PW: string;
    PS: string;
    PA: string;
    PG: string;
    PY: string;
    PE: string;
    PH: string;
    PN: string;
    PL: string;
    PT: string;
    PR: string;
    QA: string;
    RE: string;
    RO: string;
    RU: string;
    RW: string;
    BL: string;
    SH: string;
    KN: string;
    LC: string;
    MF: string;
    PM: string;
    VC: string;
    WS: string;
    SM: string;
    ST: string;
    SA: string;
    SN: string;
    RS: string;
    SC: string;
    SL: string;
    SG: string;
    SX: string;
    SK: string;
    SI: string;
    SB: string;
    SO: string;
    ZA: string;
    GS: string;
    SS: string;
    ES: string;
    LK: string;
    SD: string;
    SR: string;
    SJ: string;
    SZ: string;
    SE: string;
    CH: string;
    SY: string;
    TW: string;
    TJ: string;
    TZ: string;
    TH: string;
    TL: string;
    TG: string;
    TK: string;
    TO: string;
    TT: string;
    TN: string;
    TR: string;
    TM: string;
    TC: string;
    TV: string;
    UG: string;
    UA: string;
    AE: string;
    GB: string;
    US: string;
    UM: string;
    UY: string;
    UZ: string;
    VU: string;
    VE: string;
    VN: string;
    VG: string;
    VI: string;
    WF: string;
    EH: string;
    YE: string;
    ZM: string;
    ZW: string;
}
