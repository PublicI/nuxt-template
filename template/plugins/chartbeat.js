/* eslint-disable */

export default ({ app }) => {
    //Chartbeat
    window._sf_async_config={};
    /** CONFIGURATION START **/
    _sf_async_config.uid = 2241;
    _sf_async_config.domain = "publicintegrity.org";
    _sf_async_config.path = window.location.pathname;
    _sf_async_config.title = '{{ name }}';
    /** CONFIGURATION END **/
    (function(){
        function loadChartbeat() {
            window._sf_endpt=(new Date()).getTime();
            var e = document.createElement("script");
            e.setAttribute("language", "javascript");
            e.setAttribute("type", "text/javascript");
            e.setAttribute("src",
                    (("https:" == document.location.protocol) ?
                        "https://static.chartbeat.com/" :
                        "http://static.chartbeat.com/") +
                    "js/chartbeat.js");
            document.body.appendChild(e);
        }
        var oldonload = window.onload;
        window.onload = (typeof window.onload != "function") ?
            loadChartbeat : function() { oldonload(); loadChartbeat(); };
    })();

}
