//
//  ANONAudioStreamer.h
//  RActive
//
//  Created by Neil Martin on 27/07/13.
//
//


#import <Foundation/Foundation.h>
#import <AudioToolbox/AudioServices.h>
#import <AVFoundation/AVFoundation.h>
#import <MediaPlayer/MediaPlayer.h>

#import <Cordova/CDVPlugin.h>

enum ANONStreamError {
    MEDIA_ERR_ABORTED = 1,
    MEDIA_ERR_NETWORK = 2,
    MEDIA_ERR_DECODE = 3,
    MEDIA_ERR_NONE_SUPPORTED = 4
};
typedef NSUInteger ANONStreamError;

enum ANONStreamStates {
    MEDIA_NONE = 0,
    MEDIA_STARTING = 1,
    MEDIA_RUNNING = 2,
    MEDIA_PAUSED = 3,
    MEDIA_STOPPED = 4
};
typedef NSUInteger ANONStreamStates;

enum ANONStreamMsg {
    MEDIA_STATE = 1,
    MEDIA_DURATION = 2,
    MEDIA_POSITION = 3,
    MEDIA_ERROR = 9
};
typedef NSUInteger ANONStreamMsg;

@interface ANONAudioStreamer : CDVPlugin <AVAudioPlayerDelegate>

@property (nonatomic, strong) NSURL* resourceURL;
@property (nonatomic, strong) AVPlayer* player;

@property (nonatomic, strong) AVAudioSession* avSession;

- (void)startStreamPlayback:(CDVInvokedUrlCommand*)command;
- (void)pauseStreamPlayback:(CDVInvokedUrlCommand*)command;
- (void)stopStreamPlayback:(CDVInvokedUrlCommand*)command;

- (void)setPlayerTitle:(CDVInvokedUrlCommand *)command;

- (void)createStream:(CDVInvokedUrlCommand*)command;
- (void)release:(CDVInvokedUrlCommand*)command;

@end
