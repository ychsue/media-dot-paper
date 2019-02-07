#import <Cordova/CDV.h>

@interface AVAudioSessionAdapter : CDVPlugin

- (void) pluginInitialize;

- (void) getCategory:(CDVInvokedUrlCommand*)command;

- (void) getCategoryOptions:(CDVInvokedUrlCommand*)command;

- (void) setCategory:(CDVInvokedUrlCommand*)command;

- (void) registerRouteChangedCallback:(CDVInvokedUrlCommand*)command;

@end

