This is my readme edit file. I crIn descriptive writing, the author does not tell the reader what was seen, felt, tested, smelled, or heard. Rather, he describes something that he experienced and, through his choice of words, makes it seem real. In other words, descriptive writing is vivid, colorful, and detailed.

Bringing Words to Life

Descriptive writing creates an impression in the reader’s mind of an event, a place, a person, or thing. The writing will be such that it will set a mood or describe something in such detail that if the reader saw it, they would recognize it. Descriptive writing will bring words to life and makes the text interesting.

Some examples of descriptive text include:

The sunset filled the entire sky with the deep color of rubies, setting the clouds ablaze.
The waves crashed and danced along the shore, moving up and down in a graceful and gentle rhythm like they were dancing.
The painting was a field of flowers, with deep and rich blues and yellows atop vibrant green stems that seemed to beckon you to reach right in and pick them.
The old man was stooped and bent, his back making the shape of a C and his head bent so far forward that his beard would nearly have touched his knobby knees had he been just a bit taller.
His deep and soulful blue eyes were like the color of the ocean on the clearest day you can ever imagine.
The soft fur of the dog felt like silk against my skin and her black coloring glistened as it absorbed the sunlight, reflecting it back as a perfect, deep, dark mirror.
Descriptive Text in Literature

Because descriptive text is so powerful, many examples of it can be found in famous literature and poetry. In this excerpt from Jamaica Inn by Daphne du Maurier, notice the writer’s choice of adjectives, adverbs, and verbs.

“It was a cold grey day in late November. The weather had changed overnight, when a backing wind brought a granite sky and a mizzling rain with it, and although it was now only a little after two o'clock in the afternoon the pallor of a winter evening seemed to have closed upon the hills, cloaking them in mist.”

You can see that the writer had to carefully choose his words so that the reader could almost see and feel the weather that was occurring.

Descriptive Text in Songs

Descriptive text examples can also be found in many songs, since songs are meant to capture your emotions and to invoke a feeling.

Notice the vivid description of smoke in this excerpt from Rebecca Harding Davis's "Life in the Iron Mills":

"The idiosyncrasy of this town is smoke. It rolls sullenly in slow folds from the great chimneys of the iron-foundries, and settles down in black, slimy pools on the muddy streets. Smoke on the wharves, smoke on the dingy boats, on the yellow river-- clinging in a coating of greasy soot to the house-front, the two faded poplars, the faces of the passers-by.”

So, now you have many different examples of descriptive text and you can try your own hand at writing a sentence or paragraph that helps to paint a picture and evoke emotions.


The best solution is to create singleton controller for your LED which will queue all commands and execute them with specified delay:

function LedController(timeout) {
  this.timeout = timeout || 100;
  this.queue = [];
  this.ready = true;
}

LedController.prototype.send = function(cmd, callback) {
  sendCmdToLed(cmd);
  if (callback) callback();
  // or simply `sendCmdToLed(cmd, callback)` if sendCmdToLed is async
};

LedController.prototype.exec = function() {
  this.queue.push(arguments);
  this.process();
};

LedController.prototype.process = function() {
  if (this.queue.length === 0) return;
  if (!this.ready) return;
  var self = this;
  this.ready = false;
  this.send.apply(this, this.queue.shift());
  setTimeout(function () {
    self.ready = true;
    self.process();
  }, this.timeout);
};

var Led = new LedController();
Now you can call Led.exec and it'll handle all delays for you:

Led.exec(cmd, function() {
  console.log('Command sent');
});
shareimprove this answer
edited Jan 7 '14 at 10:08
answered Jan 7 '14 at 9:36

Leonid Beschastny
38.7k88 gold badges9292 silver badges106106 bronze badges
3
I can't believe simple things are so complicated in NodeJS. God bless C# and/or Java! – TriCore May 1 '18 at 2:04
2
@TriCore hopefully, NodeJS support ES6 and async/await now. So timeouts and async operations are no longer that complicated. – Leonid Beschastny May 1 '18 at 11:32
6
@TriCore God bless Node for making stupid things so complicated, because blocking a single thread is definitely stupid (this doesn't apply to the answer, which is technically wrong because it's non-blocking). @LeonidBeschastny Actually, generators and co existed at the time when the question was asked. Currently async..await is certainly a way to go. – Estus Flask Jan 22 '19 at 23:04 
add a comment

