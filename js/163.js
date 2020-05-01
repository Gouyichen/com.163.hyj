"use strict";
nie.define("common",
function() {
    var e = (nie.require("nie.util.PopDialog"), nie.require("nie.util.copytext")),
    t = JSON.parse(sessionStorage.getItem("temp")),
    o = {
        setCopyrightColor: function(e) {
            "gray" == e ? nie.config.copyRight.setGray() : nie.config.copyRight.setWhite()
        },
        getUrlParams: function(e) {
            var t = {},
            o = window.location.href,
            n = o.indexOf("?");
            if (n > 0) for (var s, a, r = o.substring(n + 1), i = r.split("&"), l = 0; s = i[l]; l++) a = i[l] = s.split("="),
            t[a[0]] = a.length > 1 ? a[1] : !0;
            return t[e]
        },
        setAlert: function() {
            var e = $(".pop-gmTips");
            e.find(".btn").on("click",
            function() {
                e.removeClass("show")
            });
            var t = function(t) {
                e.addClass("show"),
                e.find(".text").text(t)
            };
            window.alert = t
        },
        order: function() {
            function e(e, t) {
                $.ajax({
                    url: n + "/get_authcode_apnt",
                    type: "GET",
                    data: {
                        mobile: e,
                        NECaptchaValidate: a
                    },
                    dataType: "jsonp",
                    jsonp: "callback",
                    success: t,
                    error: function() {
                        alert("\u670d\u52a1\u5668\u51fa\u9519\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5")
                    }
                })
            }
            function t() {
                $.ajax({
                    url: n + "/query_apntnum",
                    dataType: "jsonp",
                    success: function(e) {
                        if (e.status) {
                            var t = e.usernumber;
                            console.log(t);
                            for (var o = 0,
                            n = f.length; n > o; o++) t >= f[o] && u.find("li").eq(o).addClass("on")
                        } else alert(e.msg)
                    }
                })
            }
            var n = "//com-sev.webapp.163.com/g77assemble",
            s = !1,
            a = "",
            r = !1,
            i = 60,
            l = "",
            c = "";
            $(".pop-order .close").click(function() {
                r = !1,
                i = 60,
                clearInterval(l),
                c.refresh(),
                $("#yzm_btn").text("\u83b7\u53d6\u9a8c\u8bc1\u7801").attr("title", "\u83b7\u53d6\u9a8c\u8bc1\u7801"),
                $(".order-form").addClass("show").siblings("div").removeClass("show"),
                $(".order-form input").val(""),
                $(".pop-order").fadeOut(),
                $(".order-form,.order-success,.ordered").removeClass("show")
            });
            var d = function(e) {
                2 == e ? $(".order-success").addClass("show") : 3 == e ? $(".order-yq").addClass("show") : $(".order-form").addClass("show"),
                $(".pop-order").fadeIn()
            };
            $(".order-btn,.oreder_btn").click(function() {
                d()
            }),
            $(".yqhy-btn").click(function() {
                var e = JSON.parse(sessionStorage.getItem("temp"));
                e ? d(2) : d()
            }),
            $(".ckhy-btn").click(function() {
                var e = JSON.parse(sessionStorage.getItem("temp"));
                e ? d(3) : d()
            }),
            initNECaptcha({
                captchaId: "07b9cd27ed534e99a53474e3fdfa15d6",
                element: "#captcha",
                mode: "float",
                width: "392px",
                onVerify: function(e, t) {
                    t && (s = !0, a = t.validate)
                },
                onClose: function() {}
            },
            function(t) {
                c = t,
                $(".system span").click(function() {
                    $(this).addClass("select").siblings().removeClass("select")
                }),
                $("#yzm_btn").click(function() {
                    var t = $.trim($("#tel").val());
                    return /^[1][3456789][0-9]{9}$/gi.test(t) ? s ? void(r || e(t,
                    function(e) {
                        1 == e.status ? (r = !0, console.log(r), l = setInterval(function() {
                            return 0 == i ? (clearInterval(l), r = !1, i = 60, $("#yzm_btn").text("\u83b7\u53d6\u9a8c\u8bc1\u7801").attr("title", "\u83b7\u53d6\u9a8c\u8bc1\u7801"), !1) : ($("#yzm_btn").text(i + "s").attr("title", i + "s"), void i--)
                        },
                        1e3)) : alert(e.msg)
                    })) : (alert("\u8bf7\u5b8c\u6210\u62fc\u56fe\u9a8c\u8bc1"), !1) : void alert("\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u624b\u673a\u53f7\u7801")
                }),
                $("#order_btn").click(function() {
                    var e = $.trim($("#tel").val()),
                    t = $.trim($("#yzmCode").val()),
                    a = $("#email").val(),
                    r = $(".system .select").data("sys"),
                    i = $("#code").val(),
                    l = {
                        mobile: e,
                        authcode: t,
                        os: r
                    };
                    return a && (l.email = a),
                    i && (l.invi_code = i),
                    /^[1][3456789][0-9]{9}$/gi.test(e) ? s ? 6 != t.length && 4 != t.length ? void alert("\u8bf7\u586b\u5199\u6b63\u786e\u7684\u9a8c\u8bc1\u7801") : a && !/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/gi.test(a) ? void alert("\u8bf7\u586b\u5199\u6b63\u786e\u7684\u90ae\u7bb1") : (l.channel = myDataChannel, void $.ajax({
                        url: n + "/verify_authcode",
                        data: l,
                        dataType: "jsonp",
                        success: function(t) {
                            if (console.log(t), 1 == t.status || "201" == t.status) {
                                var n = {
                                    login: !0,
                                    my_code: t.my_code,
                                    url: "http://" + location.hostname + location.pathname + "?code=" + t.my_code,
                                    user_cnt: t.user_cnt - 1,
                                    userPhone: e
                                };
                                o.shareInfo(n),
                                sessionStorage.setItem("huadeng", "1"),
                                $(".fang-btn span").text(parseInt($(".fang-btn span").text()) + 1),
                                $(".lao-btn span").text(parseInt($(".lao-btn span").text()) + 1),
                                $("#js-user-info .name").text(n.userPhone.replace(/(\d{3})(\d{4})(\d{4})/, "$1****$3")),
                                $(".pop-order .order-success").addClass("show").siblings("div").removeClass("show")
                            } else alert(t.msg)
                        }
                    })) : (alert("\u8bf7\u5b8c\u6210\u62fc\u56fe\u9a8c\u8bc1"), !1) : void alert("\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u624b\u673a\u53f7\u7801")
                })
            },
            function() {});
            var u = $("#js-jl-progress"),
            f = [1e5, 5e5, 1e6, 2e6, 3e6];
            u && t()
        },
        shareInfo: function(t) {
            var o = "https://webinput.nie.netease.com/img/hyj/icon.png/96";
            $(".shareCode").text(t.my_code),
            $(".shareUrl").attr("href", t.url).text(t.url),
            $(".qrCode").attr("src", "https://qrcode2.webapp.163.com/l?d=" + encodeURIComponent(t.url) + "&l=" + encodeURIComponent(o)),
            sessionStorage.setItem("temp", JSON.stringify(t)),
            $(".yq_num").text(t.user_cnt);
            for (var n = [1, 3, 5], s = -1, a = 0; a < n.length; a++) t.user_cnt >= n[a] && (s++, $(".order-success .gift-list li").eq(s).addClass("on"), $(".order-yq .gift-list li").eq(s).addClass("on"));
            e({
                btn: ".copy_btn",
                text: t.url,
                callback: function() {
                    alert("\u590d\u5236\u6210\u529f\uff01")
                }
            })
        },
        ifLogin: function() {
            t && (console.log(t), o.shareInfo(t)),
            o.getUrlParams("code") && $("#code").val(o.getUrlParams("code"))
        },
        init: function() {
            o.setCopyrightColor("gray"),
            o.setAlert(),
            o.order(),
            o.ifLogin()
        }
    };
    $(function() {
        o.init()
    })
});;
"use strict";
nie.define("index",
function() {
    var e = nie.require("nie.util.videoV2"),
    o = nie.require("nie.util.shareV5");
    nie.require("nie.util.niedownload"),
    NieDownload.create({
        wrapper: $(".nie-download"),
        enableAndroid: !0,
        enableIos: !0
    });
    var n = {
        setShare: function() {
            {
                var e = $("#share_pic").attr("data-src"),
                n = $("#share_desc").html(),
                s = $("#share_title").html();
                o({
                    fat: "#NIE-share2",
                    type: 1,
                    defShow: [23, 22, 2, 1, 4],
                    title: s,
                    img: e,
                    content: n
                })
            }
        },
        shareBtnEvent: function() {
            var e = $(".share-show-btn"),
            o = $(".share-item");
            e.on("click",
            function() {
                e.toggleClass("cur"),
                o.toggleClass("cur")
            })
        },
        bgMuisc: function() {
            var o = $("#Jmusic");
            $(".music-btn").bind("click",
            function() {
                $(this).toggleClass("pause"),
                $(this).hasClass("pause") ? (o[0].pause(), $(".music-btn").removeClass("on")) : (o[0].play(), $(".music-btn").addClass("on"))
            }),
            o[0] && o[0].play();
            var n = e({
                fat: "#video",
                width: "800",
                height: "450",
                movieUrl: "",
                HDmovieUrl: "",
                SHDmovieUrl: "",
                vtype: ""
            });
            $(".video-btn").click(function() {
                $(".pop-video").fadeIn().addClass("show");
                var e = $(this).attr("data-src");
                n.change(e),
                n.play()
            }),
            $(".pop-video .close").click(function() {
                $(".pop-video").fadeOut().removeClass("show"),
                n.pause(),
                $("#Jmusic")[0].play(),
                $(".music-btn").removeClass("pause")
            }),
            $(".side-ewm .tab .btn").hover(function() {
                $(this).addClass("on").siblings().removeClass("on");
                var e = $(".side-ewm .tab .btn").index(this);
                $(".side-ewm .con .pannel").eq(e).show().siblings(".pannel").hide()
            })
        },
        skrollrFun: function(e) {
            skrollr.init({
                smoothScrolling: !1,
                scale: 1,
                easing: "swing",
                constants: {
                    p1: 600
                }
            });
            e && e()
        },
        moveScroll: function() {
            var e = 0,
            o = 700,
            n = 0,
            s = [$(".top-bar").offset().top, $(".part-2").offset().top - 100, $(".part-3").offset().top - 100],
            i = function() {
                e > s[0] && e < s[1] ? n = 0 : e > s[1] && e < s[2] ? n = 1 : e > s[2] && (n = 2),
                $(".fix-nav .fix-btn").eq(n).addClass("cur").siblings().removeClass("cur")
            },
            a = function() {
                e > o ? ($(".left-slide").addClass("on"), $(".fix-nav").addClass("show")) : ($(".left-slide").removeClass("on"), $(".fix-nav").removeClass("show")),
                i()
            };
            a(),
            $(".fix-nav .fix-btn").on("click",
            function() {
                var o = $(this).index();
                e = s[o],
                $("html,body").animate({
                    scrollTop: e
                },
                800),
                a()
            }),
            $(window).on("scroll",
            function() {
                e = $(window).scrollTop(),
                a()
            })
        },
        scroll: function() {
            var e = 0,
            o = 40,
            n = 700,
            s = [$(".top-bar").offset().top, $(".part-2").offset().top - 100, $(".part-3").offset().top - 100];
            $("html,body").addClass("ov");
            var i = 0,
            a = function() {
                i = e > s[0] && e < s[1] ? 0 : e > s[1] && e < s[2] ? 1 : 2,
                $(".fix-nav .fix-btn").eq(i).addClass("cur").siblings().removeClass("cur")
            };
            $(".fix-nav .fix-btn").on("click",
            function() {
                var o = $(this).index();
                e = s[o],
                t()
            });
            var t = function(o) {
                o || (o = 1),
                TweenMax.to($("body,html"), o, {
                    scrollTop: e,
                    yoyo: !1,
                    ease: Power1.easeNone
                }),
                e > n ? $(".fix-nav").addClass("show") : $(".fix-nav").removeClass("show"),
                a()
            };
            $(window).on("mousewheel",
            function(n) {
                console.log($(window).scrollTop()),
                n.deltaY > 0 ? e -= o: n.deltaY < 0 && (e += o),
                0 > e ? e = 0 : e >= $("body").height() && (e = $("body").height()),
                t()
            })
        },
        feature: function() {
            var e = $(".ft-btn-wrap .btn"),
            o = new Swiper("#feature", {
                speed: 1e3,
                loop: !0,
                autoplay: 5e3,
                autoplayDisableOnInteraction: !1,
                observer: !0,
                observeParents: !0,
                effect: "fade",
                fade: {
                    crossFade: !0
                },
                onSlideChangeStart: function(o) {
                    $(".feature_icon > div").eq(o.realIndex).addClass("show").siblings().removeClass("show"),
                    e.eq(o.realIndex).addClass("cur").siblings().removeClass("cur")
                }
            });
            e.on("click",
            function() {
                var e = $(this).index();
                o.slideTo(e + 1)
            })
        },
        codePop: function() {
            var e = $(".codeShow-btn"),
            o = $(".pop-code"),
            n = o.find(".close");
            e.on("click",
            function() {
                o.addClass("show")
            }),
            n.on("click",
            function() {
                o.removeClass("show")
            })
        },
        codeTab: function() {
            $(".qrcode-fix .tab-btn a").hover(function() {
                var e = $(this).index();
                $(".qrcode-fix .tab-btn a").removeClass("cur").eq(e).addClass("cur"),
                $(".qrcode-fix .tab-code img").removeClass("cur").eq(e).addClass("cur"),
                $(".qrcode-fix .tab-p p").removeClass("cur").eq(e).addClass("cur")
            })
        },
        init: function() {
            n.skrollrFun(function() {
                n.moveScroll()
            }),
            n.feature(),
            n.setShare(),
            n.shareBtnEvent(),
            n.bgMuisc(),
            n.codePop(),
            n.codeTab()
        }
    };
    $(function() {
        n.init()
    }),
    window.onload = function() {
        setTimeout(function() {
            window.scrollTo(0, 0)
        },
        100)
    }
});