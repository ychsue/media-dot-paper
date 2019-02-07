#import "AudioRecorderAPI.h"
#import <Cordova/CDV.h>

@implementation AudioRecorderAPI

//#define RECORDINGS_FOLDER [NSHomeDirectory() stringByAppendingPathComponent:@"Library/NoCloud"]
#define RECORDINGS_FOLDER [NSTemporaryDirectory() stringByStandardizingPath]

- (void)record:(CDVInvokedUrlCommand*)command {
  _command = command;
  duration = [_command.arguments objectAtIndex:0];

  [self.commandDelegate runInBackground:^{

    AVAudioSession *audioSession = [AVAudioSession sharedInstance];

    NSError *err;
    [audioSession setCategory:AVAudioSessionCategoryPlayAndRecord error:&err];
    if (err)
    {
        NSLog(@"setCategory::: %@ %ld %@", [err domain], (long)[err code], [[err userInfo] description]);
    }
      
      // // * [2019-02-02 22:16] Try to let the main speaker work
      // [audioSession overrideOutputAudioPort:AVAudioSessionPortOverrideSpeaker error:&err];
      // if (err)
      // {
      //     NSLog(@"overrideOutputAudioPort::: %@ %ld %@", [err domain], (long)[err code], [[err userInfo] description]);
      // }

    err = nil;
    [audioSession setActive:YES error:&err];
    if (err)
    {
        NSLog(@"setActive::: %@ %ld %@", [err domain], (long)[err code], [[err userInfo] description]);
    }

    NSMutableDictionary *recordSettings = [[NSMutableDictionary alloc] init];
    [recordSettings setObject:[NSNumber numberWithInt: kAudioFormatMPEG4AAC] forKey: AVFormatIDKey];
    [recordSettings setObject:[NSNumber numberWithFloat:8000.0] forKey: AVSampleRateKey];
    [recordSettings setObject:[NSNumber numberWithInt:1] forKey:AVNumberOfChannelsKey];
    [recordSettings setObject:[NSNumber numberWithInt:12000] forKey:AVEncoderBitRateKey];
    [recordSettings setObject:[NSNumber numberWithInt:8] forKey:AVLinearPCMBitDepthKey];
    [recordSettings setObject:[NSNumber numberWithInt: AVAudioQualityMax] forKey: AVEncoderAudioQualityKey];

    // Create a new dated file
    NSString *uuid = [[NSUUID UUID] UUIDString];
      self->recorderFilePath = [NSString stringWithFormat:@"%@/%@.m4a", RECORDINGS_FOLDER, uuid];
      NSLog(@"recording file path: %@", self->recorderFilePath);

      NSURL *url = [NSURL fileURLWithPath:self->recorderFilePath];
    err = nil;
      self->recorder = [[AVAudioRecorder alloc] initWithURL:url settings:recordSettings error:&err];
      if(!self->recorder){
          NSLog(@"recorder: %@ %ld %@", [err domain], (long)[err code], [[err userInfo] description]);
      return;
    }

      [self->recorder setDelegate:self];

      if (![self->recorder prepareToRecord]) {
      NSLog(@"prepareToRecord failed");
      return;
    }

      if (![self->recorder recordForDuration:(NSTimeInterval)[self->duration intValue]]) {
      NSLog(@"recordForDuration failed");
      return;
    }

  }];
}

- (void)stop:(CDVInvokedUrlCommand*)command {
  _command = command;
  NSLog(@"stopRecording");
  [recorder stop];
  NSLog(@"stopped");
    // * [2019-02-05 22:45] Change back to Play only
    NSError* err;
    AVAudioSession *audioSession = [AVAudioSession sharedInstance];
    [audioSession setCategory:AVAudioSessionCategoryPlayback error:&err];
    if (err)
    {
        NSLog(@"stopy:setCategory::: %@ %ld %@", [err domain], (long)[err code], [[err userInfo] description]);
    }
}

- (void)playback:(CDVInvokedUrlCommand*)command {
  _command = command;
  [self.commandDelegate runInBackground:^{
    NSLog(@"recording playback");
      NSURL *url = [NSURL fileURLWithPath:self->recorderFilePath];
    NSError *err;
      self->player = [[AVAudioPlayer alloc] initWithContentsOfURL:url error:&err];
      self->player.numberOfLoops = 0;
      self->player.delegate = self;
      [self->player prepareToPlay];
      [self->player play];
    if (err) {
        NSLog(@"AVAudioPlayer::: %@ %ld %@", [err domain], (long)[err code], [[err userInfo] description]);
    }
    NSLog(@"playing");
  }];
}

- (void)audioPlayerDidFinishPlaying:(AVAudioPlayer *)player successfully:(BOOL)flag {
  NSLog(@"audioPlayerDidFinishPlaying");
  pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"playbackComplete"];
  [self.commandDelegate sendPluginResult:pluginResult callbackId:_command.callbackId];
}

- (void)audioRecorderDidFinishRecording:(AVAudioRecorder *)recorder successfully:(BOOL)flag {
  NSURL *url = [NSURL fileURLWithPath: recorderFilePath];
  NSError *err = nil;
  NSData *audioData = [NSData dataWithContentsOfFile:[url path] options: 0 error:&err];
  if(!audioData) {
      NSLog(@"audio data: %@ %ld %@", [err domain], (long)[err code], [[err userInfo] description]);
  } else {
    NSLog(@"recording saved: %@", recorderFilePath);
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:recorderFilePath];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:_command.callbackId];
  }
}

@end
