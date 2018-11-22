package admob.plugin;

import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.provider.Settings;
import android.util.Log;
import java.math.BigDecimal;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.google.android.gms.ads.MobileAds;

import admob.plugin.banner.BannerExecutor;
import admob.plugin.interstitial.InterstitialExecutor;
import admob.plugin.rewardvideo.RewardVideoExecutor;

public class AdMob extends CordovaPlugin {
    private static final String TAG = "AdMob-Plus";

    private CallbackContext readyCallbackContext = null;

    private BannerExecutor bannerExecutor = null;
    private InterstitialExecutor interstitialExecutor = null;
    private RewardVideoExecutor rewardVideoExecutor = null;

    private static final String TEST_APPLICATION_ID = "ca-app-pub-3940256099942544~3347511713";

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);

        MobileAds.initialize(cordova.getActivity(), getApplicationID());

        interstitialExecutor = new InterstitialExecutor(this);
        bannerExecutor = new BannerExecutor(this);
        rewardVideoExecutor = new RewardVideoExecutor(this);
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) {
        if (Actions.READY.equals(action)) {
            readyCallbackContext = callbackContext;

            JSONObject data = new JSONObject();
            try {
                data.put("platform", "android");
                data.put("applicationID", getApplicationID());
                data.put("isRunningInTestLab", isRunningInTestLab());
            } catch (JSONException e) {
                e.printStackTrace();
            }
            emit(Events.READY, data);
            return true;
        } else if (Actions.BANNER_HIDE.equals(action)) {
            return bannerExecutor.hide(args, callbackContext);
        } else if (Actions.BANNER_SHOW.equals(action)) {
            return bannerExecutor.show(args, callbackContext);
        } else if (Actions.INTERSTITIAL_LOAD.equals(action)) {
            return interstitialExecutor.load(args, callbackContext);
        } else if (Actions.INTERSTITIAL_SHOW.equals(action)) {
            return interstitialExecutor.show(args, callbackContext);
        } else if (Actions.REWARD_VIDEO_IS_READY.equals(action)) {
            return rewardVideoExecutor.isReady(args, callbackContext);
        } else if (Actions.REWARD_VIDEO_LOAD.equals(action)) {
            return rewardVideoExecutor.load(args, callbackContext);
        } else if (Actions.REWARD_VIDEO_SHOW.equals(action)) {
            return rewardVideoExecutor.show(args, callbackContext);
        } else if (Actions.SET_APP_MUTED.equals(action)) {
            boolean value = args.optBoolean(0);
            MobileAds.setAppMuted(value);
            PluginResult result = new PluginResult(PluginResult.Status.OK, "");
            callbackContext.sendPluginResult(result);
            return true;
        } else if (Actions.SET_APP_VOLUME.equals(action)) {
            float value = BigDecimal.valueOf(args.optDouble(0)).floatValue();
            MobileAds.setAppVolume(value);
            PluginResult result = new PluginResult(PluginResult.Status.OK, "");
            callbackContext.sendPluginResult(result);
            return true;
        }

        return false;
    }

    @Override
    public void onDestroy() {
        if (bannerExecutor != null) {
            bannerExecutor.destroy();
            bannerExecutor = null;
        }

        if (interstitialExecutor != null) {
            interstitialExecutor.destroy();
            interstitialExecutor = null;
        }

        readyCallbackContext = null;

        super.onDestroy();
    }

    public void emit(String eventType) {
        emit(eventType, false);
    }

    public void emit(String eventType, Object data) {
        JSONObject event = new JSONObject();
        try {
            event.put("type", eventType);
            event.put("data", data);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        PluginResult result = new PluginResult(PluginResult.Status.OK, event);
        result.setKeepCallback(true);
        readyCallbackContext.sendPluginResult(result);
    }

    private String getApplicationID() {
        try {
            ApplicationInfo ai = cordova.getActivity().getApplicationContext().getPackageManager().getApplicationInfo(cordova.getActivity().getPackageName(), PackageManager.GET_META_DATA);
            Bundle bundle = ai.metaData;
            return bundle.getString("com.google.android.gms.ads.APPLICATION_ID");
        } catch (Exception e) {
            Log.e(TAG, "Forget to configure <meta-data android:name=\"com.google.android.gms.ads.APPLICATION_ID\" android:value=\"XXX\"/> in your AndroidManifest.xml file.");
        }

        String applicationID = cordova.getActivity().getIntent().getStringExtra("APP_ID_ANDROID");
        if (applicationID == null || "".equals(applicationID) || "test".equals(applicationID)) {
            return TEST_APPLICATION_ID;
        }
        return applicationID;
    }

    private boolean isRunningInTestLab() {
        String testLabSetting = Settings.System.getString(cordova.getActivity().getContentResolver(), "firebase.test.lab");
        return "true".equals(testLabSetting);
    }
}
