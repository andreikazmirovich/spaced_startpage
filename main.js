$(document).ready(function() {

    /*----------  open\close sidebar  ----------*/
        
        // $("#side_nav #butt").hover(function() {
        //     $("#side_nav").css('left', '-237px');
        // }, function() {
        //     if($("#side_nav").css('left') !== '0'){
        //         $("#side_nav").css('left', '-243px');
        //     }
        // });

    /*----------  get all last news  ----------*/
    
        function getElement(url) {
            request(new XMLHttpRequest());

            function request(xhr) {
                xhr.open('GET', 'https://cors-anywhere.herokuapp.com/' + url, true);
                xhr.send();
                xhr.onreadystatechange = function() {
                    if(xhr.readyState == 4) {
                        if(xhr.status == 200) {
                            html = document.createElement('div');
                            html.innerHTML = xhr.responseText;
                            for(var i = 0; i < 10; i++){
                                var elem = $(html).find('.c-compact-river__entry .c-entry-box--compact__title a')[i];
                                yatr.translate(elem.text, show, elem.href);
                            }
                        }
                    }
                }
            }
        }

    /*----------  show/hide side_nav  ----------*/
    
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

        /*for (variable of Icon.icons) {
            $("#side_nav").append('<a href="'+ variable.url +'" title="'+ variable.title +'" style="background-image: url('+ variable.imageUrl +')" class="icon hvr-bounce-in"></a>');
        }*/

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

            translate: function (text, callback, textHref) {
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
                            if (callback) {
                                callback(text, textHref);
                            }
                            else {
                                return text;
                            }
                        }
                    }
                }
                ajax.send();
            },

            revert: function () {
                
            }
        };

    /*----------  getFullNews function  ----------*/
    
        function getFullNews(url) {
            request(new XMLHttpRequest());

            function request(xhr) {
                xhr.open('GET', 'https://cors-anywhere.herokuapp.com/' + url, true);
                xhr.send();
                xhr.onreadystatechange = function() {
                    if(xhr.readyState == 4) {
                        if(xhr.status == 200) {
                            html = document.createElement('div');
                            html.innerHTML = xhr.responseText;
                            var elem = $(html).find('.l-wrapper .l-segment .c-entry-content p');
                            for (let el of elem) {
                                yatr.translate(el.innerText, function (text) {
                                    $("#new_text_block").append('<p>'+ text +'</p>');
                                });
                            }
                        }
                    }
                }
            }
        }

        var show = function (text, textHref) {
            $("#news_from_other_site #news_mini_titles").append('<div class="mini_title" textHref="'+ textHref +'">'+ text +'</div>');
            // console.log($("#news_from_other_site #news_mini_titles[textHref='" + textHref + "']"));
            $("#news_from_other_site #news_mini_titles .mini_title[textHref='" + textHref + "']").click(function(e) {
                // console.log(e.target.getAttribute("texthref"));
                $("#news_from_other_site").css({
                   left: '30%',
                   opacity: '0'
                });
                setTimeout(function () {
                    $("#news_from_other_site").css('display', 'none');
                }, 100);
                getFullNews(textHref);
                setTimeout(function () {
                    // $("#news_from_other_site").remove();
                    $("body").append('<a class="fa fa-angle-left" aria-hidden="true"></a><div id="new_text_block"><div id="tools_block"><i class="fa fa-file" aria-hidden="true"></i></div></div>');
                    $(".fa-angle-left").click(function(e) {
                        setTimeout(function () {
                            $("#new_text_block").css({
                                left: '70%',
                                opacity: '0'
                            });
                        }, 1);
                        $("#new_text_block").remove();
                        $(".fa-angle-left").remove();
                        // getElement("https://www.theverge.com/tech");
                        // $("body").append('<div id="news_from_other_site"><a href="#" id="site_tab"><div id="site_logo"></div><div id="site_name">The Verge</div></a><div class="clean"></div><div id="news_mini_titles"></div></div>');
                        $("#created_new_text").remove();
                        $("#news_from_other_site").css({
                            left: '30%',
                            opacity: '0',
                            display: 'block'
                        });
                        setTimeout(function () {
                            $("#news_from_other_site").css({
                                left: '50%',
                                opacity: '1'
                            });
                        }, 1);
                    });
                    var createdNewTextIsOpen = false;
                    $("#new_text_block #tools_block .fa-file").click(function(e) {
                        if(!createdNewTextIsOpen){
                            $("body").append('<div id="created_new_text"></div>');
                            createdNewTextIsOpen = true;
                        }
                        $(".fa-angle-left").css('left', '32%');
                        $("#new_text_block").css({
                            left: '8%',
                            width: '40%',
                            marginLeft: '0' 
                        });
                        $("#new_text_block p").click(function(e) {
                            var p = e.target;
                            $(p).unbind('click');
                            $("#created_new_text").append(p);
                            var forNewPFunc = function () {
                                $("#created_new_text p").unbind('mouseenter mouseleave');
                                $("#created_new_text p").hover(function() {
                                    $(this).append('<i class="fa fa-pencil" aria-hidden="true"></i>');
                                    $("#created_new_text p .fa-pencil").click(function(e) {
                                        var text = e.target.parentNode.innerText;
                                        $(e.target.parentNode).replaceWith('<textarea>'+ text +'</textarea>');
                                        $("#created_new_text textarea").keydown(function(e) {
                                            if(e.keyCode === 17){
                                                $(this).keyup(function(e) {
                                                    if (e.keyCode === 13) {
                                                        var newText = this.value;
                                                        $(this).replaceWith('<p>'+ newText +'</p>');
                                                        $("#created_new_text p").unbind('mouseenter mouseleave');
                                                        forNewPFunc();
                                                    } 
                                                });
                                            }
                                            else if(e.keyCode === 27){
                                                $(this).replaceWith('<p>'+ text +'</p>');
                                                $("#created_new_text p").unbind('mouseenter mouseleave');
                                                forNewPFunc();
                                            }
                                        });
                                    });
                                }, function() {
                                    $("#created_new_text p .fa-pencil").remove();
                                });
                            };
                            forNewPFunc();
                        });
                    });
                    $("#new_text_block").css({
                       left: '70%',
                       opacity: '0'
                    });
                    setTimeout(function () {
                       $("#new_text_block").css({
                           left: '50%',
                           opacity: '1'
                       });
                    }, 10);
                }, 200);
            });
        }
    
     getElement("https://www.theverge.com/tech");

});