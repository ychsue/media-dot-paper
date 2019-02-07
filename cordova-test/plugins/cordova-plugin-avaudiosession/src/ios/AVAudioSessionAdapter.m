#import "AVAudioSessionAdapter.h"
#import <AVFoundation/AVFoundation.h>

@implementation AVAudioSessionAdapter
{
    NSString *_routeChangedCallbackId;
}


- (void) routeChanged:(NSNotification*)notification {
    UInt8 reasonValue = [[notification.userInfo valueForKey:AVAudioSessionRouteChangeReasonKey] intValue];
/*
    AVAudioSessionRouteDescription *routeDescription = [notification.userInfo valueForKey:AVAudioSessionRouteChangePreviousRouteKey];

    NSLog(@"Route change:");
    switch (reasonValue) {
        case AVAudioSessionRouteChangeReasonNewDeviceAvailable:
            NSLog(@"     NewDeviceAvailable");
            break;
        case AVAudioSessionRouteChangeReasonOldDeviceUnavailable:
            NSLog(@"     OldDeviceUnavailable");
            break;
        case AVAudioSessionRouteChangeReasonCategoryChange:
            NSLog(@"     CategoryChange");
            NSLog(@" New Category: %@", [[AVAudioSession sharedInstance] category]);
            break;
        case AVAudioSessionRouteChangeReasonOverride:
            NSLog(@"     Override");
            break;
        case AVAudioSessionRouteChangeReasonWakeFromSleep:
            NSLog(@"     WakeFromSleep");
            break;
        case AVAudioSessionRouteChangeReasonNoSuitableRouteForCategory:
            NSLog(@"     NoSuitableRouteForCategory");
            break;
        default:
            NSLog(@"     ReasonUnknown");
    }

    NSLog(@"Previous route:\n");
    NSLog(@"%@", routeDescription);
*/
    if(_routeChangedCallbackId) {
        CDVPluginResult* cordovaResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                                                       messageAsDictionary:@{ @"reason": @(reasonValue) }];
        [cordovaResult setKeepCallbackAsBool:YES];
        [self.commandDelegate sendPluginResult:cordovaResult callbackId:_routeChangedCallbackId];
    }
}

- (void) pluginInitialize {
    NSLog(@"AVAudioSessionAdapter:pluginInitialize");

	@try {
		NSString* value = [self.commandDelegate.settings objectForKey:[@"AVAudioSession" lowercaseString]];

		[[AVAudioSession sharedInstance] setCategory:value error:nil];
	}@catch (NSException* ex) {
		NSLog(@"%@", [ex reason]);
	}

    _routeChangedCallbackId = nil;

    NSNotificationCenter *nc = [NSNotificationCenter defaultCenter];
    [nc addObserver:self
           selector:@selector(routeChanged:)
               name:AVAudioSessionRouteChangeNotification
             object:nil];
}

- (void) getCategory:(CDVInvokedUrlCommand*)command
{
    NSString* value = [[AVAudioSession sharedInstance] category];
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:value];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void) getCategoryOptions:(CDVInvokedUrlCommand*)command
{
    int value = (int)[[AVAudioSession sharedInstance] categoryOptions];
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsInt:value];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void) setCategory:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;

    @try {
        NSString* value = (NSString*)[command.arguments objectAtIndex:0];
        int options = 0;

        if ([command.arguments count] > 1) {
            options = [[command.arguments objectAtIndex:1] integerValue];
        }

        NSError* err = nil;

        if (options == 0) {
            [[AVAudioSession sharedInstance] setCategory:value error:&err];
        }
        else {
            AVAudioSessionCategoryOptions typedOptions = (AVAudioSessionCategoryOptions)options;
            [[AVAudioSession sharedInstance] setCategory:value withOptions:typedOptions error:&err];
        }

        if (err) {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[err localizedDescription]];
        }
        else {
            [[AVAudioSession sharedInstance] setActive:YES error:&err];
            if (err) {
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[err localizedDescription]];
            }
            else {
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
            }
        }
    }
    @catch (NSException* ex) {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[ex reason]];
    }

    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void) registerRouteChangedCallback:(CDVInvokedUrlCommand*)command
{
    _routeChangedCallbackId = command.callbackId;

    // send callback here telling to keep alive
    // needed for multiple callbacks
    CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_NO_RESULT];
    [result setKeepCallbackAsBool:YES];
    [self.commandDelegate sendPluginResult:result callbackId:_routeChangedCallbackId];
}

@end

