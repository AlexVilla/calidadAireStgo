function replaceAll( text, busca, reemplaza ){
  while (text.toString().indexOf(busca) != -1)
      text = text.toString().replace(busca,reemplaza);
  return text;
}

var jqxhr = $.ajax({
    url: 'http://pronostico.mma.gob.cl/ws/calidadaire_json_v2.php',
    dataType: 'text',
    scriptCharset: 'utf-8',
    crossDomain: true
});

  jqxhr.done(function() {
    //alert( "success" );
    //$('body').append('<div><p>'+jqxhr.responseText+'</p></div>');
    var value = jqxhr.responseText;
    var value = value.replace('{','');
    var value = value.replace('}','');
    // $('body').append('<div><p>'+value+'</p></div>');
    var separators = [','];
    var array = value.split(new RegExp(separators.join('|'),'g'));
    var badData = [];
    for (var i = 0; i <= array.length - 2; i++) {
      if(i==0){
        badData[i] = array[0]+" "+array[1];
      }
      else{
        badData[i] = array[i+1];
      }
      //$('body').append('<div><p> i = '+i +' <strong>' +badData[i]+'</strong></p></div>');
    }
    var data = {};
    for (var i = 0; i <= array.length - 2; i++) {
      var help = badData[i].split(':');
      data[replaceAll(help[0], '\'', '')] = replaceAll(help[1], '\'', '');
    }
    //$('body').append('<div><p>'+Object.keys(data)+'</p></div>');
    $('body').append('<div class="fecha full-width"><p>'+data.fecha+'</p></div>');
    $('body').append('<div class="fecha full-width"><p>TIPO DE RESTRICCION '+data.tipo_alerta+'</p></div>');
    $('body').append('<div class="fecha full-width"><p>Restricción Cataliticos: '+data.csv+'</p></div>');

  })
  jqxhr.fail(function() {
    //alert( "error" );
  })
  jqxhr.always(function() {
    //alert( "complete" );
  });