!function(a){function b(a){return Math.max(0,Math.round(100*Math.pow(2,a/6))/100)}function c(a,b){var c,d,e=0,f=0,g=0,h=0;return c=a.toExponential().match(/^.\.?(.*)e(.+)$/),e=parseInt(c[2],10)-(c[1]+"").length,c=b.toExponential().match(/^.\.?(.*)e(.+)$/),f=parseInt(c[2],10)-(c[1]+"").length,f>e&&(e=f),d=a%b,-100>e||e>20?(g=Math.round(Math.log(d)/Math.log(10)),h=Math.pow(10,g),(d/h).toFixed(g-e)*h):parseFloat(d.toFixed(-e))}function d(a){return 0===a?1:Math.abs(a)/a}function e(a){return(Math.exp(a)-Math.exp(-a))/(Math.exp(a)+Math.exp(-a))}function f(a,b){return void 0===a?b:a}var g,h,i=function(b){a.AudioContext||(a.AudioContext=a.webkitAudioContext),b||(console.log("tuna.js: Missing audio context! Creating a new context for you."),b=a.AudioContext&&new a.AudioContext),g=b,h=this},j="0.2",k="setValueAtTime",l="linearRampToValueAtTime",m=function(a,b){a.value=b},n=Object.create(null,{activate:{writable:!0,value:function(a){a?(this.input.disconnect(),this.input.connect(this.activateNode),this.activateCallback&&this.activateCallback(a)):(this.input.disconnect(),this.input.connect(this.output))}},bypass:{get:function(){return this._bypass},set:function(a){this._lastBypassValue!==a&&(this._bypass=a,this.activate(!a),this._lastBypassValue=a)}},connect:{value:function(a){this.output.connect(a)}},disconnect:{value:function(a){this.output.disconnect(a)}},connectInOrder:{value:function(a){for(var b=a.length-1;b--;){if(!a[b].connect)return console.error("AudioNode.connectInOrder: TypeError: Not an AudioNode.",a[b]);a[b+1].input?a[b].connect(a[b+1].input):a[b].connect(a[b+1])}}},getDefaults:{value:function(){var a={};for(var b in this.defaults)a[b]=this.defaults[b].value;return a}},automate:{value:function(a,b,c,d){var e,f=d?~~(d/1e3):g.currentTime,h=c?~~(c/1e3):0,i=this.defaults[a],j=this[a];j?i.automatable?(c?(e=l,j.cancelScheduledValues(f),j.setValueAtTime(j.value,f)):e=k,j[e](b,h+f)):j=b:console.error("Invalid Property for "+this.name)}}}),o="float",p="boolean",q="string",r="int";i.prototype.Filter=function(a){a||(a=this.getDefaults()),this.input=g.createGain(),this.activateNode=g.createGain(),this.filter=g.createBiquadFilter(),this.output=g.createGain(),this.activateNode.connect(this.filter),this.filter.connect(this.output),this.frequency=a.frequency||this.defaults.frequency.value,this.Q=a.resonance||this.defaults.Q.value,this.filterType=f(a.filterType,this.defaults.filterType.value),this.gain=f(a.gain,this.defaults.gain.value),this.bypass=a.bypass||!1},i.prototype.Filter.prototype=Object.create(n,{name:{value:"Filter"},defaults:{writable:!0,value:{frequency:{value:800,min:20,max:22050,automatable:!0,type:o},Q:{value:1,min:.001,max:100,automatable:!0,type:o},gain:{value:0,min:-40,max:40,automatable:!0,type:o},bypass:{value:!0,automatable:!1,type:p},filterType:{value:"lowpass",automatable:!1,type:q}}},filterType:{enumerable:!0,get:function(){return this.filter.type},set:function(a){this.filter.type=a}},Q:{enumerable:!0,get:function(){return this.filter.Q},set:function(a){this.filter.Q.value=a}},gain:{enumerable:!0,get:function(){return this.filter.gain},set:function(a){this.filter.gain.value=a}},frequency:{enumerable:!0,get:function(){return this.filter.frequency},set:function(a){this.filter.frequency.value=a}}}),i.prototype.Bitcrusher=function(a){a||(a=this.getDefaults()),this.bufferSize=a.bufferSize||this.defaults.bufferSize.value,this.input=g.createGain(),this.activateNode=g.createGain(),this.processor=g.createScriptProcessor(this.bufferSize,1,1),this.output=g.createGain(),this.activateNode.connect(this.processor),this.processor.connect(this.output);var b,c,d,e,h,i=0,j=0;this.processor.onaudioprocess=function(a){for(b=a.inputBuffer.getChannelData(0),c=a.outputBuffer.getChannelData(0),d=Math.pow(.5,this.bits),h=b.length,e=0;h>e;e++)i+=this.normfreq,i>=1&&(i-=1,j=d*Math.floor(b[e]/d+.5)),c[e]=j},this.bits=a.bits||this.defaults.bits.value,this.normfreq=f(a.normfreq,this.defaults.normfreq.value),this.bypass=a.bypass||!1},i.prototype.Bitcrusher.prototype=Object.create(n,{name:{value:"Bitcrusher"},defaults:{writable:!0,value:{bits:{value:4,min:1,max:16,automatable:!1,type:r},bufferSize:{value:4096,min:256,max:16384,automatable:!1,type:r},bypass:{value:!1,automatable:!1,type:p},normfreq:{value:.1,min:1e-4,max:1,automatable:!1,type:o}}},bits:{enumerable:!0,get:function(){return this.processor.bits},set:function(a){this.processor.bits=a}},normfreq:{enumerable:!0,get:function(){return this.processor.normfreq},set:function(a){this.processor.normfreq=a}}}),i.prototype.Cabinet=function(a){a||(a=this.getDefaults()),this.input=g.createGain(),this.activateNode=g.createGain(),this.convolver=this.newConvolver(a.impulsePath||"../impulses/impulse_guitar.wav"),this.makeupNode=g.createGain(),this.output=g.createGain(),this.activateNode.connect(this.convolver.input),this.convolver.output.connect(this.makeupNode),this.makeupNode.connect(this.output),this.makeupGain=f(a.makeupGain,this.defaults.makeupGain),this.bypass=a.bypass||!1},i.prototype.Cabinet.prototype=Object.create(n,{name:{value:"Cabinet"},defaults:{writable:!0,value:{makeupGain:{value:1,min:0,max:20,automatable:!0,type:o},bypass:{value:!1,automatable:!1,type:p}}},makeupGain:{enumerable:!0,get:function(){return this.makeupNode.gain},set:function(a){this.makeupNode.gain.value=a}},newConvolver:{value:function(a){return new h.Convolver({impulse:a,dryLevel:0,wetLevel:1})}}}),i.prototype.Chorus=function(a){a||(a=this.getDefaults()),this.input=g.createGain(),this.attenuator=this.activateNode=g.createGain(),this.splitter=g.createChannelSplitter(2),this.delayL=g.createDelay(),this.delayR=g.createDelay(),this.feedbackGainNodeLR=g.createGain(),this.feedbackGainNodeRL=g.createGain(),this.merger=g.createChannelMerger(2),this.output=g.createGain(),this.lfoL=new h.LFO({target:this.delayL.delayTime,callback:m}),this.lfoR=new h.LFO({target:this.delayR.delayTime,callback:m}),this.input.connect(this.attenuator),this.attenuator.connect(this.output),this.attenuator.connect(this.splitter),this.splitter.connect(this.delayL,0),this.splitter.connect(this.delayR,1),this.delayL.connect(this.feedbackGainNodeLR),this.delayR.connect(this.feedbackGainNodeRL),this.feedbackGainNodeLR.connect(this.delayR),this.feedbackGainNodeRL.connect(this.delayL),this.delayL.connect(this.merger,0,0),this.delayR.connect(this.merger,0,1),this.merger.connect(this.output),this.feedback=f(a.feedback,this.defaults.feedback.value),this.rate=f(a.rate,this.defaults.rate.value),this.delay=f(a.delay,this.defaults.delay.value),this.depth=f(a.depth,this.defaults.depth.value),this.lfoR.phase=Math.PI/2,this.attenuator.gain.value=.6934,this.lfoL.activate(!0),this.lfoR.activate(!0),this.bypass=a.bypass||!1},i.prototype.Chorus.prototype=Object.create(n,{name:{value:"Chorus"},defaults:{writable:!0,value:{feedback:{value:.4,min:0,max:.95,automatable:!1,type:o},delay:{value:.0045,min:0,max:1,automatable:!1,type:o},depth:{value:.7,min:0,max:1,automatable:!1,type:o},rate:{value:1.5,min:0,max:8,automatable:!1,type:o},bypass:{value:!0,automatable:!1,type:p}}},delay:{enumerable:!0,get:function(){return this._delay},set:function(a){this._delay=4e-4*Math.pow(10,a),this.lfoL.offset=this._delay,this.lfoR.offset=this._delay,this._depth=this._depth}},depth:{enumerable:!0,get:function(){return this._depth},set:function(a){this._depth=a,this.lfoL.oscillation=this._depth*this._delay,this.lfoR.oscillation=this._depth*this._delay}},feedback:{enumerable:!0,get:function(){return this._feedback},set:function(a){this._feedback=a,this.feedbackGainNodeLR.gain.value=this._feedback,this.feedbackGainNodeRL.gain.value=this._feedback}},rate:{enumerable:!0,get:function(){return this._rate},set:function(a){this._rate=a,this.lfoL.frequency=this._rate,this.lfoR.frequency=this._rate}}}),i.prototype.Compressor=function(a){a||(a=this.getDefaults()),this.input=g.createGain(),this.compNode=this.activateNode=g.createDynamicsCompressor(),this.makeupNode=g.createGain(),this.output=g.createGain(),this.compNode.connect(this.makeupNode),this.makeupNode.connect(this.output),this.automakeup=f(a.automakeup,this.defaults.automakeup.value),this.makeupGain=a.makeupGain||this.defaults.makeupGain.value,this.threshold=f(a.threshold,this.defaults.threshold.value),this.release=a.release||this.defaults.release.value,this.attack=f(a.attack,this.defaults.attack.value),this.ratio=a.ratio||this.defaults.ratio.value,this.knee=f(a.knee,this.defaults.knee.value),this.bypass=a.bypass||!1},i.prototype.Compressor.prototype=Object.create(n,{name:{value:"Compressor"},defaults:{writable:!0,value:{threshold:{value:-20,min:-60,max:0,automatable:!0,type:o},release:{value:250,min:10,max:2e3,automatable:!0,type:o},makeupGain:{value:1,min:1,max:100,automatable:!0,type:o},attack:{value:1,min:0,max:1e3,automatable:!0,type:o},ratio:{value:4,min:1,max:50,automatable:!0,type:o},knee:{value:5,min:0,max:40,automatable:!0,type:o},automakeup:{value:!1,automatable:!1,type:p},bypass:{value:!0,automatable:!1,type:p}}},computeMakeup:{value:function(){var a=4,b=this.compNode;return-(b.threshold.value-b.threshold.value/b.ratio.value)/a}},automakeup:{enumerable:!0,get:function(){return this._automakeup},set:function(a){this._automakeup=a,this._automakeup&&(this.makeupGain=this.computeMakeup())}},threshold:{enumerable:!0,get:function(){return this.compNode.threshold},set:function(a){this.compNode.threshold.value=a,this._automakeup&&(this.makeupGain=this.computeMakeup())}},ratio:{enumerable:!0,get:function(){return this.compNode.ratio},set:function(a){this.compNode.ratio.value=a,this._automakeup&&(this.makeupGain=this.computeMakeup())}},knee:{enumerable:!0,get:function(){return this.compNode.knee},set:function(a){this.compNode.knee.value=a,this._automakeup&&(this.makeupGain=this.computeMakeup())}},attack:{enumerable:!0,get:function(){return this.compNode.attack},set:function(a){this.compNode.attack.value=a/1e3}},release:{enumerable:!0,get:function(){return this.compNode.release},set:function(a){this.compNode.release=a/1e3}},makeupGain:{enumerable:!0,get:function(){return this.makeupNode.gain},set:function(a){this.makeupNode.gain.value=b(a)}}}),i.prototype.Convolver=function(a){a||(a=this.getDefaults()),this.input=g.createGain(),this.activateNode=g.createGain(),this.convolver=g.createConvolver(),this.dry=g.createGain(),this.filterLow=g.createBiquadFilter(),this.filterHigh=g.createBiquadFilter(),this.wet=g.createGain(),this.output=g.createGain(),this.activateNode.connect(this.filterLow),this.activateNode.connect(this.dry),this.filterLow.connect(this.filterHigh),this.filterHigh.connect(this.convolver),this.convolver.connect(this.wet),this.wet.connect(this.output),this.dry.connect(this.output),this.dryLevel=f(a.dryLevel,this.defaults.dryLevel.value),this.wetLevel=f(a.wetLevel,this.defaults.wetLevel.value),this.highCut=a.highCut||this.defaults.highCut.value,this.buffer=a.impulse||"../impulses/ir_rev_short.wav",this.lowCut=a.lowCut||this.defaults.lowCut.value,this.level=f(a.level,this.defaults.level.value),this.filterHigh.type="lowpass",this.filterLow.type="highpass",this.bypass=a.bypass||!1},i.prototype.Convolver.prototype=Object.create(n,{name:{value:"Convolver"},defaults:{writable:!0,value:{highCut:{value:22050,min:20,max:22050,automatable:!0,type:o},lowCut:{value:20,min:20,max:22050,automatable:!0,type:o},dryLevel:{value:1,min:0,max:1,automatable:!0,type:o},wetLevel:{value:1,min:0,max:1,automatable:!0,type:o},level:{value:1,min:0,max:1,automatable:!0,type:o}}},lowCut:{get:function(){return this.filterLow.frequency},set:function(a){this.filterLow.frequency.value=a}},highCut:{get:function(){return this.filterHigh.frequency},set:function(a){this.filterHigh.frequency.value=a}},level:{get:function(){return this.output.gain},set:function(a){this.output.gain.value=a}},dryLevel:{get:function(){return this.dry.gain},set:function(a){this.dry.gain.value=a}},wetLevel:{get:function(){return this.wet.gain},set:function(a){this.wet.gain.value=a}},buffer:{enumerable:!1,get:function(){return this.convolver.buffer},set:function(a){var b=this.convolver,c=new XMLHttpRequest;return a?(c.open("GET",a,!0),c.responseType="arraybuffer",c.onreadystatechange=function(){4===c.readyState&&(c.status<300&&c.status>199||302===c.status)&&g.decodeAudioData(c.response,function(a){b.buffer=a},function(a){a&&console.log("Tuna.Convolver.setBuffer: Error decoding data"+a)})},void c.send(null)):void console.log("Tuna.Convolver.setBuffer: Missing impulse path!")}}}),i.prototype.Delay=function(a){a||(a=this.getDefaults()),this.input=g.createGain(),this.activateNode=g.createGain(),this.dry=g.createGain(),this.wet=g.createGain(),this.filter=g.createBiquadFilter(),this.delay=g.createDelay(),this.feedbackNode=g.createGain(),this.output=g.createGain(),this.activateNode.connect(this.delay),this.activateNode.connect(this.dry),this.delay.connect(this.filter),this.filter.connect(this.feedbackNode),this.feedbackNode.connect(this.delay),this.feedbackNode.connect(this.wet),this.wet.connect(this.output),this.dry.connect(this.output),this.delayTime=a.delayTime||this.defaults.delayTime.value,this.feedback=f(a.feedback,this.defaults.feedback.value),this.wetLevel=f(a.wetLevel,this.defaults.wetLevel.value),this.dryLevel=f(a.dryLevel,this.defaults.dryLevel.value),this.cutoff=a.cutoff||this.defaults.cutoff.value,this.filter.type="lowpass",this.bypass=a.bypass||!1},i.prototype.Delay.prototype=Object.create(n,{name:{value:"Delay"},defaults:{writable:!0,value:{delayTime:{value:100,min:20,max:1e3,automatable:!1,type:o},feedback:{value:.45,min:0,max:.9,automatable:!0,type:o},cutoff:{value:2e4,min:20,max:2e4,automatable:!0,type:o},wetLevel:{value:.5,min:0,max:1,automatable:!0,type:o},dryLevel:{value:1,min:0,max:1,automatable:!0,type:o}}},delayTime:{enumerable:!0,get:function(){return this.delay.delayTime},set:function(a){this.delay.delayTime.value=a/1e3}},wetLevel:{enumerable:!0,get:function(){return this.wet.gain},set:function(a){this.wet.gain.value=a}},dryLevel:{enumerable:!0,get:function(){return this.dry.gain},set:function(a){this.dry.gain.value=a}},feedback:{enumerable:!0,get:function(){return this.feedbackNode.gain},set:function(a){this.feedbackNode.gain.value=a}},cutoff:{enumerable:!0,get:function(){return this.filter.frequency},set:function(a){this.filter.frequency.value=a}}}),i.prototype.MoogFilter=function(a){a||(a=this.getDefaults()),this.bufferSize=a.bufferSize||this.defaults.bufferSize.value,this.input=g.createGain(),this.activateNode=g.createGain(),this.processor=g.createScriptProcessor(this.bufferSize,1,1),this.output=g.createGain(),this.activateNode.connect(this.processor),this.processor.connect(this.output);var b,c,d,e,h,i,j,k;b=c=d=e=h=i=j=k=0;var l,m,n,o,p,q;this.processor.onaudioprocess=function(a){for(l=a.inputBuffer.getChannelData(0),m=a.outputBuffer.getChannelData(0),n=1.16*this.cutoff,inputFactor=.35013*n*n*n*n,o=this.resonance*(1-.15*n*n),q=l.length,p=0;q>p;p++)l[p]-=k*o,l[p]*=inputFactor,h=l[p]+.3*b+(1-n)*h,b=l[p],i=h+.3*c+(1-n)*i,c=h,j=i+.3*d+(1-n)*j,d=i,k=j+.3*e+(1-n)*k,e=j,m[p]=k},this.cutoff=f(a.cutoff,this.defaults.cutoff.value),this.resonance=f(a.resonance,this.defaults.resonance.value),this.bypass=a.bypass||!1},i.prototype.MoogFilter.prototype=Object.create(n,{name:{value:"MoogFilter"},defaults:{writable:!0,value:{bufferSize:{value:4096,min:256,max:16384,automatable:!1,type:r},bypass:{value:!1,automatable:!1,type:p},cutoff:{value:.065,min:1e-4,max:1,automatable:!1,type:o},resonance:{value:3.5,min:0,max:4,automatable:!1,type:o}}},cutoff:{enumerable:!0,get:function(){return this.processor.cutoff},set:function(a){this.processor.cutoff=a}},resonance:{enumerable:!0,get:function(){return this.processor.resonance},set:function(a){this.processor.resonance=a}}}),i.prototype.Overdrive=function(a){a||(a=this.getDefaults()),this.input=g.createGain(),this.activateNode=g.createGain(),this.inputDrive=g.createGain(),this.waveshaper=g.createWaveShaper(),this.outputDrive=g.createGain(),this.output=g.createGain(),this.activateNode.connect(this.inputDrive),this.inputDrive.connect(this.waveshaper),this.waveshaper.connect(this.outputDrive),this.outputDrive.connect(this.output),this.ws_table=new Float32Array(this.k_nSamples),this.drive=f(a.drive,this.defaults.drive.value),this.outputGain=f(a.outputGain,this.defaults.outputGain.value),this.curveAmount=f(a.curveAmount,this.defaults.curveAmount.value),this.algorithmIndex=f(a.algorithmIndex,this.defaults.algorithmIndex.value),this.bypass=a.bypass||!1},i.prototype.Overdrive.prototype=Object.create(n,{name:{value:"Overdrive"},defaults:{writable:!0,value:{drive:{value:1,min:0,max:1,automatable:!0,type:o,scaled:!0},outputGain:{value:1,min:0,max:1,automatable:!0,type:o,scaled:!0},curveAmount:{value:.725,min:0,max:1,automatable:!1,type:o},algorithmIndex:{value:0,min:0,max:5,automatable:!1,type:r}}},k_nSamples:{value:8192},drive:{get:function(){return this.inputDrive.gain},set:function(a){this._drive=a}},curveAmount:{get:function(){return this._curveAmount},set:function(a){this._curveAmount=a,void 0===this._algorithmIndex&&(this._algorithmIndex=0),this.waveshaperAlgorithms[this._algorithmIndex](this._curveAmount,this.k_nSamples,this.ws_table),this.waveshaper.curve=this.ws_table}},outputGain:{get:function(){return this.outputDrive.gain},set:function(a){this._outputGain=b(a)}},algorithmIndex:{get:function(){return this._algorithmIndex},set:function(a){this._algorithmIndex=a,this.curveAmount=this._curveAmount}},waveshaperAlgorithms:{value:[function(a,b,c){a=Math.min(a,.9999);var d,e,f=2*a/(1-a);for(d=0;b>d;d++)e=2*d/b-1,c[d]=(1+f)*e/(1+f*Math.abs(e))},function(a,b,c){var d,f,g;for(d=0;b>d;d++)f=2*d/b-1,g=(.5*Math.pow(f+1.4,2)-1)*g>=0?5.8:1.2,c[d]=e(g)},function(a,b,c){var d,f,g,h=1-a;for(d=0;b>d;d++)f=2*d/b-1,g=0>f?-Math.pow(Math.abs(f),h+.04):Math.pow(f,h),c[d]=e(2*g)},function(a,b,c){var e,f,g,h,i=1-a>.99?.99:1-a;for(e=0;b>e;e++)f=2*e/b-1,h=Math.abs(f),i>h?g=h:h>i?g=i+(h-i)/(1+Math.pow((h-i)/(1-i),2)):h>1&&(g=h),c[e]=d(f)*g*(1/((i+1)/2))},function(a,b,c){var d,e;for(d=0;b>d;d++)e=2*d/b-1,-.08905>e?c[d]=-3/4*(1-Math.pow(1-(Math.abs(e)-.032857),12)+1/3*(Math.abs(e)-.032847))+.01:e>=-.08905&&.320018>e?c[d]=-6.153*e*e+3.9375*e:c[d]=.630035},function(a,b,c){var d,e,f=2+Math.round(14*a),g=Math.round(Math.pow(2,f-1));for(d=0;b>d;d++)e=2*d/b-1,c[d]=Math.round(e*g)/g}]}}),i.prototype.Phaser=function(a){a||(a=this.getDefaults()),this.input=g.createGain(),this.splitter=this.activateNode=g.createChannelSplitter(2),this.filtersL=[],this.filtersR=[],this.feedbackGainNodeL=g.createGain(),this.feedbackGainNodeR=g.createGain(),this.merger=g.createChannelMerger(2),this.filteredSignal=g.createGain(),this.output=g.createGain(),this.lfoL=new h.LFO({target:this.filtersL,callback:this.callback}),this.lfoR=new h.LFO({target:this.filtersR,callback:this.callback});for(var b=this.stage;b--;)this.filtersL[b]=g.createBiquadFilter(),this.filtersR[b]=g.createBiquadFilter(),this.filtersL[b].type="allpass",this.filtersR[b].type="allpass";this.input.connect(this.splitter),this.input.connect(this.output),this.splitter.connect(this.filtersL[0],0,0),this.splitter.connect(this.filtersR[0],1,0),this.connectInOrder(this.filtersL),this.connectInOrder(this.filtersR),this.filtersL[this.stage-1].connect(this.feedbackGainNodeL),this.filtersL[this.stage-1].connect(this.merger,0,0),this.filtersR[this.stage-1].connect(this.feedbackGainNodeR),this.filtersR[this.stage-1].connect(this.merger,0,1),this.feedbackGainNodeL.connect(this.filtersL[0]),this.feedbackGainNodeR.connect(this.filtersR[0]),this.merger.connect(this.output),this.rate=f(a.rate,this.defaults.rate.value),this.baseModulationFrequency=a.baseModulationFrequency||this.defaults.baseModulationFrequency.value,this.depth=f(a.depth,this.defaults.depth.value),this.feedback=f(a.feedback,this.defaults.feedback.value),this.stereoPhase=f(a.stereoPhase,this.defaults.stereoPhase.value),this.lfoL.activate(!0),this.lfoR.activate(!0),this.bypass=a.bypass||!1},i.prototype.Phaser.prototype=Object.create(n,{name:{value:"Phaser"},stage:{value:4},defaults:{writable:!0,value:{rate:{value:.1,min:0,max:8,automatable:!1,type:o},depth:{value:.6,min:0,max:1,automatable:!1,type:o},feedback:{value:.7,min:0,max:1,automatable:!1,type:o},stereoPhase:{value:40,min:0,max:180,automatable:!1,type:o},baseModulationFrequency:{value:700,min:500,max:1500,automatable:!1,type:o}}},callback:{value:function(a,b){for(var c=0;4>c;c++)a[c].frequency.value=b}},depth:{get:function(){return this._depth},set:function(a){this._depth=a,this.lfoL.oscillation=this._baseModulationFrequency*this._depth,this.lfoR.oscillation=this._baseModulationFrequency*this._depth}},rate:{get:function(){return this._rate},set:function(a){this._rate=a,this.lfoL.frequency=this._rate,this.lfoR.frequency=this._rate}},baseModulationFrequency:{enumerable:!0,get:function(){return this._baseModulationFrequency},set:function(a){this._baseModulationFrequency=a,this.lfoL.offset=this._baseModulationFrequency,this.lfoR.offset=this._baseModulationFrequency,this._depth=this._depth}},feedback:{get:function(){return this._feedback},set:function(a){this._feedback=a,this.feedbackGainNodeL.gain.value=this._feedback,this.feedbackGainNodeR.gain.value=this._feedback}},stereoPhase:{get:function(){return this._stereoPhase},set:function(a){this._stereoPhase=a;var b=this.lfoL._phase+this._stereoPhase*Math.PI/180;b=c(b,2*Math.PI),this.lfoR._phase=b}}}),i.prototype.Tremolo=function(a){a||(a=this.getDefaults()),this.input=g.createGain(),this.splitter=this.activateNode=g.createChannelSplitter(2),this.amplitudeL=g.createGain(),this.amplitudeR=g.createGain(),this.merger=g.createChannelMerger(2),this.output=g.createGain(),this.lfoL=new h.LFO({target:this.amplitudeL.gain,callback:m}),this.lfoR=new h.LFO({target:this.amplitudeR.gain,callback:m}),this.input.connect(this.splitter),this.splitter.connect(this.amplitudeL,0),this.splitter.connect(this.amplitudeR,1),this.amplitudeL.connect(this.merger,0,0),this.amplitudeR.connect(this.merger,0,1),this.merger.connect(this.output),this.rate=a.rate||this.defaults.rate.value,this.intensity=f(a.intensity,this.defaults.intensity.value),this.stereoPhase=f(a.stereoPhase,this.defaults.stereoPhase.value),this.lfoL.offset=1-this.intensity/2,this.lfoR.offset=1-this.intensity/2,this.lfoL.phase=this.stereoPhase*Math.PI/180,this.lfoL.activate(!0),this.lfoR.activate(!0),this.bypass=a.bypass||!1},i.prototype.Tremolo.prototype=Object.create(n,{name:{value:"Tremolo"},defaults:{writable:!0,value:{intensity:{value:.3,min:0,max:1,automatable:!1,type:o},stereoPhase:{value:0,min:0,max:180,automatable:!1,type:o},rate:{value:5,min:.1,max:11,automatable:!1,type:o}}},intensity:{enumerable:!0,get:function(){return this._intensity},set:function(a){this._intensity=a,this.lfoL.offset=1-this._intensity/2,this.lfoR.offset=1-this._intensity/2,this.lfoL.oscillation=this._intensity,this.lfoR.oscillation=this._intensity}},rate:{enumerable:!0,get:function(){return this._rate},set:function(a){this._rate=a,this.lfoL.frequency=this._rate,this.lfoR.frequency=this._rate}},stereoPhase:{enumerable:!0,get:function(){return this._rate},set:function(a){this._stereoPhase=a;var b=this.lfoL._phase+this._stereoPhase*Math.PI/180;b=c(b,2*Math.PI),this.lfoR.phase=b}}}),i.prototype.WahWah=function(a){a||(a=this.getDefaults()),this.input=g.createGain(),this.activateNode=g.createGain(),this.envelopeFollower=new h.EnvelopeFollower({target:this,callback:function(a,b){a.sweep=b}}),this.filterBp=g.createBiquadFilter(),this.filterPeaking=g.createBiquadFilter(),this.output=g.createGain(),this.activateNode.connect(this.filterBp),this.filterBp.connect(this.filterPeaking),this.filterPeaking.connect(this.output),this.init(),this.automode=f(a.enableAutoMode,this.defaults.automode.value),this.resonance=a.resonance||this.defaults.resonance.value,this.sensitivity=f(a.sensitivity,this.defaults.sensitivity.value),this.baseFrequency=f(a.baseFrequency,this.defaults.baseFrequency.value),this.excursionOctaves=a.excursionOctaves||this.defaults.excursionOctaves.value,this.sweep=f(a.sweep,this.defaults.sweep.value),this.activateNode.gain.value=2,this.envelopeFollower.activate(!0),this.bypass=a.bypass||!1},i.prototype.WahWah.prototype=Object.create(n,{name:{value:"WahWah"},defaults:{writable:!0,value:{automode:{value:!0,automatable:!1,type:p},baseFrequency:{value:.5,min:0,max:1,automatable:!1,type:o},excursionOctaves:{value:2,min:1,max:6,automatable:!1,type:o},sweep:{value:.2,min:0,max:1,automatable:!1,type:o},resonance:{value:10,min:1,max:100,automatable:!1,type:o},sensitivity:{value:.5,min:-1,max:1,automatable:!1,type:o}}},activateCallback:{value:function(a){this.automode=a}},automode:{get:function(){return this._automode},set:function(a){this._automode=a,a?(this.activateNode.connect(this.envelopeFollower.input),this.envelopeFollower.activate(!0)):(this.envelopeFollower.activate(!1),this.activateNode.disconnect(),this.activateNode.connect(this.filterBp))}},filterFreqTimeout:{value:0},setFilterFreq:{value:function(){try{this.filterBp.frequency.value=this._baseFrequency+this._excursionFrequency*this._sweep,this.filterPeaking.frequency.value=this._baseFrequency+this._excursionFrequency*this._sweep}catch(a){clearTimeout(this.filterFreqTimeout),this.filterFreqTimeout=setTimeout(function(){this.setFilterFreq()}.bind(this),0)}}},sweep:{enumerable:!0,get:function(){return this._sweep.value},set:function(a){this._sweep=Math.pow(a>1?1:0>a?0:a,this._sensitivity),this.setFilterFreq()}},baseFrequency:{enumerable:!0,get:function(){return this._baseFrequency},set:function(a){this._baseFrequency=50*Math.pow(10,2*a),this._excursionFrequency=Math.min(g.sampleRate/2,this.baseFrequency*Math.pow(2,this._excursionOctaves)),this.setFilterFreq()}},excursionOctaves:{enumerable:!0,get:function(){return this._excursionOctaves},set:function(a){this._excursionOctaves=a,this._excursionFrequency=Math.min(g.sampleRate/2,this.baseFrequency*Math.pow(2,this._excursionOctaves)),this.setFilterFreq()}},sensitivity:{enumerable:!0,get:function(){return this._sensitivity},set:function(a){this._sensitivity=Math.pow(10,a)}},resonance:{enumerable:!0,get:function(){return this._resonance},set:function(a){this._resonance=a,this.filterPeaking.Q=this._resonance}},init:{value:function(){this.output.gain.value=1,this.filterPeaking.type="peaking",this.filterBp.type="bandpass",this.filterPeaking.frequency.value=100,this.filterPeaking.gain.value=20,this.filterPeaking.Q.value=5,this.filterBp.frequency.value=100,this.filterBp.Q.value=1}}}),i.prototype.EnvelopeFollower=function(a){a||(a=this.getDefaults()),this.input=g.createGain(),this.jsNode=this.output=g.createScriptProcessor(this.buffersize,1,1),this.input.connect(this.output),this.attackTime=f(a.attackTime,this.defaults.attackTime.value),this.releaseTime=f(a.releaseTime,this.defaults.releaseTime.value),this._envelope=0,this.target=a.target||{},this.callback=a.callback||function(){}},i.prototype.EnvelopeFollower.prototype=Object.create(n,{name:{value:"EnvelopeFollower"},defaults:{value:{attackTime:{value:.003,min:0,max:.5,automatable:!1,type:o},releaseTime:{value:.5,min:0,max:.5,automatable:!1,type:o}}},buffersize:{value:256},envelope:{value:0},sampleRate:{value:44100},attackTime:{enumerable:!0,get:function(){return this._attackTime},set:function(a){this._attackTime=a,this._attackC=Math.exp(-1/this._attackTime*this.sampleRate/this.buffersize)}},releaseTime:{enumerable:!0,get:function(){return this._releaseTime},set:function(a){this._releaseTime=a,this._releaseC=Math.exp(-1/this._releaseTime*this.sampleRate/this.buffersize)}},callback:{get:function(){return this._callback},set:function(a){"function"==typeof a?this._callback=a:console.error("tuna.js: "+this.name+": Callback must be a function!")}},target:{get:function(){return this._target},set:function(a){this._target=a}},activate:{value:function(a){this.activated=a,a?(this.jsNode.connect(g.destination),this.jsNode.onaudioprocess=this.returnCompute(this)):(this.jsNode.disconnect(),this.jsNode.onaudioprocess=null)}},returnCompute:{value:function(a){return function(b){a.compute(b)}}},compute:{value:function(a){var b,c,d,e,f=a.inputBuffer.getChannelData(0).length,g=a.inputBuffer.numberOfChannels;if(c=d=e=0,g>1)for(e=0;f>e;++e)for(;g>c;++c)b=a.inputBuffer.getChannelData(c)[e],d+=b*b/g;else for(e=0;f>e;++e)b=a.inputBuffer.getChannelData(0)[e],d+=b*b;d=Math.sqrt(d),this._envelope<d?(this._envelope*=this._attackC,this._envelope+=(1-this._attackC)*d):(this._envelope*=this._releaseC,this._envelope+=(1-this._releaseC)*d),this._callback(this._target,this._envelope)}}}),i.prototype.LFO=function(a){this.output=g.createScriptProcessor(256,1,1),this.activateNode=g.destination,this.frequency=f(a.frequency,this.defaults.frequency.value),this.offset=f(a.offset,this.defaults.offset.value),this.oscillation=f(a.oscillation,this.defaults.oscillation.value),this.phase=f(a.phase,this.defaults.phase.value),this.target=a.target||{},this.output.onaudioprocess=this.callback(a.callback||function(){}),this.bypass=a.bypass||!1},i.prototype.LFO.prototype=Object.create(n,{name:{value:"LFO"},bufferSize:{value:256},sampleRate:{value:44100},defaults:{value:{frequency:{value:1,min:0,max:20,automatable:!1,type:o},offset:{value:.85,min:0,max:22049,automatable:!1,type:o},oscillation:{value:.3,min:-22050,max:22050,automatable:!1,type:o},phase:{value:0,min:0,max:2*Math.PI,automatable:!1,type:o}}},frequency:{get:function(){return this._frequency},set:function(a){this._frequency=a,this._phaseInc=2*Math.PI*this._frequency*this.bufferSize/this.sampleRate}},offset:{get:function(){return this._offset},set:function(a){this._offset=a}},oscillation:{get:function(){return this._oscillation},set:function(a){this._oscillation=a}},phase:{get:function(){return this._phase},set:function(a){this._phase=a}},target:{get:function(){return this._target},set:function(a){this._target=a}},activate:{value:function(a){a?this.output.connect(g.destination):this.output.disconnect(g.destination)}},callback:{value:function(a){var b=this;return function(){b._phase+=b._phaseInc,b._phase>2*Math.PI&&(b._phase=0),a(b._target,b._offset+b._oscillation*Math.sin(b._phase))}}}}),i.toString=i.prototype.toString=function(){return"You are running Tuna version "+j+" by Dinahmoe!"},"function"==typeof define?define("Tuna",[],function(){return i}):a.Tuna=i}(this);