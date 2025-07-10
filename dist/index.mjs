var R = Object.defineProperty;
var N = (s, t, e) => t in s ? R(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var w = (s, t, e) => N(s, typeof t != "symbol" ? t + "" : t, e);
import { makeAutoObservable as H } from "mobx";
import { useRef as O, useCallback as I, useEffect as J, useState as v, useLayoutEffect as $ } from "react";
import { useObserver as L } from "mobx-react";
class _ {
  constructor({ key: t, columns: e, saveLayoutView: i, hasDraggableColumns: c, isStickyHeader: h, hasStickyColumns: k, onRowClick: d, defaultColumnWidth: m = "auto" }) {
    w(this, "key");
    w(this, "columns");
    w(this, "saveLayoutView");
    w(this, "hasDraggableColumns");
    w(this, "isStickyHeader");
    w(this, "hasStickyColumns");
    w(this, "onRowClick");
    w(this, "columnsWidth");
    w(this, "stickyColumns");
    w(this, "hiddenColumns");
    // nestedColumnsWidth?: ColumnWidthType[] | null;	 
    // Store actual rendered widths from DOM elements
    w(this, "actualRenderedWidths", {});
    H(this);
    const a = localStorage.getItem(t), g = a ? JSON.parse(a) : null, S = localStorage.getItem(`${t}_sticky`), u = S ? JSON.parse(S) : null;
    this.key = t, this.saveLayoutView = i ?? !1, this.hasDraggableColumns = c ?? !0, this.isStickyHeader = h ?? !1, this.hasStickyColumns = k ?? !1, this.onRowClick = d, this.columnsWidth = e.map((y) => {
      const C = g == null ? void 0 : g.find(({ key: o }) => o === y.key), p = typeof m == "number" ? m : void 0;
      return { key: y.key, width: (C == null ? void 0 : C.width) ?? y.width ?? p };
    }), this.stickyColumns = e.map((y) => {
      const C = u == null ? void 0 : u.find(({ key: p }) => p === y.key);
      return { key: y.key, sticky: (C == null ? void 0 : C.sticky) ?? y.sticky ?? !1 };
    });
    const l = localStorage.getItem(`${t}_hidden`), r = l ? JSON.parse(l) : null;
    if (this.hiddenColumns = e.map((y) => {
      const C = r == null ? void 0 : r.find(({ key: p }) => p === y.key);
      return { key: y.key, hidden: (C == null ? void 0 : C.hidden) ?? y.hidden ?? !1 };
    }), i)
      if (g) {
        const y = e.filter((o) => !g.map(({ key: n }) => n).includes(o.key)), C = g.reduce((o, n) => {
          const f = e.filter(({ key: W }) => W === n.key)[0];
          return f && (o = [...o, f]), o;
        }, []), p = g.reduce((o, n) => {
          const f = e.filter(({ key: D }) => D === n.key)[0];
          if (!f)
            return o;
          const W = typeof m == "number" ? m : void 0;
          return o = [...o, { key: f.key, width: n.width ?? f.width ?? W }], o;
        }, []);
        this.columns = C.concat(y), this.columnsWidth = p.concat(y.map(({ key: o, width: n }) => ({ key: o, width: n ?? m }))), this.stickyColumns = this.columns.map((o) => {
          const n = u == null ? void 0 : u.find(({ key: f }) => f === o.key);
          return { key: o.key, sticky: (n == null ? void 0 : n.sticky) ?? o.sticky ?? !1 };
        }), this.hiddenColumns = this.columns.map((o) => {
          const n = r == null ? void 0 : r.find(({ key: f }) => f === o.key);
          return { key: o.key, hidden: (n == null ? void 0 : n.hidden) ?? o.hidden ?? !1 };
        });
      } else
        localStorage.setItem(t, JSON.stringify(this.columnsWidth)), this.hasStickyColumns && localStorage.setItem(`${t}_sticky`, JSON.stringify(this.stickyColumns)), localStorage.setItem(`${t}_hidden`, JSON.stringify(this.hiddenColumns)), this.columns = e;
    else
      this.columns = e, g || localStorage.setItem(t, JSON.stringify(this.columnsWidth)), this.hasStickyColumns && !u && localStorage.setItem(`${t}_sticky`, JSON.stringify(this.stickyColumns)), r || localStorage.setItem(`${t}_hidden`, JSON.stringify(this.hiddenColumns));
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
    var C, p;
    if (!this.hasDraggableColumns)
      return;
    const i = this.columns[t].key, c = this.columns[e].key, h = ((C = this.stickyColumns.find((o) => o.key === i)) == null ? void 0 : C.sticky) ?? !1, k = ((p = this.stickyColumns.find((o) => o.key === c)) == null ? void 0 : p.sticky) ?? !1;
    if (h !== k)
      return;
    const d = [...this.columns], m = d.splice(t, 1)[0];
    d.splice(e, 0, m), this.columns = d;
    const a = [...this.columnsWidth], g = a.splice(t, 1)[0];
    a.splice(e, 0, g), this.columnsWidth = a;
    const S = [...this.stickyColumns], u = S.splice(t, 1)[0];
    S.splice(e, 0, u), this.stickyColumns = S;
    const l = [...this.hiddenColumns], r = l.splice(t, 1)[0];
    l.splice(e, 0, r), this.hiddenColumns = l;
    const y = localStorage.getItem(this.key);
    if (y) {
      const o = JSON.parse(y), n = o.splice(t, 1)[0];
      o.splice(e, 0, n), localStorage.setItem(this.key, JSON.stringify(o));
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
      const a = this.stickyColumns.filter((g) => g.sticky).length;
      i !== a && this.moveColumn(i, a);
    } else {
      const a = k.filter((g) => g.sticky).length;
      i !== a && this.moveColumn(i, a);
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
const V = ({ key: s, columns: t, ...e }) => {
  const i = O(null);
  return i.current || (i.current = new _({ key: s, columns: t, ...e })), i.current;
};
function E(s, t) {
  const e = O({}), i = I((k, d) => {
    d ? e.current[k] = d : delete e.current[k];
  }, []), c = I(() => {
    Object.keys(e.current).length > 0 && s.updateActualWidths(e.current);
  }, [s]);
  J(() => {
    const k = () => {
      c();
    };
    requestAnimationFrame(k);
    const d = setTimeout(k, 100);
    return () => clearTimeout(d);
  }, [c, s.columns, s.columnsWidth]);
  const h = I((k, d, m, a) => {
    const g = (u) => {
      const l = u.clientX - d, r = Math.max(50, m + l), y = [...s.columnsWidth];
      y[k] = {
        ...y[k],
        width: r
      }, s.setColumnsWidth(y);
    }, S = () => {
      a && setTimeout(() => {
        const u = a.getBoundingClientRect().width, l = [...s.columnsWidth];
        l[k] = {
          ...l[k],
          width: Math.floor(u)
        }, s.setColumnsWidth(l), c(), s.saveLayoutView && localStorage.setItem(s.key, JSON.stringify(l));
      }, 10), document.removeEventListener("mousemove", g), document.removeEventListener("mouseup", S), document.body.style.cursor = "", document.body.style.userSelect = "";
    };
    document.addEventListener("mousemove", g), document.addEventListener("mouseup", S), document.body.style.cursor = "col-resize", document.body.style.userSelect = "none";
  }, [s, c]);
  return L(() => {
    const k = s.getVisibleColumns(), d = s.getStickyColumnsOffsets(), m = (S) => {
      var p, o;
      const u = k[S], l = s.columns.findIndex((n) => n.key === u.key), r = ((p = s.columnsWidth[l]) == null ? void 0 : p.width) ?? u.width ?? 150, y = ((o = s.stickyColumns.find((n) => n.key === u.key)) == null ? void 0 : o.sticky) ?? !1, C = d[u.key] ?? 0;
      return {
        width: typeof r == "number" ? `${r}px` : r,
        isDraggable: s.hasDraggableColumns,
        isResizable: u.resizeable,
        isSticky: y,
        stickyOffset: C,
        onDragStart: (n) => {
          var f;
          s.hasDraggableColumns && ((f = n.dataTransfer) == null || f.setData("text/plain", l.toString()));
        },
        onDragOver: (n) => {
          n.preventDefault();
        },
        onDrop: (n) => {
          var f;
          if (n.preventDefault(), s.hasDraggableColumns) {
            const W = parseInt(((f = n.dataTransfer) == null ? void 0 : f.getData("text/plain")) ?? "");
            !isNaN(W) && W !== l && (s.moveColumn(W, l), setTimeout(() => c(), 50));
          }
        },
        onResizeStart: (n, f) => {
          if (u.resizeable) {
            n.preventDefault(), n.stopPropagation();
            const W = typeof r == "number" ? r : parseInt(r) ?? 150;
            h(l, n.clientX, W, f);
          }
        },
        onToggleSticky: (n) => {
          if (s.hasStickyColumns) {
            let f;
            n && (f = n.getBoundingClientRect().width), s.toggleColumnSticky(u.key, f), setTimeout(() => c(), 50);
          }
        },
        onToggleHidden: () => {
          s.toggleColumnHidden(u.key);
        },
        // New: function to register header element reference
        registerHeaderRef: (n) => {
          i(u.key, n);
        }
      };
    }, a = (S) => {
      var p, o;
      const u = k[S], l = s.columns.findIndex((n) => n.key === u.key), r = ((p = s.columnsWidth[l]) == null ? void 0 : p.width) ?? u.width ?? 150, y = ((o = s.stickyColumns.find((n) => n.key === u.key)) == null ? void 0 : o.sticky) ?? !1, C = d[u.key] ?? 0;
      return {
        width: typeof r == "number" ? `${r}px` : r,
        isSticky: y,
        stickyOffset: C
      };
    }, g = (S) => ({
      onClick: () => {
        s.onRowClick && s.onRowClick({ item: S });
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
      getCellProps: a,
      getRowProps: g,
      // New: function to manually trigger actual width updates
      updateActualWidths: c,
      // Hidden columns methods
      getHiddenColumns: () => s.getHiddenColumns(),
      toggleColumnHidden: (S) => s.toggleColumnHidden(S)
    };
  });
}
const P = (s, t) => {
  const [e, i] = v(null), [c, h] = v(null), [k, d] = v(null);
  return {
    draggedItem: e,
    draggedIndex: c,
    hoveredIndex: k,
    handleDragStart: (l, r) => {
      i(l), h(r), s == null || s(l, r);
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
    handleDrop: (l, r) => {
      l.preventDefault(), c !== null && c !== r && (t == null || t(c, r)), i(null), h(null), d(null);
    }
  };
}, b = (s, t) => {
  $(() => {
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
  V as useDataTable,
  P as useDragAndDrop,
  b as useResizeObserver,
  E as useTable
};
