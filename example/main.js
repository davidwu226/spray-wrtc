var S = require('spray-wrtc');

var opts = {deltatime: 1000*60*60,
            webrtc: {trickle:true}};

// # create 3 peers 
var s1 = new S(opts);
var s2 = new S(opts);
var s3 = new S(opts);

var callbacks = function(src, dest){
    return {
        onInitiate: function(offer){
            dest.connection(callbacks(dest, src), offer);
        },
        onAccept: function(offer){
            dest.connection(offer);
        },
        onReady: function(){
            console.log("Connection established");
        }
    };
};

// #1 s1 joins s2 and creates a 2-peers networks
var id1 = s1.connection(callbacks(s1, s2));
// #2 after a bit, s3 joins the network through s1
setTimeout(function(){
    var id2 = s3.connection(callbacks(s3, s1));
}, 5000);


