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
		if($("#side_nav").css('left') == "-243px"){
			$("#side_nav").css('left', '0');
			$(this).html('<i class="fa fa-arrow-circle-o-left" aria-hidden="true"></i>');
		}
		else{
			$("#side_nav").css('left', '-243px');
			$(this).html('<i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i>');
		}
	});

    $("#block_search").keyup(function(e) {
        if(e.keyCode === 13){
            var value = this.value;
            window.location = "https://www.google.com/#q=" + value;
        }
    });

    $("body").prepend('<div id="block_bg_images"></div>');
    $("body #block_bg_images").css('background-image', 'url("../../img/bg\'s/1.jpg")').before('<div id="block_bg_images"></div>');
    $("body #block_bg_images:first-child").css('background-image', 'url("../../img/bg\'s/2.jpg")');
    setTimeout(function () {
        $("body #block_bg_images:nth-child(2)").css('transform', 'scale(1.2)');
    }, 1);

    var imgCounter = 2;

    setInterval(function () {
        $("body #block_bg_images:first-child").css('transform', 'scale(1.2)');
        $("body #block_bg_images:nth-child(2)").css('opacity', '0');
        setTimeout(function () {
            $("body #block_bg_images:nth-child(2)").remove();
            $("body #block_bg_images").before('<div id="block_bg_images"></div>');
            imgCounter < 10 ? imgCounter++ : imgCounter = 1;
            $("body #block_bg_images:first-child").css('background-image', 'url("../../img/bg\'s/'+ imgCounter +'.jpg")');
        }, 3000);
    }, 17000);
});