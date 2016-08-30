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

var editor = ace.edit("editor");
editor.setTheme("ace/theme/chrome");
editor.getSession().setMode("ace/mode/php");
editor.setReadOnly(true);

var heightUpdateFunction = function () {

    // http://stackoverflow.com/questions/11584061/
    var newHeight =
        editor.getSession().getScreenLength()
        * editor.renderer.lineHeight
        + editor.renderer.scrollBar.getWidth();

    $('#editor').height(newHeight.toString() + "px");
    $('.code-container').height((parseInt(newHeight) + 58)+ "px");

    // This call is required for the editor to fix all of
    // its inner structure for adapting to a change in size
    editor.resize();
};

heightUpdateFunction();

editor.getSession().on('change', heightUpdateFunction);

var clipboard = new Clipboard('#copyToClipboard');

clipboard.on('success', function(e) {
    e.clearSelection();
    $('#copyToClipboard').tooltip('show');

    setTimeout(function(){
        $('#copyToClipboard').tooltip('hide');
    }, 1000);


});

$(window).load(function(){
    $(".loading-screen").hide();
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

