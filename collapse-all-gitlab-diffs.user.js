// ==UserScript==
// @name         Collapse all gitlab diffs
// @namespace    https://github.com/johanbrandhorst/collapse-gitlab-files
// @version      0.1
// @description  Collapses all files on a GitLab merge request diff page
// @author       Johan Brandhorst
// @grant        none
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @include      https://gitlab.com/*/diffs
// @include      https://gitlab.com/*/diffs*
// @include      https://*.githost.io/*/diffs
// @include      https://*.githost.io/*/diffs*
// ==/UserScript==
//
// Script based on script suggested by Pantelis Geo
// (https://gitlab.com/pantelis.geo.90)
// in https://gitlab.com/gitlab-org/gitlab-ce/issues/24679
// and StackOverflow answer
// http://stackoverflow.com/questions/6480082/add-a-javascript-button-using-greasemonkey-or-tampermonkey
//
// Warning:
// Depends on GitLab supplying jQuery.

waitForKeyElements (".inline-parallel-buttons", function() {
    'use strict';

    var button = document.createElement ('button');
    button.setAttribute ('id', 'collapse-button');
    button.setAttribute ('class', 'btn btn-default');
    button.setAttribute ('type', 'button');
    button.textContent = "Collapse All";
    var buttons = document.getElementsByClassName ("inline-parallel-buttons")[0];
    buttons.insertBefore (button, buttons.firstChild);

    //--- Activate button.
    document.getElementById ("collapse-button").addEventListener(
        "click", CollapseAll, false
    );

    function CollapseAll (zEvent) {
        $(".diff-file").find("div.nothing-here-block").each(function (i){
            if (!$(this).is(":visible")){
                $(this).parents("div.file-holder").find("div.file-title-flex-parent").trigger("click");
            }
        });
    }
});

