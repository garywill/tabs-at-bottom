// tested on firefox 68
console.log("tabs_below_content.js");

(() => {

    var tabsbar = document.getElementById("TabsToolbar");
    const below_tabs = document.getElementById("content-deck");
    
    below_tabs.parentNode.appendChild(tabsbar, below_tabs);
    
    const nav_tb = document.getElementById("navigator-toolbox");
    var tabsbar_fullscr_observer = new MutationObserver(function(){
        console.log("observer");
        if(nav_tb.getAttribute("inFullscreen")) // fullscreen
        {
            if(document.fullscreen) // video fullscreen
            {   
                console.log("video fullscreen");
                tabsbar.style.display = "none"; // hide
            }
            else // manually browser fullscreen
            {
                // in css file
            }
        }
        else // not fullscreen
        {
            tabsbar.style.display = "";   // unhide
        }
        
    });
    tabsbar_fullscr_observer.observe(nav_tb,{attributes:true});
})();
