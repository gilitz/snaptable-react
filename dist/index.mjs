var x = Object.defineProperty;
var $ = (s, t, e) => t in s ? x(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var v = (s, t, e) => $(s, typeof t != "symbol" ? t + "" : t, e);
import { makeAutoObservable as z } from "mobx";
import { useRef as N, useCallback as R, useEffect as L, useState as H, useLayoutEffect as _ } from "react";
import { useObserver as A } from "mobx-react";
class M {
  constructor({ key: t, columns: e, saveLayoutView: i, hasDraggableColumns: c, isStickyHeader: h, hasStickyColumns: k, onRowClick: d, defaultColumnWidth: m = "auto" }) {
    v(this, "key");
    v(this, "columns");
    v(this, "saveLayoutView");
    v(this, "hasDraggableColumns");
    v(this, "isStickyHeader");
    v(this, "hasStickyColumns");
    v(this, "onRowClick");
    v(this, "columnsWidth");
    v(this, "stickyColumns");
    v(this, "hiddenColumns");
    // nestedColumnsWidth?: ColumnWidthType[] | null;	 
    // Store actual rendered widths from DOM elements
    v(this, "actualRenderedWidths", {});
    z(this);
    const S = localStorage.getItem(t), g = S ? JSON.parse(S) : null, C = localStorage.getItem(`${t}_sticky`), r = C ? JSON.parse(C) : null;
    this.key = t, this.saveLayoutView = i ?? !1, this.hasDraggableColumns = c ?? !0, this.isStickyHeader = h ?? !1, this.hasStickyColumns = k ?? !1, this.onRowClick = d, this.columnsWidth = e.map((y) => {
      const a = g == null ? void 0 : g.find(({ key: n }) => n === y.key), p = typeof m == "number" ? m : void 0;
      return { key: y.key, width: (a == null ? void 0 : a.width) ?? y.width ?? p };
    }), this.stickyColumns = e.map((y) => {
      const a = r == null ? void 0 : r.find(({ key: p }) => p === y.key);
      return { key: y.key, sticky: (a == null ? void 0 : a.sticky) ?? y.sticky ?? !1 };
    });
    const l = localStorage.getItem(`${t}_hidden`), u = l ? JSON.parse(l) : null;
    if (this.hiddenColumns = e.map((y) => {
      const a = u == null ? void 0 : u.find(({ key: p }) => p === y.key);
      return { key: y.key, hidden: (a == null ? void 0 : a.hidden) ?? y.hidden ?? !1 };
    }), i)
      if (g) {
        const y = e.filter((n) => !g.map(({ key: f }) => f).includes(n.key)), a = g.reduce((n, f) => {
          const I = e.filter(({ key: o }) => o === f.key)[0];
          return I && (n = [...n, I]), n;
        }, []), p = g.reduce((n, f) => {
          const I = e.filter(({ key: w }) => w === f.key)[0];
          if (!I)
            return n;
          const o = typeof m == "number" ? m : void 0;
          return n = [...n, { key: I.key, width: f.width ?? I.width ?? o }], n;
        }, []);
        this.columns = a.concat(y), this.columnsWidth = p.concat(y.map(({ key: n, width: f }) => ({ key: n, width: f ?? m }))), this.stickyColumns = this.columns.map((n) => {
          const f = r == null ? void 0 : r.find(({ key: I }) => I === n.key);
          return { key: n.key, sticky: (f == null ? void 0 : f.sticky) ?? n.sticky ?? !1 };
        }), this.hiddenColumns = this.columns.map((n) => {
          const f = u == null ? void 0 : u.find(({ key: I }) => I === n.key);
          return { key: n.key, hidden: (f == null ? void 0 : f.hidden) ?? n.hidden ?? !1 };
        });
      } else
        localStorage.setItem(t, JSON.stringify(this.columnsWidth)), this.hasStickyColumns && localStorage.setItem(`${t}_sticky`, JSON.stringify(this.stickyColumns)), localStorage.setItem(`${t}_hidden`, JSON.stringify(this.hiddenColumns)), this.columns = e;
    else
      this.columns = e, g || localStorage.setItem(t, JSON.stringify(this.columnsWidth)), this.hasStickyColumns && !r && localStorage.setItem(`${t}_sticky`, JSON.stringify(this.stickyColumns)), u || localStorage.setItem(`${t}_hidden`, JSON.stringify(this.hiddenColumns));
  }
  // Method to update actual rendered widths from DOM elements
  updateActualWidths(t) {
    Object.keys(t).forEach((e) => {
      const i = t[e];
      if (i) {
        const c = i.getBoundingClientRect().width;
        this.actualRenderedWidths[e] = c;
      }
    });
  }
  // Method to get the most accurate width for a column
  getColumnActualWidth(t, e) {
    var c;
    if (this.actualRenderedWidths[t])
      return this.actualRenderedWidths[t];
    const i = this.columns.findIndex((h) => h.key === t);
    if (i !== -1) {
      const h = (c = this.columnsWidth[i]) == null ? void 0 : c.width;
      if (h)
        return typeof h == "number" ? h : parseInt(h) || e;
    }
    return e;
  }
  moveColumn(t, e) {
    var a, p;
    if (!this.hasDraggableColumns)
      return;
    const i = this.columns[t].key, c = this.columns[e].key, h = ((a = this.stickyColumns.find((n) => n.key === i)) == null ? void 0 : a.sticky) ?? !1, k = ((p = this.stickyColumns.find((n) => n.key === c)) == null ? void 0 : p.sticky) ?? !1;
    if (h !== k)
      return;
    const d = [...this.columns], m = d.splice(t, 1)[0];
    d.splice(e, 0, m), this.columns = d;
    const S = [...this.columnsWidth], g = S.splice(t, 1)[0];
    S.splice(e, 0, g), this.columnsWidth = S;
    const C = [...this.stickyColumns], r = C.splice(t, 1)[0];
    C.splice(e, 0, r), this.stickyColumns = C;
    const l = [...this.hiddenColumns], u = l.splice(t, 1)[0];
    l.splice(e, 0, u), this.hiddenColumns = l;
    const y = localStorage.getItem(this.key);
    if (y) {
      const n = JSON.parse(y), f = n.splice(t, 1)[0];
      n.splice(e, 0, f), localStorage.setItem(this.key, JSON.stringify(n));
    }
    this.hasStickyColumns && localStorage.setItem(`${this.key}_sticky`, JSON.stringify(this.stickyColumns)), localStorage.setItem(`${this.key}_hidden`, JSON.stringify(this.hiddenColumns));
  }
  setColumnsWidth(t) {
    this.columnsWidth = t;
  }
  setStickyColumns(t) {
    this.stickyColumns = t, this.hasStickyColumns && localStorage.setItem(`${this.key}_sticky`, JSON.stringify(this.stickyColumns));
  }
  toggleColumnSticky(t, e) {
    var d;
    if (!this.hasStickyColumns)
      return;
    const i = this.columns.findIndex((m) => m.key === t);
    if (i === -1)
      return;
    const h = !(((d = this.stickyColumns.find((m) => m.key === t)) == null ? void 0 : d.sticky) ?? !1);
    if (h && e) {
      const m = [...this.columnsWidth];
      m[i] = {
        ...m[i],
        width: Math.floor(e)
      }, this.setColumnsWidth(m), this.saveLayoutView && localStorage.setItem(this.key, JSON.stringify(m));
    }
    const k = this.stickyColumns.map(
      (m) => m.key === t ? { ...m, sticky: h } : m
    );
    if (h) {
      const S = this.stickyColumns.filter((g) => g.sticky).length;
      i !== S && this.moveColumn(i, S);
    } else {
      const S = k.filter((g) => g.sticky).length;
      i !== S && this.moveColumn(i, S);
    }
    this.setStickyColumns(k);
  }
  getStickyColumnsOffsets() {
    var i;
    if (!this.hasStickyColumns)
      return {};
    const t = {};
    let e = 0;
    for (let c = 0; c < this.columns.length; c++) {
      const h = this.columns[c];
      if (((i = this.stickyColumns.find((d) => d.key === h.key)) == null ? void 0 : i.sticky) ?? !1) {
        t[h.key] = e;
        const d = this.getColumnActualWidth(h.key, h.width ?? 150);
        e += d;
      }
    }
    return t;
  }
  setHiddenColumns(t) {
    this.hiddenColumns = t, localStorage.setItem(`${this.key}_hidden`, JSON.stringify(this.hiddenColumns));
  }
  toggleColumnHidden(t) {
    const e = this.hiddenColumns.map(
      (i) => i.key === t ? { ...i, hidden: !i.hidden } : i
    );
    this.setHiddenColumns(e);
  }
  getVisibleColumns() {
    return this.columns.filter((t) => {
      var i;
      return !(((i = this.hiddenColumns.find((c) => c.key === t.key)) == null ? void 0 : i.hidden) ?? !1);
    });
  }
  getHiddenColumns() {
    return this.columns.filter((t) => {
      var i;
      return ((i = this.hiddenColumns.find((c) => c.key === t.key)) == null ? void 0 : i.hidden) ?? !1;
    });
  }
}
const B = ({ key: s, columns: t, ...e }) => {
  const i = N(null);
  return i.current || (i.current = new M({ key: s, columns: t, ...e })), i.current;
};
function b(s, t) {
  const e = N({}), i = R((k, d) => {
    d ? e.current[k] = d : delete e.current[k];
  }, []), c = R(() => {
    Object.keys(e.current).length > 0 && s.updateActualWidths(e.current);
  }, [s]);
  L(() => {
    const k = () => {
      c();
    };
    requestAnimationFrame(k);
    const d = setTimeout(k, 100);
    return () => clearTimeout(d);
  }, [c, s.columns, s.columnsWidth]);
  const h = R((k, d, m, S) => {
    const g = (r) => {
      const l = r.clientX - d, u = Math.max(50, m + l), y = [...s.columnsWidth];
      y[k] = {
        ...y[k],
        width: u
      }, s.setColumnsWidth(y);
    }, C = () => {
      S && setTimeout(() => {
        const r = S.getBoundingClientRect().width, l = [...s.columnsWidth];
        l[k] = {
          ...l[k],
          width: Math.floor(r)
        }, s.setColumnsWidth(l), c(), s.saveLayoutView && localStorage.setItem(s.key, JSON.stringify(l));
      }, 10), document.removeEventListener("mousemove", g), document.removeEventListener("mouseup", C), document.body.style.cursor = "", document.body.style.userSelect = "";
    };
    document.addEventListener("mousemove", g), document.addEventListener("mouseup", C), document.body.style.cursor = "col-resize", document.body.style.userSelect = "none";
  }, [s, c]);
  return A(() => {
    const k = s.getVisibleColumns(), d = s.getStickyColumnsOffsets(), m = (C) => {
      var n, f, I;
      const r = k[C], l = s.columns.findIndex((o) => o.key === r.key), u = ((n = s.columnsWidth[l]) == null ? void 0 : n.width) ?? r.width ?? 150, y = ((f = s.stickyColumns.find((o) => o.key === r.key)) == null ? void 0 : f.sticky) ?? !1, a = d[r.key] ?? 0;
      let p = 1;
      if (y) {
        let o = 0;
        for (let W = 0; W < C; W++) {
          const O = k[W];
          (((I = s.stickyColumns.find((D) => D.key === O.key)) == null ? void 0 : I.sticky) ?? !1) && o++;
        }
        p = (s.isStickyHeader ? 20 : 100) - o;
      } else s.isStickyHeader && (p = 10);
      return {
        width: typeof u == "number" ? `${u}px` : u,
        isDraggable: s.hasDraggableColumns,
        isResizable: r.resizeable,
        isSticky: y,
        stickyOffset: a,
        zIndex: p,
        onDragStart: (o) => {
          var w;
          s.hasDraggableColumns && ((w = o.dataTransfer) == null || w.setData("text/plain", l.toString()));
        },
        onDragOver: (o) => {
          o.preventDefault();
        },
        onDrop: (o) => {
          var w;
          if (o.preventDefault(), s.hasDraggableColumns) {
            const W = parseInt(((w = o.dataTransfer) == null ? void 0 : w.getData("text/plain")) ?? "");
            !isNaN(W) && W !== l && (s.moveColumn(W, l), setTimeout(() => c(), 50));
          }
        },
        onResizeStart: (o, w) => {
          if (r.resizeable) {
            o.preventDefault(), o.stopPropagation();
            const W = typeof u == "number" ? u : parseInt(u) ?? 150;
            h(l, o.clientX, W, w);
          }
        },
        onToggleSticky: (o) => {
          if (s.hasStickyColumns) {
            let w;
            o && (w = o.getBoundingClientRect().width), s.toggleColumnSticky(r.key, w), setTimeout(() => c(), 50);
          }
        },
        onToggleHidden: () => {
          s.toggleColumnHidden(r.key);
        },
        // New: function to register header element reference
        registerHeaderRef: (o) => {
          i(r.key, o);
        }
      };
    }, S = (C) => {
      var n, f, I;
      const r = k[C], l = s.columns.findIndex((o) => o.key === r.key), u = ((n = s.columnsWidth[l]) == null ? void 0 : n.width) ?? r.width ?? 150, y = ((f = s.stickyColumns.find((o) => o.key === r.key)) == null ? void 0 : f.sticky) ?? !1, a = d[r.key] ?? 0;
      let p = 1;
      if (y) {
        let o = 0;
        for (let W = 0; W < C; W++) {
          const O = k[W];
          (((I = s.stickyColumns.find((D) => D.key === O.key)) == null ? void 0 : I.sticky) ?? !1) && o++;
        }
        p = (s.isStickyHeader ? 8 : 50) - o;
      }
      return {
        width: typeof u == "number" ? `${u}px` : u,
        isSticky: y,
        stickyOffset: a,
        zIndex: p
      };
    }, g = (C) => ({
      onClick: () => {
        s.onRowClick && s.onRowClick({ item: C });
      }
    });
    return {
      columns: k,
      data: t,
      config: s,
      columnWidths: s.columnsWidth,
      stickyColumns: s.stickyColumns,
      hiddenColumns: s.hiddenColumns,
      stickyOffsets: d,
      getColumnProps: m,
      getCellProps: S,
      getRowProps: g,
      // New: function to manually trigger actual width updates
      updateActualWidths: c,
      // Hidden columns methods
      getHiddenColumns: () => s.getHiddenColumns(),
      toggleColumnHidden: (C) => s.toggleColumnHidden(C)
    };
  });
}
const j = (s, t) => {
  const [e, i] = H(null), [c, h] = H(null), [k, d] = H(null);
  return {
    draggedItem: e,
    draggedIndex: c,
    hoveredIndex: k,
    handleDragStart: (l, u) => {
      i(l), h(u), s == null || s(l, u);
    },
    handleDragOver: (l) => {
      l.preventDefault();
    },
    handleDragEnter: (l) => {
      d(l);
    },
    handleDragLeave: () => {
      d(null);
    },
    handleDrop: (l, u) => {
      l.preventDefault(), c !== null && c !== u && (t == null || t(c, u)), i(null), h(null), d(null);
    }
  };
}, F = (s, t) => {
  _(() => {
    const e = s == null ? void 0 : s.current;
    if (!e) return;
    const i = new ResizeObserver((c) => {
      const h = c[0];
      h && t(h);
    });
    return i.observe(e), () => i.disconnect();
  }, [s, t]);
};
export {
  B as useDataTable,
  j as useDragAndDrop,
  F as useResizeObserver,
  b as useTable
};
