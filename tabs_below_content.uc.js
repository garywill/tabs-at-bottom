/* Firefox userChrome script
 * Tab bar at bottom of window
 * Tested on Firefox 128
 * Author: garywill (https://garywill.github.io)
 */

// ==UserScript==
// @include         main
// ==/UserScript==


console.log("tabs_below_content.js");

(() => {

    var tabsbar = document.getElementById("TabsToolbar");
    const below_tabs = document.getElementById("browser");
    
    below_tabs.parentNode.appendChild(tabsbar, below_tabs);
    tabsbar.setAttribute("flex", "0");

    // #fullscr-toggler [ hidden ]
    // window.fullScreen (R/W bool)
    // window.FullScreen (obj)
    // document.fullscreen (R bool)
    // document.fullscreenElement  (DOM)
    
    const fullscr_toggler = document.getElementById("fullscr-toggler");
    const fullscreen_warning = document.getElementById("fullscreen-warning");
    var tabsbar_fullscr_observer = new MutationObserver(function(){
        // console.log("observer func", fullscr_toggler.getAttribute("hidden"), fullscreen_warning.getAttribute("hidden"));
        if (window.fullScreen)
        {
            // console.log("fullscreen !!!");
            if(document.fullscreenElement) // video fullscreen
            {   
                // console.log("video fullscreen");
                tabsbar.style.display = "none"; // hide
            }
            else // manually browser fullscreen
            {
                // console.log("not video fullscreen");
                tabsbar.style.display = "";   // unhide   
            }
        }
        else // not fullscreen
        {
            tabsbar.style.display = "";   // unhide
        }
        
        
    });
    tabsbar_fullscr_observer.observe(fullscr_toggler,{attributes:true});
    tabsbar_fullscr_observer.observe(fullscreen_warning,{attributes:true});
    
    
    Components.utils.import("resource:///modules/CustomizableUI.jsm");
    const Services = globalThis.Services || ChromeUtils.import("resource://gre/modules/Services.jsm").Services; 
    const sss = Components.classes["@mozilla.org/content/style-sheet-service;1"].getService(Components.interfaces.nsIStyleSheetService);
    
    const tabbar_css = Services.io.newURI( "data:text/css;charset=utf-8," + encodeURIComponent(`
        #TabsToolbar
        {
            background-color: var(--lwt-accent-color-inactive, var(--lwt-accent-color));
            background-image: var(--lwt-header-image), var(--lwt-additional-images);
        }
        
    `), null, null );
    
    sss.loadAndRegisterSheet(tabbar_css, sss.USER_SHEET);
    
})();
