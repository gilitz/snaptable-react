var D = Object.defineProperty;
var I = (s, t, e) => t in s ? D(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var S = (s, t, e) => I(s, typeof t != "symbol" ? t + "" : t, e);
import { makeAutoObservable as R } from "mobx";
import { useRef as v, useCallback as W, useEffect as N, useState as w, useLayoutEffect as J } from "react";
import { useObserver as L } from "mobx-react";
class z {
  constructor({ key: t, columns: e, saveLayoutView: n, hasDraggableColumns: u, isStickyHeader: l, hasStickyColumns: k, onRowClick: m, defaultColumnWidth: h = "auto" }) {
    S(this, "key");
    S(this, "columns");
    S(this, "saveLayoutView");
    S(this, "hasDraggableColumns");
    S(this, "isStickyHeader");
    S(this, "hasStickyColumns");
    S(this, "onRowClick");
    S(this, "columnsWidth");
    S(this, "stickyColumns");
    // nestedColumnsWidth?: ColumnWidthType[] | null;	 
    // Store actual rendered widths from DOM elements
    S(this, "actualRenderedWidths", {});
    R(this);
    const g = localStorage.getItem(t), r = g ? JSON.parse(g) : null, d = localStorage.getItem(`${t}_sticky`), y = d ? JSON.parse(d) : null;
    if (this.key = t, this.saveLayoutView = n ?? !1, this.hasDraggableColumns = u ?? !0, this.isStickyHeader = l ?? !1, this.hasStickyColumns = k ?? !1, this.onRowClick = m, this.columnsWidth = e.map((o) => {
      const f = r == null ? void 0 : r.find(({ key: c }) => c === o.key), C = typeof h == "number" ? h : void 0;
      return { key: o.key, width: (f == null ? void 0 : f.width) ?? o.width ?? C };
    }), this.stickyColumns = e.map((o) => {
      const f = y == null ? void 0 : y.find(({ key: C }) => C === o.key);
      return { key: o.key, sticky: (f == null ? void 0 : f.sticky) ?? o.sticky ?? !1 };
    }), n)
      if (r) {
        const o = e.filter((c) => !r.map(({ key: i }) => i).includes(c.key)), f = r.reduce((c, i) => {
          const a = e.filter(({ key: p }) => p === i.key)[0];
          return a && (c = [...c, a]), c;
        }, []), C = r.reduce((c, i) => {
          const a = e.filter(({ key: O }) => O === i.key)[0];
          if (!a)
            return c;
          const p = typeof h == "number" ? h : void 0;
          return c = [...c, { key: a.key, width: i.width ?? a.width ?? p }], c;
        }, []);
        this.columns = f.concat(o), this.columnsWidth = C.concat(o.map(({ key: c, width: i }) => ({ key: c, width: i ?? h }))), this.stickyColumns = this.columns.map((c) => {
          const i = y == null ? void 0 : y.find(({ key: a }) => a === c.key);
          return { key: c.key, sticky: (i == null ? void 0 : i.sticky) ?? c.sticky ?? !1 };
        });
      } else
        localStorage.setItem(t, JSON.stringify(this.columnsWidth)), this.hasStickyColumns && localStorage.setItem(`${t}_sticky`, JSON.stringify(this.stickyColumns)), this.columns = e;
    else
      this.columns = e, r || localStorage.setItem(t, JSON.stringify(this.columnsWidth)), this.hasStickyColumns && !y && localStorage.setItem(`${t}_sticky`, JSON.stringify(this.stickyColumns));
  }
  // Method to update actual rendered widths from DOM elements
  updateActualWidths(t) {
    Object.keys(t).forEach((e) => {
      const n = t[e];
      if (n) {
        const u = n.getBoundingClientRect().width;
        this.actualRenderedWidths[e] = u;
      }
    });
  }
  // Method to get the most accurate width for a column
  getColumnActualWidth(t, e) {
    var u;
    if (this.actualRenderedWidths[t])
      return this.actualRenderedWidths[t];
    const n = this.columns.findIndex((l) => l.key === t);
    if (n !== -1) {
      const l = (u = this.columnsWidth[n]) == null ? void 0 : u.width;
      if (l)
        return typeof l == "number" ? l : parseInt(l) || e;
    }
    return e;
  }
  moveColumn(t, e) {
    var f, C;
    if (!this.hasDraggableColumns)
      return;
    const n = this.columns[t].key, u = this.columns[e].key, l = ((f = this.stickyColumns.find((c) => c.key === n)) == null ? void 0 : f.sticky) ?? !1, k = ((C = this.stickyColumns.find((c) => c.key === u)) == null ? void 0 : C.sticky) ?? !1;
    if (l !== k)
      return;
    const m = [...this.columns], h = m.splice(t, 1)[0];
    m.splice(e, 0, h), this.columns = m;
    const g = [...this.columnsWidth], r = g.splice(t, 1)[0];
    g.splice(e, 0, r), this.columnsWidth = g;
    const d = [...this.stickyColumns], y = d.splice(t, 1)[0];
    d.splice(e, 0, y), this.stickyColumns = d;
    const o = localStorage.getItem(this.key);
    if (o) {
      const c = JSON.parse(o), i = c.splice(t, 1)[0];
      c.splice(e, 0, i), localStorage.setItem(this.key, JSON.stringify(c));
    }
    this.hasStickyColumns && localStorage.setItem(`${this.key}_sticky`, JSON.stringify(this.stickyColumns));
  }
  setColumnsWidth(t) {
    this.columnsWidth = t;
  }
  setStickyColumns(t) {
    this.stickyColumns = t, this.hasStickyColumns && localStorage.setItem(`${this.key}_sticky`, JSON.stringify(this.stickyColumns));
  }
  toggleColumnSticky(t, e) {
    var m;
    if (!this.hasStickyColumns)
      return;
    const n = this.columns.findIndex((h) => h.key === t);
    if (n === -1)
      return;
    const l = !(((m = this.stickyColumns.find((h) => h.key === t)) == null ? void 0 : m.sticky) ?? !1);
    if (l && e) {
      const h = [...this.columnsWidth];
      h[n] = {
        ...h[n],
        width: Math.floor(e)
      }, this.setColumnsWidth(h), this.saveLayoutView && localStorage.setItem(this.key, JSON.stringify(h));
    }
    const k = this.stickyColumns.map(
      (h) => h.key === t ? { ...h, sticky: l } : h
    );
    if (l) {
      const g = this.stickyColumns.filter((r) => r.sticky).length;
      n !== g && this.moveColumn(n, g);
    } else {
      const g = k.filter((r) => r.sticky).length;
      n !== g && this.moveColumn(n, g);
    }
    this.setStickyColumns(k);
  }
  getStickyColumnsOffsets() {
    var n;
    if (!this.hasStickyColumns)
      return {};
    const t = {};
    let e = 0;
    for (let u = 0; u < this.columns.length; u++) {
      const l = this.columns[u];
      if (((n = this.stickyColumns.find((m) => m.key === l.key)) == null ? void 0 : n.sticky) ?? !1) {
        t[l.key] = e;
        const m = this.getColumnActualWidth(l.key, l.width ?? 150);
        e += m;
      }
    }
    return t;
  }
}
const _ = ({ key: s, columns: t, ...e }) => {
  const n = v(null);
  return n.current || (n.current = new z({ key: s, columns: t, ...e })), n.current;
};
function b(s, t) {
  const e = v({}), n = W((k, m) => {
    m ? e.current[k] = m : delete e.current[k];
  }, []), u = W(() => {
    Object.keys(e.current).length > 0 && s.updateActualWidths(e.current);
  }, [s]);
  N(() => {
    const k = () => {
      u();
    };
    requestAnimationFrame(k);
    const m = setTimeout(k, 100);
    return () => clearTimeout(m);
  }, [u, s.columns, s.columnsWidth]);
  const l = W((k, m, h, g) => {
    const r = (y) => {
      const o = y.clientX - m, f = Math.max(50, h + o), C = [...s.columnsWidth];
      C[k] = {
        ...C[k],
        width: f
      }, s.setColumnsWidth(C);
    }, d = () => {
      g && setTimeout(() => {
        const y = g.getBoundingClientRect().width, o = [...s.columnsWidth];
        o[k] = {
          ...o[k],
          width: Math.floor(y)
        }, s.setColumnsWidth(o), u(), s.saveLayoutView && localStorage.setItem(s.key, JSON.stringify(o));
      }, 10), document.removeEventListener("mousemove", r), document.removeEventListener("mouseup", d), document.body.style.cursor = "", document.body.style.userSelect = "";
    };
    document.addEventListener("mousemove", r), document.addEventListener("mouseup", d), document.body.style.cursor = "col-resize", document.body.style.userSelect = "none";
  }, [s, u]);
  return L(() => {
    const k = s.getStickyColumnsOffsets(), m = (r) => {
      var C, c;
      const d = s.columns[r], y = ((C = s.columnsWidth[r]) == null ? void 0 : C.width) ?? d.width ?? 150, o = ((c = s.stickyColumns.find((i) => i.key === d.key)) == null ? void 0 : c.sticky) ?? !1, f = k[d.key] ?? 0;
      return {
        width: typeof y == "number" ? `${y}px` : y,
        isDraggable: s.hasDraggableColumns,
        isResizable: d.resizeable,
        isSticky: o,
        stickyOffset: f,
        onDragStart: (i) => {
          var a;
          s.hasDraggableColumns && ((a = i.dataTransfer) == null || a.setData("text/plain", r.toString()));
        },
        onDragOver: (i) => {
          i.preventDefault();
        },
        onDrop: (i) => {
          var a;
          if (i.preventDefault(), s.hasDraggableColumns) {
            const p = parseInt(((a = i.dataTransfer) == null ? void 0 : a.getData("text/plain")) ?? "");
            !isNaN(p) && p !== r && (s.moveColumn(p, r), setTimeout(() => u(), 50));
          }
        },
        onResizeStart: (i, a) => {
          if (d.resizeable) {
            i.preventDefault(), i.stopPropagation();
            const p = typeof y == "number" ? y : parseInt(y) ?? 150;
            l(r, i.clientX, p, a);
          }
        },
        onToggleSticky: (i) => {
          if (s.hasStickyColumns) {
            let a;
            i && (a = i.getBoundingClientRect().width), s.toggleColumnSticky(d.key, a), setTimeout(() => u(), 50);
          }
        },
        // New: function to register header element reference
        registerHeaderRef: (i) => {
          n(d.key, i);
        }
      };
    }, h = (r) => {
      var C, c;
      const d = s.columns[r], y = ((C = s.columnsWidth[r]) == null ? void 0 : C.width) ?? d.width ?? 150, o = ((c = s.stickyColumns.find((i) => i.key === d.key)) == null ? void 0 : c.sticky) ?? !1, f = k[d.key] ?? 0;
      return {
        width: typeof y == "number" ? `${y}px` : y,
        isSticky: o,
        stickyOffset: f
      };
    }, g = (r) => ({
      onClick: () => {
        s.onRowClick && s.onRowClick({ item: r });
      }
    });
    return {
      columns: s.columns,
      data: t,
      config: s,
      columnWidths: s.columnsWidth,
      stickyColumns: s.stickyColumns,
      stickyOffsets: k,
      getColumnProps: m,
      getCellProps: h,
      getRowProps: g,
      // New: function to manually trigger actual width updates
      updateActualWidths: u
    };
  });
}
const E = (s, t) => {
  const [e, n] = w(null), [u, l] = w(null), [k, m] = w(null);
  return {
    draggedItem: e,
    draggedIndex: u,
    hoveredIndex: k,
    handleDragStart: (o, f) => {
      n(o), l(f), s == null || s(o, f);
    },
    handleDragOver: (o) => {
      o.preventDefault();
    },
    handleDragEnter: (o) => {
      m(o);
    },
    handleDragLeave: () => {
      m(null);
    },
    handleDrop: (o, f) => {
      o.preventDefault(), u !== null && u !== f && (t == null || t(u, f)), n(null), l(null), m(null);
    }
  };
}, P = (s, t) => {
  J(() => {
    const e = s == null ? void 0 : s.current;
    if (!e) return;
    const n = new ResizeObserver((u) => {
      const l = u[0];
      l && t(l);
    });
    return n.observe(e), () => n.disconnect();
  }, [s, t]);
};
export {
  _ as useDataTable,
  E as useDragAndDrop,
  P as useResizeObserver,
  b as useTable
};
