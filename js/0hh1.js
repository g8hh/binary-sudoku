function Utility() {
    var e = {
        isDoubleTapBug: function (e, t) {
            if ($.browser.android) {
                if ("touchstart" != e.type && "touchstart" == $(t).data("lastTouch")) return e.stopImmediatePropagation(), e.preventDefault(), !0; - 1 != e.type.indexOf("touch") && $(t).data("lastTouch", !0)
            }
            return !1
        },
        getEventNames: function (e) {
            switch (e) {
                case "start":
                    return $.browser.ios || $.browser.android ? "touchstart" : "touchstart mousedown";
                case "move":
                    return $.browser.ios || $.browser.android ? "touchmove" : "touchmove mousemove";
                case "end":
                    return $.browser.ios || $.browser.android ? "touchend" : "touchend mouseup";
                default:
                    return e
            }
        },
        touchEnded: function () {
            touchEndedSinceTap = !0
        },
        isTouch: function () {
            return "ontouchstart" in document.documentElement
        },
        padLeft: function (e, t, n) {
            return Array(t - String(e).length + 1).join(n || "0") + e
        },
        trim: function (e) {
            return e.replace(/^\s*|\s*$/gi, "")
        },
        between: function (e, t, n) {
            return n ? 1 * (Math.random() * (t - e) + e).toFixed(n) : Math.floor(Math.random() * (t - e + 1) + e)
        },
        shuffleSimple: function (e) {
            return e.sort(function () {
                return .5 - Math.random()
            }), e
        },
        shuffle: function (e) {
            for (var t = 0; t < e.length - 1; t++) {
                var n = t + Math.floor(Math.random() * (e.length - t)),
                    i = e[n];
                e[n] = e[t], e[t] = i
            }
            return e
        },
        index: function (e, t) {
            var n = 0;
            for (var i in e) {
                if (n == t) return e[i];
                n++
            }
        },
        areArraysEqual: function (e, t) {
            return !(!e || !t) && e.join("|") === t.join("|")
        },
        count: function (e) {
            var t = 0;
            for (var n in e) t++;
            return t
        },
        eat: function (e) {
            return e.preventDefault(), e.stopPropagation(), !1
        },
        pick: function (e) {
            var t = e;
            if (e.constructor == Object) {
                t = [];
                for (var n in e) t.push(n)
            }
            var i = Utils.between(0, t.length - 1);
            return 0 == t.length ? null : t[i]
        },
        draw: function (e, t) {
            var n = e;
            if (e.constructor == Object) {
                n = [];
                for (var i in e) n.push(i)
            }
            if (0 == n.length) return null;
            var a = Utils.between(0, n.length - 1);
            if (void 0 != t) {
                for (var o = !1, r = 0; r < n.length; r++)
                    if (n[r] == t) {
                        a = r, o = !0;
                        break
                    }
                if (!o) return null
            }
            var s = n[a];
            return n.splice(a, 1), s
        },
        removeFromArray: function (e, t) {
            if (0 == e.length) return null;
            for (var n = !1, i = -1, a = 0; a < e.length; a++)
                if (e[a] == t) {
                    i = a, n = !0;
                    break
                }
            if (!n) return null;
            var o = e[i];
            return e.splice(i, 1), o
        },
        toArray: function (e) {
            var t = [];
            for (var n in e) t.push(n);
            return t
        },
        fillArray: function (e, t, n) {
            n || (n = 1);
            for (var i = new Array, a = 0; a < n; a++)
                for (var o = e; o <= t; o++) i.push(o);
            return i
        },
        contains: function (e, t) {
            for (var n = 0; n < e.length; n++)
                if (e[n] == t) return !0;
            return !1
        },
        setCookie: function (e, t, n) {
            if (n) {
                var i = new Date;
                i.setTime(i.getTime() + 24 * n * 60 * 60 * 1e3);
                a = "; expires=" + i.toGMTString()
            } else var a = "";
            document.cookie = e + "=" + t + a + "; path=/"
        },
        getCookie: function (e) {
            for (var t = e + "=", n = document.cookie.split(";"), i = 0; i < n.length; i++) {
                for (var a = n[i];
                    " " == a.charAt(0);) a = a.substring(1, a.length);
                if (0 == a.indexOf(t)) return a.substring(t.length, a.length)
            }
            return null
        },
        clearCookie: function (e) {
            this.setCookie(e, "", -1)
        },
        cssVendor: function (e, t, n) {
            switch (t) {
                case "opacity":
                    $.browser.ie ? e.css("-ms-filter", '"progid:DXImageTransform.Microsoft.Alpha(Opacity=' + Math.round(100 * n) + ')"') : e.css(t, n);
                    break;
                default:
                    for (var i = ["", "-webkit-", "-moz-", "-o-", "-ms-"], a = 0; a < i.length; a++) e.css(i[a] + t, n)
            }
        },
        createCSS: function (e, t) {
            t = t || "tempcss", $("#" + t).remove();
            var n = '<style id="' + t + '">' + e + "</style>";
            !window.isWebApp && window.MSApp && window.MSApp.execUnsafeLocalFunction ? MSApp.execUnsafeLocalFunction(function () {
                $("head").first().append($(n))
            }) : $("head").first().append($(n))
        },
        setColorScheme: function (e) {
            var t = Colors.getComplementary(e),
                n = ".odd  .tile-1 .inner { background-color: " + e + "; }.even .tile-1 .inner { background-color: " + Colors.luminateHex(e, .1) + "; }.odd  .tile-2 .inner { background-color: " + t + "; }.even .tile-2 .inner { background-color: " + Colors.luminateHex(t, .1) + "; }";
            Utils.createCSS(n)
        }
    };
    for (var t in e) this[t] = e[t]
}

function opposite(e) {
    switch (e) {
        case Directions.Right:
            return Directions.Left;
        case Directions.Left:
            return Directions.Right;
        case Directions.Up:
            return Directions.Down;
        case Directions.Down:
            return Directions.Up
    }
    return null
}

function generateUUID() {
    var e = (new Date).getTime();
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (t) {
        var n = (e + 16 * Math.random()) % 16 | 0;
        return e = Math.floor(e / 16), ("x" == t ? n : 3 & n | 8).toString(16)
    })
}

function Grid(e, t, n) {
    function i(e) {
        for (var t = 0; t < tiles.length; t++) {
            var n = t % width,
                i = Math.floor(t / width),
                a = tiles[t];
            if (e.call(a, n, i, t, a)) break
        }
        return w
    }

    function a(e, n) {
        e && (width = t = Math.sqrt(e.length), n && w.state.save("full", n)), tiles = [];
        for (var i = 0; i < width * t; i++) {
            var a = e ? e[i] : 0;
            tiles[i] = new Tile(a, w, i)
        }
        return r(), w
    }

    function o(e, n) {
        return e < 0 || e >= width || n < 0 || n >= t ? -1 : n * width + e
    }

    function r() {}

    function s(e) {
        if (!noRender) {
            if (clearTimeout(renderTOH), e) {
                Game.debug && console.log("rendering..."), rendered = !1;
                for (var i = '<table data-grid="' + n + '" id="grid" cellpadding=0 cellspacing=0>', a = 0; a < t; a++) {
                    i += "<tr>";
                    for (var r = 0; r < width; r++) {
                        var l = o(r, a),
                            u = tiles[l],
                            h = u && u.value > 0 ? u.value : "";
                        i += '<td data-x="' + r + '" data-y="' + a + '" class="' + ((r + a % 2) % 2 ? "even" : "odd") + '"><div id="tile-' + r + "-" + a + '" class="tile tile-' + h + '"><div class="inner"></div></div></td>'
                    }
                    i += "</tr>"
                }
                return i += "</table>", $("#" + n).html(i), Game.resize(), rendered = !0, w
            }
            renderTOH = setTimeout(function () {
                s(!0)
            }, 0)
        }
    }

    function l(e, n) {
        if (isNaN(e)) return emptyTile;
        if (isNaN(n)) {
            var i = e;
            e = i % width, n = Math.floor(i / width)
        }
        return e < 0 || e >= width || n < 0 || n >= t ? emptyTile : tiles[o(e, n)]
    }

    function u() {
        var e = [];
        return i(function () {
            this.isEmpty && e.push(this)
        }), e
    }

    function h(e, n) {
        var a, o, s = 0,
            l = tiles;
        if (w.state.clear(), noRender = !0, e || n) {
            l = tiles.concat();
            Utils.shuffle(l)
        }
        if (tileToSolve) {
            var h = [],
                d = [],
                f = [];
            i(function (e, t, n) {
                e == tileToSolve.x ? d.push(this) : t == tileToSolve.y ? h.push(this) : f.push(this)
            }), l = h.concat(d, [tileToSolve], f)
        }
        for (var p = width * t * 50; s++ < p;) {
            o = [];
            for (var m = !1, y = 0; y < l.length; y++)
                if ((a = l[y]).isEmpty) {
                    if (c(a)) {
                        if (v.active) return;
                        m = a;
                        break
                    }
                    o.push(a)
                }
            if (tileToSolve && m && tileToSolve.x == m.x && tileToSolve.y == m.y) return !0;
            if (!m && o.length && e) {
                a = o[0];
                var b = Utils.pick(a.possibleValues);
                a.value = b, w.state.push(a), g() || (w.state.pop(a), a.value = 1 == b ? 2 : 1, w.state.push(a), g() || w.state.pop(a))
            } else {
                if (!m) break;
                if (w.state.push(m), g() || w.state.pop(), n) break
            }
        }
        return noRender = !1, r(), 0 == u().length
    }

    function c(e) {
        if (e.collect(v), w.state.currentState && (w.state.currentState[e.id2] ? e.possibleValues = [1] : w.state.currentState[e.id1] && (e.possibleValues = [2])), 1 == e.possibleValues.length) return !!v.active || (e.value = e.possibleValues[0], !0);
        if (e.emptyRowPairWith && d(e, e.emptyRowPairWith)) {
            if (v.active) {
                e.clear();
                var t = HintType.SinglePossibleRowCombo,
                    n = [];
                return v.doubleColFound.length ? (t = HintType.ColsMustBeUnique, n = v.doubleColFound) : v.doubleRowFound.length && (t = HintType.RowsMustBeUnique, n = v.doubleRowFound), v.mark(e, t, e.emptyRowPairWith, n), !0
            }
            return !0
        }
        if (e.emptyColPairWith && d(e, e.emptyColPairWith)) {
            if (v.active) {
                e.clear();
                var t = HintType.SinglePossibleColCombo,
                    n = [];
                return v.doubleColFound.length ? (t = HintType.ColsMustBeUnique, n = v.doubleColFound) : v.doubleRowFound.length && (t = HintType.RowsMustBeUnique, n = v.doubleRowFound), v.mark(e, t, e.emptyColPairWith, n), !0
            }
            return !0
        }
        return !1
    }

    function d(e, t) {
        for (var n = 1; n <= 2; n++)
            if (e.value = n, t.value = 1 == n ? 2 : 1, !g()) return e.value = 1 == n ? 2 : 1, t.clear(), !0;
        return e.clear(), t.clear(), !1
    }

    function f(e) {
        var n = b.colInfo[e];
        if (!n) {
            var i = b.cols[e].join("");
            (n = b.colInfo[e] = {
                col: e,
                str: i,
                nr0s: i.replace(count0reg, "").length,
                nr1s: i.replace(count1reg, "").length,
                hasTriple: tripleReg.test(i)
            }).hasTriple && (n.hasTripleRed = tripleRedReg.test(i), n.hasTripleBlue = tripleBlueReg.test(i)), n.isFull = 0 == n.nr0s, n.nr2s = t - n.nr0s - n.nr1s, n.isInvalid = n.nr1s > maxPerRow || n.nr2s > maxPerRow || n.hasTriple
        }
        return n
    }

    function p(e) {
        var t = b.rowInfo[e];
        if (!t) {
            var n = b.rows[e].join("");
            (t = b.rowInfo[e] = {
                row: e,
                str: n,
                nr0s: n.replace(count0reg, "").length,
                nr1s: n.replace(count1reg, "").length,
                hasTriple: tripleReg.test(n)
            }).hasTriple && (t.hasTripleRed = tripleRedReg.test(n), t.hasTripleBlue = tripleBlueReg.test(n)), t.isFull = 0 == t.nr0s, t.nr2s = width - t.nr0s - t.nr1s, t.isInvalid = t.nr1s > maxPerRow || t.nr2s > maxPerRow || t.hasTriple
        }
        return t
    }

    function g(e) {
        v.doubleColFound = [], v.doubleRowFound = [];
        for (var t = {}, n = {}, i = 0; i < width; i++) {
            var a = f(i);
            if (a.isInvalid && !e) return !1;
            if (a.isFull)
                if (n[a.str]) {
                    if (a.unique = !1, a.similar = n[a.str] - 1, v.active && v.doubleColFound.push(n[a.str] - 1, i), !e) return !1
                } else a.unique = !0, n[a.str] = i + 1;
            if ((a = p(i)).isInvalid && !e) return !1;
            if (a.isFull)
                if (t[a.str]) {
                    if (a.unique = !1, a.similar = t[a.str] - 1, v.active && v.doubleRowFound.push(t[a.str] - 1, i), !e) return !1
                } else a.unique = !0, t[a.str] = i + 1
        }
        return !0
    }

    function m() {
        var e = [];
        return i(function (t, n, i, a) {
            var o = a.value,
                r = w.state.getValueForTile("full", t, n);
            o > 0 && o != r && e.push(a)
        }), e
    }
    var w = this,
        n = n || "board";
    width = e, t = t || e, tiles = [], renderTOH = 0, noRender = !1, emptyTile = new Tile(-99, w, -99), maxPerRow = Math.ceil(width / 2), maxPerCol = Math.ceil(t / 2), wreg = new RegExp("[12]{" + width + "}"), hreg = new RegExp("[12]{" + t + "}"), tripleReg = new RegExp("1{3}|2{3}"), tripleRedReg = new RegExp("1{3}"), tripleBlueReg = new RegExp("2{3}"), count0reg = new RegExp("[^0]", "g"), count1reg = new RegExp("[^1]", "g"), count2reg = new RegExp("[^2]", "g"), rendered = !1, quality = 0, tileToSolve = null;
    w.state = new State(this);
    for (var v = w.hint = new Hint(this), y = l, b = {
            cols: [],
            rows: [],
            colInfo: [],
            rowInfo: []
        }, k = 0; k < width; k++) b.cols[k] = Utils.fillArray(0, 0, t), b.rows[k] = Utils.fillArray(0, 0, width);
    this.each = i, this.render = r, this.getIndex = o, this.tile = y, this.generate = function () {
        var e = h(!0);
        return w.state.save("full"), e
    }, this.generateFast = function () {
        function e(e) {
            for (var t = 0; t < width; t++) l(t, e).clear();
            var i = o[e];
            i && (n.push(i), delete o[e])
        }
        var n = [],
            i = new RegExp("0{3}|1{3}", "g");
        noRender = !0,
            function () {
                for (var e = 0, t = Math.pow(2, width); e < t; e++) {
                    var a = Utils.padLeft(e.toString(2), width);
                    a.match(i) || a.split(0).length - 1 > maxPerRow || a.split(1).length - 1 > maxPerRow || n.push(a)
                }
            }(), Utils.shuffle(n);
        var a = 0,
            o = [],
            r = Utils.fillArray(0, 0, width);
        do {
            r[a]++;
            for (var s = n.shift(), u = 0; u < width; u++) l(u, a).value = 1 * s.charAt(u) + 1;
            if (g()) o[a] = s, a++;
            else if (n.push(s), e(a), r[a] >= n.length) {
                r[a] = 0;
                for (var h = 1; h < a; h++) e(h), r[h] = 0;
                a = 1
            }
        } while (a < t);
        w.state.save("full"), noRender = !1
    }, this.breakDown = function (e) {
        var n, a = 0,
            o = e || tiles.concat();
        tileToSolve = null, w.state.clear(), e || Utils.shuffle(o);
        for (var r = 0; r < o.length && a++ < 6;) {
            n = o[r++], tileToSolve = n;
            var s = n,
                l = n.value;
            n.clear(), w.state.save("breakdown"), h() ? (w.state.restore("breakdown"), a = 0) : (w.state.restore("breakdown"), s.value = l)
        }
        tileToSolve = null, w.state.save("empty"), quality = Math.round(u().length / (width * t) * 100), i(function () {
            this.isEmpty || (this.system = !0)
        })
    }, this.breakDownSimple = function () {
        var e, n = tiles.concat(),
            i = 0;
        Utils.shuffle(n);
        for (var a = []; i < n.length;) {
            var o = (e = n[i++]).value;
            e.clear(), c(e) ? e.clear() : (e.value = o, a.push(e))
        }
        return quality = Math.round(u().length / (width * t) * 100), a
    }, this.clear = function () {
        return i(function () {
            this.clear()
        }), w
    }, this.load = a, this.solve = h, this.step = function (e) {
        return h(e, !0)
    }, this.isValid = g, this.ease = function (e) {
        var t = u(),
            n = e ? Math.floor(e / 100 * t.length) : 1;
        if (!t.length) return w;
        Utils.shuffle(t);
        for (var i = 0; i < n; i++) {
            var a = t[i];
            a.value = w.state.getValueForTile("full", a.x, a.y)
        }
        return w
    }, this.size = e, this.markRow = function (e) {
        for (var t = 0; t < width; t++) y(t, e).mark();
        return w
    }, this.unmarkRow = function (e) {
        for (var t = 0; t < width; t++) y(t, e).unmark();
        return w
    }, this.markCol = function (e) {
        for (var n = 0; n < t; n++) y(e, n).mark();
        return w
    }, this.unmarkCol = function (e) {
        for (var n = 0; n < t; n++) y(e, n).unmark();
        return w
    }, this.mark = function (e, t) {
        return y(e, t).mark(), w
    }, this.unmark = function (e, n) {
        if ("number" == typeof e && "number" == typeof n) return y(e, n).unmark(), w;
        for (var n = 0; n < t; n++)
            for (var e = 0; e < width; e++) y(e, n).unmark();
        return w
    }, this.getValues = function () {
        var e = [];
        return i(function () {
            e.push(this.value)
        }), e
    }, this.setValue = function (e, t, n, i) {
        b.cols[e][t] = i, b.rows[t][e] = i, b.colInfo[e] = 0, b.rowInfo[t] = 0
    }, this.getColInfo = f, this.getRowInfo = p, this.activateDomRenderer = function () {
        r = this.render = s, noRender = !1
    }, this.__defineGetter__("tiles", function () {
        return tiles
    }), this.__defineGetter__("width", function () {
        return width
    }), this.__defineGetter__("height", function () {
        return t
    }), this.__defineGetter__("emptyTileCount", function () {
        return u().length
    }), this.__defineGetter__("emptyTiles", function () {
        return u()
    }), this.__defineGetter__("wrongTiles", function () {
        return m()
    }), this.__defineGetter__("rendered", function () {
        return rendered
    }), this.__defineGetter__("id", function () {
        return n
    }), this.__defineGetter__("quality", function () {
        return quality
    }), this.__defineGetter__("info", function () {
        return b
    }), this.__defineGetter__("maxPerRow", function () {
        return maxPerRow
    }), this.__defineGetter__("maxPerCol", function () {
        return maxPerCol
    }), this.__defineGetter__("hint", function () {
        return v
    }), a()
}