62

Node is asynchronous by nature, and that's what's great about it, so you really shouldn't be blocking the thread, but as this seems to be for a project controlling LED's, I'll post a workaraound anyway, even if it's not a very good one and shouldn't be used (seriously).

A while loop will block the thread, so you can create your own sleep function

function sleep(time, callback) {
    var stop = new Date().getTime();
    while(new Date().getTime() < stop + time) {
        ;
    }
    callback();
}
to be used as

sleep(1000, function() {
   // executes after one second, and blocks the thread
});
I think this is the only way to block the thread (in principle), keeping it busy in a loop, as Node doesn't have any blocking functionality built in, as it would sorta defeat the purpose of the async behaviour.

shareimprove this answer
edited Jul 16 '14 at 13:47

Denys Séguret
306k6565 gold badges647647 silver badges636636 bronze badges
answered Jan 7 '14 at 8:42

adeneo
276k2222 gold badges321321 silver badges333333 bronze badges
16
I think, the right words are "should never be used", because this is a busy waiting. – Bakudan Jan 7 '14 at 8:45
7
@Bakudan - depends, it should never really be used for a webserver, but Node is used for many other things, and in this case the OP is controlling LED's and specifically asks for something to block the thread, and this does that. – adeneo Jan 7 '14 at 8:51 
7
Personally, I think that Node.js needs sleep-based blocking. It's wrong to suggest that the author(s) of Node knew all scenarios. What if you need to slow down your activities so that you're not overrunning other people's servers and resources? It's bad netiquette to wear out someone else's, say, email server just because you have a million outbound emails to send and your platform of choice doesn't appear to allow anything to add delays. Thanks, adeneo. – Michael Blankenship May 9 '15 at 21:53
2
There are several npm modules available for doing a sleep-based blocking. – Timothy Gu May 23 '15 at 1:16
2
And most of those modules are written after this answer was posted, and using the exact same technique. – adeneo Jul 31 '15 at 22:41
show 11 more comments

30

use Node sleep package. https://www.npmjs.com/package/sleep.

in your code you can use

var sleep = require('sleep'); 
sleep.sleep(n)
to sleep for a specific n seconds.

shareimprove this answer
answered Aug 28 '15 at 6:35

Manoj Sanjeewa
79366 silver badges1818 bronze badges
2
Had install problem on ubuntu.. Here is the solution. github.com/ErikDubbelboer/node-sleep/issues/… – tanaydin Apr 13 '17 at 20:47
well not an elegant approach - needs python installation too. – kiran01bm Dec 16 '19 at 7:28
add a comment

22

Just use child_process.execSync and call the system's sleep function.

//import child_process module
const child_process = require("child_process");
// Sleep for 5 seconds
child_process.execSync("sleep 5");

// Sleep for 250 microseconds
child_process.execSync("usleep 250");

// Sleep for a variable number of microseconds
var numMicroSeconds = 250;
child_process.execFileSync("usleep", [numMicroSeconds]);
I use this in a loop at the top of my main application script to make Node wait until network drives are attached before running the rest of the application.

shareimprove this answerThe best solution is to create singleton controller for your LED which will queue all commands and execute them with specified delay:

function LedController(timeout) {
  this.timeout = timeout || 100;
  this.queue = [];
  this.ready = true;
}

LedController.prototype.send = function(cmd, callback) {
  sendCmdToLed(cmd);
  if (callback) callback();
  // or simply `sendCmdToLed(cmd, callback)` if sendCmdToLed is async
};

LedController.prototype.exec = function() {
  this.queue.push(arguments);
  this.process();
};

LedController.prototype.process = function() {
  if (this.queue.length === 0) return;
  if (!this.ready) return;
  var self = this;
  this.ready = false;
  this.send.apply(this, this.queue.shift());
  setTimeout(function () {
    self.ready = true;
    self.process();
  }, this.timeout);
};

