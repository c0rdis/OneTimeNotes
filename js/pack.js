function getKey() {
    var text = "";
    text = window.location.hash.split("#")[1];
    if(typeof text === 'undefined'){
        return 0;
    }
    var key = document.getElementById('symmkey');
    key.value = text;
    return 1;
}        
    
function setKey() {
    document.getElementById("generate").style.display="none";
    document.getElementById("output").style.display="block";
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 8; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    var key = document.getElementById('symmkey');
    key.value = text;
}    

    ! function() {
        var a = [].slice;
        window.iced = {
            Deferrals: function() {
                function b(a) {
                    this.continuation = a, this.count = 1, this.ret = null
                }
                return b.prototype._fulfill = function() {
                    return --this.count ? void 0 : this.continuation(this.ret)
                }, b.prototype.defer = function(b) {
                    var c = this;
                    return ++this.count,
                        function() {
                            var d, e;
                            return d = 1 <= arguments.length ? a.call(arguments, 0) : [], null != b && null != (e = b.assign_fn) && e.apply(null, d), c._fulfill()
                        }
                }, b
            }(),
            findDeferral: function() {
                return null
            },
            trampoline: function(a) {
                return a()
            }
        }, window.__iced_k = window.__iced_k_noop = function() {}, $(function() {
            var a, b, c, d, e;
            return e = function(a) {
                return a.style.overflow = "hidden", a.style.height = 0, a.style.height = "" + (25 + Math.min(600, Math.max(a.scrollHeight, 50))) + "px"
            }, a = function() {
                var a, b;
                return e($("#id_private_note")[0]), b = $("#id_private_note").val(), a = $("#symmkey").val(), $(".btn-encrypt, .btn-decrypt").prop("disabled", !0), b && b.length && a && a.length && ($(".btn-encrypt").prop("disabled", !1), b.match(/^[a-f0-9]+$/i) && !(b.length % 2)) ? $(".btn-decrypt").prop("disabled", !1) : void 0
            }, b = [], d = function(a) {
                return b = [], $("#progress-summary").html(a || "")
            }, c = function(a) {
                var c, d, e, f;
                for (b.length && b[b.length - 1].what === a.what ? b[b.length - 1] = a : b.push(a), c = "", e = 0, f = b.length; f > e; e++) d = b[e], c += "<li>" + d.what + " " + d.i + "/" + d.total + "</li>";
                return $("#progress-summary").html(c)
            }, $("#id_private_note").on("change", function() {
                return a()
            }), $("#id_private_note").on("keyup", function() {
                return a()
            }), $("#symmkey").on("change", function() {
                return a()
            }), $("#symmkey").on("keyup", function() {
                return a()
            }), $(".btn-encrypt").on("click", function() {
                var b, f, g, h, i, j, k, l;
                l = __iced_k_noop, j = iced.findDeferral(arguments), d(), $(".btn-encrypt, .btn-decrypt").prop("disabled", !0), b = new triplesec.Buffer($("#id_private_note").val()), h = new triplesec.Buffer($("#symmkey").val()),
                    function(a) {
                        k = new iced.Deferrals(a, {
                            parent: j,
                            filename: "site/iced/site.iced"
                        }), triplesec.encrypt({
                            data: b,
                            key: h,
                            rng: triplesec.rng,
                            progress_hook: c
                        }, k.defer({
                            assign_fn: function() {
                                return function() {
                                    return f = arguments[0], i = arguments[1]
                                }
                            }(),
                            lineno: 47
                        })), k._fulfill()
                    }(function() {
                        ! function(a) {
                            k = new iced.Deferrals(a, {
                                parent: j,
                                filename: "site/iced/site.iced"
                            }), setTimeout(k.defer({
                                lineno: 48
                            }), 5), k._fulfill()
                        }(function() {
                            return f ? d("<li>" + f + "</li>") : (g = i.toString("hex"), $("#id_private_note").val(g), e($("#id_private_note")[0]), xhr(g)), a()
                        })
                    })
            }), $(".btn-decrypt").on("click", function() {
                var b, f, g, h, i, j, k, l;
                l = __iced_k_noop, j = iced.findDeferral(arguments), d(), $(".btn-encrypt, .btn-decrypt").prop("disabled", !0), b = new triplesec.Buffer($("#id_private_note").val(), "hex"), g = new triplesec.Buffer($("#symmkey").val()),
                    function(a) {
                        k = new iced.Deferrals(a, {
                            parent: j,
                            filename: "site/iced/site.iced"
                        }), triplesec.decrypt({
                            data: b,
                            key: g,
                            progress_hook: c
                        }, k.defer({
                            assign_fn: function() {
                                return function() {
                                    return f = arguments[0], h = arguments[1]
                                }
                            }(),
                            lineno: 66
                        })), k._fulfill()
                    }(function() {
                        ! function(a) {
                            k = new iced.Deferrals(a, {
                                parent: j,
                                filename: "site/iced/site.iced"
                            }), setTimeout(k.defer({
                                lineno: 67
                            }), 5), k._fulfill()
                        }(function() {
                            return f ? d("<li>" + f + "</li>") : (i = h.toString(), $("#id_private_note").val(i), e($("#id_private_note")[0])), decrypted(i), a()
                        })
                    })
            }), e($("#id_private_note")[0])
        })
    }.call(this);
    

function decrypted(data){
    if(typeof data === 'undefined'){
        document.getElementById('id_private_note').innerHTML = 'Sorry, the link is broken';
    }
}

function xhr(encrypted){
$.post("/otnote", {
        private_note: encrypted,
        csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value
    },
    function(data) {
	var part_url = "https://aan.sh/n/";
        part_url += data;
	part_url += "#";
	part_url += document.getElementById("symmkey").value;
	document.getElementById('priv_url_id').innerHTML = part_url;
        var instructions = '<br><br><br><h1>To send your note and key separately:</h4><br> <h4><span style="color:red">Your encrypted note link:</span>  https://aan.sh/n/'
        instructions += data
        instructions += '</h6> <br> <h4><span style="color:red">Your decryption key:</span> '
        instructions += document.getElementById("symmkey").value;
        instructions +='</h6>'
        document.getElementById("output").innerHTML += instructions;
    })
    .error( function() { 
        document.getElementById("output").style.display="none";
        document.getElementById("output_error").style.display="block"; 
    });
}

function noSubmit(e){
  if (e.keyCode == 13) {
	document.getElementById("otn_decrypt").click();
        return false;
    }
}

function Magic(){
    var key_input = getKey();
    if (key_input == 0){
        document.getElementById("key_input").style.display="block";
        document.getElementById("otn_decrypt").style.display="block";
    }
    else {
	document.getElementById("otn_decrypt").click();
    }
}
