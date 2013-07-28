//
//  ANONAudioStreamer.m
//  RActive
//
//  Created by Neil Martin on 27/07/13.
//
//

#import "ANONAudioStreamer.h"

@implementation ANONAudioStreamer

@synthesize resourceURL, player, avSession;


- (void) startStreamPlayback:(CDVInvokedUrlCommand *)command
{
    [player play];
}

- (void) stopStreamPlayback:(CDVInvokedUrlCommand *)command
{
    [player pause];
}

- (void) pauseStreamPlayback:(CDVInvokedUrlCommand *)command
{
    [player pause];
}

- (void) createStream:(CDVInvokedUrlCommand *)command
{
    self.avSession = [AVAudioSession sharedInstance];
    NSError* __autoreleasing err = nil;
    [self.avSession setCategory:AVAudioSessionCategoryPlayback error:&err];
    [self.avSession setActive:YES error:nil];
    
    NSString* resourcePath = [command.arguments objectAtIndex:0];
    resourceURL = [NSURL URLWithString:resourcePath];
    
    player = [AVPlayer playerWithURL:resourceURL];
    [player addObserver:self forKeyPath:@"status" options:0 context:&player];
    
    CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
}

- (void) observeValueForKeyPath:(NSString *)keyPath ofObject:(id)object change:(NSDictionary *)change context:(void *)context
{
    NSString *jsString;
    if([keyPath isEqual: @"status"] && player.status == AVPlayerStatusReadyToPlay) {
        jsString = [NSString stringWithFormat:@"%@(%d,%d);", @"app.player.onStatus", MEDIA_STATE, MEDIA_STOPPED];
        [self.commandDelegate evalJs:jsString];
    }
}

- (void) setPlayerTitle:(CDVInvokedUrlCommand *)command
{
    
    NSString* title = [command.arguments objectAtIndex:0];
    
    UIImage *albumArtImage = [UIImage imageNamed:@"Default-Portrait@2x~ipad"];
    MPMediaItemArtwork *albumArt = [[MPMediaItemArtwork alloc] initWithImage:albumArtImage];
    
    MPNowPlayingInfoCenter *infoCenter = [MPNowPlayingInfoCenter defaultCenter];
    infoCenter.nowPlayingInfo =
    [NSDictionary dictionaryWithObjectsAndKeys:title, MPMediaItemPropertyArtist, albumArt, MPMediaItemPropertyArtwork,
     nil];
}

- (void) release:(CDVInvokedUrlCommand *)command
{
    
}

- (void)onMemoryWarning
{
    [self setAvSession:nil];
    
    [super onMemoryWarning];
}

@end
