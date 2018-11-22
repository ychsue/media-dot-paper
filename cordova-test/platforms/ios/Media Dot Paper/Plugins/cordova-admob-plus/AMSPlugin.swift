@objc(AMSPlugin)
class AMSPlugin: CDVPlugin {
    static let testApplicationID = "ca-app-pub-3940256099942544~1458002511"

    var banner: AMSBanner!
    var interstitial: AMSInterstitial!
    var rewardVideo: AMSRewardVideo!
    var readyCallbackId: String!

    override func pluginInitialize() {
        super.pluginInitialize()

        banner = AMSBanner(plugin: self)
        interstitial = AMSInterstitial(plugin: self)
        rewardVideo = AMSRewardVideo(plugin: self)

        GADMobileAds.configure(withApplicationID: getApplicationID())
    }

    deinit {
        banner = nil
        interstitial = nil
        rewardVideo = nil
        readyCallbackId = nil
    }

    func getApplicationID() -> String {
        let applicationID = commandDelegate.settings["APP_ID_IOS".lowercased()] as? String
        if applicationID == nil || applicationID == "" || applicationID == "test" {
            NSLog("admob is using testApplicationID")
            return AMSPlugin.testApplicationID
        }
        return applicationID!
    }

    @objc(ready:)
    func ready(command: CDVInvokedUrlCommand) {
        readyCallbackId = command.callbackId

        self.emit(eventType: AMSEvents.ready, data: [
            "platform": "ios",
            "applicationID": getApplicationID(),
            "sdkVersion": GADRequest.sdkVersion(),
            "isRunningInTestLab": false])
    }

    @objc(set_app_muted:)
    func set_app_muted(command: CDVInvokedUrlCommand) {
        guard let applicationMuted = command.argument(at: 0) as? Bool
            else {
                let result = CDVPluginResult(status: CDVCommandStatus_ERROR, messageAs: false)
                self.commandDelegate!.send(result, callbackId: command.callbackId)
                return
        }
        GADMobileAds.sharedInstance().applicationMuted = applicationMuted

        let result = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: true)
        self.commandDelegate!.send(result, callbackId: command.callbackId)
    }

    @objc(set_app_volume:)
    func set_app_volume(command: CDVInvokedUrlCommand) {
        guard let applicationVolume = command.argument(at: 0) as? Float
            else {
                let result = CDVPluginResult(status: CDVCommandStatus_ERROR, messageAs: false)
                self.commandDelegate!.send(result, callbackId: command.callbackId)
                return
        }
        GADMobileAds.sharedInstance().applicationVolume = applicationVolume

        let result = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: true)
        self.commandDelegate!.send(result, callbackId: command.callbackId)
    }

    @objc(banner_show:)
    func banner_show(command: CDVInvokedUrlCommand) {
        guard let opts = command.argument(at: 0) as? NSDictionary,
            let adUnitID = opts.value(forKey: "adUnitID") as? String
            else {
                let result = CDVPluginResult(status: CDVCommandStatus_ERROR, messageAs: false)
                self.commandDelegate!.send(result, callbackId: command.callbackId)
                return
        }
        banner.show(adUnitID: adUnitID)

        let result = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: true)
        self.commandDelegate!.send(result, callbackId: command.callbackId)
    }

    @objc(banner_hide:)
    func banner_hide(command: CDVInvokedUrlCommand) {
        banner.hide()

        let result = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: true)
        self.commandDelegate!.send(result, callbackId: command.callbackId)
    }

    @objc(interstitial_load:)
    func interstitial_load(command: CDVInvokedUrlCommand) {
        guard let opts = command.argument(at: 0) as? NSDictionary,
            let adUnitID = opts.value(forKey: "adUnitID") as? String
            else {
                let result = CDVPluginResult(status: CDVCommandStatus_ERROR, messageAs: false)
                self.commandDelegate!.send(result, callbackId: command.callbackId)
                return
        }
        interstitial.load(adUnitID: adUnitID)

        let result = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: true)
        self.commandDelegate!.send(result, callbackId: command.callbackId)
    }

    @objc(interstitial_show:)
    func interstitial_show(command: CDVInvokedUrlCommand) {
        interstitial.show()

        let result = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: true)
        self.commandDelegate!.send(result, callbackId: command.callbackId)
    }

    @objc(reward_video_is_ready:)
    func reward_video_is_ready(command: CDVInvokedUrlCommand) {
        let result = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: rewardVideo.isReady())
        self.commandDelegate!.send(result, callbackId: command.callbackId)
    }

    @objc(reward_video_load:)
    func reward_video_load(command: CDVInvokedUrlCommand) {
        guard let opts = command.argument(at: 0) as? NSDictionary,
            let adUnitID = opts.value(forKey: "adUnitID") as? String
            else {
                let result = CDVPluginResult(status: CDVCommandStatus_ERROR, messageAs: false)
                self.commandDelegate!.send(result, callbackId: command.callbackId)
                return
        }
        rewardVideo.load(adUnitID: adUnitID)

        let result = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: true)
        self.commandDelegate!.send(result, callbackId: command.callbackId)
    }

    @objc(reward_video_show:)
    func reward_video_show(command: CDVInvokedUrlCommand) {
        rewardVideo.show()

        let result = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: true)
        self.commandDelegate!.send(result, callbackId: command.callbackId)
    }

    func emit(eventType: String, data: Any = false) {
        let result = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: ["type": eventType, "data": data])
        result?.setKeepCallbackAs(true)
        self.commandDelegate!.send(result, callbackId: readyCallbackId)
    }
}
