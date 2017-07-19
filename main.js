$(document).ready(function() {

    /*----------  open\close sidebar  ----------*/
        
        // $("#side_nav #butt").hover(function() {
        //     $("#side_nav").css('left', '-237px');
        // }, function() {
        //     if($("#side_nav").css('left') !== '0'){
        //         $("#side_nav").css('left', '-243px');
        //     }
        // });

    function getElement(url) {
        request(new XMLHttpRequest());

        function request(xhr) {
            xhr.open('GET', 'https://crossorigin.me/' + url, true);
            xhr.send();
            xhr.onreadystatechange = function() {
                if(xhr.readyState == 4) {
                    if(xhr.status == 200) {
                        html = document.createElement('div');
                        html.innerHTML = xhr.responseText;
                        for(var i = 0; i < 5; i++){
                            yatr.translate($(html).find('.c-compact-river__entry .c-entry-box--compact__title a')[i].text);
                        }
                    }
                }
            }
        }
    }

        // setTimeout(function () {
        //     getElement("https://www.theverge.com/tech");
        // }, 500);

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

    /*----------  search in google  ----------*/
    
        $("#block_search").keyup(function(e) {
            if(e.keyCode === 13){
                var value = this.value;
                window.location = "https://www.google.com/#q=" + value;
            }
        });

    /*----------  background images changing  ----------*/
    
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

    /*----------  navicon functions  ----------*/
    
        class Icon{
            constructor(title, url, imageUrl) {
                this.title = title;
                this.url = url;
                this.imageUrl = imageUrl;
                $("#side_nav").append('<a href="'+ this.url +'" title="'+ this.title +'" style="background-image: url('+ this.imageUrl +')" class="icon hvr-bounce-in"></a>');
                $("#side_nav .icon").hover(function() {
                    $("#side_nav .icon i").remove();
                    $(this).prepend('<i class="fa fa-trash-o" aria-hidden="true"></i><i class="fa fa-pencil" aria-hidden="true"></i>');
                    $("#side_nav .icon i").click(function(e) {
                        localStorage.removeItem(this.parentElement.getAttribute('title'));
                        this.parentElement.remove();
                    });
                }, function() {
                    $("#side_nav .icon i").remove();
                });
                Icon.icons[this.title] = this;
                // Icon.icons.push(this);
                console.log(Icon.icons);
                Icon.counter++;
                localStorage.setItem("icons", JSON.stringify(Icon.icons));
            }
        }
        if(localStorage.getItem("icons")){
            Icon.counter = JSON.parse(localStorage.getItem("icons")).length;
            Icon.icons = JSON.parse(localStorage.getItem("icons"));
        }
        else {
            Icon.counter = 0;
            Icon.icons = {};
        }

        for (variable of Icon.icons) {
            $("#side_nav").append('<a href="'+ variable.url +'" title="'+ variable.title +'" style="background-image: url('+ variable.imageUrl +')" class="icon hvr-bounce-in"></a>');
        }

    /*----------  add new link block  ----------*/

        var blockAddNewNaviconVisible = false;
        $("#side_nav .fa-plus").click(function(e) {
            if(blockAddNewNaviconVisible === false){
                $("body").append('<div id="block_add_new_navicon"><input type="text" id="title" placeholder="Title"><input type="text" id="url" placeholder="URL"><input type="text" id="image_url" placeholder="Image URL"><button>Add</button></div>');
                $("body #block_add_new_navicon input")[0].focus();
                setTimeout(function () {
                    $("body #block_add_new_navicon").css({
                        bottom: '50px',
                        opacity: '1'
                    });
                }, 1);
                $("#block_add_new_navicon button").click(function(e) {
                    var inputs = $("#block_add_new_navicon input");
                    if(inputs[0] != '' && inputs[1] != '' && Icon.counter < 6){
                        if(inputs[2].value === ''){
                            new Icon(inputs[0].value, inputs[1].value, "http://findicons.com/files/icons/990/vistaico_toolbar/256/web_page.png");
                        }
                        else{
                            new Icon(inputs[0].value, inputs[1].value, inputs[2].value);
                        }
                    }
                    inputs[0].value = '';
                    inputs[1].value = '';
                    inputs[2].value = '';
                });
                blockAddNewNaviconVisible = true;
            }
            else{
                $("body #block_add_new_navicon").css('opacity', '0');
                setTimeout(function () {
                    $("body #block_add_new_navicon").remove();
                }, 300);
                blockAddNewNaviconVisible = false;
            }
        });

    /*----------  sidebar link hover (edit/delete)  ----------*/

        $("#side_nav .icon").hover(function() {
            $("#side_nav .icon i").remove();
            $(this).prepend('<i class="fa fa-trash-o" aria-hidden="true"></i><i class="fa fa-pencil" aria-hidden="true"></i>');
            $("#side_nav .icon i").click(function(e) {
                $(this).parent().click(function(){
                    return false;
                });
                if(this.className === "fa fa-trash-o"){
                    console.log(this.parentElement.getAttribute('title'));
                    localStorage.removeItem("aaaa");
                    this.parentElement.remove();
                    console.log(1);
                }
                else if(this.className === "fa fa-pencil"){
                    // нажимання на кнопу "редагувати" (олівець)
                    console.log(2);
                }
            });
        }, function() {
            $("#side_nav .icon i").remove();
        });

    /*----------  Translator  ----------*/
        
        var yatr = {
            lines: {},

            key: 'trnsl.1.1.20170704T182449Z.ed19cb41da4e9c4a.13602e8964df3b39bddde7f99cbc170544394f36',
            api: 'https://translate.yandex.net/api/v1.5/tr.json/translate',

            translate: function (text) {
                var url = this.api+'?';
                url+= 'key=' + this.key + '&text=' + text + '&lang=en-ru';
                var ajax = new XMLHttpRequest();
                ajax.open('GET', url, true);
                ajax.onreadystatechange = function () {
                    if(ajax.readyState == 4){
                        if(ajax.status == 200){
                            text = ajax.responseText;
                            text = JSON.parse(text);
                            text = text.text[0];
                            console.log(text);
                        }
                    }
                }
                ajax.send();
            },

            revert: function () {
                
            }
        };

        var log = function (text) {
            console.log(text);
        }
    
     getElement("https://www.theverge.com/tech");
});