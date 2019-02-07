cordova-plugin-avaudiosession
========================

This is an iOS specific cordova plugin that exposes functionality of the AVAudioSession singleton instance. It is useful to applications that need to implement advanced use-cases of media handling (play/record etc.) For more information on AVAudioSession, view the [Apple Documentation](https://developer.apple.com/library/ios/documentation/AVFoundation/Reference/AVAudioSession_ClassReference/Reference/Reference.html))

The following functions are supported:

 * **getCategory(successCallback)**
 
   Returns the current category value of the AVAudioSession, as a parameter to the registered callback.
   
 
 * **getCategoryOptions(successCallback)**
 
   Returns the current categoryOptions value of the AVAudioSession, as a parameter to the registered callback.
   
 
 * **setCategory(category, successCallback, errorCallback)**
 
   Sets the category of the AVAudioSession to the given value.
   
 
 * **setCategoryWithOptions(category, categoryOptions, successCallback, errorCallback)**
 
   Sets the category and categoryOptions of the AVAudioSession to the given values.

### Setting session on startup
You can include a `<preference>` tag in your config.xml to set the session on startup:

`<preference name="AVAudioSession" value="AVAudioSessionCategoryAmbient" />`

A typical usage is as follows:

```javascript
AVAudioSession.setCategoryWithOptions(
    AVAudioSession.Categories.PLAY_AND_RECORD,
	AVAudioSession.CategoryOptions.MIX_WITH_OTHERS,
	function() {
		// Do something on success.
	}, 
    function() {
		// Handle the error.
	}
);
AVAudioSession.getCategory(
	function(category) {
    	// Do something with category value.
    }
);
```

