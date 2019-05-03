$(function(){

    $('#loader').hide();
	var urlAction = '/v1/clients/upload';

	$('#fileupload').fileupload({
		acceptFileTypes: /(\.|\/)(csv)$/i,
        url: urlAction,
        dataType: 'json',
    	beforeSend : function(request){
            $('#loader').show();
        },
        complete: function (data, error) {
            $('#loader').hide();
        },
        done : function(e, data){
            alert('Carga Realizada com sucesso.');
        },
        error : function(data, error){
            alert(data.responseText);
        },
    })
    .on('fileuploadprocessalways', function (e, data) {

        var name = data.files[0].name;

	    if(data.files[0].error == 'File type not allowed')
	    	alert('Extensão permitida CSV. Extensão invalida para o arquivo : ' + name);

	    if(!data.files.error) {
            $('#loader').show();
	    	data.submit();
        }
	});

});