function Tile(e, t, n) {
    function i(e, n) {
        var i = s + e,
            a = l + n;
        return t.tile(i, a)
    }

    function a(e) {
        switch (e) {
            case Directions.Right:
                return i(1, 0);
            case Directions.Left:
                return i(-1, 0);
            case Directions.Up:
                return i(0, -1);
            case Directions.Down:
                return i(0, 1)
        }
    }

    function o(i) {
        return e = i, t.setValue(s, l, n, i), t.rendered ? $("#tile-" + s + "-" + l).removeClass().addClass("tile tile-" + e) : t.render(), r
    }
    var r = this,
        s = this.x = n % t.width,
        l = this.y = Math.floor(n / t.width),
        u = this.id = s + "," + l,
        h = new RegExp("0", "g"),
        c = [],
        d = null,
        f = null;
    this.id1 = u + "=1", this.id2 = u + "=2", this.right = function () {
        return a(Directions.Right)
    }, this.left = function () {
        return a(Directions.Left)
    }, this.up = function () {
        return a(Directions.Up)
    }, this.down = function () {
        return a(Directions.Down)
    }, this.move = a, this.clear = function () {
        o(0)
    }, this.collect = function (n) {
        if (e > 0) return r;
        c = [1, 2], f = null, d = null;
        for (var i = 1; i <= 2; i++) {
            var o = 1 == i ? 2 : 1;
            for (var u in Directions)
                if (a(u).value == i && a(u).move(u).value == i) return c = [o], n && n.active && n.mark(r, 2 == i ? HintType.MaxTwoBlue : HintType.MaxTwoRed), r;
            if (a(Directions.Left).value == i && a(Directions.Right).value == i || a(Directions.Up).value == i && a(Directions.Down).value == i) return c = [o], n && n.active && n.mark(r, 2 == i ? HintType.MaxTwoBlue : HintType.MaxTwoRed), r
        }
        var p = t.getRowInfo(l);
        if (p.nr1s >= t.maxPerRow) return c = [2], n && n.active && n.mark(r, HintType.RowMustBeBalanced), r;
        if (p.nr2s >= t.maxPerRow) return c = [1], n && n.active && n.mark(r, HintType.RowMustBeBalanced), r;
        2 == p.nr0s && p.str.replace(h, function (e, n) {
            n != r.x && (f = t.tile(n, r.y))
        });
        var g = t.getColInfo(s);
        return g.nr1s >= t.maxPerCol ? (c = [2], n && n.active && n.mark(r, HintType.ColMustBeBalanced), r) : g.nr2s >= t.maxPerCol ? (c = [1], n && n.active && n.mark(r, HintType.ColMustBeBalanced), r) : (2 == g.nr0s && g.str.replace(h, function (e, n) {
            n != r.y && (d = t.tile(r.x, n))
        }), r)
    }, this.mark = function () {
        return $("#tile-" + s + "-" + l).addClass("marked"), r
    }, this.unmark = function () {
        return $("#tile-" + s + "-" + l).removeClass("marked"), r
    }, this.isPartOfTripleX = function () {
        var t = e;
        if (!t) return !1;
        var n = Directions.Left,
            i = Directions.Right;
        return a(n).value == t && a(n).move(n).value == t || a(i).value == t && a(i).move(i).value == t || a(n).value == t && a(i).value == t
    }, this.isPartOfTripleY = function () {
        var t = e;
        if (!t) return !1;
        var n = Directions.Up,
            i = Directions.Down;
        return a(n).value == t && a(n).move(n).value == t || a(i).value == t && a(i).move(i).value == t || a(n).value == t && a(i).value == t
    }, this.isPartOfTriple = function () {
        return partOfTripleX() || partOfTripleY()
    }, this.__defineGetter__("value", function () {
        return e
    }), this.__defineSetter__("value", function (e) {
        return o(e)
    }), this.__defineGetter__("isEmpty", function () {
        return 0 == e
    }), this.__defineGetter__("possibleValues", function () {
        return c
    }), this.__defineSetter__("possibleValues", function (e) {
        c = e
    }), this.__defineGetter__("emptyRowPairWith", function () {
        return f
    }), this.__defineGetter__("emptyColPairWith", function () {
        return d
    })
}

function State(e) {
    var t, n, i = this,
        a = {};
    this.grid = e, this.clear = function () {
        n = t = {}
    }, this.save = function (e, t) {
        var n = {
            id: e = e || "1",
            values: [],
            restoreCount: 0
        };
        if (t)
            for (o = 0; o < t.length; o++) n.values.push(t[o]);
        else
            for (var o = 0; o < i.grid.tiles.length; o++) n.values.push(i.grid.tiles[o].value);
        return a[e] = n, i
    }, this.restore = function (e) {
        var t = a[e = e || "1"];
        t.restoreCount++;
        for (var n = 0; n < t.values.length; n++) i.grid.tiles[n].value = t.values[n];
        return i
    }, this.push = function (e) {
        var t = 1 == e.value ? e.id1 : e.id2,
            i = {
                parent: n,
                tile: e
            };
        n[t] = i, n[e.id] ? n[e.id]++ : n[e.id] = 1, n = i
    }, this.pop = function () {
        do {
            var e = n.tile;
            e.clear(), n = n.parent
        } while (n && 2 == n[e.id])
    }, this.getValueForTile = function (e, t, n) {
        var o = a[e];
        if (!o) return -1;
        if (isNaN(n)) var r = t,
            t = r % i.grid.width,
            n = Math.floor(r / i.grid.width);
        return o.values[n * i.grid.width + t]
    }, this.__defineGetter__("currentState", function () {
        return n
    })
}

function Hint(e) {
    function t() {
        a = !0;
        var t = [],
            i = [];
        e.isValid(!0);
        for (var o = 0; o < e.width; o++) {
            var r = e.getColInfo(o),
                s = e.getRowInfo(o);
            r.isFull && r.isInvalid && t.push(r), s.isFull && s.isInvalid && t.push(s), r.isFull && !r.unique && i.push(r), s.isFull && !s.unique && i.push(s)
        }
        var l = null;
        if (t.length ? l = Utils.pick(t) : i.length && (l = Utils.pick(i)), l) {
            var u = -1,
                h = -1,
                c = !(0 !== l.col && !l.col);
            if (hintType = null, u = c ? l.col : l.row, l.hasTriple ? hintType = l.hasTripleRed ? HintType.MaxTwoRed : HintType.MaxTwoBlue : l.nr2s > l.nr1s || l.nr1s > l.nr2s ? hintType = c ? HintType.ColMustBeBalanced : HintType.RowMustBeBalanced : l.nr1s > l.nr2s ? hintType = c ? HintType.ColMustBeBalanced : HintType.RowMustBeBalanced : l.unique || (hintType = c ? HintType.ColsMustBeUnique : HintType.RowsMustBeUnique, (0 == l.similar || l.similar) && (h = l.similar)), 0 == u || u) return c ? (e.markCol(u), (0 == h || h) && e.markCol(h)) : (e.markRow(u), (0 == h || h) && e.markRow(h)), n(hintType), !0
        }
        return !1
    }

    function n(e, t) {
        var n = e,
            i = Language.get(n);
        i && (n = i), t && (n = n.replace(/\%s/gi, t)), $("#hintMsg").html("<span>" + n + "</span>"), $("html").addClass("showHint"), o = !0
    }

    function i() {
        $("html").removeClass("showHint"), o = !1
    }
    var a = !1,
        o = !1,
        r = {
            type: HintType.None,
            tile: null,
            tile2: null,
            doubleRowOrCol: []
        };
    this.doubleColFound = [], this.doubleRowFound = [], this.clear = function () {
        this.doubleColFound = [], this.doubleRowFound = [], i(), e && e.unmark(), a = !1, r = {
            type: HintType.None,
            tile: null,
            tile2: null,
            doubleRowOrCol: []
        }
    }, this.mark = function (e, t, n, i) {
        return !!a && (r.tile = e, r.tile2 = n || null, r.type = t, r.doubleRowOrCol = i, !0)
    }, this.next = function () {
        var i = e.wrongTiles;
        if (i.length) {
            if (t()) return;
            1 == i.length ? (i[0].mark(), n(HintType.Error)) : ($(i).each(function () {
                this.mark()
            }), n(HintType.Errors))
        } else if (a = !0, e.solve(!1, !0), r.tile) switch (n(r.type), r.type) {
            case HintType.RowMustBeBalanced:
                e.markRow(r.tile.y);
                break;
            case HintType.ColMustBeBalanced:
                e.markCol(r.tile.x);
                break;
            case HintType.RowsMustBeUnique:
                e.markRow(r.tile.y), e.markRow(r.doubleRowOrCol[0] != r.tile.y ? r.doubleRowOrCol[0] : r.doubleRowOrCol[1]);
                break;
            case HintType.ColsMustBeUnique:
                e.markCol(r.tile.x), e.markCol(r.doubleRowOrCol[0] != r.tile.x ? r.doubleRowOrCol[0] : r.doubleRowOrCol[1]);
                break;
            default:
                r.tile2 && r.tile2.mark(), r.tile.mark()
        }
    }, this.show = n, this.hide = i, this.getErrorHintForCompleteGrid = t, this.info = r, this.__defineGetter__("active", function () {
        return a
    }), this.__defineSetter__("active", function (e) {
        a = e
    }), this.__defineGetter__("visible", function () {
        return o
    })
}

function generateGridAndSolution(e) {
    var t = new Date,
        n = new Grid(e);
    n.generateFast();
    var i = {};
    i.size = e, i.full = n.getValues();
    var a = 0,
        o = {
            4: 60,
            6: 60,
            8: 60,
            10: 60
        },
        r = 0;
    do {
        r > 0 && (n.clear(), n.state.restore("full")), n.breakDown(), a = n.quality
    } while (a < o[e] && r++ < 42);
    n.getValues();
    i.empty = n.getValues(), i.quality = n.quality, i.ms = new Date - t, self.postMessage(JSON.stringify(i))
}
var Config = {
    unlimited: !0,
    daily: !0,
    colorTheme: !0,
    languageSwitch: !0,
    skipGeoIP: !0,
    playLabelPlay: !1,
    playLabelFree: !0,
    newLabel: !1,
    GoogleAnalytics: "UA-45298460-4",
    defaultLanguage: "zh",
    lang: {
        nl: {
            tweetMessage: "Ik heb zojuist een $size x $size #0hh1 puzzel opgelost en mijn score is nu $score. http://0hh1.com ",
            tweetMessageDaily: "Ik heb zojuist de $size x $size #0hh1 puzzel van $today opgelost en mijn score is nu $score. http://0hh1.com "
        },
        en: {
            tweetMessage: "I just completed a $size x $size #0hh1 puzzle and my score is $score. http://0hh1.com ",
            tweetMessageDaily: "I just completed $today's $size x $size #0hh1 puzzle and my score is $score. http://0hh1.com "
        }
    }
};
window.isWebApp = !0;
var app = {
    fontsLoaded: !1,
    deviceReady: !1,
    started: !1,
    initialize: function () {
        this.bindEvents()
    },
    bindEvents: function () {
        document.addEventListener("deviceready", this.onDeviceReady, !1)
    },
    onDeviceReady: function () {
        setTimeout(function () {
            navigator && navigator.splashscreen && navigator.splashscreen.hide()
        }, 100), app.deviceReady = !0, app.startTheGameIfWeCan(), PlayCenter.autoSignIn()
    },
    receivedEvent: function (e) {},
    fontsLoaded: function () {
        app.fontsLoaded = !0
    },
    startTheGameIfWeCan: function () {
        if (app.started) return !1;
        app.started = !0, Game.init(), window.Config && Config.startGame ? Config.startGame() : Game.start()
    }
};
app.initialize(),
    function (e, t) {
        function n(n, u, h) {
            var w = [],
                v = r(o((u = 1 == u ? {
                    entropy: !0
                } : u || {}).entropy ? [n, l(e)] : null == n ? s() : n, 3), w),
                y = new i(w),
                b = function () {
                    for (var e = y.g(d), t = p, n = 0; e < g;) e = (e + n) * c, t *= c, n = y.g(1);
                    for (; e >= m;) e /= 2, t /= 2, n >>>= 1;
                    return (e + n) / t
                };
            return b.int32 = function () {
                return 0 | y.g(4)
            }, b.quick = function () {
                return y.g(4) / 4294967296
            }, b.double = b, r(l(y.S), e), (u.pass || h || function (e, n, i, o) {
                return o && (o.S && a(o, y), e.state = function () {
                    return a(y, {})
                }), i ? (t[f] = e, n) : e
            })(b, v, "global" in u ? u.global : this == t, u.state)
        }

        function i(e) {
            var t, n = e.length,
                i = this,
                a = 0,
                o = i.i = i.j = 0,
                r = i.S = [];
            for (n || (e = [n++]); a < c;) r[a] = a++;
            for (a = 0; a < c; a++) r[a] = r[o = w & o + e[a % n] + (t = r[a])], r[o] = t;
            (i.g = function (e) {
                for (var t, n = 0, a = i.i, o = i.j, r = i.S; e--;) t = r[a = w & a + 1], n = n * c + r[w & (r[a] = r[o = w & o + t]) + (r[o] = t)];
                return i.i = a, i.j = o, n
            })(c)
        }

        function a(e, t) {
            return t.i = e.i, t.j = e.j, t.S = e.S.slice(), t
        }

        function o(e, t) {
            var n, i = [],
                a = typeof e;
            if (t && "object" == a)
                for (n in e) try {
                    i.push(o(e[n], t - 1))
                } catch (e) {}
            return i.length ? i : "string" == a ? e : e + "\0"
        }

        function r(e, t) {
            for (var n, i = e + "", a = 0; a < i.length;) t[w & a] = w & (n ^= 19 * t[w & a]) + i.charCodeAt(a++);
            return l(t)
        }

        function s() {
            try {
                var t;
                return u && (t = u.randomBytes) ? t = t(c) : (t = new Uint8Array(c), (h.crypto || h.msCrypto).getRandomValues(t)), l(t)
            } catch (t) {
                var n = h.navigator,
                    i = n && n.plugins;
                return [+new Date, h, i, h.screen, l(e)]
            }
        }

        function l(e) {
            return String.fromCharCode.apply(0, e)
        }
        var u, h = this,
            c = 256,
            d = 6,
            f = "random",
            p = t.pow(c, d),
            g = t.pow(2, 52),
            m = 2 * g,
            w = c - 1;
        if (t["seed" + f] = n, r(t.random(), e), "object" == typeof module && module.exports) {
            module.exports = n;
            try {
                u = require("crypto")
            } catch (e) {}
        } else "function" == typeof define && define.amd && define(function () {
            return n
        })
    }([], Math);
var Utils = new Utility,
    Colors = new function () {
        function e(e) {
            var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
            return t ? {
                r: parseInt(t[1], 16),
                g: parseInt(t[2], 16),
                b: parseInt(t[3], 16)
            } : null
        }

        function n(e) {
            var t = e.toString(16);
            return 1 == t.length ? "0" + t : t
        }

        function a(e, t, i) {
            return "object" == typeof e && (t = e.g, i = e.b, e = e.r), "#" + n(e) + n(t) + n(i)
        }

        function o(e) {
            return hsv = new Object, max = u(e.r, e.g, e.b), dif = max - l(e.r, e.g, e.b), hsv.saturation = 0 == max ? 0 : 100 * dif / max, 0 == hsv.saturation ? hsv.hue = 0 : e.r == max ? hsv.hue = 60 * (e.g - e.b) / dif : e.g == max ? hsv.hue = 120 + 60 * (e.b - e.r) / dif : e.b == max && (hsv.hue = 240 + 60 * (e.r - e.g) / dif), hsv.hue < 0 && (hsv.hue += 360), hsv.value = Math.round(100 * max / 255), hsv.hue = Math.round(hsv.hue), hsv.saturation = Math.round(hsv.saturation), hsv
        }

        function r(e) {
            var n = new Object;
            if (0 == e.saturation) n.r = n.g = n.b = Math.round(2.55 * e.value);
            else {
                switch (e.hue /= 60, e.saturation /= 100, e.value /= 100, i = Math.floor(e.hue), f = e.hue - i, p = e.value * (1 - e.saturation), q = e.value * (1 - e.saturation * f), t = e.value * (1 - e.saturation * (1 - f)), i) {
                    case 0:
                        n.r = e.value, n.g = t, n.b = p;
                        break;
                    case 1:
                        n.r = q, n.g = e.value, n.b = p;
                        break;
                    case 2:
                        n.r = p, n.g = e.value, n.b = t;
                        break;
                    case 3:
                        n.r = p, n.g = q, n.b = e.value;
                        break;
                    case 4:
                        n.r = t, n.g = p, n.b = e.value;
                        break;
                    default:
                        n.r = e.value, n.g = p, n.b = q
                }
                n.r = Math.round(255 * n.r), n.g = Math.round(255 * n.g), n.b = Math.round(255 * n.b)
            }
            return n
        }

        function s(e, t) {
            for (e += t; e >= 360;) e -= 360;
            for (; e < 0;) e += 360;
            return e
        }

        function l(e, t, n) {
            return e < t ? e < n ? e : n : t < n ? t : n
        }

        function u(e, t, n) {
            return e > t ? e > n ? e : n : t > n ? t : n
        }
        this.hexToRgb = e, this.componentToHex = n, this.rgbToHex = a, this.colorToRgb = function (t) {
            return isNaN(t) || (t = PALETTE[t]), e(t)
        }, this.colorsMatch = function (e, t) {
            return e.r == t.r && e.g == t.g && e.b == t.b
        }, this.getComplementary = function (t) {
            var n = !1;
            "string" == typeof t && (n = !0), n && (t = e(t));
            var i = o(t);
            i.hue = s(i.hue, 180);
            var l = r(i);
            return n && (l = a(l)), l
        }, this.rgbToHsv = o, this.hsvToRgb = r, this.luminateHex = function (e, t) {
            (e = String(e).replace(/[^0-9a-f]/gi, "")).length < 6 && (e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2]), t = t || 0;
            var n, i, a = "#";
            for (i = 0; i < 3; i++) n = parseInt(e.substr(2 * i, 2), 16), a += ("00" + (n = Math.round(Math.min(Math.max(0, n + n * t), 255)).toString(16))).substr(n.length);
            return a
        }
    };
