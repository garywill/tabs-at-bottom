/* Firefox userChrome script
 * Tab bar at bottom of window
 * Tested on Firefox 78
 * Author: garywill (https://github.com/garywill)
 */

console.log("tabs_below_content.js");

(() => {

    var tabsbar = document.getElementById("TabsToolbar");
    const below_tabs = document.getElementById("browser");
    
    below_tabs.parentNode.appendChild(tabsbar, below_tabs);
    
    for (var i=0; i< document.styleSheets.length; i++ )
    {
        try{
            document.styleSheets[i].insertRule(' #TabsToolbar:not([inFullscreen="true"]) ,#TabsToolbar:hover {  max-height: var(--tab-min-height) !important;  height: var(--tab-min-height) !important;  } ');
            document.styleSheets[i].insertRule(' #TabsToolbar[inFullscreen="true"] { height: 3px; max-height: 3px; } ');
            document.styleSheets[i].insertRule(' #TabsToolbar:hover  > *{ visibility: visible !important;  } ');
            break;
        }catch(err){}
    }
        
    
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
    
})();
