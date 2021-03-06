/**
 * Created by Administrator on 2018/2/27 0027.
 */
function html5playerRun(conf) {
    var mode = /^\d{0,6}(\%)?$/;
    var width = mode.test(conf.width) ? conf.width : "100%";
    var height = mode.test(conf.height) ? conf.height : "100%";
    this.hlsUrl = conf.hlsUrl;
    this.container = conf.mediaid;
    this.autostart = conf.autostart;
    this.adveDeAddr = conf.adveDeAddr ? conf.adveDeAddr : '';//播放前显示图片地址
    var _this = this;
    var html = "";
    html += "<video x5-video-player-type='h5' x5-video-player-fullscreen='true' webkit-inline='true' x-webkit-airplay='allow' autoplay='autoplay' webkit-playsinline='' playsinline='' x5-video-position='top' preload='auto' id='playVideo' type='application/x-mpegURL'" + "  src=" + this.hlsUrl + "  " + "poster=" + this.adveDeAddr + ">";
    html += "</video>";
    document.getElementById(conf.container).innerHTML = html;



    var myVideo = document.getElementById('playVideo');
    var fswinH = screen.height;
    var fswinW = screen.width;
    var vh = fswinW / 16 * 11;
    myVideo.addEventListener("x5videoenterfullscreen", function () {
        myVideo.style["object-position"] = "0px 0px";
        $("#videoPlayer").css({
            width: "100%",
            position: 'relative',
            top: 0,
            height: vh
        });
        $("#playVideo").css({
            width: "100%",
            height: fswinH
        });
        var chatHeight = screen.height - vh - $('#tabs-h').height() - $('.chat-send-container').height() - 50;
        $("body").addClass("wxfs");
    });
    myVideo.addEventListener("x5videoexitfullscreen", function () {
        $("body").removeClass("tbsfs wxfs");
    });

}

var hlsPlayerLoad = false;
function wsPlayer(conf) {
    var html5FunName, html5FunInterval;
    var conf = conf;
    if (conf.hlsUrl && conf.hlsUrl != '') {
        var playername = 'html5player';
        html5FunName = playername + 'Run';
        var _this = this;
        html5FunInterval = setInterval(function () {
            if (hlsPlayerLoad == true) {
                if (html5FunName in window) {
                    html5playerRun.call(_this, conf);
                    clearInterval(html5FunInterval);
                    return;
                }
                return;
            }
            hlsPlayerLoad = true;
            if (html5FunName && html5FunName in window) {
                clearInterval(html5FunInterval);
                html5playerRun.call(_this, conf);
            }
        }, 100);
    }
    else {
        document.getElementById(conf.container).innerHTML += "hlsUrl地址未传递";
    }
}

