define("app",["exports"],function(e){"use strict";function i(e,i){if(!(e instanceof i))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});e.App=function(){function e(){i(this,e)}return e.prototype.configureRouter=function(e,i){this.router=i,e.title="Word.ly",e.map([{route:"",name:"main",moduleId:"containers/main-page/main-page"}])},e}()}),define("environment",["exports"],function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={debug:!1,testing:!1,gatewayRootURL:"https://pronunciation-service.cfapps.io"}}),define("main",["exports","./environment"],function(e,i){"use strict";function t(e){e.use.standardConfiguration().feature("resources"),n.default.debug&&e.use.developmentLogging(),n.default.testing&&e.use.plugin("aurelia-testing"),e.start().then(function(){return e.setRoot()})}Object.defineProperty(e,"__esModule",{value:!0}),e.configure=t;var n=function(e){return e&&e.__esModule?e:{default:e}}(i);Promise.config({warnings:{wForgottenReturn:!1}})}),define("lib/custom-audio-recorder",["exports"],function(e){"use strict";function i(e,i){if(!(e instanceof i))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var t=function(){function e(t,n){i(this,e),this.permission=!1,this.outputType="audio/mp3; codecs=opus",this.shouldLoop=!1,this.playing=!1,this.recordingStopSuccessCallback=t,this.recordingStopErrorCallback=n}return e.prototype.requestPermission=function(){var e=this;if(navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia,navigator.getUserMedia){var i={audio:!0},t=[],n=function(i){e.mediaRecorder=new MediaRecorder(i),e.mediaStream=i,e.mediaRecorder.onstop=function(i){var n=document.createElement("article");n.classList.add("clip"),e.audio=document.createElement("audio"),e.audio.setAttribute("controls",""),n.appendChild(e.audio),e.audio.controls=!0;var o=new Blob(t,{type:e.outputType});t=[];var r=window.URL.createObjectURL(o);e.audio.src=r,e.blob=o,"function"==typeof e.recordingStopSuccessCallback&&e.recordingStopSuccessCallback(o)},e.mediaRecorder.ondataavailable=function(e){t.push(e.data)}},o=function(i){"function"==typeof e.recordingStopErrorCallback&&e.recordingStopErrorCallback(i)};this.permission=!0,navigator.getUserMedia(i,n,o)}},e.prototype.startRecording=function(){this.mediaRecorder&&this.mediaRecorder.start()},e.prototype.stopRecording=function(){this.mediaRecorder&&this.mediaRecorder.stop()},e.prototype.play=function(){this.audio&&(this.audio.play(),this.playing=!0)},e.prototype.pause=function(){this.audio&&(this.audio.pause(),this.playing=!1)},e.prototype.stop=function(){this.audio&&(this.audio.pause(),this.audio.currentTime=0,this.playing=!1)},e.prototype.loop=function(e){this.audio&&(this.audio.loop=!0===e)},e.prototype.stepBackward=function(){this.audio&&(this.audio.currentTime=0)},e.prototype.stepForward=function(){this.audio&&(this.audio.currentTime=this.audio.duration)},e.prototype.clear=function(){this.audio=null,this.playing=!1},e.prototype.setOutputFileType=function(e){this.outputType="audio/"+e+"; codecs=opus"},e.prototype.hasPermission=function(){return void 0!==this.permission&&!0===this.permission},e.prototype.isLooping=function(){return null!==this.audio&&null!==typeof this.audio&&void 0!==this.audio&&!0===this.audio.loop},e.prototype.isPlaying=function(){return null!==this.audio&&null!==typeof this.audio&&void 0!==this.audio&&!(this.audio.currentTime===this.audio.duration&&!1===this.audio.loop||0===this.audio.currentTime||this.isFinished())},e.prototype.getRecording=function(){return null!==this.audio&&null!==typeof this.audio&&void 0!==this.audio?this.audio:null},e.prototype.getRecordingFile=function(){return this.blob},e.prototype.getStream=function(){return null!==this.mediaStream&&null!==typeof this.mediaStream&&void 0!==this.mediaStream?this.mediaStream:null},e.prototype.getOutputType=function(){return null!==this.outputType&&null!==typeof this.outputType&&void 0!==this.outputType?this.outputType:null},e.prototype.isFinished=function(){return null!==this.audio&&null!==typeof this.audio&&void 0!==this.audio?this.audio.ended:null},e}();e.default=t}),define("lib/word-utils",["exports"],function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.normalizeWord=function(e){return e?e.trim().toLowerCase():e}}),define("resources/index",["exports"],function(e){"use strict";function i(e){e.globalResources(["./elements/audio-recorder","./elements/file-dropper","./attributes/allowed-chars"])}Object.defineProperty(e,"__esModule",{value:!0}),e.configure=i}),define("containers/main-page/main-page",["exports","aurelia-framework","../../lib/word-utils","../../gateways/data/data-api","toastr"],function(e,i,t,n,o){"use strict";function r(e,i,t,n){t&&Object.defineProperty(e,i,{enumerable:t.enumerable,configurable:t.configurable,writable:t.writable,value:t.initializer?t.initializer.call(n):void 0})}function a(e,i){if(!(e instanceof i))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.MainPage=void 0;var s,d,l,u,c=function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(i[t]=e[t]);return i.default=e,i}(o),p=(e.MainPage=(s=(0,i.inject)(Element,n.DataAPI))((l=function(){function e(i,t){a(this,e),r(this,"query",u,this),this.normalizedQuery="",this.element=i,this.api=t,this.handleSavePronunciation=this.handleSavePronunciation.bind(this),this.handlePronunciationFileValidation=this.handlePronunciationFileValidation.bind(this),this.handleSavePronunciationFile=this.handleSavePronunciationFile.bind(this),this.handleSaveNewWord=this.handleSaveNewWord.bind(this)}return e.prototype.activate=function(){this.initDataModel()},e.prototype.attached=function(){this.audioPlayer=new window.Audio,this.initDOMHooks(),this.wireEventListeners()},e.prototype.initDataModel=function(){this.uploadingForWordId=null,this.recordingForWordId=null,this.isUploadingRecording=!1,this.isCreatingWord=!1,this.isUploadingNewWord=!1,this.isRecordingNewWord=!1,this.pronunciationLoadMap={},this.pronunciationCache={},this.queryStoredInBackend=!0,this.isLoadingWords=!1,this.wordsLoadedPct=0},e.prototype.initDOMHooks=function(){this.wordFinderInput=this.element.querySelector("#word-finder"),this.wordFinderErrorLabel=this.element.querySelector("#word-finder-error")},e.prototype.wireEventListeners=function(){var e=this,i=void 0,t=void 0;this.wordFinderInput.addEventListener("disallowed-key",function(){e.wordFinderErrorLabel.classList.remove("fadeOut"),i&&(clearTimeout(i),t&&clearTimeout(t)),e.wordFinderErrorLabel.classList.add("fadeIn"),e.wordFinderErrorLabel.innerText="Words can only contain alphabetical characters",i=setTimeout(function(){e.wordFinderErrorLabel.classList.remove("fadeIn"),e.wordFinderErrorLabel.classList.add("fadeOut"),t=setTimeout(function(){e.wordFinderErrorLabel.innerText=""},500)},1e3)})},e.prototype.queryChanged=function(){this.queryWords()},e.prototype.queryWords=function(){var e=this,i=this.normalizedQuery=(0,t.normalizeWord)(this.query);if(this.queryResult=[],this.queryStoredInBackend=!0,i){this.isLoadingWords=!0,this.loaded=0;var n=function(t){e.wordsLoadedPct=100,setTimeout(function(){e.isLoadingWords=!1,e.queryStoredInBackend=!t||void 0!==t.find(function(e){return e.word===i}),e.queryResult=t},150)};this.api.getWordsRequest(i).withDownloadProgressCallback(function(i){var t=i.loaded,n=i.total;return e.wordsLoadedPct=parseInt(100*t/n,10)}).send().then(function(e){var i=e.content;n(i)}).catch(function(e){f("An unexpected error occurred"),n()})}},e.prototype.playPronunciation=function(e){var i=this,t=function(t){var n=i.pronunciationLoadMap[e]={isAudioLoading:!0,audioLoadedPct:0},o=function(e){n.audioLoadedPct=100,setTimeout(function(){n.isAudioLoading=!1,e&&i.playAudioBlob(e)},150)};i.api.getPronunciationRequest(e).withResponseType("blob").withDownloadProgressCallback(function(e){var i=e.loaded,t=e.total;return n.audioLoadedPct=parseInt(100*i/t,10)}).send().then(function(n){var r=n.content;i.pronunciationCache[e]={audioBlob:r,lastModified:t},o(r)}).catch(function(e){f("An unexpected error occurred"),o()})},n=void 0,o=this.pronunciationCache[e],r=!0;this.api.getWordRequest(e).send().then(function(e){var a=e.content;if(n=a.lastModified,(r=o&&o.lastModified===n)&&o.audioBlob)return void i.playAudioBlob(o.audioBlob);t(n)}).catch(function(e){f("An unexpected error occurred")})},e.prototype.handleRecordPronunciationClick=function(e){if(this.uploadingForWordId=null,this.recordingForWordId===e)return void(this.recordingForWordId=null);this.recordingForWordId=e},e.prototype.handleUploadPronunciationClick=function(e){if(this.recordingForWordId=null,this.uploadingForWordId===e)return void(this.uploadingForWordId=null);this.uploadingForWordId=e},e.prototype.handleSavePronunciation=function(e){var i=this;this.isUploadingRecording=!0,this.api.getWordPronunciationUpdateRequest(this.recordingForWordId,e).send().then(function(){p("Saved!"),i.isUploadingRecording=!1,i.recordingForWordId=null}).catch(function(e){f("An unexpected error occurred"),i.isUploadingRecording=!1})},e.prototype.handleSavePronunciationFile=function(e){var i=this;this.isUploadingRecording=!0,this.api.getWordPronunciationUpdateRequest(this.uploadingForWordId,e).send().then(function(){p("Saved!"),i.isUploadingRecording=!1,i.uploadingForWordId=null}).catch(function(e){f("An unexpected error occurred"),i.isUploadingRecording=!1})},e.prototype.handleSaveNewWord=function(e){var i=this;this.isUploadingRecording=!0,this.api.getWordCreationRequest(this.normalizedQuery,e).send().then(function(){p("Saved!"),i.isUploadingRecording=!1,i.setNotRegisteringWord(),i.queryWords()}).catch(function(e){f("An unexpected error occurred"),i.isUploadingRecording=!1})},e.prototype.setRegisteringWord=function(){this.isCreatingWord=!0,this.isUploadingNewWord=!1,this.isRecordingNewWord=!1},e.prototype.setNotRegisteringWord=function(){this.isCreatingWord=!1,this.isUploadingNewWord=!1,this.isRecordingNewWord=!1},e.prototype.handleRegisterWordClick=function(){this.setRegisteringWord()},e.prototype.handleRegisterWordCancelClick=function(){this.setNotRegisteringWord()},e.prototype.handleNewWordRecordClick=function(){this.isUploadingNewWord=!1,this.isRecordingNewWord=!0},e.prototype.handleNewWordUploadClick=function(){this.isUploadingNewWord=!0,this.isRecordingNewWord=!1},e.prototype.handlePronunciationFileValidation=function(e){var i=[];return"audio/mp3"!==e.type&&i.push("We only accept .mp3 files"),e.size>=1e6&&i.push("The size of the file exceeds 1MB"),i},e.prototype.playAudioBlob=function(e){this.audioPlayer.src=window.URL.createObjectURL(e),this.audioPlayer.play()},e}(),u=function(e,i,t,n,o){var r={};return Object.keys(n).forEach(function(e){r[e]=n[e]}),r.enumerable=!!r.enumerable,r.configurable=!!r.configurable,("value"in r||r.initializer)&&(r.writable=!0),r=t.slice().reverse().reduce(function(t,n){return n(e,i,t)||t},r),o&&void 0!==r.initializer&&(r.value=r.initializer?r.initializer.call(o):void 0,r.initializer=void 0),void 0===r.initializer&&(Object.defineProperty(e,i,r),r=null),r}(l.prototype,"query",[i.bindable],{enumerable:!0,initializer:function(){return""}}),d=l))||d,function(e){c.info(e,"",{timeOut:750})}),f=function(e){c.warning(e,"",{timeOut:1e3})}}),define("gateways/data/data-api",["exports","aurelia-framework","aurelia-http-client","../../environment"],function(e,i,t,n){"use strict";function o(e,i){if(!(e instanceof i))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.DataAPI=void 0;var r,a,s=function(e){return e&&e.__esModule?e:{default:e}}(n);e.DataAPI=(r=(0,i.inject)(t.HttpClient))(a=function(){function e(i){o(this,e),this.client=i.configure(function(e){return e.withBaseUrl(s.default.gatewayRootURL)})}return e.prototype.getWordsRequest=function(e){return this.client.createRequest("/words?query="+e).asGet()},e.prototype.getPronunciationRequest=function(e){return this.client.createRequest("/words/"+e+"/pronunciation").asGet()},e.prototype.getWordRequest=function(e){return this.client.createRequest("/words/"+e).asGet()},e.prototype.getWordPronunciationUpdateRequest=function(e,i){var t=new FormData;return t.append("pronunciation",i),this.client.createRequest("/words/"+e+"/pronunciation").asPut().withContent(t)},e.prototype.getWordCreationRequest=function(e,i){var t=new FormData;return t.append("word",e),t.append("pronunciation",i),this.client.createRequest("/words").asPut().withContent(t)},e}())||a}),define("resources/attributes/allowed-chars",["exports","aurelia-framework"],function(e,i){"use strict";function t(e,i){if(!(e instanceof i))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.AllowedChars=void 0;var n,o,r;e.AllowedChars=(n=(0,i.customAttribute)("allowed-keys"),o=(0,i.inject)(Element),n(r=o(r=function(){function e(i){var n=this;t(this,e),this.element=i,this.enterPressed=function(e){var i=e.key;if(!n.value||!n.value.includes(i))return e.preventDefault(),void n.element.dispatchEvent(new Event("disallowed-key"))}}return e.prototype.attached=function(){this.element.addEventListener("keypress",this.enterPressed)},e.prototype.detached=function(){this.element.removeEventListener("keypress",this.enterPressed)},e}())||r)||r)}),define("resources/elements/audio-recorder",["exports","aurelia-framework","../../lib/custom-audio-recorder"],function(e,i,t){"use strict";function n(e,i,t,n){t&&Object.defineProperty(e,i,{enumerable:t.enumerable,configurable:t.configurable,writable:t.writable,value:t.initializer?t.initializer.call(n):void 0})}function o(e,i){if(!(e instanceof i))throw new TypeError("Cannot call a class as a function")}function r(e,i,t,n,o){var r={};return Object.keys(n).forEach(function(e){r[e]=n[e]}),r.enumerable=!!r.enumerable,r.configurable=!!r.configurable,("value"in r||r.initializer)&&(r.writable=!0),r=t.slice().reverse().reduce(function(t,n){return n(e,i,t)||t},r),o&&void 0!==r.initializer&&(r.value=r.initializer?r.initializer.call(o):void 0,r.initializer=void 0),void 0===r.initializer&&(Object.defineProperty(e,i,r),r=null),r}Object.defineProperty(e,"__esModule",{value:!0}),e.AudioRecorder=void 0;var a,s,d,l,u=function(e){return e&&e.__esModule?e:{default:e}}(t),c=function(){function e(e,i){for(var t=0;t<i.length;t++){var n=i[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(i,t,n){return t&&e(i.prototype,t),n&&e(i,n),i}}();e.AudioRecorder=(a=function(){function e(){o(this,e),n(this,"save",s,this),n(this,"isSaving",d,this),n(this,"durationSeconds",l,this),this.initDataModel(),this.onRecorderSuccess=this.onRecorderSuccess.bind(this)}return e.prototype.initDataModel=function(){this.isAttached=!1,this.isRecording=!1,this.isProcessingRecording=!1,this.audioBlob=null},e.prototype.resetDataModel=function(){this.initDataModel()},e.prototype.attached=function(){var e=this.recorder=new u.default(this.onRecorderSuccess);this.isAttached=!0,e.hasPermission()||e.requestPermission()},e.prototype.onRecorderSuccess=function(e){this.audioBlob=e,this.isProcessingRecording=!1},e.prototype.startRecording=function(){var e=this;if(!this.recorder.hasPermission())return void this.recorder.requestPermission();this.audioBlob=null,this.isRecording=!0,this.timeLeft=parseInt(this.durationSeconds,10);var i=(new Date).getTime()+1e3*this.timeLeft;this.countdownInterval=setInterval(function(){var t=(new Date).getTime(),n=parseInt(Math.round((i-t)/1e3,0),10);e.timeLeft=n>=0?n:0,t>=i&&e.stopRecording()},1e3),this.recorder.startRecording()},e.prototype.stopRecording=function(){this.isRecording=!1,this.isProcessingRecording=!0,this.recorder.stopRecording(),this.countdownInterval&&clearInterval(this.countdownInterval)},e.prototype.playRecording=function(){this.recorder.play()},e.prototype.detached=function(){this.resetDataModel(),this.countdownInterval&&clearInterval(this.countdownInterval)},e.prototype.handleSaveClicked=function(){"function"==typeof this.save?this.save(this.audioBlob):console.warn("No save callback provided")},c(e,[{key:"hasPermission",get:function(){return this.recorder&&this.recorder.hasPermission()}},{key:"hasAudioData",get:function(){return this.audioBlob}},{key:"isPlaying",get:function(){return this.recorder.isPlaying()}}]),e}(),s=r(a.prototype,"save",[i.bindable],{enumerable:!0,initializer:null}),d=r(a.prototype,"isSaving",[i.bindable],{enumerable:!0,initializer:function(){return!1}}),l=r(a.prototype,"durationSeconds",[i.bindable],{enumerable:!0,initializer:function(){return 10}}),a)}),define("resources/elements/file-dropper",["exports","aurelia-framework","jquery"],function(e,i){"use strict";function t(e,i,t,n){t&&Object.defineProperty(e,i,{enumerable:t.enumerable,configurable:t.configurable,writable:t.writable,value:t.initializer?t.initializer.call(n):void 0})}function n(e,i){if(!(e instanceof i))throw new TypeError("Cannot call a class as a function")}function o(e,i,t,n,o){var r={};return Object.keys(n).forEach(function(e){r[e]=n[e]}),r.enumerable=!!r.enumerable,r.configurable=!!r.configurable,("value"in r||r.initializer)&&(r.writable=!0),r=t.slice().reverse().reduce(function(t,n){return n(e,i,t)||t},r),o&&void 0!==r.initializer&&(r.value=r.initializer?r.initializer.call(o):void 0,r.initializer=void 0),void 0===r.initializer&&(Object.defineProperty(e,i,r),r=null),r}Object.defineProperty(e,"__esModule",{value:!0}),e.FileDropper=void 0;var r,a,s,d,l,u,c,p=function(){function e(e,i){for(var t=0;t<i.length;t++){var n=i[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(i,t,n){return t&&e(i.prototype,t),n&&e(i,n),i}}();e.FileDropper=(r=(0,i.inject)(Element))((s=function(){function e(i){n(this,e),t(this,"isSaving",d,this),t(this,"saveFile",l,this),t(this,"validateStagedFile",u,this),t(this,"acceptedTypes",c,this),this.element=i}return e.prototype.attached=function(){this.initializeDataModel(),this.initializeDOMHooks(),this.wireEventListeners()},e.prototype.initializeDataModel=function(){this.stagedFileErrors=[]},e.prototype.initializeDOMHooks=function(){this.$element=$(this.element),this.$dropzone=this.$element.find(".dropzone"),this.$fileInput=this.$dropzone.find('input[type="file"]')},e.prototype.wireEventListeners=function(){var e=this,i=this.$fileInput,t=this.$dropzone,n=function(){var e=document.createElement("div");return("draggable"in e||"ondragstart"in e&&"ondrop"in e)&&"FormData"in window&&"FileReader"in window}();i.on("change",function(i){var t=i.target.files;e.handleNewFileList(t)}),t.on("click",function(e){i.click()}),i.on("click",function(e){e.stopPropagation()}),n&&t.addClass("has-advanced-upload").on("drag dragstart dragend dragover dragenter dragleave drop",function(e){e.preventDefault(),e.stopPropagation()}).on("dragover dragenter",function(){t.addClass("is-dragover")}).on("dragleave dragend drop",function(){t.removeClass("is-dragover")}).on("drop",function(i){var t=i.originalEvent.dataTransfer.files;e.handleNewFileList(t)})},e.prototype.unwireListeners=function(){this.$dropzone.off(),this.$fileInput.off()},e.prototype.handleNewFileList=function(e){if(e.length){var i=this.stagedFile=e[0];"function"==typeof this.validateStagedFile?this.stagedFileErrors=this.validateStagedFile(i):this.stagedFileErrors=[]}else this.stagedFile=null},e.prototype.clear=function(){this.stagedFile=null,this.$fileInput.val(""),this.stagedFileErrors=[]},e.prototype.handleClearClicked=function(){this.clear()},e.prototype.handleSaveClicked=function(){"function"==typeof this.saveFile?this.saveFile(this.stagedFile):console.warn("No save callback provided")},e.prototype.detached=function(){this.clear(),this.unwireListeners()},e.prototype.getByteSizes=function(e){return{kiloBytes:parseInt(Math.round(e/1e3,0),10),megaBytes:parseInt(Math.round(e/1e6,0),10),bytes:e}},e.prototype.getFileSizeString=function(e){var i=this.getByteSizes(e.size);return i.megaBytes?"~"+i.megaBytes+" MB":i.kiloBytes?"~"+i.kiloBytes+" KB":"~"+i.kiloBytes+" bytes"},p(e,[{key:"hasStagedFile",get:function(){return this.stagedFile}},{key:"isStagedFileValid",get:function(){return this.stagedFile&&!this.stagedFileErrors.length}}]),e}(),d=o(s.prototype,"isSaving",[i.bindable],{enumerable:!0,initializer:function(){return!1}}),l=o(s.prototype,"saveFile",[i.bindable],{enumerable:!0,initializer:null}),u=o(s.prototype,"validateStagedFile",[i.bindable],{enumerable:!0,initializer:null}),c=o(s.prototype,"acceptedTypes",[i.bindable],{enumerable:!0,initializer:function(){return""}}),a=s))||a}),define("text!app.html",["module"],function(e){e.exports='<template><div class="container"><router-view></router-view></div></template>'}),define("text!containers/main-page/main-page.html",["module"],function(e){e.exports='<template><require from="./main-page.css"></require><require from="toastr/build/toastr.min.css"></require><div class="page-header" id="banner"><div class="row"><div class="col-lg-8 col-md-7 col-sm-6"><h1>Word.ly</h1><p class="lead">Find and share pronunciations</p></div></div></div><div class="row"><div class="col-sm-12"><input type="text" disabled.bind="isCreatingWord" allowed-keys="AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsŠšZzŽžTtUuVvWwÕõÄäÖöÜüXxYyæÆøØåÅÇÈÉÊÎÔŒÛçèéêîôœû" placeholder="Start typing to find or register pronunciations..." class="form-control" id="word-finder" value.bind="query"><p id="word-finder-error" class="text-danger animated"></p><template if.bind="!queryStoredInBackend && normalizedQuery && !isCreatingWord"><span class="no-entry-label">We have no entries matching \'${normalizedQuery}\'. <a href="#" click.delegate="handleRegisterWordClick()">Register it?</a></span></template><template if.bind="isCreatingWord"><h4>Register \'${normalizedQuery}\'</h4><p>Please provide a pronunciation to register this word</p><div class="btn-group btn-group-justified word-create-group"><div class="btn-group"><button disabled.bind="isUploadingRecording" class="btn btn-default ${isRecordingNewWord ? \'active\' : \'\'}" click.delegate="handleNewWordRecordClick()"><i class="fa fa-microphone"></i> ${recordingForWordId === wordResult.id ? \'Cancel\' : \'Record\'}</button></div><div class="btn-group"><button disabled.bind="isUploadingRecording" class="btn btn-default ${isUploadingNewWord ? \'active\' : \'\'}" click.delegate="handleNewWordUploadClick()"><i class="fa fa-upload"></i> ${uploadingForWordId === wordResult.id ? \'Cancel\' : \'Upload\'}</button></div><div class="btn-group"><button disabled.bind="isUploadingRecording" class="btn btn-warning" click.delegate="handleRegisterWordCancelClick()"><i class="fa fa-times-circle"></i> Cancel</button></div></div><audio-recorder if.bind="isRecordingNewWord" duration-seconds="5" save.bind="handleSaveNewWord" is-saving.bind="isUploadingRecording"></audio-recorder><file-dropper accepted-types=".mp3" ; if.bind="isUploadingNewWord" is-saving.bind="isUploadingRecording" validate-staged-file.bind="handlePronunciationFileValidation" save-file.bind="handleSaveNewWord"></file-dropper></template></div></div><hr><div class="row"><div class="col-sm-12"><div if.bind="isLoadingWords" class="progress progress-striped active"><div class="progress-bar" css="width: ${wordsLoadedPct}%;"></div></div><template if.bind="!isLoadingWords && queryResult.length"><ul class="list-group"><li repeat.for="wordResult of queryResult" class="list-group-item"><h4>${wordResult.word}</h4><div class="btn-group btn-group-justified word-controls-group ${pronunciationLoadMap[wordResult.id].isAudioLoading ? \'\' : \'not-loading\'}" role="group"><div class="btn-group"><button disabled.bind="pronunciationLoadMap[wordResult.id].isAudioLoading" click.delegate="playPronunciation(wordResult.id)" class="btn btn-default"><i if.bind="!pronunciationLoadMap[wordResult.id].isAudioLoading" class="fa fa-music"></i> <i if.bind="pronunciationLoadMap[wordResult.id].isAudioLoading" class="fa fa-circle-o-notch fa-spin"></i> Pronounce</button></div><div class="btn-group"><button disabled.bind="isUploadingRecording" class="btn btn-default ${recordingForWordId === wordResult.id ? \'active\' : \'\'}" click.delegate="handleRecordPronunciationClick(wordResult.id)"><i class="fa fa-microphone"></i> ${recordingForWordId === wordResult.id ? \'Cancel\' : \'Record\'}</button></div><div class="btn-group"><button disabled.bind="isUploadingRecording" class="btn btn-default ${uploadingForWordId === wordResult.id ? \'active\' : \'\'}" click.delegate="handleUploadPronunciationClick(wordResult.id)"><i class="fa fa-upload"></i> ${uploadingForWordId === wordResult.id ? \'Cancel\' : \'Upload\'}</button></div></div><div if.bind="pronunciationLoadMap[wordResult.id].isAudioLoading" class="progress progress-striped active"><div class="progress-bar" css="width: ${pronunciationLoadMap[wordResult.id].audioLoadedPct}%;"></div></div><audio-recorder duration-seconds="5" save.bind="handleSavePronunciation" is-saving.bind="isUploadingRecording" if.bind="recordingForWordId === wordResult.id"></audio-recorder><file-dropper accepted-types=".mp3" ; is-saving.bind="isUploadingRecording" validate-staged-file.bind="handlePronunciationFileValidation" save-file.bind="handleSavePronunciationFile" if.bind="uploadingForWordId === wordResult.id"></file-dropper></li></ul></template><template if.bind="!isLoadingWords && !queryResult.length && normalizedQuery"><h4>No results for \'${normalizedQuery}\'</h4></template></div></div></template>'}),define("text!containers/main-page/main-page.css",["module"],function(e){e.exports=".progress {\n  margin-bottom: 0 !important; }\n\n.word-controls-group.not-loading {\n  margin-bottom: 6px; }\n\n.word-create-group {\n  margin-bottom: 6px; }\n\n.no-entry-label {\n  font-size: 14px;\n  display: inline-block;\n  margin-top: 5px; }\n\n.toast, .toast-message {\n  cursor: default !important; }\n\n#word-finder-error {\n  height: 6px; }\n"}),define("text!resources/elements/audio-recorder.html",["module"],function(e){e.exports='<template><div if.bind="hasPermission && isAttached" class="btn-group btn-group-justified"><div class="btn-group"><button if.bind="!isRecording" disabled.bind="isSaving || isPlaying" click.delegate="startRecording()" class="btn btn-default btn-primary"><i class="fa fa-circle"></i> ${hasAudioData? \'Restart\' : \'Start\'}</button> <button if.bind="isRecording" click.delegate="stopRecording()" disabled.bind="isSaving" class="btn btn-default btn-danger"><i class="fa fa-stop"></i> Stop (${timeLeft})</button></div><div class="btn-group"><button disabled.bind="!hasAudioData || isPlaying || isSaving" class="btn btn-default" click.delegate="playRecording()"><i class="fa fa-music"></i> ${isPlaying? \'Playing\' : \'Play\'}</button></div><div class="btn-group"><button disabled.bind="!hasAudioData || isSaving" click.delegate="handleSaveClicked()" class="btn btn-default btn-success"><i if.bind="!isSaving" class="fa fa-save"></i> <i if.bind="isSaving" class="fa fa-circle-o-notch fa-spin"></i> ${isSaving? \'Saving...\' : \'Save\'}</button></div></div><p if.bind="!hasPermission && isAttached">You have disallowed access to your recording device.</p></template>'}),define("text!resources/elements/file-dropper.css",["module"],function(e){e.exports=".dropzone {\n  font-size: 1.25rem;\n  background-color: #f1f0f0;\n  position: relative;\n  padding-top: 25px;\n  padding-bottom: 25px;\n  cursor: pointer;\n  margin-bottom: 10px; }\n\n.dropzone.has-advanced-upload {\n  outline: 2px dashed #92b0b3;\n  outline-offset: -10px;\n  -webkit-transition: outline-offset .15s ease-in-out, background-color .15s linear;\n  transition: outline-offset .15s ease-in-out, background-color .15s linear; }\n\n.dropzone.is-dragover {\n  outline-offset: -20px;\n  outline-color: #f1f0f0;\n  background-color: #fff; }\n\n.dropzone_dragdrop,\n.dropzone_icon {\n  display: none; }\n\n.dropzone.has-advanced-upload .dropzone_dragdrop {\n  display: inline; }\n\n.dropzone.has-advanced-upload .dropzone_icon {\n  width: 100%;\n  height: 80px;\n  fill: #92b0b3;\n  display: block;\n  margin-bottom: 40px; }\n\n.dropzone_input_ctr {\n  width: 250px;\n  margin: 0 auto; }\n\n@-webkit-keyframes appear-from-inside {\n  from {\n    -webkit-transform: translateY(-50%) scale(0); }\n  75% {\n    -webkit-transform: translateY(-50%) scale(1.1); }\n  to {\n    -webkit-transform: translateY(-50%) scale(1); } }\n\n@keyframes appear-from-inside {\n  from {\n    transform: translateY(-50%) scale(0); }\n  75% {\n    transform: translateY(-50%) scale(1.1); }\n  to {\n    transform: translateY(-50%) scale(1); } }\n\n.staged-file-display {\n  margin-top: 15px; }\n\n.btn-file {\n  position: relative;\n  overflow: hidden; }\n\n.btn-file input[type=file] {\n  position: absolute;\n  top: 0;\n  right: 0;\n  min-width: 100%;\n  min-height: 100%;\n  font-size: 100px;\n  text-align: right;\n  filter: alpha(opacity=0);\n  opacity: 0;\n  outline: none;\n  background: white;\n  cursor: inherit;\n  display: block; }\n"}),define("text!resources/elements/file-dropper.html",["module"],function(e){e.exports='<template><require from="./file-dropper.css"></require><div hidden.bind="hasStagedFile" class="dropzone"><div class="dropzone_input_ctr"><svg class="dropzone_icon" xmlns="http://www.w3.org/2000/svg" width="50" height="43" viewBox="0 0 50 43"><path d="M48.4 26.5c-.9 0-1.7.7-1.7 1.7v11.6h-43.3v-11.6c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v13.2c0 .9.7 1.7 1.7 1.7h46.7c.9 0 1.7-.7 1.7-1.7v-13.2c0-1-.7-1.7-1.7-1.7zm-24.5 6.1c.3.3.8.5 1.2.5.4 0 .9-.2 1.2-.5l10-11.6c.7-.7.7-1.7 0-2.4s-1.7-.7-2.4 0l-7.1 8.3v-25.3c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v25.3l-7.1-8.3c-.7-.7-1.7-.7-2.4 0s-.7 1.7 0 2.4l10 11.6z"/></svg><label class="btn btn-primary btn-file btn-block dropzone_file_input">Browse <input accept="${acceptedTypes}" type="file" hidden></label><label>Drag the file here or click to select</label></div></div><div if.bind="stagedFile" class="well staged-file-display">File: <strong>${stagedFile.name}</strong> <em>${getFileSizeString(stagedFile)}</em></div><template if.bind="stagedFileErrors.length"><div class="panel panel-danger"><div class="panel-heading"><h3 class="panel-title">This file is unacceptable</h3></div><div class="panel-body"><ul><li repeat.for="error of stagedFileErrors">${error}</li></ul></div></div></template><div class="btn-group btn-group-justified"><div class="btn-group"><button disabled.bind="!(hasStagedFile && isStagedFileValid)" click.delegate="handleSaveClicked()" class="btn btn-block btn-success"><i if.bind="!isSaving" class="fa fa-save"></i> <i if.bind="isSaving" class="fa fa-circle-o-notch fa-spin"></i> ${isSaving? \'Saving...\' : \'Save\'}</button></div><div class="btn-group"><button disabled.bind="!(hasStagedFile)" click.delegate="handleClearClicked()" class="btn btn-block btn-warning"><i class="fa fa-times-circle"></i> Clear</button></div></div></template>'});