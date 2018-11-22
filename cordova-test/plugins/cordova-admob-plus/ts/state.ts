class AdMobState {
  public applicationId: undefined | string
  public devMode = false
  public platform: string

  constructor() {
    this.platform = typeof cordova !== 'undefined' ? cordova.platformId : ''
  }
}

export default AdMobState