window.$ = window.$ || {}, $.browser = {}, $.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase()), $.browser.android = /android/.test(navigator.userAgent.toLowerCase()), $.browser.safari = /safari/.test(navigator.userAgent.toLowerCase()), $.browser.ipad = /ipad/.test(navigator.userAgent.toLowerCase()), $.browser.iphone = /iphone|ipod/.test(navigator.userAgent.toLowerCase()), $.browser.ios = /ipad|iphone|ipod/.test(navigator.userAgent.toLowerCase()), $.browser.ie = /msie/.test(navigator.userAgent.toLowerCase()), $.browser.chromeWebStore = !(!window.chrome || !window.chrome.storage);
for (var o in $.browser) $.browser[o] && $("html").addClass(o);
window.requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (e, t) {
    window.setTimeout(function () {
        e(+new Date)
    }, 10)
}, window.cancelAnimFrame = window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || function () {};
var HintType = {
        None: "None",
        RowsMustBeUnique: "RowsMustBeUnique",
        ColsMustBeUnique: "ColsMustBeUnique",
        RowMustBeBalanced: "RowMustBeBalanced",
        ColMustBeBalanced: "ColMustBeBalanced",
        MaxTwoRed: "MaxTwoRed",
        MaxTwoBlue: "MaxTwoBlue",
        SinglePossibleRowCombo: "SinglePossibleRowCombo",
        SinglePossibleColCombo: "SinglePossibleColCombo",
        Error: "Error",
        Errors: "Errors",
        GameContinued: "GameContinued",
        TimeTrialShown: "TimeTrialShown"
    },
    Directions = {
        Left: "Left",
        Right: "Right",
        Up: "Up",
        Down: "Down"
    },
    Game = new function () {
        function e() {
            window.plugins && window.plugins.socialsharing || SocialSharing.install(), ce = !0, de = !0, $("#tweeturl").on(Utils.getEventNames("click"), function (e) {
                return e.stopPropagation(), e.preventDefault(), setTimeout(function () {
                    window.plugins.socialsharing.shareViaTwitter(Je), PlayCenter.unlockAchievement(PlayCenter.IDS.Achievements.how_very_social_of_you)
                }, 0), !1
            }), $("#facebook").on(Utils.getEventNames("click"), function (e) {
                return e.stopPropagation(), e.preventDefault(), setTimeout(function () {
                    window.plugins.socialsharing.shareViaFacebook(Je), PlayCenter.unlockAchievement(PlayCenter.IDS.Achievements.how_very_social_of_you)
                }, 0), !1
            })
        }

        function t() {
            if (!Te && !Storage.getDataValue("splashSkibbable", !1)) {
                if (++$e < 8) return;
                Storage.setDataValue("splashSkibbable", !0), PlayCenter.unlockAchievement(PlayCenter.IDS.Achievements.the_impatient_one)
            }
            _(o)
        }

        function n() {
            var e = {
                iphone4: {
                    width: 320,
                    height: 480
                },
                iphone5: {
                    width: 320,
                    height: 568
                },
                nexus5: {
                    width: 360,
                    height: 640
                },
                nexus7: {
                    width: 604,
                    height: 966
                },
                oneplus6: {
                    width: 270,
                    height: 570
                },
                s9: {
                    width: 360,
                    height: 740
                },
                pocophone: {
                    width: 1080,
                    height: 2246
                }
            };
            for (var t in e) e[t].id = t;
            var n = {
                    width: $("#feelsize").width(),
                    height: $("#feelsize").height()
                },
                i = n.width / n.height,
                a = "iphone4",
                o = e[a],
                r = 999;
            for (var s in e) {
                var l = e[s],
                    u = l.width / l.height,
                    h = Math.abs(i - u);
                h < r && (a = s, o = e[s], r = h)
            }
            var c = n.width / n.height < i,
                d = {
                    width: Math.floor(c ? n.width : n.height / o.height * o.width),
                    height: Math.floor(c ? n.width / o.width * o.height : n.height)
                };
            if (d.width > n.width) {
                f = Math.floor(n.width / d.width * 100) / 100;
                d.width *= f
            }
            if (d.width == n.width) {
                var f = .96;
                d.width *= f
            }
            $("#container").css({
                width: d.width + "px",
                height: d.height + "px"
            });
            var p = d.width;
            $("h1").css("font-size", Math.round(.24 * p) + "px"), $("h2").css("font-size", Math.round(.18 * p) + "px"), $("h3").css("font-size", Math.round(.15 * p) + "px"), $("p").css("font-size", Math.round(.07 * p) + "px"), $(".by").css("font-size", Math.round(.05 * p) + "px"), $("#menu h2").css("font-size", Math.round(.24 * p) + "px"), $("#menu p").css("font-size", Math.round(.1 * p) + "px"), $("#menu p").css("padding", Math.round(.05 * p) + "px 0"), $("#menu p").css("line-height", Math.round(.08 * p) + "px"), $("#menu p .multiline").css("line-height", Math.round(.12 * p) + "px");
            var g = Math.round(.1 * p);
            $("#score").css({
                "font-size": g + "px",
                "line-height": .85 * g + "px",
                height: g + "px"
            });
            var m = Math.floor(.06875 * p);
            $(".icon").css({
                width: m,
                height: m,
                marginLeft: .7 * m,
                marginRight: .7 * m
            }), $(".board table").each(function (e, t) {
                var n = $(t),
                    i = n.attr("data-grid"),
                    a = n.width(),
                    o = n.find("tr").first().children("td").length,
                    r = Math.floor(a / o);
                if (r) {
                    var s = .85;
                    Themes && Themes.theme > 1 && (s = .89), n.find(".tile").css({
                        width: r + "px",
                        height: r + "px",
                        "line-height": Math.round(r * s) + "px",
                        "font-size": Math.round(.5 * r) + "px"
                    });
                    var l = Math.round(.1 * r),
                        u = "#" + i + " .tile .inner { border-radius: " + l + "px; }#" + i + " .tile-1 .inner:after, #" + i + " .tile-2 .inner:after { border-radius: " + l + "px; }";
                    Utils.createCSS(u, i + "radius"), Utils.createCSS(".tile.marked .inner { border-width: " + Math.floor(r / 24) + "px }", "tileSize")
                }
            }), $("#digits").width($("#titlegrid table").width()).height($("#titlegrid table").height()), $("#digits").css({
                "line-height": Math.round(.92 * $("#titlegrid table").height()) + "px",
                "font-size": .5 * $("#titlegrid table").height() + "px"
            });
            var w = Math.floor($("#container").height() / 2 - $("#board").height() / 2);
            $("#hintMsg").height(w + "px"), $(".digit").css("width", $("#hiddendigit").width() + "px"), window.Themes && Themes.resize(d.width, d.height)
        }

        function i() {
            De = !0, Me = !1, Re = !1, $(".screen").hide().removeClass("show"), $("#title").show(), setTimeout(function () {
                $("#title").addClass("show")
            }, 0)
        }

        function a() {
            De = !1, Re = !1, $(".screen").hide().removeClass("show"), $("#game").show(), setTimeout(function () {
                $("#game").addClass("show")
            }, 0), n(), ze && !ze.isTutorial && ($("#bar [data-action]").show(), $('#bar [data-action="playcenter"]').hide(), $('#bar [data-action="continue"]').hide(), $('#bar [data-action="achievements"]').hide(), $('#bar [data-action="leaderboards"]').hide(), $('#tweeturl, #facebook, [data-action="apps"]').hide()), ze && ze.isTutorial && ($("#bar [data-action]").hide(), $('#bar [data-action="back"]').show(), $('#bar [data-action="help"]').show(), $('#bar [data-action="about"]').show())
        }

        function o() {
            if (Config.skipMenu) return C("play-daily");
            De = !0, Me = !1, Re = !1, L(), clearTimeout(le), $("#playcenter").removeClass("spin"), $(".screen").hide().removeClass("show"), $("#menu").show(), $("#bar").show(), $("#bar [data-action]").hide(), PlayCenter.enabled && $('#bar [data-action="playcenter"]').show(), D(function (e) {
                $("#scorenr").html(e)
            }), setTimeout(function () {
                $("#menu").addClass("show")
            }, 0), n()
        }

        function r() {
            De = !1, Re = !0, $(".screen").hide().removeClass("show"), $("#about").show(), $("#bar [data-action]").hide(), setTimeout(function () {
                $("#about").addClass("show")
            }, 0), n()
        }

        function s() {
            Re = !0, De = !1, $(".screen").hide().removeClass("show"), $("#rules").show(), setTimeout(function () {
                $("#rules").addClass("show")
            }, 0), n()
        }

        function l() {
            Re = !0, De = !1, $(".screen").hide().removeClass("show"), $("#apps").show(), setTimeout(function () {
                $("#apps").addClass("show")
            }, 0), n()
        }

        function u() {
            Re = !0, De = !1, $(".screen").hide().removeClass("show"), $("#games").show(), setTimeout(function () {
                $("#games").addClass("show")
            }, 0), n()
        }

        function h() {
            if (we) return d(we);
            Config.skipMenu && $('[data-action="back"]').hide(), Me = !1, Re = !1, De = !1, $("#donate").hide(), a(), ge ? ($("#boardsize").html("<span>" + X() + "</span>"), $("#chooseSize").addClass("show")) : (window.Config || {}).playLabelFree ? ($("#boardsize").html("<span>" + Language.get("Free play") + "</span>"), $("#chooseSize").addClass("show")) : ($("#boardsize").html("<span>" + Language.get("Play") + "</span>"), $("#chooseSize").addClass("show")), ne(), $("#menugrid").removeClass("hidden"), $("#board").addClass("hidden"), $("#bar [data-action]").hide(), Config.skipMenu || $('#bar [data-action="back"]').show(), PlayCenter.isSignedIn && $('[data-action="achievements"],[data-action="leaderboards"]').show(), Be && !ze.isTutorial && $('[data-action="continue"]').show().addClass("subtleHintOnce"), $("#board").addClass("hidden"), $("#score").show(), setTimeout(function () {
                ie && ie.clear(), $("#score").addClass("show")
            }, 0)
        }

        function c() {
            De = !1, $(".screen").hide().removeClass("show"), $("#loading").show(), setTimeout(function () {
                $("#loading").addClass("show")
            }, 0)
        }

        function d(e) {
            De = !1, $("#game").removeClass("show"), c(), n(), setTimeout(function () {
                if (ge) {
                    var t = (Config.seedPrefix || "") + te() + "-" + i;
                    Math.seedrandom(t)
                } else Math.seedrandom();
                var n = !!ge,
                    i = Levels.getSize(e, n);
                f(i)
            }, 100)
        }

        function f(e, t) {
            if (!isNaN(e) && e > 0) return d(e);
            if (De = !1, !e || !e.size || !e.full) throw "no proper puzzle object received";
            ue && console.log(e), L(), window.STOPPED || (Ce = !1, $("#undo").closest(".iconcon").css("display", "inline-block"), $("#menugrid").addClass("hidden"), $("#board").removeClass("hidden"), $("#chooseSize").removeClass("show"), $("#score").removeClass("show").hide(), $('#bar [data-action="help"]').removeClass("hidden wiggle"), $('#bar [data-action="help"]').removeClass("subtleHint").css("display", "inline-block"), $("#boardsize").html("<span>" + e.size + " x " + e.size + "</span>"), ie = new Grid(e.size, e.size), xe = e.size, Re = !1, Me = !0, Be = !0, Ee = !0, Fe = 0, Ve = 0, He = 0, ie.load(e.empty, e.full), ie.each(function () {
                this.value = this.value, this.value > 0 && (this.system = !0)
            }), ie.state.save("empty"), ze = e, ie.hint.active = !0, ie.activateDomRenderer(), ie.render(), Ie = [], Le = !1, je = !1, We = 0, t || (Ue = new Date), he && Ue.setSeconds(Ue.getSeconds() - e.size * e.size * 5), clearTimeout(Oe), g(e.size), m(), K(!0), e.isTutorial ? $("#game").addClass("isTutorial") : $("#game").removeClass("isTutorial"), pe && !e.isTutorial ? p(!0, !0) : p(!1, !0), setTimeout(function () {
                a(), E()
            }, 0))
        }

        function p(e, t) {
            if (pe = void 0 != e ? e : !pe, t || Storage.setDataValue("showTimeTrial", pe), Me ? $("#time").show() : $("#time").hide(), pe) {
                if ($("#time").removeClass("hidden"), t || $("#toggleTimeTrialValue").html('<text data-text-id="Yes">' + Language.get("Yes") + "</text>"), Me) {
                    var n = g(ze.size);
                    void 0 == e && ie.hint.show(HintType.TimeTrialShown, n)
                }
            } else $("#time").addClass("hidden"), t || $("#toggleTimeTrialValue").html('<text data-text-id="No">' + Language.get("No") + "</text>"), Me && (void 0 == e && ie.hint.hide(), $("#boardsize").html("<span>" + ze.size + " x " + ze.size + "</span>"))
        }

        function g(e) {
            var t = Storage.getDataValue("bestTimeSize" + e, 60 * e);
            if (!t || 0 === t || t > 60 * e) return !1;
            var n = 1e3 * t,
                i = parseInt(n / 1e3 % 60),
                a = parseInt(n / 6e4 % 60),
                o = parseInt(n / 36e5 % 24);
            a = o > 0 && a < 10 ? "0" + a : a, i = i < 10 ? "0" + i : i;
            var r = "";
            return o > 0 && (r = r + o + ":"), r = r + a + ":", r += i, $("#boardsize span").text(r), r
        }

        function m() {
            var e = new Date - Ue,
                t = parseInt(e / 1e3 % 60),
                n = parseInt(e / 6e4 % 60),
                i = parseInt(e / 36e5 % 24);
            Fe = parseInt(e / 1e3), n = n < 10 ? "0" + n : n, t = t < 10 ? "0" + t : t, qe = "", n += "", t += "", i > 0 && (qe = qe + i + ":"), qe = qe + n + ":", qe += t, $("#minutes-l").text(n.split("")[0]), $("#minutes-r").text(n.split("")[1]), $("#seconds-l").text(t.split("")[0]), $("#seconds-r").text(t.split("")[1]), je || (Oe = setTimeout(m, 1e3))
        }

        function w() {
            clearTimeout(Oe), D(function (e) {
                var t = !1;
                if (ge) {
                    var n = Storage.getDataValue("today-progress", {}),
                        i = ze.size;
                    n[i] ? t = !0 : (Storage.setDataValue("today-progress", n), n[i] = !0, Storage.setDataValue("today-progress", n)), ne()
                }
                var a = 1 * e,
                    o = a;
                0 == t && (o = M(ie.width * ie.height, e)), $("#scorenr").html(o), Be = !1, ie.unmark(), ie.hint.hide(), ie.hint.active = !1, Ee = !1, E();
                var r = A() + "!";
                $("#boardsize").html("<span>" + r + "</span>"), ie.each(function () {
                    this.system = !0
                }), $("#bar [data-action]").hide(), $("#donate").hide(), 0 == Storage.getDataValue("donated", !1) && Storage.getDataValue("gamesPlayed", 0) >= 5 && $("#donate").show(), Storage.levelCompleted(ze.size, o, Fe, ze.isTutorial, Ve, He), re = setTimeout(function () {
                    $("#grid").addClass("completed"), ae = setTimeout(function () {
                        $("#board").addClass("hidden"), oe = setTimeout(function () {
                            if (je = !0, Me = !1, we && !ze.isTutorial) return Config.completeGame ? Config.completeGame({
                                puzzle: ze,
                                score: o
                            }) : d(we);
                            if (!we && !ze.isTutorial && Config.pauseAfterSize && Config.pauseGame && Config.pauseGame({
                                    puzzle: ze,
                                    score: o
                                }), $("#menugrid").removeClass("hidden"), $("#score").show(), 0 == Storage.getDataValue("donated", !1) && Storage.getDataValue("gamesPlayed", 0) >= 5 && $("#donate").show(), PlayCenter.isSignedIn && $('[data-action="achievements"],[data-action="leaderboards"]').show(), Ce || o > a && (R(a, o), fe && $('[data-action="apps"]').show(), ce && !ze.isTutorial && (j(ze.size), $("#tweeturl").show()), de && !ze.isTutorial && $("#facebook").show()), ze.isTutorial) {
                                var e = ge ? X() : Language.get("Free play");
                                if ($("#boardsize").html("<span>" + e + "</span>"), $("#chooseSize").addClass("show"), we) return d(we)
                            }
                            Config.skipMenu || $('#bar [data-action="back"]').show(), $("#time").hide(), $("#promo").show(), setTimeout(function () {
                                $("#score").addClass("show"), $("#grid").removeClass("completed"), setTimeout(function () {
                                    $("#tweeturl").addClass("subtleHintOnce")
                                }, 1e3)
                            }, 0)
                        }, 50)
                    }, 2e3)
                }, 1200), ze.isTutorial || Levels.finishedSize(ie.width)
            })
        }

        function v() {
            Storage.gameQuitted(), je = !0, L(), clearTimeout(Oe), $("#time").hide(), ie && (ie.unmark(), ie.hint.hide(), ie.hint.active = !1, ie.each(function () {
                this.system = !0
            })), h()
        }

        function y() {
            ke || (document.addEventListener("backbutton", P, !1), window.isWebApp || $(document).on(Utils.getEventNames("click"), "#games a", function (e) {
                if (e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), Utils.isDoubleTapBug(e, this)) return !1;
                var t = $(e.target).closest("a").attr("href");
                return $.browser.android ? window.open(t, "_system") : $.browser.ios && window.open(t, "_system"), !1
            }), window.WinJS && (WinJS.Application.onbackclick = P), $(document).on(Utils.getEventNames("keydown"), function (e) {
                return 27 == e.keyCode ? (P(), !1) : 32 == e.keyCode ? (C("help"), !1) : 90 == e.keyCode && (e.metaKey || e.ctrlKey) ? (C("undo"), !1) : void 0
            }), $(document).on(Utils.getEventNames("end"), k), $(document).on(Utils.getEventNames("start"), "#grid td", b), $(document).on(Utils.getEventNames("contextmenu"), function (e) {
                return e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), !1
            }), he && $(document).on(Utils.getEventNames("end"), "#boardsize", function () {
                ie && ie.solve()
            }), ke = !0)
        }

        function b(e) {
            if (Utils.isDoubleTapBug(e, this)) return !1;
            var t = $(e.target).closest("td"),
                n = 1 * t.attr("data-x"),
                i = 1 * t.attr("data-y"),
                a = ie.tile(n, i),
                o = 3 === e.which;
            if (a.system) {
                var r = t.find(".tile");
                return r.addClass("error"), Ge ? E() : G(), setTimeout(function () {
                    r.removeClass("error")
                }, 500), !1
            }
            if (clearTimeout(Pe), Tutorial.active) return Tutorial.tapTile(a), !1;
            ie && ie.hint && ie.hint.clear();
            var s, l = {
                x: a.x,
                y: a.y,
                oldValue: a.value,
                time: new Date
            };
            if (Ie.length) {
                s = Ie[Ie.length - 1];
                var u = ie.tile(s.x, s.y),
                    h = s.time;
                (u.id != a.id || new Date - h > 500) && Ie.push(l)
            } else Ie.push(l);
            return o ? a.isEmpty ? a.value = 2 : 2 == a.value ? a.value = 1 : a.clear() : a.isEmpty ? a.value = 1 : 1 == a.value ? a.value = 2 : a.clear(), Ie.length && ((s = Ie[Ie.length - 1]).newValue = a.value), K(), Pe = setTimeout(function () {
                S()
            }, 700), !1
        }

        function k(e) {
            if (window.Utils && Utils.isDoubleTapBug(e)) return !1;
            var t = $(e.target).closest("*[data-action]"),
                n = $(e.target).closest("*[data-action]").attr("data-action"),
                i = t.attr("data-value"),
                a = !(!t || !t.length || "A" != t[0].nodeName);
            return !a && e.target && "A" == e.target.nodeName && (a = !0), n && !a ? (C(n, i), !1) : a && Config.preventExternals ? (e.preventDefault(), e.stopPropagation(), !1) : void 0
        }

        function C(e, n) {
            switch (e) {
                case "gift":
                    J(!0);
                    break;
                case "toggleHintIcon":
                    Q();
                    break;
                case "close-titleScreen":
                    t();
                    break;
                case "show-menu":
                    clearTimeout(Pe), Tutorial.end(), ie && ie.hint.clear(), o(), je = !0;
                    break;
                case "back":
                    if (ve) {
                        var i = ve;
                        return ve = null, C(i)
                    }
                    return Me && Re ? C("show-game") : !Me && Re ? C("show-menu") : Me && ze && ze.isTutorial ? (Tutorial.end(), v(), clearTimeout(Pe), C("show-menu")) : Me && ze && !ze.isTutorial ? (clearTimeout(Pe), we && Config.abortGame ? void D(function (e) {
                        Config.abortGame({
                            score: 1 * e || 0
                        })
                    }) : (v(), C("show-sizes"))) : Config.skipMenu ? Config.abortGame ? void D(function (e) {
                        Config.abortGame({
                            score: 1 * e || 0
                        })
                    }) : C("show-daily") : C("show-menu");
                case "next":
                    clearTimeout(Pe), Tutorial.end(), ie && ie.hint.clear(), d(xe);
                    break;
                case "undo":
                    je || I();
                    break;
                case "continue":
                    B();
                    break;
                case "retry":
                    if (clearTimeout(Pe), $("#game").removeClass("show"), Tutorial.active || ze.isTutorial) return void setTimeout(function () {
                        Tutorial.start()
                    }, 300);
                    setTimeout(function () {
                        f(ze)
                    }, 300);
                    break;
                case "help":
                    if (je) break;
                    if (clearTimeout(Pe), Tutorial.active && !Tutorial.hintAllowed()) return;
                    ie.hint.visible ? ie.hint.clear() : (Ve++, ie.hint.clear(), ie.hint.next());
                    break;
                case "rules":
                    s();
                    break;
                case "end-rules":
                    return C(Config.preventExternals ? "back" : window.isWebApp ? "apps" : "games");
                case "games":
                    ve = "sizes" == n ? "play" : null, u();
                    break;
                case "apps":
                    l();
                    break;
                case "show-game":
                    a();
                    break;
                case "play":
                    ge = !1, Se ? h() : z();
                    break;
                case "play-daily":
                    ge = !0, console.log("tutorialPlayed", Se), Se ? h() : z();
                    break;
                case "tutorial":
                    !Config.unlimited && Config.daily && (ge = !0), z();
                    break;
                case "about":
                    r();
                    break;
                case "stopwatch":
                    p();
                    break;
                case "goto-0hn0":
                    N();
                    break;
                case "achievements":
                    PlayCenter.showAchievements();
                    break;
                case "leaderboards":
                    PlayCenter.showLeaderboard();
                    break;
                case "playcenter":
                    $.browser.ios && !window.isWebApp && PlayCenter.enabled && !PlayCenter.isSignedIn ? ($("#playcenter").addClass("spin"), PlayCenter.signIn(), clearTimeout(le), le = setTimeout(function () {
                        $("#playcenter").removeClass("spin")
                    }, 4e3)) : U();
                    break;
                case "sign-out":
                    PlayCenter.signOut();
                    break;
                case "sign-in":
                    PlayCenter.signIn();
                    break;
                case "stopwatch":
                case "settings":
                    q();
                    break;
                case "color-theme":
                    Themes.toggle();
                    break;
                case "toggleTimeTrial":
                    p();
                    break;
                case "toggleDonate":
                    F();
                    break;
                case "thanks":
                    O();
                    break;
                case "afterThanks":
                    if (!ye) return ye = !0, void o();
                    r();
                    break;
                case "toggleLanguage":
                    Language.toggle(), ee()
            }
        }

        function S() {
            ie.emptyTileCount > 0 ? ie.isValid() ? $('#bar [data-action="help"]').removeClass("subtleHint") : T() : ie.wrongTiles.length > 0 ? ie.hint.next() : w()
        }

        function T() {
            $('#bar [data-action="help"]').removeClass("subtleHint"), clearTimeout(se), setTimeout(function () {
                ie.isValid(!0);
                for (var e = !1, t = 0; t < ie.width; t++) {
                    var n = ie.getColInfo(t),
                        i = ie.getRowInfo(t);
                    if (n.isFull && (n.isInvalid || !n.unique) || i.isFull && (i.isInvalid || !i.unique)) {
                        e = !0;
                        break
                    }
                }
                e && ($('#bar [data-action="help"]').addClass("subtleHint"), se = setTimeout(function () {
                    $('#bar [data-action="help"]').removeClass("subtleHint")
                }, 2e3))
            }, 0)
        }

        function _(e) {
            Storage.getItem("tutorialPlayed", function (t) {
                var n = t.tutorialPlayed + "" == "true";
                Se = n, e(n)
            })
        }

        function x() {
            Storage.setItem("tutorialPlayed", !0), Se = !0, $('#menu [data-action="play"]').removeClass("locked")
        }

        function z() {
            $("#bar [data-action]").hide(), De = !1, Tutorial.start(), Ce = !0, _(function (e) {
                e || (Ce = !1), x(), $("#undo").closest(".iconcon").css("display", "none")
            })
        }

        function P() {
            return De ? window.WinJS ? window.close() : navigator.app && navigator.app.exitApp() : C("back"), !0
        }

        function A() {
            var e = Language.get("ojoos");
            return Ae.length || (Ae = Utils.shuffle(e.slice(0))), Utils.draw(Ae)
        }

        function D(e) {
            Storage.getItem("score", function (t) {
                var n = t.score;
                n || (n = 0), e(n)
            })
        }

        function M(e, t) {
            clearTimeout(M.TOH);
            var n = score = 1 * t,
                i = n + (e || 0);
            return i <= n ? n : (Storage.setItem("score", i), i)
        }

        function R(e, t) {
            function n() {
                $("#scorenr").html(e), e < t && e++, M.TOH = setTimeout(n, i)
            }
            var i = 500 / (t - e);
            n()
        }

        function I() {
            if (!Ie.length) return ie.hint.visible ? (ie.unmark(), void ie.hint.hide()) : void(Le ? ie.hint.show("Nothing to undo.") : ie.hint.show("That's the undo button."));
            var e = Ie.pop(),
                t = ie.tile(e.x, e.y),
                n = e.oldValue;
            ie.unmark(), n >= 0 ? t.value = n : t.clear(), t.mark();
            var i = Language.get("This tile was reversed to ");
            1 == n && (i += Language.get("red.")), 2 == n && (i += Language.get("blue.")), 0 == n && (i += Language.get("its empty state.")), ie.hint.show(i), Le = !0, He++, K(), clearTimeout(Pe), Pe = setTimeout(function () {
                S()
            }, 700)
        }

        function L() {
            clearTimeout(ae), clearTimeout(oe), clearTimeout(re), clearTimeout(se), clearTimeout(be.hide0), clearTimeout(be.hide1), clearTimeout(be.show01), clearTimeout(be.hide01)
        }

        function j(e) {
            D(function (t) {
                var n = ge ? "tweetMessageDaily" : "tweetMessage",
                    i = Language.get(n);
                window.Config && Config.lang && Config.lang[Language.current] && (i = Config.lang[Language.current][n]), i = (i = (i = i.replace(/\$size/gi, e)).replace(/\$score/gi, t)).replace(/\$today/gi, X().toLowerCase());
                var a = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(i);
                Je = i, $("#tweeturl").attr("href", a)
            })
        }

        function B() {
            var e = JSON.parse(JSON.stringify(Ie));
            f(ze, !0), $(e).each(function () {
                ie.tile(this.x, this.y).value = this.newValue
            }), Ie = e, setTimeout(function () {
                E(), ie.hint.show(HintType.GameContinued), K()
            }, 0)
        }

        function G() {
            ze.isTutorial || Ee && (ie.each(function (e, t, n, i) {
                this.system && $("#tile-" + e + "-" + t).addClass("system")
            }), Ge = !0, 10 == ++We && PlayCenter.unlockAchievement(PlayCenter.IDS.Achievements.happy_lock_toggler))
        }

        function E() {
            $(".system").removeClass("system"), Ge = !1
        }

        function N() {
            var e = "https://0hn0.com";
            window.isWebApp ? window.open(e, "_blank") : $.browser.android ? (e = "https://play.google.com/store/apps/details?id=com.q42.ohno", window.open(e, "_blank")) : $.browser.ios ? (e = "https://itunes.apple.com/us/app/0h-n0/id957191082?mt=8", window.open(e, "_system")) : window.open(e, "_blank")
        }

        function U() {
            De = !1, Re = !0, $(".screen").hide().removeClass("show"), $("#online").show(), $("#bar [data-action]").hide(), $('#bar [data-action="back"]').show(), setTimeout(function () {
                $("#online").addClass("show")
            }, 0), n()
        }

        function q() {
            De = !1, Re = !0, $(".screen").hide().removeClass("show"), $("#settings").show(), $("#settings [data-action]").show(), setTimeout(function () {
                $("#settings").addClass("show")
            }, 0), n()
        }

        function O() {
            De = !1, Re = !0, $(".screen").hide().removeClass("show"), $("#thanks").show(), setTimeout(function () {
                $("#thanks").addClass("show")
            }, 0), n()
        }

        function F() {
            Storage.getDataValue("donated", !1) || (ue ? confirm("Purchase 0h h1 for a $?") && V() : Store.buyFullVersion())
        }

        function V() {
            H(), ye = !1, O()
        }

        function H() {
            Storage.setDataValue("donated", !0), $('[data-action="thanks"]').show(), $('p[data-action="about"]').hide(), $("#donate").hide(), $("#toggleDonateValue").removeClass("link").html('<text data-text-id="Yes">' + Language.get("Yes") + "</text>"), fullVersion = !0, Storage.data.achievementsUnlocked && Storage.data.achievementsUnlocked.pay_to_win || PlayCenter.unlockAchievement(PlayCenter.IDS.Achievements.pay_to_win)
        }

        function W() {
            $("#donate").remove(), $("#toggleDonateValue").remove(), $("#toggleDontae").remove()
        }

        function J(e) {
            var t = $(".gift");
            t.removeClass("gift"), e && (t.addClass("unpack"), Storage.setDataValue("unpacked", !0), setTimeout(function () {
                $(".unpack").removeClass("unpack")
            }, 300))
        }

        function Q() {
            Ne = !Ne, Storage.setDataValue("hideHintIcon", Ne), Y()
        }

        function Y() {
            Ne ? ($("#toggleHintIcon").html('<text data-text-id="No">' + Language.get("No") + "</text>"), $('[data-action="help"]').addClass("disabled")) : ($("#toggleHintIcon").html('<text data-text-id="Yes">' + Language.get("Yes") + "</text>"), $('[data-action="help"]').removeClass("disabled").css("display", "inline-block"))
        }

        function K(e) {
            e && (K.totalTiles = ie.size * ie.size, K.initialEmptyTileCount = ie.emptyTileCount, K.initialTileCount = K.totalTiles - K.initialEmptyTileCount);
            var t = K.totalTiles - ie.emptyTileCount - K.initialTileCount,
                n = Math.ceil(t / K.initialEmptyTileCount * 100);
            $("#percentage .value").html(n + "%")
        }

        function X() {
            return Language.get("weekDays")[Z().getDay()]
        }

        function Z() {
            var e = new Date;
            if (me) {
                var t = me.split("-");
                if (t && 3 == t.length) {
                    var n = 1 * t[2],
                        i = 1 * t[1],
                        a = 1 * t[0];
                    e = new Date(n, i - 1, a)
                }
            }
            return e
        }

        function ee() {
            Ae = [];
            var e = Language.get("weekDays")[Z().getDay()];
            $("#weekDay").html(e.toLowerCase())
        }

        function te() {
            return Z().getFullYear() + "-" + (Z().getMonth() + 1) + "-" + Z().getDate()
        }

        function ne() {
            if ($("[data-gridsize]").removeClass("done"), ge) {
                var e = Storage.getDataValue("today-id");
                e && e == te() || (Storage.setDataValue("today-id", te()), Storage.setDataValue("today-progress", {}));
                var t = Storage.getDataValue("today-progress", {});
                for (var n in t) $('[data-gridsize="' + n + '"]').addClass("done")
            }
        }
        var ie, ae, oe, re, se, le, ue = "#debug" == document.location.hash,
            he = !1,
            ce = window.isWebApp,
            de = !1,
            fe = window.isWebApp,
            pe = !1,
            ge = !1,
            me = void 0,
            we = 0,
            ve = null,
            ye = !0,
            be = {},
            ke = !1,
            Ce = !1,
            Se = !!ue,
            Te = !1,
            $e = 0,
            _e = [4, 6, 8, 10, 12],
            xe = 0,
            ze = null,
            Pe = 0,
            Ae = [],
            De = !0,
            Me = !1,
            Re = !1,
            Ie = [],
            Le = !1,
            je = !1,
            Be = !1,
            Ge = !1,
            Ee = !0,
            Ne = !1,
            Ue = 0,
            qe = "",
            Oe = 0,
            Fe = 0,
            Ve = 0,
            He = 0,
            We = 0,
            Je = "#0hh1 I'm playing 0h h1 and I think you should too! https://0hh1.com (or get the App!)";
        this.showSettings = q, this.start = function (e) {
            if (e && (e.date && (me = e.date), e.size && (we = e.size)), setTimeout(function () {
                    Levels.init()
                }, 100), y(), ue || Config.skipIntro) _(o);
            else {
                if (Config.fastIntro) return $("#title").addClass("fast-anim"), $(".hide0").removeClass("hide0"), $(".hide1").removeClass("hide1"), $(".show01").removeClass("show01").addClass("hidehs finalanim"), void(Te = !0);
                be.hide0 = setTimeout(function () {
                    $(".hide0").removeClass("hide0")
                }, 300), be.hide1 = setTimeout(function () {
                    $(".hide1").removeClass("hide1")
                }, 1300), be.show01 = setTimeout(function () {
                    $(".show01").removeClass("hidehs")
                }, 2300), be.hide01 = setTimeout(function () {
                    $(".show01").removeClass("show01").addClass("hidehs finalanim"), Te = !0
                }, 4200)
            }
        }, this.init = function () {
            window.Analytics && Analytics.init(), Config.hideAboutButton && $('[data-action="about"]').remove(), window.Logger && (ue = !0), D(function (e) {
                $("#scorenr").html(e)
            }), $("#tweeturl, #facebook").hide(), (pe = Storage.getDataValue("showTimeTrial", !1)) ? $("#toggleTimeTrialValue").html('<text data-text-id="Yes">' + Language.get("Yes") + "</text>") : $("#toggleTimeTrialValue").html('<text data-text-id="No">' + Language.get("No") + "</text>"), Storage.getDataValue("donated", !1) && H(), Themes.init(), !1 === Config.showGamesPage && ($("#apps").attr("data-action", "back"), $('.inner[data-action="games"]').remove()), !1 === Config.newLabel && $(".new").remove(), Config.removeLinks && $(".web-link").remove(), !1 === Config.twitter && $('[data-action="tweet"]').remove(), window.isWebApp ? ue || W() : $("#app").hide(), Config.preventExternals && ($("#games, #apps").remove(), W()), Utils.isTouch() ? $("html").addClass("touch") : ($("html").addClass("web"), $(document).on("mousedown touchstart", ".web-link", function (e) {
                if (Config.preventExternals) return e.preventDefault(), e.stopPropagation(), !1;
                var t = "https://" + $(e.target).html();
                return window.open(t), !1
            })), $("[data-size]").each(function (e, t) {
                var n = $(t),
                    i = 1 * n.attr("data-size"),
                    a = _e[i - 1];
                n.html(a), n.on(Utils.getEventNames("start"), function (e) {
                    if (Utils.isDoubleTapBug(e)) return !1;
                    var t = _e[1 * $(e.target).closest("[data-size]").attr("data-size") - 1];
                    if ($(e.target).hasClass("gift")) return !1;
                    d(t)
                })
            }), n(), $(window).on(Utils.getEventNames("resize"), n), $(window).on(Utils.getEventNames("orientationchange"), n), !0 !== Config.allowScroll && $("#container").on(Utils.getEventNames("move"), function (e) {
                return e.preventDefault(), e.stopPropagation(), !1
            }), Store.init(), i(), n(), Storage.getDataValue("unpacked") && J(), Ne = Storage.getDataValue("hideHintIcon", !1), Y();
            var t = ["#a7327c", "#c24b31", "#c0cd31"];
            Utils.setColorScheme(t[1]), !window.isWebApp && window.SocialSharing && e(), window.isWebApp && PlayCenter.enabled && !PlayCenter.isSignedIn && PlayCenter.autoSignIn();
            var a = window.Config || {};
            for (var o in a) a[o] || $('[data-config="' + o + '"]').hide()
        }, this.startGame = f, this.showTitleScreen = i, this.showGame = a, this.showMenu = o, this.resize = n, this.showAbout = r, this.showApps = l, this.showGames = u, this.showOnline = U, this.startTutorial = z, this.checkForLevelComplete = S, this.undo = I, this.showSystemTiles = G, this.hideSystemTiles = E, this.getScore = D, this.setScore = M, this.purchaseReceived = V, this.enableDonatedState = H, this.refreshGameAfterLanguageChange = ee, window.Config && Config.debug && (this._test = w), window.__defineGetter__("tile", function () {
            return ie.tile
        }), this.__defineGetter__("grid", function () {
            return ie
        }), this.__defineGetter__("debug", function () {
            return ue
        })
    };
