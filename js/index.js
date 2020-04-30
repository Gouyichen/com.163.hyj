"use strict";
nie.define("common",
function() {
    var e = (nie.require("nie.util.PopDialog"), nie.require("nie.util.copytext")),
    t = JSON.parse(sessionStorage.getItem("temp"));
    nie.require("nie.util.niedownload"),
    NieDownload.create({
        wrapper: $(".nie-download"),
        enableAndroid: !0,
        enableIos: !0
    });
    var o = {
        setCopyrightColor: function(e) {
            "gray" == e ? nie.config.copyRight.setGray() : nie.config.copyRight.setWhite()
        },
        getUrlParams: function(e) {
            var t = {},
            o = window.location.href,
            n = o.indexOf("?");
            if (n > 0) for (var s, r, a = o.substring(n + 1), i = a.split("&"), l = 0; s = i[l]; l++) r = i[l] = s.split("="),
            t[r[0]] = r.length > 1 ? r[1] : !0;
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
                        NECaptchaValidate: r
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
            var n = "https://com-sev.webapp.163.com/g77assemble",
            s = !1,
            r = "",
            a = !1,
            i = 60,
            l = "",
            c = "";
            $(".pop-order .close").click(function() {
                a = !1,
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
            $("#js-orderShow-btn,.oreder_btn").click(function() {
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
                    t && (s = !0, r = t.validate)
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
                    return /^[1][3456789][0-9]{9}$/gi.test(t) ? s ? void(a || e(t,
                    function(e) {
                        1 == e.status ? (a = !0, console.log(a), l = setInterval(function() {
                            return 0 == i ? (clearInterval(l), a = !1, i = 60, $("#yzm_btn").text("\u83b7\u53d6\u9a8c\u8bc1\u7801").attr("title", "\u83b7\u53d6\u9a8c\u8bc1\u7801"), !1) : ($("#yzm_btn").text(i + "s").attr("title", i + "s"), void i--)
                        },
                        1e3)) : alert(e.msg)
                    })) : (alert("\u8bf7\u5b8c\u6210\u62fc\u56fe\u9a8c\u8bc1"), !1) : void alert("\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u624b\u673a\u53f7\u7801")
                }),
                $("#order_btn").click(function() {
                    var e = $.trim($("#tel").val()),
                    t = $.trim($("#yzmCode").val()),
                    r = $("#email").val(),
                    a = $(".system .select").data("sys"),
                    i = $("#code").val(),
                    l = {
                        mobile: e,
                        authcode: t,
                        os: a
                    };
                    return r && (l.email = r),
                    i && (l.invi_code = i),
                    /^[1][3456789][0-9]{9}$/gi.test(e) ? s ? 6 != t.length && 4 != t.length ? void alert("\u8bf7\u586b\u5199\u6b63\u786e\u7684\u9a8c\u8bc1\u7801") : r && !/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/gi.test(r) ? void alert("\u8bf7\u586b\u5199\u6b63\u786e\u7684\u90ae\u7bb1") : void $.ajax({
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
                    }) : (alert("\u8bf7\u5b8c\u6210\u62fc\u56fe\u9a8c\u8bc1"), !1) : void alert("\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u624b\u673a\u53f7\u7801")
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
            for (var n = [1, 3, 5], s = -1, r = 0; r < n.length; r++) t.user_cnt >= n[r] && (s++, $(".order-success .gift-list li").eq(s).addClass("on"), $(".order-yq .gift-list li").eq(s).addClass("on"));
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
            $("#index").length > 0 ? o.setCopyrightColor("gray") : o.setCopyrightColor(),
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
nie.define("comment",
function() {
    var t = "https://com-sev.webapp.163.com/g77assemble/",
    n = "//tower.webcgi.163.com",
    a = function() {
        var a = function(t, n, a) {
            return $.ajax({
                url: t + n,
                dataType: "jsonp",
                data: a,
                error: function() {
                    alert("\u670d\u52a1\u5668\u51fa\u9519\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5")
                }
            })
        };
        return {
            cmt: function(t, e) {
                return a(n, t, $.extend({
                    url: "http://test.nie.163.com/test_html/hyj/m/index.html",
                    uid: "hyj-hedeng:http://hyj.163.com/index.html"
                },
                e))
            },
            appCmt: function(t, e) {
                return a(n, "comments", e)
            },
            getFpToken: function() {
                return a(t, "get_token?", {})
            },
            checkImg: function(n) {
                return a(t, "/verify_upload_pic?", n)
            }
        }
    } (),
    e = {
        countCmt: 1,
        amount: -1
    },
    o = 1,
    s = 3,
    i = $('<audio src="" preload="metadata" id="audio-cmt">')[0];
    $("body").append(i);
    var c = !1,
    r = {
        init: function() {
            this.event()
        },
        getNum: function(t) {
            return Math.floor(Math.random() * t)
        },
        sendCmt: function(t) {
            a.cmt("/comment?", t).then(function(t) {
                "ok" == t.status ? (1 == c && o--, $(".pop-wanjia").removeClass("show"), alert("\u653e\u706f\u6210\u529f\uff01"), r.setDefNumber(), $(".comment-input").val("")) : alert(t.form_errs_msg)
            })
        },
        createCmt: function(t) {
            var n = "";
            t.length > 0 ? $.each(t,
            function(t, a) {
                var e = a.etc,
                o = e.voice,
                s = "";
                "" != o ? !
                function() {
                    var n = $('<audio src="' + o + '" preload="metadata">')[0];
                    s += '<div class="btn-audio audio' + t + '" data-src="' + o + '"><i></i></div>',
                    n.onloadeddata = function() {
                        $(".audio" + t).append("<span>" + Math.ceil(n.duration) + "</span>")
                    }
                } () : s += "<p>" + a.content + "</p>",
                n += '<div class="list">\n						<div class="header">\n							<img src="https://hyj.res.netease.com/pc/gw/20190806153822/data/tx/' + e.id + '.png" alt="\u5934\u50cf">\n						</div>\n						<div class="right">\n							<div class="name">' + e.nickname + '</div>\n							<div class="text">' + s + "</div>\n						</div>\n					</div>"
            }) : n = '<p class="nothing">\u6682\u65e0\u8bc4\u8bba</p>',
            $(".pop-wanjia").find(".msg-list").html(n)
        },
        getCmt: function(t) {
            var n = this,
            o = 3,
            s = -1 == e.amount ? 0 : this.getNum(e.amount);
            a.cmt("/comments?", {
                start: s,
                amount: o
            }).then(function(a) {
                if ("ok" == a.status) {
                    if (1 == e.countCmt && e.amount != a.total_comments_amount) return e.amount = a.total_comments_amount,
                    e.countCmt++,
                    n.getCmt(t),
                    !1;
                    if (4 > t) return n.hehua(t, a.comments),
                    t++,
                    n.getCmt(t),
                    !1;
                    t || n.createCmt(a.comments)
                } else a.form_errs_msg ? alert(a.form_errs_msg) : a.msg && alert(a.msg)
            })
        },
        hehua: function(t, n) {
            var a = $(".hehua-box .hehua"),
            e = "";
            e = "" != n[0].etc.voice ? "\u8bed\u97f3\u7559\u8a00": n[0].content,
            a.find(".text").eq(t - 1).text(e),
            a.eq(t - 1).attr("data-id", n[0]._id)
        },
        hehuaAjax: function(t) {
            $.ajax({
                url: n + "/comments/" + t,
                dataType: "jsonp",
                success: function(t) {
                    var n = [t.comment];
                    r.createCmt(n),
                    $(".pop-wanjia").addClass("show")
                },
                error: function() {
                    alert("\u670d\u52a1\u5668\u51fa\u9519\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5")
                }
            })
        },
        setDefNumber: function() {
            $(".fang-btn span").text(o),
            $(".lao-btn span").text(s)
        },
        event: function() {
            function t(t) {
                $(".pop-wanjia").addClass("show"),
                $(".pop-wanjia .msg-list").scrollTop(0),
                t ? ($(".pop-wanjia").removeClass("fang"), c = !1) : ($(".pop-wanjia").addClass("fang"), c = !0)
            }
            $(".pop .close").on("click",
            function() {
                $(".pop").removeClass("show"),
                $(".pop .btn-audio").removeClass("play"),
                $(".pop").find(".comment-input").val(""),
                i.pause(),
                $("#Jmusic")[0].play()
            }),
            $(".pop-tips .btn").on("click",
            function() {
                $(".pop-tips").removeClass("show"),
                $(".order-form").addClass("show"),
                $(".pop-order").fadeIn()
            });
            var n = function(t) {
                $(".pop-tips").addClass("show"),
                $(".pop-tips .text").html(t)
            };
            r.setDefNumber(),
            $(".fang-btn").on("click",
            function() {
                1 > o ? n("\u60a8\u4eca\u65e5\u653e\u706f\u7684\u673a\u4f1a\u5df2\u7ecf\u7528\u5b8c\u5566\uff01<br/>\u9884\u7ea6\u6e38\u620f\u53ef\u989d\u5916\u83b7\u5f971\u6b21\u653e\u706f\u673a\u4f1a\uff01") : t()
            }),
            $(".lao-btn").on("click",
            function() {
                null != sessionStorage.getItem("huadeng") && (sessionStorage.removeItem("huadeng"), s++, o++),
                0 == s ? n("\u60a8\u4eca\u65e5\u635e\u706f\u7684\u673a\u4f1a\u5df2\u7ecf\u7528\u5b8c\u5566\uff01<br/>\u9884\u7ea6\u6e38\u620f\u6bcf\u65e5\u53ef\u989d\u5916\u83b7\u5f971\u6b21\u635e\u706f\u673a\u4f1a\uff01") : (s--, r.getCmt(), t(1), r.setDefNumber())
            }),
            r.getCmt(1);
            var a = $(".hehua-box .hehua");
            a.on("click",
            function() {
                var n = $(this).data("id");
                t(1),
                r.hehuaAjax(n)
            });
            var e = r.getNum(6) + 1,
            m = function() {
                $("#js-user-info .head").attr("data-tx", e),
                $("#js-user-info .head img").attr("src", "https://hyj.res.netease.com/pc/gw/20190806153822/data/tx/" + e + ".png"),
                $("#js-user-info .name").text("\u533f\u540d")
            };
            m(),
            $(".pop-wanjia").on("click", ".post-btn",
            function() {
                var t = $(this).parents(".pop").find(".comment-input"),
                n = t.val();
                return "" == n ? (alert("\u7559\u8a00\u4e0d\u80fd\u4e3a\u7a7a\uff01"), !1) : void r.sendCmt({
                    content: n,
                    parent_id: $(this).attr("data-id"),
                    etc: JSON.stringify({
                        id: $("#js-user-info .head").attr("data-tx"),
                        voice: "",
                        type: 1,
                        nickname: $("#js-user-info .name").text()
                    })
                })
            }),
            $(".pop").on("click", ".btn-audio",
            function() {
                $(i).attr("src", $(this).attr("data-src")),
                $(this).hasClass("play") ? (i.pause(), $(this).removeClass("play"), $("#Jmusic")[0].play()) : (i.play(), $(this).addClass("play"), i.onended = function() {
                    $(".btn-audio").removeClass("play")
                },
                $("#Jmusic")[0].pause())
            })
        }
    };
    $(function() {
        r.init()
    })
});;
"use strict";
nie.define("index",
function() {
    var e = nie.require("nie.util.videoV2"),
    o = nie.require("nie.util.shareV5"),
    t = {
        setShare: function() {
            {
                var e = $("#share_pic").attr("data-src"),
                t = $("#share_desc").html(),
                s = $("#share_title").html();
                o({
                    fat: "#NIE-share,.share-more",
                    type: 1,
                    defShow: [23, 22, 2, 1, 4],
                    title: s,
                    img: e,
                    content: t
                })
            }
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
        scroll: function() {
            var e = 0,
            o = 40,
            t = $(".top-bar").height() + $(".part-1").height() + $(".part-2").height() + $(".move-box").height() - $(window).height(),
            s = $(".top-bar").height() + $(".part-1").height() + $(".part-2").height() - 160 + $(".part-3").height() - $(window).height(),
            n = $(".part-3").height() - $(".move-box").height() - 150,
            a = 700,
            i = function(o) {
                o || (o = .5),
                TweenMax.to($("body,html"), o, {
                    scrollTop: e,
                    yoyo: !1,
                    ease: Power1.easeNone
                }),
                e >= t && s >= e && TweenMax.to($(".move-box"), .5, {
                    y: n - 1.03 * (s - e),
                    yoyo: !1,
                    ease: Power3.easeNone
                }),
                e > a ? ($(".left-slide").addClass("on"), $(".fix-nav").addClass("show")) : ($(".left-slide").removeClass("on"), $(".fix-nav").removeClass("show")),
                d()
            };
            $(window).on("mousewheel",
            function(t) {
                t.deltaY > 0 ? e -= o: t.deltaY < 0 && (e += o),
                0 > e ? e = 0 : e > $("body").height() && (e = $("body").height()),
                i()
            });
            var r = [$(".top-bar").offset().top, $(".part-2").offset().top - 275, 2400, $(".part-4").offset().top + 100, $(".part-5").offset().top - 150],
            l = 0,
            c = 100,
            d = function() {
                l = e > r[0] && e < r[1] ? 0 : e > r[1] - c && e < r[2] - c ? 1 : e > r[2] - c && e < r[3] - c ? 2 : e > r[3] - c && e < r[4] - c ? 3 : 4,
                $(".fix-nav .fix-btn").eq(l).addClass("cur").siblings().removeClass("cur")
            },
            p = 0;
            $(".fix-nav .fix-btn").on("click",
            function() {
                var o = $(this).index();
                e = r[o],
                i(.2),
                p = 2 == o ? 540 : 0,
                TweenMax.to($(".move-box"), 0, {
                    y: p,
                    yoyo: !1,
                    ease: Power3.easeNone
                })
            }),
            $(".wdns").on("click",
            function() {
                e = r[3],
                i()
            })
        },
        roleSwiperInit: function() {
            var e = document.querySelector("#js-roleAudio"),
            o = $("#js-rAudio-btn"),
            t = void 0,
            s = ["https://hyj.res.netease.com/pc/gw/20190806153822/data/role/lsm.mp3", "https://hyj.res.netease.com/pc/gw/20190806153822/data/role/gzm.mp3", "https://hyj.res.netease.com/pc/gw/20190806153822/data/role/lm.mp3", "https://hyj.res.netease.com/pc/gw/20190806153822/data/role/lmf.mp3", "https://hyj.res.netease.com/pc/gw/20190806153822/data/role/lsx.mp3", "https://hyj.res.netease.com/pc/gw/20190806153822/data/role/lxy.mp3", "https://hyj.res.netease.com/pc/gw/20190806153822/data/role/hzg.mp3", "https://hyj.res.netease.com/pc/gw/20190806153822/data/role/lze.mp3", "https://hyj.res.netease.com/pc/gw/20190806153822/data/role/lqh.mp3"];
            o.on("click",
            function() {
                var o = $(this).data("audio");
                e.pause(),
                t.stopAutoplay(),
                $("#Jmusic")[0].pause(),
                $(".music-btn").addClass("pause"),
                setTimeout(function() {
                    e.src = o,
                    e.play()
                },
                50)
            });
            var n = function(e) {
                $("#js-role-text").find("div").removeClass("show").eq(e).addClass("show"),
                o.data("audio", s[e])
            };
            t = new Swiper("#role-swiper", {
                autoplay: 3e3,
                speed: 10,
                loop: !0,
                lazyLoading: !0,
                lazyLoadingInPrevNext: !0,
                initialSlide: 0,
                nextButton: "#role-next-btn",
                prevButton: "#role-prev-btn",
                onSlideChangeStart: function(o) {
                    n(o.realIndex),
                    e.pause()
                }
            })
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
                $(this).hasClass("pause") ? o[0].pause() : o[0].play()
            }),
            o[0] && o[0].play();
            var t = e({
                fat: "#video",
                width: "800",
                height: "450",
                movieUrl: "",
                HDmovieUrl: "",
                SHDmovieUrl: "",
                vtype: ""
            });
            $(".video-btn").click(function() {
                $("#js-roleAudio") && ($("#js-roleAudio")[0].pause(), $("#Jmusic")[0].pause()),
                $(".pop-video").fadeIn().addClass("show");
                var e = $(this).attr("data-src");
                t.change(e),
                t.play()
            }),
            $(".pop-video .close").click(function() {
                $(".pop-video").fadeOut().removeClass("show"),
                t.pause(),
                $("#Jmusic")[0].play(),
                $(".music-btn").removeClass("pause")
            })
        },
        commonPop: function() {
            var e = function(e, o) {
                $(e).on("click",
                function() {
                    $(o).fadeIn().addClass("show")
                }),
                $(o).find(".close").on("click",
                function() {
                    $(o).fadeOut().removeClass("show")
                })
            };
            e(".dlRole-btn", ".pop-gdgz")
        },
        slideNews: function() {
            var e = $(".slide-news-wrap"),
            o = e.find(".news-btn"),
            t = e.find(".close");
            o.on("click",
            function() {
                e.hasClass("show") ? e.removeClass("show") : e.addClass("show")
            }),
            t.on("click",
            function() {
                e.removeClass("show")
            })
        },
        newsModel: function() {
            var e = (new Swiper("#banner-swiper", {
                autoplay: 3e3,
                loop: !0,
                initialSlide: 0,
                pagination: "#banner-swiper .swiper-pagination",
                paginationClickable: !0,
                preventClicks: !1
            }), $("#js-news-btn .news-btn")),
            o = ["news/index.html", "news/official/index.html", "news/update/index.html"],
            t = new Swiper("#list-swiper", {
                loop: !1,
                initialSlide: 0,
                preventClicks: !1,
                onSlideChangeStart: function(t) {
                    e.removeClass("cur").eq(t.realIndex).addClass("cur"),
                    $("#js-newsMore").attr("href", o[t.realIndex])
                }
            });
            e.on("click",
            function() {
                var e = $(this).data("index");
                console.log(e),
                t.slideTo(e)
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
            t.skrollrFun(function() {
                t.scroll()
            }),
            t.setShare(),
            t.roleSwiperInit(),
            t.shareBtnEvent(),
            t.bgMuisc(),
            t.commonPop(),
            t.slideNews(),
            t.newsModel(),
            t.codeTab()
        }
    };
    $(function() {
        t.init()
    }),
    window.onload = function() {
        setTimeout(function() {
            window.scrollTo(0, 0)
        },
        100)
    }
});