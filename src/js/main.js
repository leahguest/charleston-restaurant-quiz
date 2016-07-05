


var CryptoJS=CryptoJS||function(a,b){var c={},d=c.lib={},e=function(){},f=d.Base={extend:function(a){e.prototype=this;var b=new e;return a&&b.mixIn(a),b.hasOwnProperty("init")||(b.init=function(){b.$super.init.apply(this,arguments)}),b.init.prototype=b,b.$super=this,b},create:function(){var a=this.extend();return a.init.apply(a,arguments),a},init:function(){},mixIn:function(a){for(var b in a)a.hasOwnProperty(b)&&(this[b]=a[b]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},g=d.WordArray=f.extend({init:function(a,c){a=this.words=a||[],this.sigBytes=c!=b?c:4*a.length},toString:function(a){return(a||i).stringify(this)},concat:function(a){var b=this.words,c=a.words,d=this.sigBytes;if(a=a.sigBytes,this.clamp(),d%4)for(var e=0;a>e;e++)b[d+e>>>2]|=(c[e>>>2]>>>24-8*(e%4)&255)<<24-8*((d+e)%4);else if(65535<c.length)for(e=0;a>e;e+=4)b[d+e>>>2]=c[e>>>2];else b.push.apply(b,c);return this.sigBytes+=a,this},clamp:function(){var b=this.words,c=this.sigBytes;b[c>>>2]&=4294967295<<32-8*(c%4),b.length=a.ceil(c/4)},clone:function(){var a=f.clone.call(this);return a.words=this.words.slice(0),a},random:function(b){for(var c=[],d=0;b>d;d+=4)c.push(4294967296*a.random()|0);return new g.init(c,b)}}),h=c.enc={},i=h.Hex={stringify:function(a){var b=a.words;a=a.sigBytes;for(var c=[],d=0;a>d;d++){var e=b[d>>>2]>>>24-8*(d%4)&255;c.push((e>>>4).toString(16)),c.push((15&e).toString(16))}return c.join("")},parse:function(a){for(var b=a.length,c=[],d=0;b>d;d+=2)c[d>>>3]|=parseInt(a.substr(d,2),16)<<24-4*(d%8);return new g.init(c,b/2)}},j=h.Latin1={stringify:function(a){var b=a.words;a=a.sigBytes;for(var c=[],d=0;a>d;d++)c.push(String.fromCharCode(b[d>>>2]>>>24-8*(d%4)&255));return c.join("")},parse:function(a){for(var b=a.length,c=[],d=0;b>d;d++)c[d>>>2]|=(255&a.charCodeAt(d))<<24-8*(d%4);return new g.init(c,b)}},k=h.Utf8={stringify:function(a){try{return decodeURIComponent(escape(j.stringify(a)))}catch(b){throw Error("Malformed UTF-8 data")}},parse:function(a){return j.parse(unescape(encodeURIComponent(a)))}},l=d.BufferedBlockAlgorithm=f.extend({reset:function(){this._data=new g.init,this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=k.parse(a)),this._data.concat(a),this._nDataBytes+=a.sigBytes},_process:function(b){var c=this._data,d=c.words,e=c.sigBytes,f=this.blockSize,h=e/(4*f),h=b?a.ceil(h):a.max((0|h)-this._minBufferSize,0);if(b=h*f,e=a.min(4*b,e),b){for(var i=0;b>i;i+=f)this._doProcessBlock(d,i);i=d.splice(0,b),c.sigBytes-=e}return new g.init(i,e)},clone:function(){var a=f.clone.call(this);return a._data=this._data.clone(),a},_minBufferSize:0});d.Hasher=l.extend({cfg:f.extend(),init:function(a){this.cfg=this.cfg.extend(a),this.reset()},reset:function(){l.reset.call(this),this._doReset()},update:function(a){return this._append(a),this._process(),this},finalize:function(a){return a&&this._append(a),this._doFinalize()},blockSize:16,_createHelper:function(a){return function(b,c){return new a.init(c).finalize(b)}},_createHmacHelper:function(a){return function(b,c){return new m.HMAC.init(a,c).finalize(b)}}});var m=c.algo={};return c}(Math);!function(){var a=CryptoJS,b=a.lib,c=b.WordArray,d=b.Hasher,e=[],b=a.algo.SHA1=d.extend({_doReset:function(){this._hash=new c.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(a,b){for(var c=this._hash.words,d=c[0],f=c[1],g=c[2],h=c[3],i=c[4],j=0;80>j;j++){if(16>j)e[j]=0|a[b+j];else{var k=e[j-3]^e[j-8]^e[j-14]^e[j-16];e[j]=k<<1|k>>>31}k=(d<<5|d>>>27)+i+e[j],k=20>j?k+((f&g|~f&h)+1518500249):40>j?k+((f^g^h)+1859775393):60>j?k+((f&g|f&h|g&h)-1894007588):k+((f^g^h)-899497514),i=h,h=g,g=f<<30|f>>>2,f=d,d=k}c[0]=c[0]+d|0,c[1]=c[1]+f|0,c[2]=c[2]+g|0,c[3]=c[3]+h|0,c[4]=c[4]+i|0},_doFinalize:function(){var a=this._data,b=a.words,c=8*this._nDataBytes,d=8*a.sigBytes;return b[d>>>5]|=128<<24-d%32,b[(d+64>>>9<<4)+14]=Math.floor(c/4294967296),b[(d+64>>>9<<4)+15]=c,a.sigBytes=4*b.length,this._process(),this._hash},clone:function(){var a=d.clone.call(this);return a._hash=this._hash.clone(),a}});a.SHA1=d._createHelper(b),a.HmacSHA1=d._createHmacHelper(b)}(),function(){var a=CryptoJS,b=a.enc.Utf8;a.algo.HMAC=a.lib.Base.extend({init:function(a,c){a=this._hasher=new a.init,"string"==typeof c&&(c=b.parse(c));var d=a.blockSize,e=4*d;c.sigBytes>e&&(c=a.finalize(c)),c.clamp();for(var f=this._oKey=c.clone(),g=this._iKey=c.clone(),h=f.words,i=g.words,j=0;d>j;j++)h[j]^=1549556828,i[j]^=909522486;f.sigBytes=g.sigBytes=e,this.reset()},reset:function(){var a=this._hasher;a.reset(),a.update(this._iKey)},update:function(a){return this._hasher.update(a),this},finalize:function(a){var b=this._hasher;return a=b.finalize(a),b.reset(),b.finalize(this._oKey.clone().concat(a))}})}(),function(){var a=CryptoJS,b=a.lib.WordArray;a.enc.Base64={stringify:function(a){var b=a.words,c=a.sigBytes,d=this._map;a.clamp(),a=[];for(var e=0;c>e;e+=3)for(var f=(b[e>>>2]>>>24-8*(e%4)&255)<<16|(b[e+1>>>2]>>>24-8*((e+1)%4)&255)<<8|b[e+2>>>2]>>>24-8*((e+2)%4)&255,g=0;4>g&&c>e+.75*g;g++)a.push(d.charAt(f>>>6*(3-g)&63));if(b=d.charAt(64))for(;a.length%4;)a.push(b);return a.join("")},parse:function(a){var c=a.length,d=this._map,e=d.charAt(64);e&&(e=a.indexOf(e),-1!=e&&(c=e));for(var e=[],f=0,g=0;c>g;g++)if(g%4){var h=d.indexOf(a.charAt(g-1))<<2*(g%4),i=d.indexOf(a.charAt(g))>>>6-2*(g%4);e[f>>>2]|=(h|i)<<24-8*(f%4),f++}return b.create(e,f)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}}(),window.url=function(){function a(a){return!isNaN(parseFloat(a))&&isFinite(a)}return function(b,c){var d=c||window.location.toString();if(!b)return d;b=b.toString(),"//"===d.substring(0,2)?d="http:"+d:1===d.split("://").length&&(d="http://"+d),c=d.split("/");var e={auth:""},f=c[2].split("@");1===f.length?f=f[0].split(":"):(e.auth=f[0],f=f[1].split(":")),e.protocol=c[0],e.hostname=f[0],e.port=f[1]||("https"===e.protocol.split(":")[0].toLowerCase()?"443":"80"),e.pathname=(c.length>3?"/":"")+c.slice(3,c.length).join("/").split("?")[0].split("#")[0];var g=e.pathname;"/"===g.charAt(g.length-1)&&(g=g.substring(0,g.length-1));var h=e.hostname,i=h.split("."),j=g.split("/");if("hostname"===b)return h;if("domain"===b)return/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(h)?h:i.slice(-2).join(".");if("sub"===b)return i.slice(0,i.length-2).join(".");if("port"===b)return e.port;if("protocol"===b)return e.protocol.split(":")[0];if("auth"===b)return e.auth;if("user"===b)return e.auth.split(":")[0];if("pass"===b)return e.auth.split(":")[1]||"";if("path"===b)return e.pathname;if("."===b.charAt(0)){if(b=b.substring(1),a(b))return b=parseInt(b,10),i[0>b?i.length+b:b-1]||""}else{if(a(b))return b=parseInt(b,10),j[0>b?j.length+b:b]||"";if("file"===b)return j.slice(-1)[0];if("filename"===b)return j.slice(-1)[0].split(".")[0];if("fileext"===b)return j.slice(-1)[0].split(".")[1]||"";if("?"===b.charAt(0)||"#"===b.charAt(0)){var k=d,l=null;if("?"===b.charAt(0)?k=(k.split("?")[1]||"").split("#")[0]:"#"===b.charAt(0)&&(k=k.split("#")[1]||""),!b.charAt(1))return k;b=b.substring(1),k=k.split("&");for(var m=0,n=k.length;n>m;m++)if(l=k[m].split("="),l[0]===b)return l[1]||"";return null}}return""}}(),"undefined"!=typeof jQuery&&jQuery.extend({url:function(a,b){return window.url(a,b)}}),function(){"use strict";function a(){}function b(a,b,h){h=new f(h).get(),this._httpMethod=new c(a).get(),this._url=new d(b).get(),this._parameters=new e(h).get(),this._rfc3986=new g}function c(a){this._httpMethod=a||""}function d(a){this._url=a||""}function e(a){this._parameters=a||{},this._sortedKeys=[],this._normalizedParameters=[],this._rfc3986=new g,this._sortParameters(),this._concatenateParameters()}function f(a){this._parameters={},this._loadParameters(a||{})}function g(){}function h(a,b,c){this._rfc3986=new g,this._text=a,this._key=this._rfc3986.encode(b)+"&"+this._rfc3986.encode(c),this._base64EncodedHash=new i(this._text,this._key).getBase64EncodedHash()}function i(a,b){this._cryptoJS=j?require("crypto-js"):CryptoJS,this._text=a||"",this._key=b||"",this._hash=this._cryptoJS.HmacSHA1(this._text,this._key)}var j="undefined"!=typeof module&&"undefined"!=typeof module.exports;a.prototype.generate=function(a,c,d,e,f,g){var i=new b(a,c,d).generate(),j=!0;return g&&(j=g.encodeSignature),new h(i,e,f).generate(j)},b.prototype={generate:function(){return this._rfc3986.encode(this._httpMethod)+"&"+this._rfc3986.encode(this._url)+"&"+this._rfc3986.encode(this._parameters)}},c.prototype={get:function(){return this._httpMethod.toUpperCase()}},d.prototype={get:function(){if(!this._url)return this._url;-1==this._url.indexOf("://")&&(this._url="http://"+this._url);var a=j?this.parseInNode():this.parseInBrowser(),b=(a.scheme||"http").toLowerCase(),c=(a.authority||"").toLocaleLowerCase(),d=a.path||"",e=a.port||"";(80==e&&"http"==b||443==e&&"https"==b)&&(e="");var f=b+"://"+c;return f+=e?":"+e:"","/"==d&&-1===this._url.indexOf(f+d)&&(d=""),this._url=(b?b+"://":"")+c+(e?":"+e:"")+d,this._url},parseInBrowser:function(){return{scheme:url("protocol",this._url).toLowerCase(),authority:url("hostname",this._url).toLocaleLowerCase(),port:url("port",this._url),path:url("path",this._url)}},parseInNode:function(){var a=require("uri-js"),b=a.parse(this._url),c=b.scheme;return":"==c.charAt(c.length-1)&&(c=c.substring(0,c.length-1)),{scheme:c,authority:b.host,port:b.port,path:b.path}}},e.prototype={_sortParameters:function(){var a,b;for(a in this._parameters)this._parameters.hasOwnProperty(a)&&(b=this._rfc3986.encode(a),this._sortedKeys.push(b));this._sortedKeys.sort()},_concatenateParameters:function(){var a;for(a=0;a<this._sortedKeys.length;a++)this._normalizeParameter(this._sortedKeys[a])},_normalizeParameter:function(a){var b,c,d=this._rfc3986.decode(a),e=this._parameters[d];for(e.sort(),b=0;b<e.length;b++)c=this._rfc3986.encode(e[b]),this._normalizedParameters.push(a+"="+c)},get:function(){return this._normalizedParameters.join("&")}},f.prototype={_loadParameters:function(a){a instanceof Array?this._loadParametersFromArray(a):"object"==typeof a&&this._loadParametersFromObject(a)},_loadParametersFromArray:function(a){var b;for(b=0;b<a.length;b++)this._loadParametersFromObject(a[b])},_loadParametersFromObject:function(a){var b;for(b in a)a.hasOwnProperty(b)&&this._loadParameterValue(b,a[b]||"")},_loadParameterValue:function(a,b){var c;if(b instanceof Array){for(c=0;c<b.length;c++)this._addParameter(a,b[c]);0==b.length&&this._addParameter(a,"")}else this._addParameter(a,b)},_addParameter:function(a,b){this._parameters[a]||(this._parameters[a]=[]),this._parameters[a].push(b)},get:function(){return this._parameters}},g.prototype={encode:function(a){return a?encodeURIComponent(a).replace(/[!'()]/g,escape).replace(/\*/g,"%2A"):""},decode:function(a){return a?decodeURIComponent(a):""}},h.prototype={generate:function(a){return a===!1?this._base64EncodedHash:this._rfc3986.encode(this._base64EncodedHash)}},i.prototype={getBase64EncodedHash:function(){return this._hash.toString(this._cryptoJS.enc.Base64)}};var k=new a;k.SignatureBaseString=b,k.HttpMethodElement=c,k.UrlElement=d,k.ParametersElement=e,k.ParametersLoader=f,k.Rfc3986=g,k.HmacSha1Signature=h,k.HmacSha1=i,j?module.exports=k:window.oauthSignature=k}();

function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}

function jsonp(url, callbackName, callback) {
    // var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    var script = document.createElement('script');
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}

function toQueryString(json) {
    return '?' + 
        Object.keys(json).map(function(key) {
            return encodeURIComponent(key) + '=' +
                encodeURIComponent(json[key]);
        }).join('&');
}

function yelpSearch(paramObject, callback) {
    var method = 'GET';
    var url = 'http://api.yelp.com/v2/search';
    var jsonpCallback = 'jsonp_callback_' + Math.round(100000 * Math.random());
    var params = {
        location: 'Charleston',
        callback: jsonpCallback,
        oauth_consumer_key: 'h-wltn89ScE47v6id4hqcA', // CONSUMER KEY HERE
        oauth_token: 'MV3lPZmAX5akX2MCTG7y4nVUdaWETxAA', // TOKEN HERE
        oauth_signature_method: 'HMAC-SHA1',
        oauth_timestamp: new Date().getTime(),
        oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
    };

    Object.assign(params, paramObject);

    var consumerSecret = 's-4hhUvi9KGY87mq7jFXmrO6DHc'; // CONSUMER SECRET HERE
    var tokenSecret = 'O2KugOMK3bvoHmj4o4nxniFS7Wo'; // TOKEN SECRET HERE
    var signature = oauthSignature.generate(method, url, params, consumerSecret, tokenSecret, { encodeSignature: false});
    
    params.oauth_signature = signature;    
    
    url += toQueryString(params);
    jsonp(url, jsonpCallback, callback);
}


var header = document.querySelector('#header');

// yelpSearch({
// 	location: 'charleston,sc',
// 	term: 'vegetarian',
// 	radius: '10'
// }, function createItems(data){
// 		var elements = data.businesses.map(function(item) {
// 			var li = document.createElement('li');
// 			li.textContent = item.name;
// 			li.addEventListener('click', function() {
// 				header.setAttribute('src', item.image_url);
// 				// description.innerHTML = item.image_url;
// 			});

// 			return li;
// 		});

// 		elements.forEach(function(li) {
// 			document.body.appendChild(li);
// 		});
// 	});




//Eric helped me write out a basic template to work through this weekend... so this is just a rough outline below ---Bolling 7/1/16
/**
 * Base View constructor
 */

function View (data, tagName) {
    this.el = document.createElement(tagName || 'div');
    this.data = data;
}

// Stub methods.
// A view should render its children and bind any event listeners it needs.
View.prototype.render = function () {};
View.prototype.bindEvents = function () {};

// PersonView

// var data = [
//     { id: 1, name: 'Bolling' },
//     { id: 2, name: 'John' }
// ];

// function PersonView (personObj) {
//     View.call(this, personObj, 'li');
// }

// PersonView.prototype.render = function () {
//     this.el.innerHTML = '<span>' + this.data.name + '</span>';
// };

// PersonView.prototype.bindEvents = function () {
//     var _this = this;
//     this.el.addEventListener('click', function () {
//         // Finding the object in the global `data` array with the same
//         // id that `this.data` has.
//         var item = data.find(function (person) {
//             return person.id === _this.data.id;
//         });
//         // Find the index of that object.
//         var index = data.indexOf(item);
//         // Remove the object.
//         data.splice(item, 1);
//         // Destroy self.
//         _this.el.parentElement.removeChild(_this.el);
//     });
// };

// var pv = new PersonView(data[0]);
// var pv2 = new PersonView(data[1]);

// pv.render();
// pv2.render();

// document.body.appendChild(pv.el);
// document.body.appendChild(pv2.el);

/**
 * App View constructor
 * Instances of AppView should
 *      - Be created with question data (array)
 *      - Generate a QuestionView for each question
 *      - Perform a request when all questions have been answered
 */

function AppView (questions) {
    View.call(this, questions, 'main');
    // Every time a question is answered, it should increment the AppView's answered property.
    // Once this.answered == questions.length, you should run the `this.submit()` function
    this.current = 0;
    this.params = {};
}

AppView.prototype = Object.create(View.prototype);

AppView.prototype.render = function () {
    var questionView;
    var questionList;
    
    // Insert template
    this.el.innerHTML = `
        <ul class="questions"></ul>
        <div class="results"></div>
        <button>Next</button>
    `;

    // Find that newly generated .questions list
    questionList = this.el.querySelector('.questions');

    for (var i = 0; i < this.data.length; i++) {
        questionView = new QuestionView(this.data[i], this.answer.bind(this));
        questionView.render();
        questionList.appendChild(questionView.el);
    }

    questionList.children[0].classList.add('is-active');

    this.bindEvents();
};

AppView.prototype.answer = function (key, value) {
    // Add the corresponding parameter and value to the appview params object.
    this.params[key] = value;
};

AppView.prototype.submit = function () {
    var _this = this;
    // Serialize this.params to a querystring (e.g. ?location=Columbia,SC&term=spaghetti&term=meatballs)
    // Do the request, show the results in this.el.querySelector('.results')
    // var showResults = this.el.querySelector('.results');
    // showResults.addEventListener('click', function () {
        yelpSearch(_this.params, function createItems(data){
            var elements = data.businesses.map(function(item) {
                var li = document.createElement('li');
                li.textContent = item.name;
                li.addEventListener('click', function() {
                    header.setAttribute('src', item.image_url);
                    // description.innerHTML = item.image_url;
                });

                return li;
             });

             elements.forEach(function(li) {
                 document.body.appendChild(li);
             });
        });
    // });
}


AppView.prototype.bindEvents = function () {
    var _this = this;
    // Set up event listeners for this element
    // e.g. Listen for the `'click'` event on <button> and do something
    var nextButton = this.el.querySelector('button');
    var questionList = this.el.querySelector('.questions').children;

    nextButton.addEventListener('click', function () {
        // hide current
        questionList[_this.current].classList.remove('is-active');

        if (_this.current === _this.data.length - 1) {
            _this.submit();
        } else {
            // increment current
            _this.current++;
            // show next
            questionList[_this.current].classList.add('is-active');
        }
    });
};

/**
 * Question View constructor
 * Instances of QuestionView should
 *      - Display the question text
 *      - Display the potential answers
 *      - Respond when user clicks on answer by telling the AppView
 */

function QuestionView (question, answer) {
    View.call(this, question, 'li');
    this.answer = answer;
}

QuestionView.prototype.render = function () {
    this.el.innerHTML = `
        <h3>${this.data.text}</h3>
        <div class="answers"></div>
    `;
    
    var answersList = this.el.querySelector('.answers');
    var answer;

    for (var i = 0; i < this.data.answers.length; i++) {
        answer = document.createElement('div');
        answerImage = document.createElement('img');
        answerImage.setAttribute('src', this.data.answers[i].img);
        answerText = document.createElement('p');
        answerText.textContent = this.data.answers[i].text;
        answer.classList.add('answer');
        answer.dataset.queryKey = this.data.answers[i].queryKey;
        answer.dataset.queryValue = this.data.answers[i].queryValue;
        answer.appendChild(answerImage);
        answer.appendChild(answerText);
        answersList.appendChild(answer);
    }

    this.bindEvents();
};

QuestionView.prototype.bindEvents = function () {
    var _this = this;
    this.el.addEventListener('click', function (e) {
        var target = e.target;
        var question;
        var select = document.querySelector('.answer > img');
        select.classList.add('selected');
        if (target.matches('.answer > img')) {
            question = target.parentElement;
            // this.answer comes from the AppView that created the QuestionView
            _this.answer(question.dataset.queryKey, question.dataset.queryValue);
        }
    });
};

var questions = [
    // QuestionView will take one of these objects and render it as DOM (h3, img, etc)
    {
        image: 'images/treasure-map.png',
        text: 'What\'s your radius?',
        answers: [
            {
                'img': 'images/waiting.jpg',
                'text': 'You don\'t have time to waste time!',
                'queryKey': 'radius_filter',
                'queryValue': '8046'
            },
            {
                'img': 'images/yellow.jpg',
                'text': 'You walk everywhere--Always looking for that potential photo op',
                'queryKey': 'radius_filter',
                'queryValue': '1609'
            }
        ]
    },
    {
        image: 'images/plane.jpg',
        text: 'Where in the world do you want to travel right now...',
        answers: [
            {
                'img':'images/beach.jpg',
                'text': 'Carribean',
                'queryKey': 'category_filter',
                'queryValue': 'mediterranean'
            },
            {
                'img': 'images/chinese-lantern.jpg',
                'text': 'Asian countries',
                'queryKey': 'category_filter',
                'queryValue': 'chinese'
            },
            {
                'img': 'images/italy.png',
                'text': 'Italy',
                'queryKey': 'category_filter',
                'queryValue': 'italian'
            },
            {
                'img': 'images/liberty.jpg',
                'text': 'American',
                'queryKey': 'category_filter',
                'queryValue': 'newamerican'
            }           
        ]
    },
    {
        image: 'images/vs.png',
        text: 'Are you a meat lover?',
        answers: [
            {
                'img':'images/cow.jpg',
                'text': 'Heck yes!',
                'queryKey': 'term',
                'queryValue': 'burger'
            },
            {
                'img': 'images/field.jpg',
                'text': 'The word meat is offensive to me',
                'queryKey': 'term',
                'queryValue': 'vegetarian'
            }       
        ]
    },
    {
        image: 'images/indecision.jpg',
        text: 'Do you consider yourself indecisive?',
        answers: [
            {
                'img':'images/choice.jpg',
                'text': 'Definitely not! You always choose success.',
                'queryKey': 'limit',
                'queryValue': '1'
            },
            {
                'img': 'images/sign.jpg',
                'text': 'MM good question...',
                'queryKey': 'limit',
                'queryValue': '20'
            },
            {
                'img': 'images/road.png',
                'text': 'Somtimes, depends on the question.',
                'queryKey': 'limit',
                'queryValue': '10'
            }           
        ],      
    }
];

var appView = new AppView(questions);

// Call the render function. All views should have a render function that "kicks them off"
appView.render();

document.body.appendChild(appView.el);

