/*
 * Title:   Delphinus | Delphinus - Creative Multi-Purpose eCommerce HTML5 - Page Loading Js
 * Author:  http://themeforest.net/user/Kite-Themes
 */

// pace.js should be active
(function($){
    "use strict"; // Start of use strict

    /* ---------------------------------------------
     Scripts initialization
     --------------------------------------------- */

    $(window).load(function() {
        if (typeof Pace != "undefined") {
            var soapPageLoadingContent = false;
            var soapPageLoadingProgressInterval = setInterval(function () {
                try {
                    if (!soapPageLoadingContent) {
                        $('.page-loading-wrapper').appendTo('.pace-activity');
                        soapPageLoadingContent = true;
                    }
                    if ($('body').hasClass("pace-done")) {
                        clearInterval(soapPageLoadingProgressInterval);
                    }
                    if ($('body').hasClass("pace-running")) {
                        var percent = $(".pace-progress").attr('data-progress-text');
                        $('.front-loading').css({'width': percent});
                        $('.progress-bar-number').html(percent);
                        return;
                    }
                } catch (e) { }
            }, 50);
        }
    });
})(jQuery); // End of use strict