var k = Object.defineProperty;
var D = (e, t, s) => t in e ? k(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var p = (e, t, s) => D(e, typeof t != "symbol" ? t + "" : t, s);
import { makeAutoObservable as w } from "mobx";
import { useRef as C, useCallback as S, useState as y, useLayoutEffect as W } from "react";
import { useObserver as b } from "mobx-react";
class I {
  // nestedColumnsWidth?: ColumnWidthType[] | null;	 
  constructor({ key: t, columns: s, saveLayoutView: r, hasDraggableColumns: h, isStickyHeader: o, onRowClick: d, defaultColumnWidth: n = "auto" }) {
    p(this, "key");
    p(this, "columns");
    p(this, "saveLayoutView");
    p(this, "hasDraggableColumns");
    p(this, "isStickyHeader");
    p(this, "onRowClick");
    p(this, "columnsWidth");
    w(this);
    const l = JSON.parse(localStorage.getItem(t));
    if (this.key = t, this.saveLayoutView = r ?? !1, this.hasDraggableColumns = h ?? !0, this.isStickyHeader = o ?? !1, this.onRowClick = d, this.columnsWidth = s.map((i) => {
      const u = l == null ? void 0 : l.find(({ key: m }) => m === i.key), a = typeof n == "number" ? n : void 0;
      return { key: i.key, width: (u == null ? void 0 : u.width) ?? i.width ?? a };
    }), r)
      if (l) {
        const i = s.filter((m) => !l.map(({ key: c }) => c).includes(m.key)), u = l.reduce((m, c) => {
          const g = s.find(({ key: f }) => f === c.key);
          return g && (m = [...m, g]), m;
        }, []), a = l.reduce((m, c) => {
          const g = s.find(({ key: v }) => v === c.key);
          if (!g)
            return m;
          const f = typeof n == "number" ? n : void 0;
          return m = [...m, { key: g.key, width: c.width ?? g.width ?? f }], m;
        }, []);
        this.columns = u.concat(i), this.columnsWidth = a.concat(i.map(({ key: m, width: c }) => ({ key: m, width: c ?? n })));
      } else
        localStorage.setItem(t, JSON.stringify(this.columnsWidth)), this.columns = s;
    else
      this.columns = s, l || localStorage.setItem(t, JSON.stringify(this.columnsWidth));
  }
  moveColumn(t, s) {
    if (!this.hasDraggableColumns)
      return;
    const r = [...this.columns], h = r.splice(t, 1)[0];
    r.splice(s, 0, h), this.columns = r;
    const o = [...this.columnsWidth], d = o.splice(t, 1)[0];
    o.splice(s, 0, d), this.columnsWidth = o;
    const n = JSON.parse(localStorage.getItem(this.key)), l = n.splice(t, 1)[0];
    n.splice(s, 0, l), localStorage.setItem(this.key, JSON.stringify(n));
  }
  setColumnsWidth(t) {
    this.columnsWidth = t;
  }
}
const N = ({ key: e, columns: t, ...s }) => {
  const r = C(null);
  return r.current || (r.current = new I({ key: e, columns: t, ...s })), r.current;
};
function J(e, t) {
  const s = S((r, h, o) => {
    const d = (l) => {
      const i = l.clientX - h, u = Math.max(50, o + i), a = [...e.columnsWidth];
      a[r] = {
        ...a[r],
        width: u
      }, e.setColumnsWidth(a), e.saveLayoutView && localStorage.setItem(e.key, JSON.stringify(a));
    }, n = () => {
      document.removeEventListener("mousemove", d), document.removeEventListener("mouseup", n), document.body.style.cursor = "", document.body.style.userSelect = "";
    };
    document.addEventListener("mousemove", d), document.addEventListener("mouseup", n), document.body.style.cursor = "col-resize", document.body.style.userSelect = "none";
  }, [e]);
  return b(() => {
    const r = (o) => {
      var l;
      const d = e.columns[o], n = ((l = e.columnsWidth[o]) == null ? void 0 : l.width) || d.width || 150;
      return {
        width: typeof n == "number" ? `${n}px` : n,
        isDraggable: e.hasDraggableColumns,
        isResizable: d.resizeable,
        onDragStart: (i) => {
          var u;
          e.hasDraggableColumns && ((u = i.dataTransfer) == null || u.setData("text/plain", o.toString()));
        },
        onDragOver: (i) => {
          i.preventDefault();
        },
        onDrop: (i) => {
          var u;
          if (i.preventDefault(), e.hasDraggableColumns) {
            const a = parseInt(((u = i.dataTransfer) == null ? void 0 : u.getData("text/plain")) || "");
            !isNaN(a) && a !== o && e.moveColumn(a, o);
          }
        },
        onResizeStart: (i) => {
          if (d.resizeable) {
            i.preventDefault(), i.stopPropagation();
            const u = typeof n == "number" ? n : parseInt(n) || 150;
            s(o, i.clientX, u);
          }
        }
      };
    }, h = (o) => ({
      onClick: () => {
        e.onRowClick && e.onRowClick({ item: o });
      }
    });
    return {
      columns: e.columns,
      data: t,
      config: e,
      columnWidths: e.columnsWidth,
      getColumnProps: r,
      getRowProps: h
    };
  });
}
const M = (e, t) => {
  const [s, r] = y(null), [h, o] = y(null), [d, n] = y(null);
  return {
    draggedItem: s,
    draggedIndex: h,
    hoveredIndex: d,
    handleDragStart: (c, g) => {
      r(c), o(g), e == null || e(c, g);
    },
    handleDragOver: (c) => {
      c.preventDefault();
    },
    handleDragEnter: (c) => {
      n(c);
    },
    handleDragLeave: () => {
      n(null);
    },
    handleDrop: (c, g) => {
      c.preventDefault(), h !== null && h !== g && (t == null || t(h, g)), r(null), o(null), n(null);
    }
  };
}, E = (e, t) => {
  W(() => {
    const s = e == null ? void 0 : e.current;
    if (!s) return;
    const r = new ResizeObserver((h) => {
      const o = h[0];
      o && t(o);
    });
    return r.observe(s), () => r.disconnect();
  }, [e, t]);
};
export {
  N as useDataTable,
  M as useDragAndDrop,
  E as useResizeObserver,
  J as useTable
};
