console.log("tabs_below_content.js");

(() => {

    var tabsbar = document.getElementById("TabsToolbar");
    const below_tabs = document.getElementById("browser-bottombox");
    
    below_tabs.parentNode.appendChild(tabsbar, below_tabs);


})();
