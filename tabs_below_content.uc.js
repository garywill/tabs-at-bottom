/* Firefox userChrome script
 * Tab bar at bottom of window
 * Tested on Firefox 91
 * Author: garywill (https://garywill.github.io)
 */

console.log("tabs_below_content.js");

(() => {

    var tabsbar = document.getElementById("TabsToolbar");
    const below_tabs = document.getElementById("browser");
    
    below_tabs.parentNode.appendChild(tabsbar, below_tabs);

    
    const nav_tb = document.getElementById("navigator-toolbox");
    var tabsbar_fullscr_observer = new MutationObserver(function(){
        if(nav_tb.getAttribute("inFullscreen")) // fullscreen
        {
            if(document.fullscreen) // video fullscreen
            {   
                tabsbar.style.display = "none"; // hide
            }
            else // manually browser fullscreen
            {
                // in css 
            }
        }
        else // not fullscreen
        {
            tabsbar.style.display = "";   // unhide
        }
        
    });
    tabsbar_fullscr_observer.observe(nav_tb,{attributes:true});
    
    
    Components.utils.import("resource:///modules/CustomizableUI.jsm");
    const {Services} = Components.utils.import("resource://gre/modules/Services.jsm", {});
    const sss = Components.classes["@mozilla.org/content/style-sheet-service;1"].getService(Components.interfaces.nsIStyleSheetService);
    
    const tabbar_css = Services.io.newURI( "data:text/css;charset=utf-8," + encodeURIComponent(`
        #TabsToolbar
        {
            background-color: var(--lwt-accent-color-inactive, var(--lwt-accent-color));
            background-image: var(--lwt-header-image), var(--lwt-additional-images);
        }
        
        #TabsToolbar:not([inFullscreen="true"])
        {  
            max-height: var(--tab-min-height) !important;  
            height: var(--tab-min-height) !important;  
            min-height: var(--tab-min-height) !important; 
            
        }
        
        #TabsToolbar[inFullscreen="true"] 
        { 
            max-height: 3px !important;  
            height: 3px !important;
            min-height: 3px !important;
        }
        #TabsToolbar[inFullscreen="true"]  > *
        { 
            max-height: 3px !important;  
        }
        
        #TabsToolbar[inFullscreen="true"]:hover 
        {  
            max-height: var(--tab-min-height) !important;  
            height: var(--tab-min-height) !important;  
            min-height: var(--tab-min-height) !important; 
        }
        
        #TabsToolbar[inFullscreen="true"]:hover  > *
        { 
            visibility: visible !important;  
        }
        
        
        #TabsToolbar  > .toolbar-items
        {
            max-height: var(--tab-min-height) !important;  
            height: var(--tab-min-height) !important;  
        }
    `), null, null );
    
    sss.loadAndRegisterSheet(tabbar_css, sss.USER_SHEET);
    
})();
