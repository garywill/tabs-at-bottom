/* Firefox userChrome script
 * Tab bar at bottom of window
 * Tested on Firefox 140
 * Author: garywill (https://garywill.github.io)
 */

// ==UserScript==
// @include         main
// ==/UserScript==


console.log("tabs_below_content.uc.js");

(() => {

    const Services = globalThis.Services || ChromeUtils.import("resource://gre/modules/Services.jsm").Services;
    const sss = Components.classes["@mozilla.org/content/style-sheet-service;1"].getService(Components.interfaces.nsIStyleSheetService);


    // always loaded css
    const tabbar_css = Services.io.newURI( "data:text/css;charset=utf-8," + encodeURIComponent(`
        #TabsToolbar {
            position: fixed;
            bottom: 0px;
            width: 100%;

            background-image: var(--lwt-header-image, var(--lwt-additional-images) ) ;
            background-color: var(--toolbar-bgcolor, var(--toolbar-field-background-color, var(--lwt-accent-color-inactive, var(--lwt-accent-color)))) !important;
        }
        #fake_tabbar {
            height: var(--tabstrip-min-height);
        }
    `), null, null );
    if ( ! sss.sheetRegistered(tabbar_css, sss.USER_SHEET) )
        sss.loadAndRegisterSheet(tabbar_css, sss.USER_SHEET);



    // loaded when tab bar shown (eg: not fullscreen)
    const css_tabbar_shown = `
        #TabsToolbar {
        }
        #browser {
        }
    `;

    // loaded when tab bar totally hidden (eg: all fullscreen)
    const css_tabbar_hidden = `
        #TabsToolbar {
            display: none;
        }
        #fake_tabbar {
            display: none;
        }
        #browser {
        }
    `;



    const style_tag = document.createElement("style");
    style_tag.id = "styletag_tabbarbelowcontent";
    document.head.appendChild(style_tag);

    function show_tabbar() {
        style_tag.textContent = css_tabbar_shown;
    }
    function hide_tabbar() {
        style_tag.textContent = css_tabbar_hidden;
    }


    const tabsbar = document.getElementById("TabsToolbar");
    const fake_tabbar = document.createElement("toolbox");
    fake_tabbar.id = "fake_tabbar";
    const ele_browser = document.getElementById("browser");
    ele_browser.parentNode.appendChild(fake_tabbar, ele_browser);


    // tabsbar.setAttribute("flex", "0");

    // #fullscr-toggler [ hidden ]
    // window.fullScreen (R/W bool)
    // window.FullScreen (obj)
    // document.fullscreen (R bool)
    // document.fullscreenElement  (DOM)
    
    let status_fullscreen;
    let status_tabbarvertical;

    const fullscr_toggler = document.getElementById("fullscr-toggler");
    const fullscreen_warning = document.getElementById("fullscreen-warning");
    var tabsbar_fullscr_observer = new MutationObserver(check_status_fullscreen);
    function check_status_fullscreen(){
        if (window.fullScreen)
        {
            console.log("fullscreen !!!");
            if(document.fullscreenElement) // video fullscreen
            {   
                console.log("fullscreen video");
                status_fullscreen = true;
            }
            else // manually browser fullscreen
            {
                console.log("fullscreen non-video");
                status_fullscreen = false;
            }
        }
        else // not fullscreen
        {
            console.log("not fullscreen");
            status_fullscreen = false;
        }
        update_css();
    }

    tabsbar_fullscr_observer.observe(fullscr_toggler,{attributes:true});
    tabsbar_fullscr_observer.observe(fullscreen_warning,{attributes:true});
    
    

    const box_vertical_tabs = document.getElementById("vertical-tabs");
    box_vertical_tabs_observer = new MutationObserver(check_status_tabbarvertical);
    function check_status_tabbarvertical() {
        if (box_vertical_tabs.querySelector('tabs'))
        {
            console.log('tabbar is vertical');
            status_tabbarvertical = true;
        }
        else
        {
            console.log('tabbar not vertical');
            status_tabbarvertical = false;
        }
        update_css();
    }
    box_vertical_tabs_observer.observe(box_vertical_tabs, {childList: true});

    function update_css() {
        if (status_fullscreen || status_tabbarvertical) {
            console.log('hide_tabbar()')
            hide_tabbar();
        }else{
            console.log('show_tabbar()')
            show_tabbar();
        }
    }
    check_status_fullscreen();
    check_status_tabbarvertical();
})();
