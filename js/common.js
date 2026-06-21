$(function () {
    new WOW().init();
    ys.phNavInit(4);
    ys.navSlide();
    // ys.yxlenis(1.2, true);
    ys.screenh();
    ys.isFixed(".ys-hd-pc");
    // search
    ys.pcSearch(3);
    // lang
    ys.lang('.head-lang', '.head-lang-down');
    ys.footershare(".footer-share li", '.footer-share-btn', '.footer-share-code');
    if ($(window).width() < 1200) {
    }
    footvideoFun();
    navhover();
    navfilFun();
    navfollFun()
    //start
    navcolorFun()
    //end
    isSearch()
    phcolorFun()
    phLangFun()
    inputnotFun()
});
function footvideoFun() {
    if ($(".mod-footvideo").length > 0) {
        $('.mod-footvideo').appear(function () {
            if ($(window).width() > 1199 && $('.ys-ban-video').length > 0) {
                var video = $('.mod-footvideo').find(".ys-ban-video").get(0);
            }
            if (video) {
                $(video).get(0).play();
            }
        })
    }
}
function navhover() {
    $(".hcbl-li").hover(function () {
        $(".hcbl-li.yxnav-active2").removeClass("on");
    }, function () {
        $(".hcbl-li.yxnav-active2").addClass("on");
    })
}
function navfilFun() {
    $('.head-nav-item-nub').hover(function () {
        if ($(this).find(".hnid-cry").length > 0) {
            $(".ys-header").addClass("filter")
        }
    }, function () {
        $(".ys-header").removeClass("filter")
    });
}
function navfollFun() {
    var $header = $('.ys-hd-pc');
    var lastScroll = 0;
    var scrollThreshold = 50;
    $header.removeClass('hide');
    $(window).scroll(function () {
        var currentScroll = $(this).scrollTop();
        if (currentScroll <= 0) {
            $header.removeClass('hide');
            return;
        }
        if (Math.abs(currentScroll - lastScroll) < scrollThreshold) {
            return;
        }
        if (currentScroll > lastScroll && !$header.hasClass('hide')) {
            $header.addClass('hide');
        } else if (currentScroll < lastScroll && $header.hasClass('hide')) {
            $header.removeClass('hide');
        }
        lastScroll = currentScroll;
        if ($header.hasClass("hide")) {
            $header.closest(".ys-header-cont").css("pointer-events", "none")
        } else {
            $header.closest(".ys-header-cont").css("pointer-events", "all")
        }
    });
}
//start
function navcolorFun() {
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            document.body.classList.add("thisScroll");
        } else {
            document.body.classList.remove("thisScroll");
        }
    });
}
// end

function isSearch() {
    if ($(".search-main").length > 0) {
        if (window.innerWidth < 1200) {
            $("body").addClass("thisScroll")
        }
        window.addEventListener("scroll", function () {
            if (!$("body").hasClass("thisScroll")) {
                document.body.classList.add("thisScroll");
            }
        });
    }
}
function phcolorFun() {
    if (window.innerWidth < 1200) {
        $(".ys-phnav-menubtn").click(function () {
            if ($(this).hasClass("on")) {
                $("body").addClass("thisclick")
            } else {
                $("body").removeClass("thisclick")
            }
        })
    }
    if ($(".ys-privacy").length > 0) {
        $("body").addClass("ispricacy")
    }
}
// 2025.12.2 语言 start

function phLangFun() {
    $(".ys-phnav-language .ys-phnav-header-font").click(function (e) {
        e.stopPropagation()
        $(".ys-phnav-language-bottom").stop().slideToggle();
        if (window.innerWidth < 1200) {
            $(".head-lang-top-jian").toggleClass("act");
            $(".ys-phnav-menubtn").removeClass("on");
            $(".ys-phnav-menu").stop().slideUp();
        }
    })
    if (window.innerWidth < 1200) {
        $(".ys-phnav-menubtn").click(function () {
            $(".head-lang-top-jian").removeClass("act");
            $(".ys-phnav-language-bottom").stop().slideUp();
        })
    }
    if (window.innerWidth < 1200) {
        $(document).click(function (e) {
            if (!$(e.target).closest(".ys-phnav-header-font, .yplb-cry").length) {
                $(".ys-phnav-language-bottom").stop().slideUp();
                $(".head-lang-top-jian").removeClass("act");
            }
        });
    }
}
// 2025.12.2 语音 end
function inputnotFun() {
    $(".footer-logo-input input").on("input", function () {
        if ($(this).val().trim() == "") {
            $(this).closest(".footer-logo").addClass("notinput")
        } else {
            $(this).closest(".footer-logo").removeClass("notinput")
        }
    }).on("blur", function () {
        if ($(this).val().trim() === "") {
            $(this).closest(".footer-logo").addClass("notinput")
        }
    });
    if ($(".footer-logo-input input").val().trim() === "") {
        $(".footer-logo").addClass("notinput");
    }
}