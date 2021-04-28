function run(){
  var editor = ace.edit('editor-'+tabnum);
  var output = ace.edit('output-'+tabnum);
  $.ajax({
    url: "/service/cmd",
    type: 'POST',
    data: {cmd: editor.getValue()},
    success: function(result){
      output.setValue(result);
    }
   });
}
var tabnum = 0;
$(document).bind('keydown', 'f9', run);
$(document).ready(function(){
  $("#run").click(run);

  $("#open").click(function(){
    document.getElementById('file-input').click();
  });

  $('.editor').keydown(function(e){
    if (e.keyCode == 120){
      run();
    }
  });

});
var tabChoose = function(ind){
  $("#tabs > li").removeClass("tab-active");
  $(".dsl").hide().eq(ind).fadeIn();
  $("#tabs > li").eq(ind).addClass("tab-active");
  tabnum = ind;
}
var tabAdd = function(name){
  var ind = $('#tabs > li').size();
  $('#tabs').append('<li>'+name+' <span class="tab-close">&#10006</span></li>');
  $('#tabs-wrap').append('<div class="dsl"><div id="editor-'+ind+'" class="editor"></div><hr><div id="output-'+ind+'" class="output"></div></div>');
  var editor = ace.edit("editor-" + ind);
  var output = ace.edit("output-" + ind);
  setupEditor(editor,output);
  tabChoose(ind)
}
$('.dsl:eq(0)').show();
$('#tabs > li:eq(0)').addClass('tab-active');
$(document).on('click', "#tabs > li ", function(e){
  var target = $(e.target);
  if(target.is('span')){return false;}
  var ind = $(this).index();
  tabChoose(ind);
});
$(document).on('click', '.tab-close', function(){
    var ind = $(this).parent().index();
    var _size = $(this).parents('ul').children().size();
    var aktf = $(this).parent().hasClass('tab-active');
    $("#tabs > li").eq(ind).remove();
    $(".dsl").eq(ind).remove();
    if(ind !==0 && _size !==1 && aktf){tabChoose(ind-1)}
    else if(ind === 0 && _size !== 1 && aktf){tabChoose(0)}
});
$(document).on('click', '#tab-add', function(){
    tabAdd('DSL '+ind);
})
