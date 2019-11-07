/*
录音
https://github.com/xiangyuecn/Recorder
src: recorder-core.js
*/
!function(p){"use strict";var v=function(){},R=function(e){return new t(e)};R.IsOpen=function(){var e=R.Stream;if(e){var t=(e.getTracks&&e.getTracks()||e.audioTracks||[])[0];if(t){var n=t.readyState;return"live"==n||n==t.LIVE}}return!1},R.BufferSize=4096,R.Destroy=function(){for(var e in console.log("Recorder Destroy"),n)n[e]()};var n={};R.BindDestroy=function(e,t){n[e]=t},R.Support=function(){var e=p.AudioContext;if(e||(e=p.webkitAudioContext),!e)return!1;var t=navigator.mediaDevices||{};return t.getUserMedia||(t=navigator).getUserMedia||(t.getUserMedia=t.webkitGetUserMedia||t.mozGetUserMedia||t.msGetUserMedia),!!t.getUserMedia&&(R.Scope=t,R.Ctx&&"closed"!=R.Ctx.state||(R.Ctx=new e,R.BindDestroy("Ctx",function(){var e=R.Ctx;e&&e.close&&e.close()})),!0)};R.SampleData=function(e,t,n,a,r){a||(a={});var o=a.index||0,s=a.offset||0,i=a.frameNext||[];r||(r={});var c=r.frameSize||1;r.frameType&&(c="mp3"==r.frameType?1152:1);for(var f=0,u=o;u<e.length;u++)f+=e[u].length;f=Math.max(0,f-Math.floor(s));var l=t/n;1<l?f=Math.floor(f/l):(l=1,n=t),f+=i.length;var p=new Int16Array(f),v=0;for(u=0;u<i.length;u++)p[v]=i[u],v++;for(var m=e.length;o<m;o++){for(var h=e[o],d=(u=s,h.length);u<d;){var S=Math.floor(u),g=Math.ceil(u),_=u-S;p[v]=h[S]+(h[g]-h[S])*_,v++,u+=l}s=u-d}i=null;var M=p.length%c;if(0<M){var x=2*(p.length-M);i=new Int16Array(p.buffer.slice(x)),p=new Int16Array(p.buffer.slice(0,x))}return{index:o,offset:s,frameNext:i,sampleRate:n,data:p}};var a=0;function t(e){this.id=++a;var t={type:"mp3",bitRate:16,sampleRate:16e3,onProcess:v};for(var n in e)t[n]=e[n];this.set=t,this._S=9}R.Sync={O:9,C:9},R.prototype=t.prototype={open:function(e,n){var t=this;e=e||v,n=n||v;var a=function(){e(),t._SO=0},r=function(e,t){/Permission|Allow/i.test(e)?n("用户拒绝了录音权限",!0):!1===p.isSecureContext?n("无权录音(需https)"):/Found/i.test(e)?n(t+"，无可用麦克风"):n(t)},o=R.Sync,s=++o.O,i=o.C;t._O=t._O_=s,t._SO=t._S;var c=function(){if(i!=o.C||!t._O){var e="open被取消";return s==o.O?t.close():e="open被中断",n(e),!0}};if(R.IsOpen())a();else if(R.Support()){var f=function(e){R.Stream=e,c()||setTimeout(function(){c()||(R.IsOpen()?(!function(){var e=R.Ctx,t=R.Stream,n=t._m=e.createMediaStreamSource(t),a=t._p=(e.createScriptProcessor||e.createJavaScriptNode).call(e,R.BufferSize,1,1);n.connect(a),a.connect(e.destination);var f=t._call={};a.onaudioprocess=function(e){for(var t in f){for(var n=e.inputBuffer.getChannelData(0),a=n.length,r=new Int16Array(a),o=0,s=0;s<a;s++){var i=Math.max(-1,Math.min(1,n[s]));i=i<0?32768*i:32767*i,r[s]=i,o+=Math.abs(i)}for(var c in f)f[c](r,o);return}}}(),a()):n("录音功能无效：无音频流"))},100)},u=function(e){var t=e.name||e.message||e.code+":"+e;console.error(e),r(t,"无法录音："+t)},l=R.Scope.getUserMedia({audio:!0},f,u);l&&l.then&&l.then(f)[e&&"catch"](u)}else r("","此浏览器不支持录音")},close:function(e){e=e||v;this._stop();var t=R.Sync;if(this._O=0,this._O_!=t.O)return console.warn("close被忽略"),void e();t.C++;var n,a=R.Stream;if(a){(n=R.Stream)._m&&(n._m.disconnect(),n._p.disconnect(),n._p.onaudioprocess=n._p=n._m=null);for(var r=a.getTracks&&a.getTracks()||a.audioTracks||[],o=0;o<r.length;o++){var s=r[o];s.stop&&s.stop()}a.stop&&a.stop()}R.Stream=0,e()},mock:function(e,t){var n=this;return n._stop(),n.isMock=1,n.buffers=[e],n.recSize=e.length,n.srcSampleRate=t,n},envStart:function(e,t){var n=this,a=n.set;if(n.isMock=e?1:0,n.buffers=[],n.recSize=0,n.envInLast=0,n.envInFirst=0,n.envInFix=0,n.envInFixTs=[],a.sampleRate=Math.min(t,a.sampleRate),n.srcSampleRate=t,n.engineCtx=0,n[a.type+"_start"]){var r=n.engineCtx=n[a.type+"_start"](a);r&&(r.pcmDatas=[],r.pcmSize=0)}},envResume:function(){this.envInFixTs=[]},envIn:function(e,t){var n=this,a=n.set,r=n.engineCtx,o=e.length;n.recSize+=o;var s=n.buffers;s.push(e);var i,c=t/o;i=c<1251?Math.round(c/1250*10):Math.round(Math.min(100,Math.max(0,100*(1+Math.log(c/1e4)/Math.log(10)))));var f=n.srcSampleRate,u=n.recSize,l=Date.now(),p=Math.round(o/f*1e3);n.envInLast=l,1==n.buffers.length&&(n.envInFirst=l-p);var v=n.envInFixTs;v.splice(0,0,{t:l,d:p});for(var m=l,h=0,d=0;d<v.length;d++){var S=v[d];if(3e3<l-S.t){v.length=d;break}m=S.t,h+=S.d}var g=v[1],_=l-m;if(_/3<_-h&&(g&&1e3<_||6<=v.length)){var M=l-g.t-p;if(p/5<M){var x=!a.disableEnvInFix;if(console.warn("["+l+"]"+(x?"":"未")+"补偿"+M+"ms"),n.envInFix+=M,x){var y=new Int16Array(M*f/1e3);n.recSize+=y.length,s.push(y)}}}if(r){var I=R.SampleData(s,f,a.sampleRate,r.chunkInfo);r.chunkInfo=I,r.pcmSize+=I.data.length,u=r.pcmSize,(s=r.pcmDatas).push(I.data),f=I.sampleRate,n[a.type+"_encode"](r,I.data)}var w=Math.round(u/f*1e3);a.onProcess(s,i,w,f)},start:function(){if(R.IsOpen()){console.log("["+Date.now()+"]Start");var e=this,t=(e.set,R.Ctx);if(e._stop(),e.state=0,e.envStart(0,t.sampleRate),e._SO&&e._SO+1!=e._S)console.warn("start被中断");else{e._SO=0;var n=function(){e.state=1,e.resume()};"suspended"==t.state?t.resume().then(function(){console.log("ctx resume"),n()}):n()}}else console.error("未open")},pause:function(){this.state&&(this.state=2,delete R.Stream._call[this.id])},resume:function(){var n=this;n.state&&(n.state=1,n.envResume(),R.Stream._call[n.id]=function(e,t){1==n.state&&n.envIn(e,t)})},_stop:function(e){var t=this,n=t.set;t.isMock||t._S++,t.state&&(t.pause(),t.state=0),!e&&t[n.type+"_stop"]&&(t[n.type+"_stop"](t.engineCtx),t.engineCtx=0)},stop:function(n,t,e){var a,r=this,o=r.set;console.log("["+Date.now()+"]Stop "+(r.envInLast?r.envInLast-r.envInFirst+"ms 补"+r.envInFix+"ms":"-"));var s=function(){r._stop(),e&&r.close()},i=function(e){t&&t(e),s()},c=function(e,t){console.log("["+Date.now()+"]结束 编码"+(Date.now()-a)+"ms 音频"+t+"ms/"+e.size+"b"),e.size<Math.max(100,t/2)?i("生成的"+o.type+"无效"):(n&&n(e,t),s())};if(!r.isMock){if(!r.state)return void i("未开始录音");r._stop(!0)}var f=r.recSize;if(f)if(r.buffers[0])if(r[o.type]){var u=r.engineCtx;if(r[o.type+"_complete"]&&u){u.pcmDatas;var l=Math.round(u.pcmSize/o.sampleRate*1e3);return a=Date.now(),void r[o.type+"_complete"](u,function(e){c(e,l)},i)}a=Date.now();var p=R.SampleData(r.buffers,r.srcSampleRate,o.sampleRate);o.sampleRate=p.sampleRate;var v=p.data;l=Math.round(v.length/o.sampleRate*1e3);console.log("采样"+f+"->"+v.length+" 花:"+(Date.now()-a)+"ms"),setTimeout(function(){a=Date.now(),r[o.type](v,function(e){c(e,l)},function(e){i(e)})})}else i("未加载"+o.type+"编码器");else i("音频被释放");else i("未采集到录音")}},p.Recorder&&p.Recorder.Destroy(),(p.Recorder=R).LM="2019-11-7 21:47:48"}(window);