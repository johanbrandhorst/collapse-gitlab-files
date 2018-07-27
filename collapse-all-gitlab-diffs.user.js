// ==UserScript==
// @name         Collapse all gitlab diffs
// @namespace    https://github.com/johanbrandhorst/collapse-gitlab-files
// @version      0.2
// @description  Collapses all files on a GitLab merge request diff page
// @author       Johan Brandhorst
// @grant        none
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @include      https://gitlab.com/*/merge_requests/*
// @include      https://gitlab.com/*/commit/*
// @include      https://*.githost.io/*/merge_requests/*
// @include      https://*.githost.io/*/commit/*
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

    var button = document.createElement ('a');
    button.setAttribute ('id', 'collapse-button');
    button.setAttribute ('class', 'btn btn-default');
    button.textContent = "Collapse All";
    var buttons = document.getElementsByClassName ("inline-parallel-buttons")[0];
    buttons.insertBefore (button, buttons.firstChild);

    //--- Activate button.
    document.getElementById ("collapse-button").addEventListener(
        "click", CollapseAll, false
    );

    function CollapseAll (zEvent) {
        $(".diff-file").find("div.diff-content").each(function (i){
            $(this).parents("div.file-holder").find("div.file-title-flex-parent").trigger("click");
        });
    }
});