var Led = new LedController();
Now you can call Led.exec and it'll handle all delays for you:

Led.exec(cmd, function() {
  console.log('Command sent');
});
shareimprove this answer
edited Jan 7 '14 at 10:08
answered Jan 7 '14 at 9:36

Leonid Beschastny
38.7k88 gold badges9292 silver badges106106 bronze badges
3
I can't believe simple things are so complicated in NodeJS. God bless C# and/or Java! – TriCore May 1 '18 at 2:04
2
@TriCore hopefully, NodeJS support ES6 and async/await now. So timeouts and async operations are no longer that complicated. – Leonid Beschastny May 1 '18 at 11:32
6
@TriCore God bless Node for making stupid things so complicated, because blocking a single thread is definitely stupid (this doesn't apply to the answer, which is technically wrong because it's non-blocking). @LeonidBeschastny Actually, generators and co existed at the time when the question was asked. Currently async..await is certainly a way to go. – Estus Flask Jan 22 '19 at 23:04 
add a comment

62

Node is asynchronous by nature, and that's what's great about it, so you really shouldn't be blocking the thread, but as this seems to be for a project controlling LED's, I'll post a workaraound anyway, even if it's not a very good one and shouldn't be used (seriously).

A while loop will block the thread, so you can create your own sleep function

function sleep(time, callback) {
    var stop = new Date().getTime();
    while(new Date().getTime() < stop + time) {
        ;
    }
    callback();
}
to be used as

sleep(1000, function() {
   // executes after one second, and blocks the thread
});
I think this is the only way to block the thread (in principle), keeping it busy in a loop, as Node doesn't have any blocking functionality built in, as it would sorta defeat the purpose of the async behaviour.

shareimprove this answer
edited Jul 16 '14 at 13:47

Denys Séguret
306k6565 gold badges647647 silver badges636636 bronze badges
answered Jan 7 '14 at 8:42

adeneo
276k2222 gold badges321321 silver badges333333 bronze badges
16
I think, the right words are "should never be used", because this is a busy waiting. – Bakudan Jan 7 '14 at 8:45
7
@Bakudan - depends, it should never really be used for a webserver, but Node is used for many other things, and in this case the OP is controlling LED's and specifically asks for something to block the thread, and this does that. – adeneo Jan 7 '14 at 8:51 
7
Personally, I think that Node.js needs sleep-based blocking. It's wrong to suggest that the author(s) of Node knew all scenarios. What if you need to slow down your activities so that you're not overrunning other people's servers and resources? It's bad netiquette to wear out someone else's, say, email server just because you have a million outbound emails to send and your platform of choice doesn't appear to allow anything to add delays. Thanks, adeneo. – Michael Blankenship May 9 '15 at 21:53
2
There are several npm modules available for doing a sleep-based blocking. – Timothy Gu May 23 '15 at 1:16
2
And most of those modules are written after this answer was posted, and using the exact same technique. – adeneo Jul 31 '15 at 22:41
show 11 more comments

30

use Node sleep package. https://www.npmjs.com/package/sleep.

in your code you can use

var sleep = require('sleep'); 
sleep.sleep(n)
to sleep for a specific n seconds.

shareimprove this answer
answered Aug 28 '15 at 6:35

Manoj Sanjeewa
79366 silver badges1818 bronze badges
2
Had install problem on ubuntu.. Here is the solution. github.com/ErikDubbelboer/node-sleep/issues/… – tanaydin Apr 13 '17 at 20:47
well not an elegant approach - needs python installation too. – kiran01bm Dec 16 '19 at 7:28
add a comment

22

Just use child_process.execSync and call the system's sleep function.

//import child_process module
const child_process = require("child_process");
// Sleep for 5 seconds
child_process.execSync("sleep 5");

// Sleep for 250 microseconds
child_process.execSync("usleep 250");

// Sleep for a variable number of microseconds
var numMicroSeconds = 250;
child_process.execFileSync("usleep", [numMicroSeconds]);
I use this in a loop at the top of my main application script to make Node wait until network drives are attached before running the rest of the application.

shareimprove this answer