Grid.generate = function (e) {
    var t, n = 0;
    do {
        (t = new Grid(e)).generate()
    } while (t.emptyTileCount > 0 && n++ < 1);
    return t
};
var TutorialMessages = {
        1: {
            msg: "t01",
            tiles: [[0, 0, 1]]
        },
        2: {
            msg: "t02",
            tiles: [[0, 1, 2]]
        },
        3: {
            msg: "t03",
            tiles: [[2, 0, 2]]
        },
        4: {
            msg: "t04",
            tiles: [[1, 1, 1]]
        },
        5: {
            msg: "t05",
            tiles: [[1, 2, 2], [2, 2, 1]]
        },
        6: {
            msg: "t06",
            tiles: [[3, 1, 1]],
            rows: [1]
        },
        7: {
            msg: "t07",
            tiles: [[1, 3, 2]],
            cols: [1]
        },
        8: {
            msg: "t08",
            tiles: [[2, 3, 1]]
        },
        9: {
            msg: "t09",
            tiles: [[0, 3, 1], [0, 2, 2], [3, 2, 1]],
            rows: [2, 3]
        },
        10: {
            msg: "t10",
            tiles: [[3, 0, 2]],
            wiggle: !0
        }
    },
    Tutorial = new function () {
        function e() {
            if (o >= Utils.count(TutorialMessages)) return i(), r = !1, void setTimeout(function () {
                Game.checkForLevelComplete()
            }, 1e3);
            var e = TutorialMessages[++o];
            msg = Language.get(e.msg), n(msg), l = [], Game.grid.unmark(), $(e.tiles).each(function () {
                l.push(Game.grid.tile(this[0], this[1]))
            }), setTimeout(function () {
                t()
            }, 0), e.wiggle && $('#bar [data-action="help"]').addClass("wiggle")
        }

        function t() {
            var e = TutorialMessages[o];
            e.rows ? $(e.rows).each(function () {
                Game.grid.markRow(this)
            }) : e.cols ? $(e.cols).each(function () {
                Game.grid.markCol(this)
            }) : $(e.tiles).each(function () {
                Game.grid.mark(this[0], this[1])
            })
        }

        function n(e) {
            $("#hintMsg").html("<span>" + e + "</span>"), $("html").addClass("showHint"), s = !0
        }

        function i() {
            $("html").removeClass("showHint"), s = !1
        }

        function a() {
            var t = !0;
            $(TutorialMessages[o].tiles).each(function () {
                var e = this[0],
                    n = this[1],
                    i = Game.grid.tile(e, n),
                    a = this[2];
                i.value != a ? t = !1 : setTimeout(function () {
                    i.unmark(), i.system = !0
                }, 0)
            }), t && ($(l).each(function () {
                this.system = !0
            }), e())
        }
        var o = 0,
            r = !1,
            s = !1,
            l = [];
        this.start = function () {
            o = 0, r = !0, $('#bar [data-action="next"]').hide(), Game.startGame({
                size: 4,
                empty: [0, 1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                full: [1, 1, 2, 2, 2, 1, 2, 1, 2, 2, 1, 1, 1, 2, 1, 2],
                isTutorial: !0
            }), e()
        }, this.end = function () {
            $('#bar [data-action="help"]').removeClass("hidden wiggle"), r = !1
        }, this.next = e, this.show = n, this.hide = i, this.tapTile = function (e) {
            var n = !1;
            $(l).each(function () {
                e.x == this.x && e.y == this.y && (n = !0)
            }), n && (e.isEmpty ? e.value = 1 : 1 == e.value ? e.value = 2 : e.clear(), setTimeout(t, 0), a())
        }, this.hintAllowed = function () {
            return o >= 9
        }, this.__defineGetter__("active", function () {
            return r
        }), this.__defineSetter__("active", function (e) {
            r = e
        }), this.__defineGetter__("visible", function () {
            return s
        }), this.__defineGetter__("step", function () {
            return o
        })
    };
! function (e, t, n) {
    function i(e) {
        return function () {
            return this[e]
        }
    }

    function a(e, t) {
        var n = e.split("."),
            i = oe;
        !(n[0] in i) && i.execScript && i.execScript("var " + n[0]);
        for (var a; n.length && (a = n.shift());) n.length || t === te ? i = i[a] ? i[a] : i[a] = {} : i[a] = t
    }

    function o(e, t, n) {
        return e.call.apply(e.bind, arguments)
    }

    function r(e, t, n) {
        if (!e) throw Error();
        if (2 < arguments.length) {
            var i = Array.prototype.slice.call(arguments, 2);
            return function () {
                var n = Array.prototype.slice.call(arguments);
                return Array.prototype.unshift.apply(n, i), e.apply(t, n)
            }
        }
        return function () {
            return e.apply(t, arguments)
        }
    }

    function s(e, t, n) {
        return (s = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? o : r).apply(ie, arguments)
    }

    function l(e, t) {
        this.G = e, this.u = t || e, this.z = this.u.document, this.R = te
    }

    function u(e, n, i) {
        (e = e.z.getElementsByTagName(n)[0]) || (e = t.documentElement), e && e.lastChild && e.insertBefore(i, e.lastChild)
    }

    function h(e, t) {
        return e.createElement("link", {
            rel: "stylesheet",
            href: t
        })
    }

    function c(e, t) {
        return e.createElement("script", {
            src: t
        })
    }

    function d(e, t) {
        for (var n = e.className.split(/\s+/), i = 0, a = n.length; i < a; i++)
            if (n[i] == t) return;
        n.push(t), e.className = n.join(" ").replace(/\s+/g, " ").replace(/^\s+|\s+$/, "")
    }

    function f(e, t) {
        for (var n = e.className.split(/\s+/), i = [], a = 0, o = n.length; a < o; a++) n[a] != t && i.push(n[a]);
        e.className = i.join(" ").replace(/\s+/g, " ").replace(/^\s+|\s+$/, "")
    }

    function p(e, t) {
        for (var n = e.className.split(/\s+/), i = 0, a = n.length; i < a; i++)
            if (n[i] == t) return ne;
        return ae
    }

    function g(e) {
        if (e.R === te) {
            var t = e.z.createElement("p");
            t.innerHTML = '<a style="top:1px;">w</a>', e.R = /top/.test(t.getElementsByTagName("a")[0].getAttribute("style"))
        }
        return e.R
    }

    function m(e) {
        var t = e.u.location.protocol;
        return "about:" == t && (t = e.G.location.protocol), "https:" == t ? "https:" : "http:"
    }

    function w(e, t, n) {
        this.w = e, this.T = t, this.Aa = n
    }

    function v(e, t, n, i) {
        this.e = e != ie ? e : ie, this.o = t != ie ? t : ie, this.ba = n != ie ? n : ie, this.f = i != ie ? i : ie
    }

    function y(e) {
        e = se.exec(e);
        var t = ie,
            n = ie,
            i = ie,
            a = ie;
        return e && (e[1] !== ie && e[1] && (t = parseInt(e[1], 10)), e[2] !== ie && e[2] && (n = parseInt(e[2], 10)), e[3] !== ie && e[3] && (i = parseInt(e[3], 10)), e[4] !== ie && e[4] && (a = /^[0-9]+$/.test(e[4]) ? parseInt(e[4], 10) : e[4])), new v(t, n, i, a)
    }

    function b(e, t, n, i, a, o, r, s, l, u, h) {
        this.J = e, this.Ha = t, this.za = n, this.ga = i, this.Fa = a, this.fa = o, this.xa = r, this.Ga = s, this.wa = l, this.ea = u, this.k = h
    }

    function k(e, t) {
        this.a = e, this.H = t
    }

    function C(e) {
        var t = T(e.a, /(iPod|iPad|iPhone|Android|Windows Phone|BB\d{2}|BlackBerry)/, 1);
        return "" != t ? (/BB\d{2}/.test(t) && (t = "BlackBerry"), t) : "" != (e = T(e.a, /(Linux|Mac_PowerPC|Macintosh|Windows|CrOS)/, 1)) ? ("Mac_PowerPC" == e && (e = "Macintosh"), e) : "Unknown"
    }

    function S(e) {
        if ((t = T(e.a, /(OS X|Windows NT|Android) ([^;)]+)/, 2)) || (t = T(e.a, /Windows Phone( OS)? ([^;)]+)/, 2)) || (t = T(e.a, /(iPhone )?OS ([\d_]+)/, 2))) return t;
        if (t = T(e.a, /(?:Linux|CrOS) ([^;)]+)/, 1))
            for (var t = t.split(/\s/), n = 0; n < t.length; n += 1)
                if (/^[\d\._]+$/.test(t[n])) return t[n];
        return (e = T(e.a, /(BB\d{2}|BlackBerry).*?Version\/([^\s]*)/, 2)) ? e : "Unknown"
    }

    function T(e, t, n) {
        return (e = e.match(t)) && e[n] ? e[n] : ""
    }

    function $(e) {
        if (e.documentMode) return e.documentMode
    }

    function _(e) {
        this.va = e || "-"
    }

    function x(e, t) {
        this.J = e, this.U = 4, this.K = "n";
        var n = (t || "n4").match(/^([nio])([1-9])$/i);
        n && (this.K = n[1], this.U = parseInt(n[2], 10))
    }

    function z(e) {
        return e.K + e.U
    }

    function P(e) {
        var t = 4,
            n = "n",
            i = ie;
        return e && ((i = e.match(/(normal|oblique|italic)/i)) && i[1] && (n = i[1].substr(0, 1).toLowerCase()), (i = e.match(/([1-9]00|normal|bold)/i)) && i[1] && (/bold/i.test(i[1]) ? t = 7 : /[1-9]00/.test(i[1]) && (t = parseInt(i[1].substr(0, 1), 10)))), n + t
    }

    function A(e, t, n) {
        this.c = e, this.h = t, this.M = n, this.j = "wf", this.g = new _("-")
    }

    function D(e) {
        d(e.h, e.g.f(e.j, "loading")), R(e, "loading")
    }

    function M(e) {
        f(e.h, e.g.f(e.j, "loading")), p(e.h, e.g.f(e.j, "active")) || d(e.h, e.g.f(e.j, "inactive")), R(e, "inactive")
    }

    function R(e, t, n) {
        e.M[t] && (n ? e.M[t](n.getName(), z(n)) : e.M[t]())
    }

    function I(e, t) {
        this.c = e, this.C = t, this.s = this.c.createElement("span", {
            "aria-hidden": "true"
        }, this.C)
    }

    function L(e, t) {
        var n, i = e.s;
        n = [];
        for (var a = t.J.split(/,\s*/), o = 0; o < a.length; o++) {
            var r = a[o].replace(/['"]/g, ""); - 1 == r.indexOf(" ") ? n.push(r) : n.push("'" + r + "'")
        }
        n = n.join(","), a = "normal", o = t.U + "00", "o" === t.K ? a = "oblique" : "i" === t.K && (a = "italic"), n = "position:absolute;top:-999px;left:-999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:" + n + ";font-style:" + a + ";font-weight:" + o + ";", g(e.c) ? i.setAttribute("style", n) : i.style.cssText = n
    }

    function j(e) {
        u(e.c, "body", e.s)
    }

    function B(e, t, n, i, a, o, r, s) {
        this.V = e, this.ta = t, this.c = n, this.q = i, this.C = s || "BESbswy", this.k = a, this.F = {}, this.S = o || 5e3, this.Z = r || ie, this.B = this.A = ie, j(e = new I(this.c, this.C));
        for (var l in ue) ue.hasOwnProperty(l) && (L(e, new x(ue[l], z(this.q))), this.F[ue[l]] = e.s.offsetWidth);
        e.remove()
    }

    function G(e, t, n) {
        for (var i in ue)
            if (ue.hasOwnProperty(i) && t === e.F[ue[i]] && n === e.F[ue[i]]) return ne;
        return ae
    }

    function E(e) {
        var t = e.A.s.offsetWidth,
            n = e.B.s.offsetWidth;
        t === e.F.serif && n === e.F["sans-serif"] || e.k.T && G(e, t, n) ? re() - e.ya >= e.S ? e.k.T && G(e, t, n) && (e.Z === ie || e.Z.hasOwnProperty(e.q.getName())) ? N(e, e.V) : N(e, e.ta) : setTimeout(s(function () {
            E(this)
        }, e), 25) : N(e, e.V)
    }

    function N(e, t) {
        e.A.remove(), e.B.remove(), t(e.q)
    }

    function U(e, t, n, i) {
        this.c = t, this.t = n, this.N = 0, this.ca = this.Y = ae, this.S = i, this.k = e.k
    }

    function q(e, t, n, i, a) {
        if (0 === t.length && a) M(e.t);
        else
            for (e.N += t.length, a && (e.Y = a), a = 0; a < t.length; a++) {
                var o = t[a],
                    r = n[o.getName()],
                    l = e.t,
                    u = o;
                d(l.h, l.g.f(l.j, u.getName(), z(u).toString(), "loading")), R(l, "fontloading", u), new B(s(e.ha, e), s(e.ia, e), e.c, o, e.k, e.S, i, r).start()
            }
    }

    function O(e) {
        0 == --e.N && e.Y && (e.ca ? (e = e.t, f(e.h, e.g.f(e.j, "loading")), f(e.h, e.g.f(e.j, "inactive")), d(e.h, e.g.f(e.j, "active")), R(e, "active")) : M(e.t))
    }

    function F(e, t, n) {
        this.G = e, this.W = t, this.a = n, this.O = this.P = 0
    }

    function V(e, t) {
        de.W.$[e] = t
    }

    function H(e, t) {
        this.c = e, this.d = t
    }

    function W(e, t) {
        this.c = e, this.d = t
    }

    function J(e) {
        if (e = (n = e.split(":"))[0], n[1]) {
            for (var t = n[1].split(","), n = [], i = 0, a = t.length; i < a; i++) {
                var o = t[i];
                if (o) {
                    var r = fe[o];
                    n.push(r || o)
                }
            }
            for (t = [], i = 0; i < n.length; i += 1) t.push(new x(e, n[i]));
            return t
        }
        return [new x(e)]
    }

    function Q(e, t, n) {
        this.a = e, this.c = t, this.d = n, this.m = []
    }

    function Y(e, t) {
        this.c = e, this.d = t, this.m = []
    }

    function K(e, t, n) {
        this.L = e || t + pe, this.p = [], this.Q = [], this.da = n || ""
    }

    function X(e) {
        this.p = e, this.aa = [], this.I = {}
    }

    function Z(e, t, n) {
        this.a = e, this.c = t, this.d = n
    }

    function ee(e, t) {
        this.c = e, this.d = t, this.m = []
    }
    var te = void 0,
        ne = !0,
        ie = null,
        ae = !1,
        oe = this;
    oe.Ba = ne;
    var re = Date.now || function () {
        return +new Date
    };
    l.prototype.createElement = function (e, t, n) {
        if (e = this.z.createElement(e), t)
            for (var i in t)
                if (t.hasOwnProperty(i))
                    if ("style" == i) {
                        var a = e,
                            o = t[i];
                        g(this) ? a.setAttribute("style", o) : a.style.cssText = o
                    } else e.setAttribute(i, t[i]);
        return n && e.appendChild(this.z.createTextNode(n)), e
    }, a("webfont.BrowserInfo", w), w.prototype.qa = i("w"), w.prototype.hasWebFontSupport = w.prototype.qa, w.prototype.ra = i("T"), w.prototype.hasWebKitFallbackBug = w.prototype.ra, w.prototype.sa = i("Aa"), w.prototype.hasWebKitMetricsBug = w.prototype.sa;
    var se = /^([0-9]+)(?:[\._-]([0-9]+))?(?:[\._-]([0-9]+))?(?:[\._+-]?(.*))?$/;
    v.prototype.toString = function () {
        return [this.e, this.o || "", this.ba || "", this.f || ""].join("")
    }, a("webfont.UserAgent", b), b.prototype.getName = i("J"), b.prototype.getName = b.prototype.getName, b.prototype.pa = i("za"), b.prototype.getVersion = b.prototype.pa, b.prototype.la = i("ga"), b.prototype.getEngine = b.prototype.la, b.prototype.ma = i("fa"), b.prototype.getEngineVersion = b.prototype.ma, b.prototype.na = i("xa"), b.prototype.getPlatform = b.prototype.na, b.prototype.oa = i("wa"), b.prototype.getPlatformVersion = b.prototype.oa, b.prototype.ka = i("ea"), b.prototype.getDocumentMode = b.prototype.ka, b.prototype.ja = i("k"), b.prototype.getBrowserInfo = b.prototype.ja;
    var le = new b("Unknown", new v, "Unknown", "Unknown", new v, "Unknown", "Unknown", new v, "Unknown", te, new w(ae, ae, ae));
    k.prototype.parse = function () {
        var e;
        if (-1 != this.a.indexOf("MSIE")) {
            e = C(this);
            t = y(a = S(this));
            e = new b("MSIE", n = y(o = T(this.a, /MSIE ([\d\w\.]+)/, 1)), o, "MSIE", n, o, e, t, a, $(this.H), new w("Windows" == e && 6 <= n.e || "Windows Phone" == e && 8 <= t.e, ae, ae))
        } else if (-1 != this.a.indexOf("Opera")) e: {
            e = "Unknown";
            var t = y(a = T(this.a, /Presto\/([\d\w\.]+)/, 1)),
                n = y(o = S(this)),
                i = $(this.H);
            if (t.e !== ie ? e = "Presto" : (-1 != this.a.indexOf("Gecko") && (e = "Gecko"), a = T(this.a, /rv:([^\)]+)/, 1), t = y(a)), -1 != this.a.indexOf("Opera Mini/")) e = new b("OperaMini", s = y(r = T(this.a, /Opera Mini\/([\d\.]+)/, 1)), r, e, t, a, C(this), n, o, i, new w(ae, ae, ae));
            else {
                if (-1 != this.a.indexOf("Version/") && (r = T(this.a, /Version\/([\d\.]+)/, 1), (s = y(r)).e !== ie)) {
                    e = new b("Opera", s, r, e, t, a, C(this), n, o, i, new w(10 <= s.e, ae, ae));
                    break e
                }
                e = (s = y(r = T(this.a, /Opera[\/ ]([\d\.]+)/, 1))).e !== ie ? new b("Opera", s, r, e, t, a, C(this), n, o, i, new w(10 <= s.e, ae, ae)) : new b("Opera", new v, "Unknown", e, t, a, C(this), n, o, i, new w(ae, ae, ae))
            }
        } else if (/AppleWeb(K|k)it/.test(this.a)) {
            e = C(this);
            var a = S(this),
                t = y(a),
                o = T(this.a, /AppleWeb(?:K|k)it\/([\d\.\+]+)/, 1),
                n = y(o),
                i = "Unknown",
                r = new v,
                s = "Unknown",
                l = ae; - 1 != this.a.indexOf("Chrome") || -1 != this.a.indexOf("CrMo") || -1 != this.a.indexOf("CriOS") ? i = "Chrome" : /Silk\/\d/.test(this.a) ? i = "Silk" : "BlackBerry" == e || "Android" == e ? i = "BuiltinBrowser" : -1 != this.a.indexOf("Safari") ? i = "Safari" : -1 != this.a.indexOf("AdobeAIR") && (i = "AdobeAIR"), "BuiltinBrowser" == i ? s = "Unknown" : "Silk" == i ? s = T(this.a, /Silk\/([\d\._]+)/, 1) : "Chrome" == i ? s = T(this.a, /(Chrome|CrMo|CriOS)\/([\d\.]+)/, 2) : -1 != this.a.indexOf("Version/") ? s = T(this.a, /Version\/([\d\.\w]+)/, 1) : "AdobeAIR" == i && (s = T(this.a, /AdobeAIR\/([\d\.]+)/, 1)), r = y(s), l = "AdobeAIR" == i ? 2 < r.e || 2 == r.e && 5 <= r.o : "BlackBerry" == e ? 10 <= t.e : "Android" == e ? 2 < t.e || 2 == t.e && 1 < t.o : 526 <= n.e || 525 <= n.e && 13 <= n.o, e = new b(i, r, s, "AppleWebKit", n, o, e, t, a, $(this.H), new w(l, 536 > n.e || 536 == n.e && 11 > n.o, "iPhone" == e || "iPad" == e || "iPod" == e || "Macintosh" == e))
        } else -1 != this.a.indexOf("Gecko") ? (e = "Unknown", a = new v, t = "Unknown", o = S(this), n = y(o), i = ae, -1 != this.a.indexOf("Firefox") ? (e = "Firefox", t = T(this.a, /Firefox\/([\d\w\.]+)/, 1), a = y(t), i = 3 <= a.e && 5 <= a.o) : -1 != this.a.indexOf("Mozilla") && (e = "Mozilla"), r = T(this.a, /rv:([^\)]+)/, 1), s = y(r), i || (i = 1 < s.e || 1 == s.e && 9 < s.o || 1 == s.e && 9 == s.o && 2 <= s.ba || r.match(/1\.9\.1b[123]/) != ie || r.match(/1\.9\.1\.[\d\.]+/) != ie), e = new b(e, a, t, "Gecko", s, r, C(this), n, o, $(this.H), new w(i, ae, ae))) : e = le;
        return e
    }, _.prototype.f = function (e) {
        for (var t = [], n = 0; n < arguments.length; n++) t.push(arguments[n].replace(/[\W_]+/g, "").toLowerCase());
        return t.join(this.va)
    }, x.prototype.getName = i("J"), I.prototype.remove = function () {
        var e = this.s;
        e.parentNode && e.parentNode.removeChild(e)
    };
    var ue = {
        Ea: "serif",
        Da: "sans-serif",
        Ca: "monospace"
    };
    B.prototype.start = function () {
        this.A = new I(this.c, this.C), j(this.A), this.B = new I(this.c, this.C), j(this.B), this.ya = re(), L(this.A, new x(this.q.getName() + ",serif", z(this.q))), L(this.B, new x(this.q.getName() + ",sans-serif", z(this.q))), E(this)
    }, U.prototype.ha = function (e) {
        var t = this.t;
        f(t.h, t.g.f(t.j, e.getName(), z(e).toString(), "loading")), f(t.h, t.g.f(t.j, e.getName(), z(e).toString(), "inactive")), d(t.h, t.g.f(t.j, e.getName(), z(e).toString(), "active")), R(t, "fontactive", e), this.ca = ne, O(this)
    }, U.prototype.ia = function (e) {
        var t = this.t;
        f(t.h, t.g.f(t.j, e.getName(), z(e).toString(), "loading")), p(t.h, t.g.f(t.j, e.getName(), z(e).toString(), "active")) || d(t.h, t.g.f(t.j, e.getName(), z(e).toString(), "inactive")), R(t, "fontinactive", e), O(this)
    }, F.prototype.load = function (e) {
        var t = e.context || this.G;
        if (this.c = new l(this.G, t), t = new A(this.c, t.document.documentElement, e), this.a.k.w) {
            var n, i = this.W,
                a = this.c,
                o = [];
            for (n in e)
                if (e.hasOwnProperty(n)) {
                    var r = i.$[n];
                    r && o.push(r(e[n], a))
                }
            for (e = e.timeout, this.O = this.P = o.length, e = new U(this.a, this.c, t, e), n = 0, i = o.length; n < i; n++)(a = o[n]).v(this.a, s(this.ua, this, a, t, e))
        } else M(t)
    }, F.prototype.ua = function (e, t, n, i) {
        var a = this;
        i ? e.load(function (e, i, o) {
            var r = 0 == --a.P;
            r && D(t), setTimeout(function () {
                q(n, e, i || {}, o || ie, r)
            }, 0)
        }) : (e = 0 == --this.P, this.O--, e && (0 == this.O ? M(t) : D(t)), q(n, [], {}, ie, e))
    };
    var he = e,
        ce = new k(navigator.userAgent, t).parse(),
        de = he.WebFont = new F(e, new function () {
            this.$ = {}
        }, ce);
    de.load = de.load, H.prototype.load = function (e) {
        var t, n, i = this.d.urls || [],
            a = this.d.families || [];
        for (t = 0, n = i.length; t < n; t++) u(this.c, "head", h(this.c, i[t]));
        for (i = [], t = 0, n = a.length; t < n; t++) {
            var o = a[t].split(":");
            if (o[1])
                for (var r = o[1].split(","), s = 0; s < r.length; s += 1) i.push(new x(o[0], r[s]));
            else i.push(new x(o[0]))
        }
        e(i)
    }, H.prototype.v = function (e, t) {
        return t(e.k.w)
    }, V("custom", function (e, t) {
        return new H(t, e)
    });
    var fe = {
        regular: "n4",
        bold: "n7",
        italic: "i4",
        bolditalic: "i7",
        r: "n4",
        b: "n7",
        i: "i4",
        bi: "i7"
    };
    W.prototype.v = function (e, t) {
        return t(e.k.w)
    }, W.prototype.load = function (e) {
        u(this.c, "head", h(this.c, m(this.c) + "//webfonts.fontslive.com/css/" + this.d.key + ".css"));
        for (var t = this.d.families, n = [], i = 0, a = t.length; i < a; i++) n.push.apply(n, J(t[i]));
        e(n)
    }, V("ascender", function (e, t) {
        return new W(t, e)
    }), Q.prototype.v = function (e, t) {
        var n = this,
            i = n.d.projectId,
            a = n.d.version;
        if (i) {
            var o = n.c.u,
                r = n.c.createElement("script");
            r.id = "__MonotypeAPIScript__" + i;
            var s = ae;
            r.onload = r.onreadystatechange = function () {
                if (!(s || this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState)) {
                    if (s = ne, o["__mti_fntLst" + i]) {
                        var a = o["__mti_fntLst" + i]();
                        if (a)
                            for (var l = 0; l < a.length; l++) n.m.push(new x(a[l].fontfamily))
                    }
                    t(e.k.w), r.onload = r.onreadystatechange = ie
                }
            }, r.src = n.D(i, a), u(this.c, "head", r)
        } else t(ne)
    }, Q.prototype.D = function (e, t) {
        return m(this.c) + "//" + (this.d.api || "fast.fonts.com/jsapi").replace(/^.*http(s?):(\/\/)?/, "") + "/" + e + ".js" + (t ? "?v=" + t : "")
    }, Q.prototype.load = function (e) {
        e(this.m)
    }, V("monotype", function (e, n) {
        return new Q(new k(navigator.userAgent, t).parse(), n, e)
    }), Y.prototype.D = function (e) {
        var t = m(this.c);
        return (this.d.api || t + "//use.typekit.net") + "/" + e + ".js"
    }, Y.prototype.v = function (e, t) {
        var n = this.d.id,
            i = this.d,
            a = this.c.u,
            o = this;
        n ? (a.__webfonttypekitmodule__ || (a.__webfonttypekitmodule__ = {}), a.__webfonttypekitmodule__[n] = function (n) {
            n(e, i, function (e, n, i) {
                for (var a = 0; a < n.length; a += 1) {
                    var r = i[n[a]];
                    if (r)
                        for (var s = 0; s < r.length; s += 1) o.m.push(new x(n[a], r[s]));
                    else o.m.push(new x(n[a]))
                }
                t(e)
            })
        }, n = c(this.c, this.D(n)), u(this.c, "head", n)) : t(ne)
    }, Y.prototype.load = function (e) {
        e(this.m)
    }, V("typekit", function (e, t) {
        return new Y(t, e)
    });
    var pe = "//fonts.googleapis.com/css";
    K.prototype.f = function () {
        if (0 == this.p.length) throw Error("No fonts to load !");
        if (-1 != this.L.indexOf("kit=")) return this.L;
        for (var e = this.p.length, t = [], n = 0; n < e; n++) t.push(this.p[n].replace(/ /g, "+"));
        return e = this.L + "?family=" + t.join("%7C"), 0 < this.Q.length && (e += "&subset=" + this.Q.join(",")), 0 < this.da.length && (e += "&text=" + encodeURIComponent(this.da)), e
    };
    var ge = {
            latin: "BESbswy",
            cyrillic: "&#1081;&#1103;&#1046;",
            greek: "&#945;&#946;&#931;",
            khmer: "&#x1780;&#x1781;&#x1782;",
            Hanuman: "&#x1780;&#x1781;&#x1782;"
        },
        me = {
            thin: "1",
            extralight: "2",
            "extra-light": "2",
            ultralight: "2",
            "ultra-light": "2",
            light: "3",
            regular: "4",
            book: "4",
            medium: "5",
            "semi-bold": "6",
            semibold: "6",
            "demi-bold": "6",
            demibold: "6",
            bold: "7",
            "extra-bold": "8",
            extrabold: "8",
            "ultra-bold": "8",
            ultrabold: "8",
            black: "9",
            heavy: "9",
            l: "3",
            r: "4",
            b: "7"
        },
        we = {
            i: "i",
            italic: "i",
            n: "n",
            normal: "n"
        },
        ve = RegExp("^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$");
    X.prototype.parse = function () {
        for (var e = this.p.length, t = 0; t < e; t++) {
            var n = this.p[t].split(":"),
                i = n[0].replace(/\+/g, " "),
                a = ["n4"];
            if (2 <= n.length) {
                var o;
                if (o = [], r = n[1])
                    for (var r = r.split(","), s = r.length, l = 0; l < s; l++) {
                        var u;
                        if ((u = r[l]).match(/^[\w]+$/)) {
                            u = ve.exec(u.toLowerCase());
                            c = te;
                            if (u == ie) c = "";
                            else {
                                if (c = te, (c = u[1]) == ie || "" == c) c = "4";
                                else var h = me[c],
                                    c = h || (isNaN(c) ? "4" : c.substr(0, 1));
                                c = [u[2] == ie || "" == u[2] ? "n" : we[u[2]], c].join("")
                            }
                            u = c
                        } else u = "";
                        u && o.push(u)
                    }
                0 < o.length && (a = o), 3 == n.length && (n = n[2], o = [], 0 < (n = n ? n.split(",") : o).length && (n = ge[n[0]]) && (this.I[i] = n))
            }
            for (this.I[i] || (n = ge[i]) && (this.I[i] = n), n = 0; n < a.length; n += 1) this.aa.push(new x(i, a[n]))
        }
    };
    var ye = {
        Arimo: ne,
        Cousine: ne,
        Tinos: ne
    };
    Z.prototype.v = function (e, t) {
        t(e.k.w)
    }, Z.prototype.load = function (e) {
        var t = this.c;
        if ("MSIE" == this.a.getName() && this.d.blocking != ne) {
            var n = s(this.X, this, e),
                i = function () {
                    t.z.body ? n() : setTimeout(i, 0)
                };
            i()
        } else this.X(e)
    }, Z.prototype.X = function (e) {
        for (var t = this.c, n = new K(this.d.api, m(t), this.d.text), i = this.d.families, a = i.length, o = 0; o < a; o++) {
            var r = i[o].split(":");
            3 == r.length && n.Q.push(r.pop());
            var s = "";
            2 == r.length && "" != r[1] && (s = ":"), n.p.push(r.join(s))
        }(i = new X(i)).parse(), u(t, "head", h(t, n.f())), e(i.aa, i.I, ye)
    }, V("google", function (e, n) {
        return new Z(new k(navigator.userAgent, t).parse(), n, e)
    }), ee.prototype.D = function (e) {
        return m(this.c) + (this.d.api || "//f.fontdeck.com/s/css/js/") + (this.c.u.location.hostname || this.c.G.location.hostname) + "/" + e + ".js"
    }, ee.prototype.v = function (e, t) {
        var n = this.d.id,
            i = this.c.u,
            a = this;
        n ? (i.__webfontfontdeckmodule__ || (i.__webfontfontdeckmodule__ = {}), i.__webfontfontdeckmodule__[n] = function (e, n) {
            for (var i = 0, o = n.fonts.length; i < o; ++i) {
                var r = n.fonts[i];
                a.m.push(new x(r.name, P("font-weight:" + r.weight + ";font-style:" + r.style)))
            }
            t(e)
        }, n = c(this.c, this.D(n)), u(this.c, "head", n)) : t(ne)
    }, ee.prototype.load = function (e) {
        e(this.m)
    }, V("fontdeck", function (e, t) {
        return new ee(t, e)
    }), e.WebFontConfig && de.load(e.WebFontConfig)
}(this, document);
var Levels = new function () {
        function e() {
            try {
                var e = JSON.parse(Storage.getDataValue("puzzles", JSON.stringify(i)));
                e.size4 && (i = e), i.size12 || (i.size12 = [])
            } catch (e) {}
        }

        function t() {
            Storage.setDataValue("puzzles", JSON.stringify(i))
        }

        function n(e) {
            var t = new Grid(e),
                n = 0,
                i = {
                    size: e,
                    full: [],
                    empty: [],
                    quality: 0,
                    ms: 0
                },
                o = new Date;
            t.clear(), t.generateFast(), i.full = t.getValues();
            do {
                n > 0 && (t.clear(), t.state.restore("full")), t.breakDown(), i.quality = t.quality
            } while (i.quality < a[e] && n++ < 42);
            return i.empty = t.getValues(), i.ms = new Date - o, i.quality = quality, i
        }
        var i = {
                size4: [],
                size6: [],
                size8: [],
                size10: []
            },
            a = {
                4: 60,
                6: 60,
                8: 60,
                10: 60,
                12: 60
            };
        this.init = function () {
            e(), BackgroundService.kick()
        }, this.hasPuzzleAvailable = function (e) {
            var t = i["size" + e];
            return !(!t || !t.length)
        }, this.finishedSize = function (e) {
            var n = i["size" + e];
            n && n.length && (n.shift(), t(), BackgroundService.kick())
        }, this.addSize = function (e, n) {
            var a = i["size" + e];
            if (!a) return !1;
            a.push(n), t(), BackgroundService.kick()
        }, this.getSize = function (e, a) {
            var o = i["size" + e];
            if (a || !o || !o.length) return n(e);
            var r = o[0];
            return o.length > 1 && (o.shift(), t(), BackgroundService.kick()), r
        }, this.create = n, this.needs = function () {
            for (var e = 1; e <= 2; e++)
                for (var t in a) {
                    var n = i["size" + (t *= 1)];
                    if (n && n.length < e) return t
                }
            return !1
        }, this.__defineGetter__("puzzles", function () {
            return i
        })
    },
    FixedLevels = new function () {
        var e = {
            size4: [{
                size: 4,
                full: [2, 2, 1, 1, 1, 2, 1, 2, 2, 1, 2, 1, 1, 1, 2, 2],
                empty: [0, 0, 1, 0, 0, 0, 0, 2, 2, 0, 0, 0, 1, 1, 0, 0],
                quality: 69,
                ms: 8
            }, {
                size: 4,
                full: [1, 1, 2, 2, 1, 2, 2, 1, 2, 2, 1, 1, 2, 1, 1, 2],
                empty: [0, 0, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 0, 0],
                quality: 75,
                ms: 8
            }],
            size6: [{
                size: 6,
                full: [2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 1, 1, 2, 1, 1, 2, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1, 1, 2, 2, 1, 2],
                empty: [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 1, 1, 0, 2, 0, 0],
                quality: 75,
                ms: 38
            }, {
                size: 6,
                full: [2, 1, 1, 2, 2, 1, 1, 2, 1, 2, 1, 2, 1, 2, 2, 1, 1, 2, 2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 1, 1, 1, 2, 1, 2, 2],
                empty: [0, 1, 0, 0, 2, 1, 0, 2, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 1, 0, 1, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2],
                quality: 64,
                ms: 34
            }],
            size8: [{
                size: 8,
                full: [2, 1, 1, 2, 2, 1, 1, 2, 1, 2, 2, 1, 1, 2, 2, 1, 1, 1, 2, 2, 1, 2, 1, 2, 2, 1, 1, 2, 2, 1, 2, 1, 1, 2, 2, 1, 2, 1, 1, 2, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 1, 2, 1, 2, 1, 1, 2, 2, 1, 1, 2, 1, 2],
                empty: [0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 2, 0, 0, 0, 0, 2, 0, 1, 0, 1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
                quality: 80,
                ms: 137
            }, {
                size: 8,
                full: [2, 1, 2, 2, 1, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2, 1, 2, 2, 1, 1, 2, 1, 2, 1, 1, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 2, 1, 2],
                empty: [0, 0, 2, 2, 0, 0, 0, 0, 2, 0, 1, 0, 0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 1, 1, 0, 0, 0, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 1, 0],
                quality: 73,
                ms: 99
            }],
            size10: [{
                size: 10,
                full: [1, 2, 2, 1, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 2, 2, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 2, 1, 2, 2, 1, 2, 1, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 1, 2, 2, 1, 1, 2, 2, 1],
                empty: [0, 2, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 1, 0, 0, 2, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 2, 1, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0],
                quality: 71,
                ms: 258
            }, {
                size: 10,
                full: [1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1, 2, 2, 1, 1, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 1, 1, 2, 2, 1, 1, 2, 2, 2, 1, 1, 2, 1, 2, 2, 1, 2, 1, 1, 1, 2, 2, 1, 1, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2],
                empty: [1, 0, 1, 0, 0, 1, 2, 0, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 0, 1, 0, 0, 2, 0, 0, 1, 0, 2, 0, 2, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0],
                quality: 74,
                ms: 250
            }],
            size12: [{
                size: 12,
                full: [1, 2, 1, 1, 2, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1, 1, 2, 2, 1, 1, 2, 1, 2, 1, 2, 1, 2, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 1, 2, 2, 1, 1, 2, 1, 2, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 2, 1, 2, 1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 1, 2, 2, 1, 1, 2, 1],
                empty: [0, 0, 1, 0, 2, 2, 0, 2, 0, 0, 2, 0, 0, 0, 1, 0, 2, 2, 0, 0, 0, 0, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 1, 0, 2, 0, 2, 0, 0, 0, 2, 0, 0, 1, 1, 0, 0, 1, 2, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 1, 0, 2, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 1, 1, 0, 2, 0, 0, 0, 0],
                quality: 74,
                ms: 787
            }, {
                size: 12,
                full: [1, 2, 1, 2, 1, 2, 2, 1, 1, 2, 2, 1, 1, 1, 2, 2, 1, 2, 2, 1, 2, 2, 1, 1, 2, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 1, 2, 2, 1, 1, 2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 2, 1, 2, 1, 1, 2, 2, 1, 1, 2, 2, 1, 1, 2, 1, 2, 2, 1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 2, 2, 1, 1, 2],
                empty: [0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 2, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 1, 1, 2, 0, 0, 0, 2, 0, 2, 2, 0, 2, 0, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 1, 0, 1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 2, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0],
                quality: 73,
                ms: 494
            }, {
                size: 12,
                full: [2, 2, 1, 1, 2, 2, 1, 1, 2, 2, 1, 1, 1, 1, 2, 2, 1, 1, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2, 2, 1, 1, 2, 2, 1, 2, 1, 1, 1, 2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 1, 2, 2, 1, 1, 2, 2, 1, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 1, 2, 2, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2, 1],
                empty: [0, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 2, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 2, 1, 2, 0, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 2, 0, 2, 0, 0, 0, 1, 0, 0, 1, 0, 2, 0, 0, 0, 0, 1, 0, 1, 2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 2, 0, 0, 0, 0, 2, 0, 0, 2, 2, 0, 0, 0],
                quality: 70,
                ms: 534
            }, {
                size: 12,
                full: [2, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 2, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 1, 2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 2, 1, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2, 1, 1, 2, 2, 1, 2, 2, 1, 1, 2, 1, 1, 2, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 2, 1, 1, 2, 1, 2],
                empty: [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2, 0, 0, 1, 0, 2, 0, 0, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 2, 1, 2, 0, 1, 0, 0, 0, 0, 0, 1, 2, 0, 1, 0, 0, 0, 0, 2, 1, 0, 0, 0, 0, 2, 2, 0, 0, 1, 2, 1, 0, 2, 0, 0, 2, 2, 0, 2, 2, 1, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 2, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
                quality: 68,
                ms: 548
            }, {
                size: 12,
                full: [2, 1, 2, 2, 1, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 1, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 1, 1, 2, 2, 2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 2, 1, 1, 2, 1, 2, 2, 2, 1, 1, 2, 2, 1, 2, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 2, 2, 1, 1, 2, 2, 1, 2, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2, 1, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 2, 1, 1, 2, 1, 2, 1, 2, 1, 2, 2, 2, 1, 1, 2, 1, 2, 2, 1, 2, 1, 1],
                empty: [0, 0, 0, 0, 1, 1, 0, 0, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 2, 0, 0, 2, 1, 0, 0, 0, 0, 1, 0, 0, 2, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1, 0, 2, 0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 2, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 2, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 2, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
                quality: 74,
                ms: 706
            }]
        };
        this.has = function (t) {
            var n = "fixedLevelSize" + t;
            return alreadyServed = 1 * Storage.getDataValue(n, 0), pool = e["size" + t], !!(pool && alreadyServed < pool.length)
        }, this.get = function (t) {
            var n = "fixedLevelSize" + t;
            if (alreadyServed = 1 * Storage.getDataValue(n, 0), pool = e["size" + t], Game.debug && console.log("retrieving fixed level " + t + ", ", alreadyServed), pool && alreadyServed < pool.length) {
                var i = pool[alreadyServed];
                return Storage.setDataValue(n, alreadyServed + 1), i
            }
            return null
        }
    },
    Store = new function () {
        function e() {
            l.isActive && (l.isTrial || Game.purchaseReceived())
        }

        function t() {
            store.register({
                id: s,
                alias: s,
                type: store.NON_CONSUMABLE
            })
        }

        function n() {
            o = !0, i(), Game.fullVersion || a(), r && alert("\\o/ STORE READY \\o/")
        }

        function i() {
            o && (store.when(s).owned(function (e) {
                r && alert("FULL VERSION OWNED, UNLOCKING"), Game.enableDonatedState()
            }), store.when(s).approved(function (e) {
                r && alert("FULL VERSION APPROVED, UNLOCKING"), e.finish(), Game.purchaseReceived()
            }), store.when(s).cancelled(function (e) {
                r && alert("FULL VERSION CANCELLED")
            }), store.when(s).error(function (e) {
                r && alert("FULL VERSION ERROR")
            }), window.MSApp && e())
        }

        function a(t) {
            if (o && !Game.fullVersion) {
                if (r && alert("RESTORE PURCHASE?"), window.store) {
                    var n = store.get(s);
                    if (n && n.transaction && n.transaction.id) r && alert("RESTORING PURCHASE BY TRANSACTION"), t ? Game.purchaseReceived() : Game.enableDonatedState();
                    else if (t) {
                        var i = {
                            action: "back",
                            text: "<h1>" + lang("couldNotRestorePurchase") + "</h1>"
                        };
                        Game.showMessages(i)
                    }
                    r && alert(JSON.stringify(n))
                }
                window.MSApp && e()
            }
        }
        var o = !1,
            r = !1,
            s = "0hh1_supporter",
            l = null;
        this.init = function () {
            window.store && (store.verbosity = store.DEBUG, t(), store.ready(n), store.refresh(), r && store.error(function (e) {
                alert("STORE ERROR " + e.code + ": " + e.message)
            })), window.MSApp && (currentApp = Windows.ApplicationModel.Store.CurrentApp, l = currentApp.licenseInformation, o = !0, l.addEventListener("licensechanged", e))
        }, this.buyFullVersion = function () {
            if (o && (window.MSApp || store.order(s), window.MSApp)) {
                var e = currentApp.licenseInformation;
                !e.isActive || e.isTrial ? currentApp.requestAppPurchaseAsync(!1).done(function () {
                    e.isActive && !e.isTrial ? (WinJS.log && WinJS.log("You successfully upgraded your app to the fully-licensed version.", "sample", "status"), Game.purchaseReceived()) : WinJS.log && WinJS.log("You still have a trial license for this app.", "sample", "error")
                }, function () {
                    WinJS.log && WinJS.log("The upgrade transaction failed. You still have a trial license for this app.", "sample", "error")
                }) : (WinJS.log && WinJS.log("You already bought this app and have a fully-licensed version.", "sample", "error"), Game.purchaseReceived())
            }
        }, this.restorePurchases = a, this.__defineGetter__("enabled", function () {
            return o
        })
    },
    BackgroundService = new function () {
        function e() {
            if (o) {
                Game.debug && console.log("Web worker created on the fly");
                var e = [Utility, State, Grid, Tile, generateGridAndSolution, "var HintType = " + JSON.stringify(HintType) + ";var Directions = {Left: 'Left',Right: 'Right',Up: 'Up',Down: 'Down'};", "\nvar Utils = new Utility();", "\nfunction Hint() { this.active = false; }", "self.onmessage = function(e) {generateGridAndSolution(e.data.size)};"].join(""),
                    n = new Blob([e], {
                        type: "text/javascript"
                    });
                r = new Worker(a.createObjectURL(n))
            } else r = new Worker("js/webworker.js"), Game.debug && console.log("Web worker created statically");
            r.onmessage = function (e) {
                t(JSON.parse(e.data))
            }
        }

        function t(e) {
            Game.debug && console.log("generated puzzle", e), Levels.addSize(e.size, e)
        }

        function n(t) {
            i && (r || e(), r.postMessage({
                size: t
            }))
        }
        var i = !!window.Worker,
            a = window.URL || window.webkitURL,
            o = !(!window.Blob || !a),
            r = null;
        Game.debug && console.log("BackgroundService:", i), this.generatePuzzle = n, this.kick = function () {
            var e = Levels.needs();
            if (e) {
                if (window.FixedLevels && FixedLevels.has(e)) {
                    var t = FixedLevels.get(e);
                    if (t) return void Levels.addSize(t.size, t)
                }
                n(e)
            }
        }, this.__defineGetter__("enabled", function () {
            return i
        })
    },
    Storage = new function () {
        function e(e) {
            var t = !1;
            for (var i in e) void 0 === r[i] && (r[i] = e[i], t = !0, Game.debug && console.log("upgraded from template", i, e[i]));
            t && n()
        }

        function t(e) {
            for (var t = e; t >= 16;)
                for (var i = 10; i >= 4; i -= 2) {
                    var a = i * i;
                    t >= a && (t -= a, r["size" + i + "played"]++, r.gamesPlayed++)
                }
            n()
        }

        function n() {
            a(o, JSON.stringify(r))
        }

        function i(e, t) {
            if ($.browser.chromeWebStore) chrome.storage.local.get(e, t);
            else {
                var n = {};
                n[e] = localStorage.getItem((Config.storagePrefix || "") + e), t(n)
            }
        }

        function a(e, t, n) {
            if ($.browser.chromeWebStore) {
                var i = {};
                i[e] = t, chrome.storage.local.set(i, n)
            } else localStorage.setItem((Config.storagePrefix || "") + e, t), n && n()
        }
        var o = Config.id,
            r = {
                q: 42,
                size4played: 0,
                size6played: 0,
                size8played: 0,
                size10played: 0,
                size12played: 0,
                gamesPlayed: 0,
                bestTimeSize4: 240,
                bestTimeSize6: 360,
                bestTimeSize8: 480,
                bestTimeSize10: 600,
                bestTimeSize12: 720,
                gamesQuitted: 0,
                autoSignIn: !0,
                showTimeTrial: !1,
                achievementsUnlocked: {},
                achievementsNotSent: {},
                theme: 1,
                hideHintIcon: !1
            };
        $(function () {
            var n = JSON.parse(JSON.stringify(r));
            i(o, function (i) {
                var a = !1;
                if (i && i[o]) {
                    var s = i[o],
                        l = JSON.parse(s);
                    l && 42 == l.q && (r = l, a = !0, e(n))
                }
                a || Game.getScore(function (e) {
                    !(e > 0 && r) || r.size4played || r.size6played || r.size8played || r.size10played || t(e)
                })
            })
        }), this.getItem = i, this.setItem = a, this.clear = function (e) {
            $.browser.chromeWebStore ? chrome.storage.local.clear(e) : (localStorage.clear(), e && e())
        }, this.levelCompleted = function (e, t, i, a, o, s) {
            if (Game.debug && console.log("levelCompleted", e, t, i, a, o, s), Game.debug && console.log("data", r), !(!e || e < 4 || e > 12) && i && !isNaN(i))
                if (a) PlayCenter.unlockAchievement(PlayCenter.IDS.Achievements.apprentice);
                else {
                    if (r.gamesPlayed++, t > 0 && PlayCenter.submitScore(PlayCenter.IDS.Leaderboards.score, t), PlayCenter.submitScore(PlayCenter.IDS.Leaderboards.games_played, r.gamesPlayed), 4 == e && (r.size4played++, PlayCenter.submitScore(PlayCenter.IDS.Leaderboards._4_x_4_played, r.size4played), o || PlayCenter.unlockAchievement(PlayCenter.IDS.Achievements.no_questions_asked_4_x_4), s || PlayCenter.unlockAchievement(PlayCenter.IDS.Achievements.forward_4_x_4)), 6 == e && (r.size6played++, PlayCenter.submitScore(PlayCenter.IDS.Leaderboards._6_x_6_played, r.size6played), o || PlayCenter.unlockAchievement(PlayCenter.IDS.Achievements.no_questions_asked_6_x_6), s || PlayCenter.unlockAchievement(PlayCenter.IDS.Achievements.forward_6_x_6)), 8 == e && (r.size8played++, PlayCenter.submitScore(PlayCenter.IDS.Leaderboards._8_x_8_played, r.size8played), o || PlayCenter.unlockAchievement(PlayCenter.IDS.Achievements.no_questions_asked_8_x_8), s || PlayCenter.unlockAchievement(PlayCenter.IDS.Achievements.forward_8_x_8)), 10 == e && (r.size10played++, PlayCenter.submitScore(PlayCenter.IDS.Leaderboards._10_x_10_played, r.size10played), o || PlayCenter.unlockAchievement(PlayCenter.IDS.Achievements.no_questions_asked_10_x_10), s || PlayCenter.unlockAchievement(PlayCenter.IDS.Achievements.forward_10_x_10)), 12 == e && (r.size12played++, PlayCenter.submitScore(PlayCenter.IDS.Leaderboards._12_x_12_played, r.size12played), o || PlayCenter.unlockAchievement(PlayCenter.IDS.Achievements.no_questions_asked_12_x_12), s || PlayCenter.unlockAchievement(PlayCenter.IDS.Achievements.forward_12_x_12)), r.gamesPlayed >= 10 && PlayCenter.unlockAchievement(PlayCenter.IDS.Achievements.ten), r.gamesPlayed >= 42 && PlayCenter.unlockAchievement(PlayCenter.IDS.Achievements.q42), r.gamesPlayed >= 100 && PlayCenter.unlockAchievement(PlayCenter.IDS.Achievements.hundred), r.gamesPlayed >= 1e3 && PlayCenter.unlockAchievement(PlayCenter.IDS.Achievements.thousand), r.gamesPlayed >= 25e3 && PlayCenter.unlockAchievement(PlayCenter.IDS.Achievements.jennifer), r["size" + e + "played"] >= 1) {
                        for (var l = !0, u = 4; u <= 10; u += 2) u != e && (r["size" + u + "played"] >= 1 || (l = !1));
                        l && PlayCenter.unlockAchievement(PlayCenter.IDS.Achievements.allfour)
                    }
                    r["size" + e + "played"] >= 10 && (4 == e && PlayCenter.unlockAchievement(PlayCenter.IDS.Achievements._160_dots), 6 == e && PlayCenter.unlockAchievement(PlayCenter.IDS.Achievements._360_dots), 8 == e && PlayCenter.unlockAchievement(PlayCenter.IDS.Achievements._640_dots), 10 == e && PlayCenter.unlockAchievement(PlayCenter.IDS.Achievements._1000_dots), 12 == e && PlayCenter.unlockAchievement(PlayCenter.IDS.Achievements._1440_dots));
                    var h = 1e3 * i;
                    if (i > 0) {
                        PlayCenter.submitScore(PlayCenter.IDS.Leaderboards.best_time, h), 4 == e && PlayCenter.submitScore(PlayCenter.IDS.Leaderboards.best_time_4_x_4, h), 6 == e && PlayCenter.submitScore(PlayCenter.IDS.Leaderboards.best_time_6_x_6, h), 8 == e && PlayCenter.submitScore(PlayCenter.IDS.Leaderboards.best_time_8_x_8, h), 10 == e && PlayCenter.submitScore(PlayCenter.IDS.Leaderboards.best_time_10_x_10, h), 12 == e && PlayCenter.submitScore(PlayCenter.IDS.Leaderboards.best_time_12_x_12, h);
                        var c = r["bestTimeSize" + e];
                        !isNaN(c) && i < c && (r["bestTimeSize" + e] = i)
                    }
                    Game.debug && console.log(r), n()
                }
        }, this.gameQuitted = function () {
            r.gamesQuitted++, n(), 10 == r.gamesQuitted && PlayCenter.unlockAchievement(PlayCenter.IDS.Achievements.quitter)
        }, this.setDataValue = function (e, t) {
            r[e] = t, n()
        }, this.getDataValue = function (e, t) {
            return void 0 === r[e] ? void 0 != t && t : r[e]
        }, this.achievementUnlocked = function (e) {
            r.achievementsUnlocked[e] || (Game.debug && console.log("achievement unlocked: " + e), r.achievementsUnlocked[e] = !0, r.achievementsNotSent[e] = !0, n())
        }, this.achievementSent = function (e) {
            r.achievementsUnlocked[e] && r.achievementsNotSent[e] && (delete r.achievementsNotSent[e], n())
        }, this.__defineGetter__("data", function () {
            return r
        })
    },
    PlayCenter = new function () {
        this.IDS = {
            Leaderboards: {},
            Achievements: {}
        }, this.autoSignIn = function (e) {}, this.signIn = function (e, t) {}, this.signOut = function (e) {}, this.submitScore = function (e, t) {}, this.showLeaderboard = function (e) {}, this.unlockAchievement = function (e) {}, this.showAchievements = function () {}, this.resetAchievements = function () {}, this.__defineGetter__("enabled", function () {
            return !1
        }), this.__defineGetter__("isSignedIn", function () {
            return !1
        })
    },
    Themes = new function () {
        function e() {
            f && (f = !0, p = requestAnimFrame(e), cycleTime = new Date, t())
        }

        function t() {
            if (!(cycleTime < l)) {
                var e = Utils.between(-c, c, 4),
                    t = Utils.between(-c, c, 4),
                    n = Utils.between(29, 31) / 100;
                a.style.webkitTransform = "translate3d(" + e + "px, " + t + "px, 0)", a.style.transform = "translate3d(" + e + "px, " + t + "px, 0)", o.style.opacity = n, l = new Date((new Date).getTime() + 50);
                for (p = 0; p < h.length; p++) {
                    var i = h[p];
                    u.clearRect(i[0], i[1], i[2] - i[0], i[3] - i[1])
                }
                h = [];
                var r = Utils.between(1, 5);
                u.fillStyle = "rgba(0,0,0,0.3)";
                for (p = 0; p < r; p++) {
                    e = Utils.between(0, d.width);
                    t = Utils.between(0, d.height), u.beginPath(), u.arc(e, t, Utils.between(.1, 3, 2), 0, s, !0), u.fill(), h.push([e - 4, t - 4, e + 4, t + 4])
                }
                var f = Utils.between(1, 5);
                u.lineWidth = .2, u.strokeStyle = "rgba(0,0,0,0.7)";
                for (var p = 0; p < f; p++) {
                    e = Utils.between(0, d.width);
                    t = Utils.between(0, d.height), dy = Utils.between(-d.height / 2, d.height, 2), u.beginPath(), u.moveTo(e, t), u.lineTo(e, t + dy), u.stroke();
                    var g = dy >= 0 ? t : t + dy,
                        m = dy >= 0 ? t + dy : t;
                    h.push([e - 1, g - 1, e + 1, m + 1])
                }
            }
        }

        function n() {
            3 == i ? (f = !0, e()) : (f = !1, cancelAnimFrame && cancelAnimFrame(p), a.style.webkitTransform = "none", a.style.transform = "none"), g && m[i] && (document.location.hash = m[i]), $("html").removeClass("theme1 theme2 theme3 theme4").addClass("theme" + i), Storage.setDataValue("theme", i), Game.resize()
        }
        var i, a, o, r, s = 2 * Math.PI,
            l = 0,
            u = null,
            h = [],
            c = 0,
            d = {
                width: 0,
                height: 0
            },
            f = !1,
            p = 0,
            g = !1,
            m = {
                1: "0hn0",
                2: "0hh1",
                3: "contranoid",
                4: "highcontrast"
            };
        this.init = function () {
            $("#container").append('<canvas id="scratch-canvas"/>'), r = $("#scratch-canvas")[0], u = r.getContext("2d"), a = $("#gameContainer")[0], o = $("#grain")[0], i = Storage.getDataValue("theme", 1);
            for (var e in m) document.location.hash == "#" + m[e] && (i = e, g = !0);
            Storage.setDataValue("theme", i), n()
        }, this.cycle = e, this.grain = t, this.resize = function (e, t) {
            d.width = e, d.height = t, r.width = e, r.height = t, c = .5 / 320 * e
        }, this.toggle = function () {
            i = Storage.getDataValue("theme", 1), ++i > Object.keys(m).length && (i = 1), n()
        }, this.__defineGetter__("theme", function () {
            return i
        })
    },
    Links = new function () {
        $(function () {
            var t = /android/.test(navigator.userAgent.toLowerCase()),
                n = /ipad|iphone|ipod/.test(navigator.userAgent.toLowerCase());
            for (var i in e) {
                var a = $("#game_link_" + i),
                    o = e[i].web;
                n && (o = e[i].ios), t && (o = e[i].android), a.attr("href", o)
            }
        });
        var e = {
            quento: {
                ios: "https://itunes.apple.com/us/app/quento/id583954698?mt=8",
                android: "https://play.google.com/store/apps/details?id=nl.q42.quento&hl=en",
                web: "http://quento.com"
            },
            numolition: {
                ios: "https://itunes.apple.com/us/app/numolition/id824164747?mt=8",
                android: "https://play.google.com/store/apps/details?id=com.q42.numolition",
                web: "http://numolition.com"
            },
            "0hn0": {
                ios: "https://itunes.apple.com/us/app/0h-n0/id957191082?mt=8",
                android: "https://play.google.com/store/apps/details?id=com.q42.ohno",
                web: "http://0hn0.com"
            },
            contranoid: {
                ios: "https://itunes.apple.com/us/app/contranoid/id1027717534?mt=8",
                android: "https://play.google.com/store/apps/details?id=com.q42.contranoid",
                web: "http://contranoid.com"
            },
            "0hh1": {
                ios: "https://itunes.apple.com/us/app/0h-h1/id936504196?mt=8",
                android: "https://play.google.com/store/apps/details?id=com.q42.ohhi",
                web: "http://0hh1.com"
            },
            flippybit: {
                ios: "https://itunes.apple.com/us/app/flippy-bit-attack-hexadecimals/id853100169?mt=8",
                android: "https://play.google.com/store/apps/details?id=com.q42.flippybitandtheattackofthehexadecimalsfrombase16&hl=en",
                web: "http://flippybitandtheattackofthehexadecimalsfrombase16.com"
            }
        }
    },
    Language = new function () {
        function e() {
            $.getJSON("https://geoip.nekudo.com/api/", function (e) {
                if (Game.debug && console.log("succes", e), e && e.country && e.country.code) {
                    var o = e.country.code.toLowerCase();
                    n[o] || (o = i), Storage.setDataValue("language", o), a = o, t()
                }
            })
        }

        function t() {
            var e = a.toUpperCase();
            $("#toggleLanguage").html(e);
            var t = o[a];
            t && ($("text").each(function (e, n) {
                var i = $(n),
                    o = i.attr("data-text-id");
                o || (o = i.html(), i.attr("data-text-id", o)), translation = "en" == a ? o : t[o], i.html(translation)
            }), Game.refreshGameAfterLanguageChange())
        }
        var n = {
                en: 1,
                nl: 1,
                es: 1,
                kr: 1
            },
            i = window.Config && Config.defaultLanguage ? Config.defaultLanguage : "zh",
            a = i,
            o = {};
        $(function () {
            var i = Storage.getDataValue("language");
            i && n[i] ? (a = i, t()) : (Config.skipGeoIP || e(), setTimeout(t, 100))
        }), this.add = function (e, t) {
            o[e] = t
        }, this.refresh = t, this.get = function (e) {
            var t = o[a];
            return t || (t = o[i]), t ? t[e] || e : e
        }, this.toggle = function () {
            for (var e = Object.keys(o), n = 0, i = 0; i < e.length; i++)
                if (e[i] == a) {
                    n = i;
                    break
                }++n >= e.length && (n = 0), a = e[n], Storage.setDataValue("language", a), t()
        }, this.__defineGetter__("current", function () {
            return a
        })
    };
if (Language.add("zh", {
        weekDays: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
        ojoos: ["Goed", "Netjes", "Knap", "Fantastisch", "Geweldig", "Super", "Slim", "Briljant"],
        t01: "我们要填满整个地图。<br>点击使框变红。",
        t02: "完美!<br>点击两次以获得蓝色.",
        t03: "不允许出现三个相邻的红色方块。",
        t04: "并且三个蓝色方块<br>也不是彼此相邻的。",
        t05: "三个红色或蓝色方块相互在下方也是不允许的。",
        t06: "每行都有相同数量的<br> 红色和蓝色方块。",
        t07: "每列也有相等数量的红色和蓝色单元格。",
        t08: "你现在知道这个方块应该是什么颜色了......",
        t09: "哦，是的，每一行和每一列都必须是唯一的！",
        t10: "如果你被卡住了，<br>点击眼睛...",
        "Three adjacent tiles of the same color in a row or column isn't allowed.": "三个蓝色或红色方块彼此相邻或下方是不允许的。",
        "Rows and columns have an equal number of each color.": "每行和每列都有相同数量的红色和蓝色单元格。",
        "No two rows and no two columns are the same.": "每行和每列都是唯一的。",
        RowsMustBeUnique: "每一行都是唯一的。",
        ColsMustBeUnique: "每一列都是唯一的。",
        RowMustBeBalanced: "每行都有相同数量的红色 <br> 和蓝色单元格。",
        ColMustBeBalanced: "每列都有相同数量的红色 <br> 和蓝色单元格。",
        MaxTwoRed: "不允许相邻或低于彼此的三个红色框。",
        MaxTwoBlue: "不允许出现三个相邻或低于彼此的蓝色方块。",
        SinglePossibleRowCombo: "此处只能进行一种组合。",
        SinglePossibleColCombo: "此处只能进行一种组合。",
        Error: "这个好像不太对。",
        Errors: "这些好像都不对。",
        GameContinued: "您现在可以继续之前的游戏...",
        GameContinued: "您现在可以继续玩<br>以前的游戏板...",
        TimeTrialShown: '已显示已用时间。<br>最佳时间: %s <span id="nextdot"></span>',
        shareMsg: "#0hn0 shareMsg!",
        signInFailedIOS: "录失败！",
        signInFailedAndroid: "登录失败！",
        "A little logic game": "一个小逻辑游戏",
        "By Q42": "Van Q42",
        "Created by Martin Kool": "由 Martin Kool 创建",
        "How to play": "玩法",
        Play: "开始游戏",
        "Free play": "开始游戏",
        "Select a size": "选择一个尺寸",
        New: "Nieuw",
        Thanks: "谢谢",
        About: "关于",
        "0h h1 is a little logic game<br>by Q42. It was created by<br>Martin Kool.": "0h h1 是 Q42 的一款思维游戏<br>，由 <br> Martin Kool 制作。",
        "The concept is also known<br>as Takuzu or Binary Sudoku.": "它也被称为<br>Takuzu 或二进制数独。",
        "Q42.nl": "Q42.com",
        Rules: "规则",
        "Thank you for supporting<br> 0h h1": "感谢您对<br> 0h h1 的支持",
        "Please feel free to leave me a message about the game anytime": "请随时让我们知道",
        Apps: "手机App",
        "The 0h h1 app is also free": "0h h1 应用程序也是免费的",
        Games: "Spellen",
        "Enjoy our other games too": "也可以玩我们的其他游戏",
        "This is a message": "这是一条消息",
        Loading: "加载中",
        "Select a size to play...": "你想玩什么尺寸的地图？",
        "if 0h h1 is worth a $": "如果 0h h1 值 1$",
        "tap here": "点这里",
        "You are currently signed in": "您目前已登录",
        "Sign out": "退出",
        "Sign in to unlock fun achievements, earn experience points and compete with friends in leaderboards": "登录即可解锁有趣的成就、赚取经验值并在排行榜中与好友一较高下",
        "Sign in": "登录",
        Settings: "设置",
        "Show elapsed time": "显示已用时间",
        "Show hint icon": "显示提示图标",
        "Color theme": "主题",
        "0h h1 is worth a $": "0h h1 值 1$",
        No: "否",
        Yes: "是",
        Language: "语言",
        "Q42.com": "Q42.nl",
        "That's the undo button.": "那是撤消按钮。",
        "Nothing to undo.": "没有什么可以撤消的。",
        "This tile was reversed to ": "这个格子被逆转为 ",
        "blue.": "蓝色.",
        "red.": "红色.",
        "its empty state.": "它的空状态.",
        "Today's puzzles": "今天的谜题"
    }), Language.add("en", {
        weekDays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        ojoos: ["Wonderful", "Spectacular", "Marvelous", "Outstanding", "Remarkable", "Shazam", "Impressive", "Great", "Well done", "Fabulous", "Clever", "Dazzling", "Fantastic", "Excellent", "Nice", "Super", "Awesome", "Ojoo", "Brilliant", "Splendid", "Exceptional", "Magnificent", "Yay"],
        t01: "We're going to fill the grid.<br>Tap the tile to make it red.",
        t02: "Excellent!<br>Tap twice to turn a tile blue.",
        t03: "Three red tiles next to each other in a row isn't allowed.",
        t04: "Never have three blue tiles together in a row either.",
        t05: "Three red or blue tiles below each other is invalid too!",
        t06: "A full row must have as many red tiles as it has blue ones.",
        t07: "Columns have an equal number of each color too.",
        t08: "You should be able to know what color this one is...",
        t09: "No two rows and no two columns are the same.",
        t10: "If you get stuck, tap the eye to peek.",
        RowsMustBeUnique: "No two rows are the same.",
        ColsMustBeUnique: "No two columns are the same.",
        RowMustBeBalanced: "Rows have an equal number of each color.",
        ColMustBeBalanced: "Columns have an equal number of each color.",
        MaxTwoRed: "Three red tiles aren't allowed next to each other.",
        MaxTwoBlue: "Three blue tiles aren't allowed next to each other.",
        SinglePossibleRowCombo: "Only one combination is possible here.",
        SinglePossibleColCombo: "Only one combination is possible here.",
        Error: "This one doesn't seem right.",
        Errors: "These don't seem right.",
        GameContinued: "You can now continue with your previous game...",
        TimeTrialShown: 'Elapsed time is now shown. <br>Time to beat: %s <span id="nextdot"></span>',
        shareMsg: "#0hh1 I'm playing 0h h1 and I think you should too! http://0hh1.com (or get the App!)",
        signInFailedIOS: "<p>Signing in with Game Center didn't work.</p><p>Please check your internet connection.</p><p>If this problem persists, open the Settings app, go to Game Center and sign in there.</p><p>If that doesn't work, give up and go play 0h n0 :)</p>",
        signInFailedAndroid: "<p>Signing in with Google Play Game Services didn't work.</p><p>Please check your internet connection.</p><p>If this problem persists, try again later or give up and go play 0h n0 :)</p>",
        tweetMessage: "I just completed a $size x $size #0hh1 puzzle and my score is $score. http://0hh1.com ",
        tweetMessageDaily: "I just completed $today's $size x $size #0hh1 puzzle and my score is $score. http://0hh1.com "
    }), Language.add("nl", {
        weekDays: ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"],
        ojoos: ["Goed", "Netjes", "Knap", "Fantastisch", "Geweldig", "Super", "Slim", "Briljant"],
        t01: "We gaan het hele bord vullen.<br>Tap om het vak rood te maken.",
        t02: "Perfect!<br>Tap twee keer voor blauw.",
        t03: "Drie rode vakjes naast elkaar mag niet.",
        t04: "En drie blauwe vakjes<br> naast elkaar ook niet.",
        t05: "Drie rode of blauwe vakjes onder elkaar mag ook niet.",
        t06: "Elke rij heeft evenveel<br> rode als blauwe vakjes.",
        t07: "Elke kolom heeft ook evenveel rode als blauwe vakjes.",
        t08: "Jij weet nu welke kleur dit vakje moet krijgen...",
        t09: "Oh ja, elke rij en elke kolom moet uniek zijn!",
        t10: "En mocht je vast zitten,<br> tap dan op het oogje...",
        "Three adjacent tiles of the same color in a row or column isn't allowed.": "Drie blauwe of rode vakjes naast of onder elkaar mag niet.",
        "Rows and columns have an equal number of each color.": "Elke rij en kolom heeft evenveel rode als blauwe vakjes.",
        "No two rows and no two columns are the same.": "Elke rij en kolom is uniek.",
        RowsMustBeUnique: "Elke rij is uniek.",
        ColsMustBeUnique: "Elke kolom is uniek.",
        RowMustBeBalanced: "Elke rij heeft evenveel rode<br> als blauwe vakjes.",
        ColMustBeBalanced: "Elke kolom heeft evenveel rode<br> als blauwe vakjes.",
        MaxTwoRed: "Drie rode vakjes naast of onder elkaar mag niet.",
        MaxTwoBlue: "Drie blauwe vakjes naast of onder elkaar mag niet.",
        SinglePossibleRowCombo: "Hier is maar één combinatie mogelijk.",
        SinglePossibleColCombo: "Hier is maar één combinatie mogelijk.",
        Error: "Deze lijkt niet te kloppen.",
        Errors: "Deze lijken niet te kloppen.",
        GameContinued: "Je kunt nu verder spelen<br> met je vorige spelbord...",
        TimeTrialShown: 'Verstreken tijd wordt getoond.<br>Beste tijd: %s <span id="nextdot"></span>',
        shareMsg: "#0hn0 shareMsg!",
        signInFailedIOS: "Inloggen niet gelukt!",
        signInFailedAndroid: "Inloggen niet gelukt!",
        "A little logic game": "Een klein logisch spelletje",
        "By Q42": "Van Q42",
        "Created by Martin Kool": "Gemaakt door Martin Kool",
        "How to play": "Uitleg",
        Play: "Spelen",
        "Free play": "Vrij spelen",
        "Select a size": "Vrij spelen",
        New: "Nieuw",
        Thanks: "Bedankt",
        About: "Over",
        "0h h1 is a little logic game<br>by Q42. It was created by<br>Martin Kool.": "0h h1 is een denkspelletje<br> van Q42, gemaakt door<br> Martin Kool.",
        "The concept is also known<br>as Takuzu or Binary Sudoku.": "Het is ook wel bekend als<br>Takuzu of Binair Sudoku.",
        "Q42.nl": "Q42.com",
        Rules: "Regels",
        "Thank you for supporting<br> 0h h1": "Bedankt dat je<br> 0h h1 support",
        "Please feel free to leave me a message about the game anytime": "Laat gerust een keer wat van je horen",
        Apps: "Apps",
        "The 0h h1 app is also free": "De 0h h1 app is ook gratis",
        Games: "Spellen",
        "Enjoy our other games too": "Speel ook onze andere spellen",
        "This is a message": "Dit is een bericht",
        Loading: "Momentje",
        "Select a size to play...": "Welk formaat wil je spelen?",
        "if 0h h1 is worth a $": "als 0h h1 een € waard is",
        "tap here": "tap hier",
        "You are currently signed in": "Je bent ingelogd",
        "Sign out": "Uitloggen",
        "Sign in to unlock fun achievements, earn experience points and compete with friends in leaderboards": "Log in om leuke achievements te behalen, XP te verdienen en te strijden tegen je vrienden in de ranglijsten",
        "Sign in": "Inloggen",
        Settings: "Instellingen",
        "Show elapsed time": "Toon verstreken tijd",
        "Show hint icon": "Toon hint icoon",
        "Color theme": "Kleurthema",
        "0h h1 is worth a $": "0h h1 is een € waard",
        No: "Nee",
        Yes: "Ja",
        Language: "Taal",
        "Q42.com": "Q42.nl",
        "That's the undo button.": "Dat is de undo knop.",
        "Nothing to undo.": "Geen undo mogelijk.",
        "This tile was reversed to ": "Deze stip is teruggezet naar ",
        "blue.": "blauw.",
        "red.": "rood.",
        "its empty state.": "een leeg vakje.",
        "Today's puzzles": "Puzzels van vandaag"
    }), Language.add("es", {
        weekDays: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        ojoos: ["Maravilloso", "Espectacular", "Maravilloso", "Excepcional", "Formidable", "Tachán", "Impresionante", "Genial", "Bien hecho", "Fabuloso", "Ingenioso", "Deslumbrante", "Fantástico", "Excelente", "super", "Impresionante", "¡Ole", "Brillante", "Espléndido", "Excepcional", "Magnífico", "¡Hurra"],
        t01: "Vamos a rellenar el tablero. Pulsa una casilla para ponerla en rojo.",
        t02: "¡Excelente! Pulsa dos veces para poner una casilla en azul.",
        t03: "No se pueden poner tres casillas rojas juntas en una fila.",
        t04: "Tampoco se pueden poner tres casillas azules juntas en una fila.",
        t05: "¡Tampoco vale poner tres casillas rojas o azules juntas en una columna!",
        t06: "Una fila completa debe tener tantas casillas azules como rojas.",
        t07: "Las columnas también tienen la misma cantidad de cada color.",
        t08: "Seguro que sabes de qué color es esta...",
        t09: "No hay dos filas o dos columnas iguales.",
        t10: "Si te quedas atrancado, pulsa el ojo para echar un vistazo.",
        "Three adjacent tiles of the same color in a row or column isn't allowed.": "No se permiten tres casillas del mismo color juntas en una fila o columna.",
        "Rows and columns have an equal number of each color.": "Las filas y las columnas tienen la misma cantidad de cada color.",
        "No two rows and no two columns are the same.": "No hay dos filas o dos columnas iguales.",
        RowsMustBeUnique: "No hay dos filas iguales.",
        ColsMustBeUnique: "No hay dos columnas iguales.",
        RowMustBeBalanced: "Las filas tienen la misma cantidad de cada color.",
        ColMustBeBalanced: "Las columnas tienen la misma cantidad de cada color.",
        MaxTwoRed: "No se permiten tres casillas rojas juntas.",
        MaxTwoBlue: "No se permiten tres casillas azules juntas.",
        SinglePossibleRowCombo: "Aquí sólo hay una combinación posible.",
        SinglePossibleColCombo: "Aquí sólo hay una combinación posible.",
        Error: "Esta no parece correcta.",
        Errors: "Estas no parecen correctas.",
        GameContinued: "Puedes continuar con tu anterior partida....",
        TimeTrialShown: 'Ahora se muestra el tiempo transcurrido. El record a batir: %s <span id="nextdot"></span>',
        shareMsg: "#0hn0 shareMsg",
        signInFailedIOS: "signin failed",
        signInFailedAndroid: "signin failed",
        "A little logic game": "Un pequeño juego lógico.",
        "By Q42": "Por Q42",
        "Created by Martin Kool": "Creado por Martin Kool",
        "How to play": "Como se juega",
        Play: "Jugar",
        "Free play": "Juego libre",
        "Select a size": "Elegir un tamaño",
        New: "Nuevo",
        Thanks: "Gracias",
        About: "Acerca",
        "0h h1 is a little logic game<br>by Q42. It was created by<br>Martin Kool.": "0h h1 es un pequeño juego lógico hecho por Q42. Creado por Martin Kool.",
        "The concept is also known<br>as Takuzu or Binary Sudoku.": "El concepto también se conoce como Takuzu o Sudoku Binario.",
        "Q42.nl": "Q42.com",
        Rules: "Reglas",
        "Thank you for supporting<br> 0h h1": "Gracias por apoyar 0h h1",
        "Please feel free to leave me a message about the game anytime": "Los mensajes sobre el juego son bienvenidos.",
        Apps: "Aplicaciones",
        "The 0h h1 app is also free": "La aplicación de 0h h1 también es gratis",
        Games: "Juegos",
        "Enjoy our other games too": "Disfruta de nuestros otros juegos",
        "This is a message": "Esto es un mensaje",
        Loading: "Cargando",
        "Select a size to play...": "Elige un tamaño para jugar...",
        "if 0h h1 is worth a $": "Si 0h h1 vale un $",
        "tap here": "Pulsa aquí",
        "You are currently signed in": "Has iniciado sesión",
        "Sign out": "Cerrar la sesión",
        "Sign in to unlock fun achievements, earn experience points and compete with friends in leaderboards": "Inicia sesión para desbloquear logros divertidos, ganar puntos de experiencia y competir con amigos en las tablas de clasificación",
        "Sign in": "Iniciar sesión",
        Settings: "Opciones",
        "Show elapsed time": "Mostrar tiempo transcurrido",
        "Show hint icon": "Mostrar el indicador de pistas",
        "Color theme": "Tema de colores",
        "0h h1 is worth a $": "0h h1 vale un $",
        No: "No",
        Yes: "Si",
        Language: "Lenguaje",
        "Q42.com": "Q42.com",
        "That's the undo button.": "Ese es el botón para deshacer.",
        "Nothing to undo.": "Nada para deshacer.",
        "This tile was reversed to ": "La casilla fue revertida a",
        "blue.": "azul.",
        "red.": "rojo.",
        "its empty state.": "su estado vacío.",
        "Today's puzzles": "Puzzles del día"
    }), Language.add("kr", {
        weekDays: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
        ojoos: ["좋은", "깔끔하게", "잘 생긴", "환상적", "그레이트", "슈퍼", "똑똑한", "똑똑한"],
        t01: "우리는 전체 게시판을 채울 것입니다. 상자를 빨간색으로 만들려면 누르십시오.",
        t02: "완벽 해! 파란색으로 두 번 살짝 누르십시오.",
        t03: "서로 옆에있는 빨간색 상자 3 개는 허용되지 않습니다.",
        t04: "서로 옆에 파란색 상자가 세 개 있습니다.",
        t05: "서로 빨간색 또는 파란색 사각형 3 개도 허용되지 않습니다.",
        t06: "각 행에는 빨간색과 파란색 상자의 수가 동일합니다.",
        t07: "각 열에는 동일한 수의 빨간색과 파란색 상자가 있습니다.",
        t08: "이 상자가 가지고 있어야 할 색깔을 이제 알지 ...",
        t09: "오 예, 모든 행과 모든 열은 고유해야합니다.",
        t10: "그리고 붙어 있다면, 눈을 두드립니다.",
        "Three adjacent tiles of the same color in a row or column isn't allowed.": "서로 옆이나 아래에있는 파랑 또는 빨강 상자 세 개는 허용되지 않습니다.",
        "Rows and columns have an equal number of each color.": "각 행과 열에는 같은 수의 빨간색과 파란색 상자가 있습니다.",
        "No two rows and no two columns are the same.": "각 행과 열은 고유합니다.",
        RowsMustBeUnique: "각 행은 고유합니다.",
        ColsMustBeUnique: "각 열은 고유합니다.",
        RowMustBeBalanced: "각 행에는 빨간색과 파란색 상자의 수가 같습니다.",
        ColMustBeBalanced: "각 열은 같은 수의 빨간색과 파란색 상자가 있습니다.",
        MaxTwoRed: "서로 옆이나 아래에있는 빨간색 상자 3 개는 허용되지 않습니다.",
        MaxTwoBlue: "서로 옆이나 아래에있는 파란색 상자 3 개는 허용되지 않습니다.",
        SinglePossibleRowCombo: "하나의 조합 만 가능합니다.",
        SinglePossibleColCombo: "하나의 조합 만 가능합니다.",
        Error: "이것은 올바르지 않은 것 같습니다.",
        Errors: "이것들은 옳지 않은 것 같습니다.",
        GameContinued: "이제 이전 게임 판에서 계속 놀 수 있습니다.",
        TimeTrialShown: '경과 시간이 표시됩니다. 최고의 시간 %s <span id="nextdot"></span>',
        shareMsg: "shareMsg",
        signInFailedIOS: "로그인하지 못했습니다.",
        signInFailedAndroid: "로그인하지 못했습니다.",
        "A little logic game": "작은 논리적 게임",
        "By Q42": "Q42부터",
        "Created by Martin Kool": "Martin Kool 제작",
        "How to play": "설명",
        Play: "놀이",
        "Free play": "무한 모드",
        "Select a size": "크기 선택",
        New: "새로운",
        Thanks: "고마워.",
        About: "정보",
        "0h h1 is a little logic game<br>by Q42. It was created by<br>Martin Kool.": "0h h1은 Martin Kool이 만든 Q42의 사고 게임입니다.",
        "The concept is also known<br>as Takuzu or Binary Sudoku.": "Takuzu 또는 Binary Sudoku라고도합니다.",
        "Q42.nl": "Q42.nl",
        Rules: "규칙",
        "Thank you for supporting<br> 0h h1": "0h h1을 지원 해주셔서 감사합니다.",
        "Please feel free to leave me a message about the game anytime": "문의하시기 바랍니다",
        Apps: "모바일 앱",
        "The 0h h1 app is also free": "0h h1 앱도 무료입니다.",
        Games: "게임",
        "Enjoy our other games too": "다른 게임들도 플레이해라.",
        "This is a message": "이것은 메시지이다.",
        Loading: "잠깐만 요",
        "Select a size to play...": "어떤 형식으로 연주하고 싶습니까?",
        "if 0h h1 is worth a $": "0h h1이 € 가치가 있다면",
        "tap here": "여기 누르세요.",
        "You are currently signed in": "로그인하셨습니다.",
        "Sign out": "로그 아웃",
        "Sign in to unlock fun achievements, earn experience points and compete with friends in leaderboards": "로그인하여 멋진 업적을 얻고 XP를 얻고 순위에서 친구와 경쟁하십시오.",
        "Sign in": "로그인",
        Settings: "설정",
        "Show elapsed time": "경과 시간 표시",
        "Show hint icon": "힌트 아이콘 표시",
        "Color theme": "색상 테마",
        "0h h1 is worth a $": "0h h1은 가치가 있습니다.",
        No: "아니.",
        Yes: "예",
        Language: "언어",
        "Q42.com": "Q42.com",
        "That's the undo button.": "그것이 실행 취소 버튼입니다.",
        "Nothing to undo.": "실행 취소 불가",
        "This tile was reversed to ": "이 점은로 재설정되었습니다.",
        "blue.": "파란색",
        "red.": "빨간색",
        "its empty state.": "빈 상자",
        "Today's puzzles": "오늘의 퍼즐들"
    }), !window.Config || !1 !== Config.GoogleAnalytics) {
//    ! function (e, t, n, i, a, o, r) {
//        e.GoogleAnalyticsObject = a, e[a] = e[a] || function () {
//            (e[a].q = e[a].q || []).push(arguments)
//        }, e[a].l = 1 * new Date, o = t.createElement(n), r = t.getElementsByTagName(n)[0], o.async = 1, o.src = "js/analytics.js", r.parentNode.insertBefore(o, r)
//    }(window, document, "script", 0, "ga");
//    var Analytics = {
//        init: function () {
//            var e = Storage.getDataValue("uuid", null);
//            e || (e = generateUUID(), Storage.setDataValue("uuid", e));
//            var t = Config.GoogleAnalytics;
//            ga("create", t, {
//                storage: "none",
//                clientId: e
//            }), ga("set", "checkProtocolTask", null), ga("set", "checkStorageTask", null), ga("set", "anonymizeIp", !0), ga("send", "pageview", {
//                page: "/"
//            })
//        }
//    }
}
$(app.onDeviceReady);
