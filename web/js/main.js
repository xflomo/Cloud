// Rechtsklick Men�

$('body')
.delegate('[contextmenu]', 'contextmenu', function (e) {
    var contextmenu  = $(this).attr('contextmenu');
    var $contextmenu = $('#' + contextmenu);
    
    if ($contextmenu.length == 0) {
        return;
    }
    
    e.preventDefault();
    e.stopPropagation();
    
    $contextmenu.show();
    $contextmenu.css({
        'top' : (e.pageY - 18) + 'px',
        'left': e.pageX + 'px'
    });
    
    return false;
})

.on({
    'keydown' : function (e) {
        if (e.which == 27) {
            $('menu[type=context]').hide();
        }
    },
    
    'click' : function () {
        $('menu[type=context]').hide();
    }
});

//Prism.plugins.NormalizeWhitespace.setDefaults({
//	'remove-trailing': true,
//	'remove-indent': true,
//	'left-trim': true,
//	'right-trim': true,
//});
//
//Prism.highlightAll();

var heightUpdateFunction = function () {
    if($("#editor").length > 0){
        // http://stackoverflow.com/questions/11584061/
        var newHeight =
            editor.getSession().getScreenLength()
            * editor.renderer.lineHeight
            + editor.renderer.scrollBar.getWidth();

        $('#editor').height((parseInt(newHeight) + 20)+ "px");
        $('.main-container').height((parseInt(newHeight) + 100)+ "px");

        var Range = ace.require('ace/range').Range // get reference to ace/range

        editor.session.addMarker(new Range(16, 0 ,21), "code-marker", "line");

        // This call is required for the editor to fix all of
        // its inner structure for adapting to a change in size
        editor.resize();
    }
};

if($("#editor").length > 0){
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/chrome");
    editor.getSession().setMode("ace/mode/php");
    editor.setReadOnly(true);
    heightUpdateFunction();

    editor.getSession().on('change', heightUpdateFunction);
}



var clipboard = new Clipboard('#copyToClipboard');


clipboard.on('success', function(e) {
    e.clearSelection();
    $.snackbar({content: "Dateiinhalt kopiert!", timeout: 4000});
});

$(window).load(function(){
    $(".loading-screen").hide();
});

$(window).resize(function(){
    heightUpdateFunction();
});

$(document).ready(function(){
	Dropzone.options.myAwesomeDropzone = {
		paramName: "file", // The name that will be used to transfer the file
		maxFilesize: 230, // MB
		clickable: false,
		dictDefaultMessage: "",
	};
});


$( "body" ).on( "click", ".file.folder", function(e) {
    if(e.ctrlKey) {
        $(this).addClass("marked");
    }else{
        $(".file.folder").removeClass("marked");
        $(this).addClass("marked");
    }
});

$( "body" ).on( "click", ".activeEditMode", function(e) {
    $(this).hide();
    $(".safeEditCode").css("display", "inline-block");
    editor.setReadOnly(false);
    editor.focus();
    $(".ace_active-line").show();
});

$( "body" ).on( "click", ".safeEditCode", function(e) {
    $(this).hide();
    $(".activeEditMode").show();
    editor.setReadOnly(true);
    $("#copyContent").val(editor.getValue());
    $(".ace_active-line").hide();
    $.snackbar({content: "Datei gespeichert!", timeout: 4000});
});

$( "body" ).on( "click", ".deleteFile", function(e) {
    deleteFileConfirm();
});

$( "body" ).on( "click", "#VerzAjaxConten tr", function(e) {
    console.log("ss");
    Pace.restart();
});


function deleteFileConfirm(){
    $.confirm({
        title: 'Datei löschen',
        content: 'Möchtest du diese Datei wirklich löschen?',
        closeIcon: true,
        theme: 'material',
        cancelButton: 'abbrechen',
        confirmButton: 'löschen',
        cancel: function(){
        },
        confirm: function(){
            $.alert({
                title: '',
                theme: 'material',
                content: 'Das Team wurde gelöscht.'
            }); // shorthand.
            removeTeam();
        }
    });
}