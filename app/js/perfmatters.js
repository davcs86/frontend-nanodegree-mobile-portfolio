"use strict";

// settings for google fonts.
window.WebFontConfig = {
    google: { families: [ "Open+Sans:400,700:latin" ] }
};
// declare empty function for google analytics (just to pass eslint test)
window.ga = function(){};

/**
 * Measuring the Critical Rendering Path with Navigation Timing
 * https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp
 */
function logCRP() {
    var t = window.performance.timing,
        dcl = t.domContentLoadedEventStart - t.domLoading,
        complete = t.domComplete - t.domLoading;
    var stats = document.getElementById("crp-stats");
    stats.textContent = "DCL: " + dcl + "ms, onload: " + complete + "ms";
}
/**
 * Page load event listener, used to log the CRP then load async the Google font
 * and the Google analytics scripts.
 */
window.addEventListener("load", function() {
    logCRP();

    (function() {
        var wf = document.createElement("script");
        wf.src = ("https:" == document.location.protocol ? "https" : "http") +
            "://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js";
        wf.type = "text/javascript";
        wf.async = "true";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(wf, s);
    })();
    (function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,"script","//www.google-analytics.com/analytics.js","ga");

    window.ga("create", "UA-41556333-1", "auto");
    window.ga("send", "pageview");
});
