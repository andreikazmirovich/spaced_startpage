/*function getElement(url) {
    request(new XMLHttpRequest());

    function request(xhr) {
        xhr.open('GET', 'https://crossorigin.me/' + url, true);
        xhr.send();
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4) {
                if(xhr.status == 200) {
                    html = document.createElement('div');
                    html.innerHTML = xhr.responseText;
                    console.log(html.innerHTML);
                }
            }
        }
    }
}

getElement("https://www.instagram.com/itachi.2002/");*/

$(document).ready(function() {
	$("#side_nav #butt").click(function(e) {
		if($("#side_nav").css('left') == "-241px"){
			$("#side_nav").css('left', '0');
			$(this).html('<i class="fa fa-arrow-circle-o-left" aria-hidden="true"></i>');
		}
		else{
			$("#side_nav").css('left', '-241px');
			$(this).html('<i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i>');
		}
	});

    $("#block_add_new").keyup(function(e) {
        if(e.keyCode === 13){
            var value = this.value;
            window.location = "https://www.google.com/#q=" + value;
        }
    });
});