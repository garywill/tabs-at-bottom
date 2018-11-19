console.log("tabs_below_content.js");

(() => {

    var tabsbar = document.getElementById("TabsToolbar");
    const below_tabs = document.getElementById("browser-bottombox");
    
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
                tabsbar.classList.add("Tabsbar_clps");
            }
        }
        else // not fullscreen
        {
            tabsbar.style.display = "";   // unhide
            tabsbar.classList.remove("Tabsbar_clps");
        }
        
    });
    tabsbar_fullscr_observer.observe(nav_tb,{attributes:true});
})();
