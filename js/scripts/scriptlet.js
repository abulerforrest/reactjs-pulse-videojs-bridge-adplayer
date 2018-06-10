(function(w) {

    // short spells
    var DEBUG = true,
        d = w.document,
        b = d.getElementsByTagName("body")[0],
        h = d.getElementsByTagName("head")[0],
        e = d.documentElement,
        r = h || b || e || d.getElementsByTagName("script")[0].parentNode,
        n = w.navigator,
        l = w.location.toString(),
        tok = l.split("?"),
        queries = {},
        debugLabel = "[PSG Toolbox]",
        console_on = {
            log: function() {
                var args = Array.prototype.slice.call(arguments);
                args.unshift("%c" + debugLabel, "padding:1px;border-radius:3px;margin-left:1px;background:#0000cc;color:#fff;");
                w.console.log.apply(w.console, args);
            },
            error: function() {
                var args = Array.prototype.slice.call(arguments);
                args.unshift("%c" + debugLabel, "padding:1px;border-radius:3px;margin-left:1px;background:#cc0000;color:#fff;");
                w.console.error.apply(w.console, args);
            },
            warn: function() {
                var args = Array.prototype.slice.call(arguments);
                args.unshift("%c" + debugLabel, "padding:1px;border-radius:3px;margin-left:1px;background:#ff7700;color:#fff;");
                w.console.warn.apply(w.console, args);
            },
            trace: function() {
                var args = Array.prototype.slice.call(arguments);
                args.unshift("%c" + debugLabel, "padding:1px;border-radius:3px;margin-left:1px;background:#77b300;color:#fff;");
                w.console.trace.apply(w.console, args);
            },
            info: function() {
                var args = Array.prototype.slice.call(arguments);
                args.unshift("%c" + debugLabel, "padding:1px;border-radius:3px;margin-left:1px;background:#2a9fd6;color:#fff;");
                w.console.info.apply(w.console, args);
            }
        },
        console_off = {
            log: function() {},
            error: function() {},
            warn: function() {},
            trace: function() {},
            info: function() {}
        },
        console = !!w.console && DEBUG ? console_on : console_off,
        ads = [],
        initStatus = 0;

    (function() { // checks if DEBUG mode is enabled by serialising and checking the local variables and DOM storages)
        tok = tok[1] ? tok[1] : "";
        tok = tok.indexOf("&") > 0 ? tok.split("&") : [];
        for (var t = 0; t < tok.length; t++) {
            tok[t] = tok[t].split("=");
            if (tok[t][0] && tok[t][1]) queries[tok[t][0]] = tok[t][1];
        }
        DEBUG = DEBUG ||
            (!!queries.debug && (queries.debug === "1" || queries.debug === "true" || queries.debug === "on")) ||
            (!!w.sessionStorage && w.sessionStorage.getItem("psg_debug") === "true") ||
            (!!w.localStorage && w.localStorage.getItem("psg_debug") === "true");
        console = !!w.console && DEBUG ? console_on : console_off;
    })();

    console.log("debug enabled?", DEBUG);

    var AdData = function(ad) {
        this.ad = ad;
        console.log("detected ad:", this.ad);
        this.goalId = this.ad.goalId;
        this.id = this.ad.id;
        this.title = this.ad.title;
        this.campaignId = this.ad.campaignId;
        this.customId = this.ad.customId;
    };

    function createAdData(evt, data) {
        var ad = new AdData(data.ad._ad);
        ads.push(ad);
        console.log("current ad list:", ads);
    }

    function init(evt) {
        if (w.OO.Pulse) {
            console.log("detected Pulse SDK version:", OO.Pulse.Version);
            if (w.OO.Pulse._instance && w.OO.Pulse._instance._adPlayers) {
                console.log("THERE ARE ADPLAYERS... I can smell them!!!...");
                for (var adp in w.OO.Pulse._instance._adPlayers) {
                    var currentAdPlayer = w.OO.Pulse._instance._adPlayers[adp];
                    console.log("found adplayer:", currentAdPlayer);
                    currentAdPlayer.addEventListener(OO.Pulse.AdPlayer.Events.LINEAR_AD_STARTED, createAdData);
                }
            }
        } else if (initStatus === 0) {
            initStatus++;
            console.warn("Pulse SDK is missing or not ready yet -> waiting for pulseready event...");
            w.addEventListener('pulseready', init);
            w.setTimeout(init, 10000);
        } else {
            initStatus++;
            console.warn("Timeout... There is no Pulse SDK in the current environment. Check iframes?");
        }
    }
    w.OO = w.OO || {};
    init();
}(top));
