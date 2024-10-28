!(function (e) {
  (e.fn.appear = function (a, r) {
    var p = e.extend({ one: !0 }, r);
    return this.each(function () {
      var r = e(this);
      if (((r.appeared = !1), !a)) {
        r.trigger("appear", p.data);
        return;
      }
      var n = e(window),
        t = function () {
          if (!r.is(":visible")) {
            r.appeared = !1;
            return;
          }
          var e = n.scrollLeft(),
            a = n.scrollTop(),
            t = r.offset(),
            i = t.left,
            f = t.top;
          f + r.height() >= a &&
          f <= a + n.height() &&
          i + r.width() >= e &&
          i <= e + n.width()
            ? r.appeared || r.trigger("appear", p.data)
            : (r.appeared = !1);
        },
        i = function () {
          if (((r.appeared = !0), p.one)) {
            n.unbind("scroll", t);
            var i = e.inArray(t, e.fn.appear.checks);
            i >= 0 && e.fn.appear.checks.splice(i, 1);
          }
          a.apply(this, arguments);
        };
      p.one ? r.one("appear", p.data, i) : r.bind("appear", p.data, i),
        n.scroll(t),
        e.fn.appear.checks.push(t),
        t();
    });
  }),
    e.extend(e.fn.appear, {
      checks: [],
      timeout: null,
      checkAll: function () {
        var a = e.fn.appear.checks.length;
        if (a > 0) for (; a--; ) e.fn.appear.checks[a]();
      },
      run: function () {
        e.fn.appear.timeout && clearTimeout(e.fn.appear.timeout),
          (e.fn.appear.timeout = setTimeout(e.fn.appear.checkAll, 20));
      },
    }),
    e.each(
      [
        "append",
        "prepend",
        "after",
        "before",
        "attr",
        "removeAttr",
        "addClass",
        "removeClass",
        "toggleClass",
        "remove",
        "css",
        "show",
        "hide",
      ],
      function (a, r) {
        var p = e.fn[r];
        p &&
          (e.fn[r] = function () {
            var a = p.apply(this, arguments);
            return e.fn.appear.run(), a;
          });
      }
    );
})(jQuery);
