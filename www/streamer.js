cordova.define("com.anondesigns.cordova.plugins.audiostreamer", function(require, exports, module) {/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

//------------------------------------------------------------------------------

var argscheck = require('cordova/argscheck'),
    utils = require('cordova/utils'),
    exec = require('cordova/exec');
//------------------------------------------------------------------------------
// object that we're exporting
//------------------------------------------------------------------------------
var Streamer = function() {
};

// Media messages
Streamer.MEDIA_STATE = 1;
Streamer.MEDIA_DURATION = 2;
Streamer.MEDIA_POSITION = 3;
Streamer.MEDIA_ERROR = 9;

// Media states
Streamer.MEDIA_NONE = 0;
Streamer.MEDIA_STARTING = 1;
Streamer.MEDIA_RUNNING = 2;
Streamer.MEDIA_PAUSED = 3;
Streamer.MEDIA_STOPPED = 4;
Streamer.MEDIA_MSG = ["None", "Starting", "Running", "Paused", "Stopped"];

               
Streamer.prototype.loadURL = function(src, successCallback, errorCallback, statusCallback) {
   this.src=src;
   this.successCallback = successCallback;
   this.errorCallback = errorCallback;
   this.statusCallback = statusCallback;
   exec(this.successCallback, this.errorCallback, "Streamer", "createStream", [this.src]);
};

               
Streamer.prototype.play = function() {
    exec(null, this.errorCallback, "Streamer", "startStreamPlayback", []);
};

Streamer.prototype.pause = function() {

}

Streamer.prototype.stop = function() {

}

Streamer.prototype.setPlayerTitle = function(title, artist) {
    exec(null, this.errorCallback, "Streamer", "setPlayerTitle", [title, artist]);
}

/**
 * Audio has status update.
 * PRIVATE
 *
 * @param id            The media object id (string)
 * @param msgType       The 'type' of update this is
 * @param value         Use of value is determined by the msgType
 */
Streamer.prototype.onStatus = function(msgType, value) {

               alert('status ' + msgType + ' ' + value);
    if(media) {
        switch(msgType) {
            case Media.MEDIA_STATE :
                media.statusCallback && media.statusCallback(value);
                if(value == Media.MEDIA_STOPPED) {
                    media.successCallback && media.successCallback();
                }
                break;
            case Media.MEDIA_DURATION :
                media._duration = value;
                break;
            case Media.MEDIA_ERROR :
                media.errorCallback && media.errorCallback(value);
                break;
            case Media.MEDIA_POSITION :
                media._position = Number(value);
                break;
            default :
                console.error && console.error("Unhandled Media.onStatus :: " + msgType);
                break;
        }
    }
    else {
         console.error && console.error("Received Media.onStatus callback for unknown media :: " + id);
    }

};

//if(!this['instance']) this.instance = new Streamer();

module.exports = Streamer;

});