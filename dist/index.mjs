var D = Object.defineProperty;
var w = (e, t, s) => t in e ? D(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var g = (e, t, s) => w(e, typeof t != "symbol" ? t + "" : t, s);
import { makeAutoObservable as C } from "mobx";
import { useRef as S, useCallback as W, useState as v, useLayoutEffect as b } from "react";
import { useObserver as I } from "mobx-react";
class O {
  // nestedColumnsWidth?: ColumnWidthType[] | null;	 
  constructor({ key: t, columns: s, saveLayoutView: c, hasDraggableColumns: m, isStickyHeader: r, onRowClick: a, defaultColumnWidth: i = "auto" }) {
    g(this, "key");
    g(this, "columns");
    g(this, "saveLayoutView");
    g(this, "hasDraggableColumns");
    g(this, "isStickyHeader");
    g(this, "onRowClick");
    g(this, "columnsWidth");
    C(this);
    const d = localStorage.getItem(t), n = d ? JSON.parse(d) : null;
    if (this.key = t, this.saveLayoutView = c ?? !1, this.hasDraggableColumns = m ?? !0, this.isStickyHeader = r ?? !1, this.onRowClick = a, this.columnsWidth = s.map((l) => {
      const u = n == null ? void 0 : n.find(({ key: o }) => o === l.key), p = typeof i == "number" ? i : void 0;
      return { key: l.key, width: (u == null ? void 0 : u.width) ?? l.width ?? p };
    }), c)
      if (n) {
        const l = s.filter((o) => !n.map(({ key: h }) => h).includes(o.key)), u = n.reduce((o, h) => {
          const f = s.filter(({ key: y }) => y === h.key)[0];
          return f && (o = [...o, f]), o;
        }, []), p = n.reduce((o, h) => {
          const f = s.filter(({ key: k }) => k === h.key)[0];
          if (!f)
            return o;
          const y = typeof i == "number" ? i : void 0;
          return o = [...o, { key: f.key, width: h.width ?? f.width ?? y }], o;
        }, []);
        this.columns = u.concat(l), this.columnsWidth = p.concat(l.map(({ key: o, width: h }) => ({ key: o, width: h ?? i })));
      } else
        localStorage.setItem(t, JSON.stringify(this.columnsWidth)), this.columns = s;
    else
      this.columns = s, n || localStorage.setItem(t, JSON.stringify(this.columnsWidth));
  }
  moveColumn(t, s) {
    if (!this.hasDraggableColumns)
      return;
    const c = [...this.columns], m = c.splice(t, 1)[0];
    c.splice(s, 0, m), this.columns = c;
    const r = [...this.columnsWidth], a = r.splice(t, 1)[0];
    r.splice(s, 0, a), this.columnsWidth = r;
    const i = localStorage.getItem(this.key);
    if (i) {
      const d = JSON.parse(i), n = d.splice(t, 1)[0];
      d.splice(s, 0, n), localStorage.setItem(this.key, JSON.stringify(d));
    }
  }
  setColumnsWidth(t) {
    this.columnsWidth = t;
  }
}
const J = ({ key: e, columns: t, ...s }) => {
  const c = S(null);
  return c.current || (c.current = new O({ key: e, columns: t, ...s })), c.current;
};
function M(e, t) {
  const s = W((c, m, r) => {
    const a = (d) => {
      const n = d.clientX - m, l = Math.max(50, r + n), u = [...e.columnsWidth];
      u[c] = {
        ...u[c],
        width: l
      }, e.setColumnsWidth(u), e.saveLayoutView && localStorage.setItem(e.key, JSON.stringify(u));
    }, i = () => {
      document.removeEventListener("mousemove", a), document.removeEventListener("mouseup", i), document.body.style.cursor = "", document.body.style.userSelect = "";
    };
    document.addEventListener("mousemove", a), document.addEventListener("mouseup", i), document.body.style.cursor = "col-resize", document.body.style.userSelect = "none";
  }, [e]);
  return I(() => {
    const c = (r) => {
      var d;
      const a = e.columns[r], i = ((d = e.columnsWidth[r]) == null ? void 0 : d.width) || a.width || 150;
      return {
        width: typeof i == "number" ? `${i}px` : i,
        isDraggable: e.hasDraggableColumns,
        isResizable: a.resizeable,
        onDragStart: (n) => {
          var l;
          e.hasDraggableColumns && ((l = n.dataTransfer) == null || l.setData("text/plain", r.toString()));
        },
        onDragOver: (n) => {
          n.preventDefault();
        },
        onDrop: (n) => {
          var l;
          if (n.preventDefault(), e.hasDraggableColumns) {
            const u = parseInt(((l = n.dataTransfer) == null ? void 0 : l.getData("text/plain")) || "");
            !isNaN(u) && u !== r && e.moveColumn(u, r);
          }
        },
        onResizeStart: (n) => {
          if (a.resizeable) {
            n.preventDefault(), n.stopPropagation();
            const l = typeof i == "number" ? i : parseInt(i) || 150;
            s(r, n.clientX, l);
          }
        }
      };
    }, m = (r) => ({
      onClick: () => {
        e.onRowClick && e.onRowClick({ item: r });
      }
    });
    return {
      columns: e.columns,
      data: t,
      config: e,
      columnWidths: e.columnsWidth,
      getColumnProps: c,
      getRowProps: m
    };
  });
}
const E = (e, t) => {
  const [s, c] = v(null), [m, r] = v(null), [a, i] = v(null);
  return {
    draggedItem: s,
    draggedIndex: m,
    hoveredIndex: a,
    handleDragStart: (o, h) => {
      c(o), r(h), e == null || e(o, h);
    },
    handleDragOver: (o) => {
      o.preventDefault();
    },
    handleDragEnter: (o) => {
      i(o);
    },
    handleDragLeave: () => {
      i(null);
    },
    handleDrop: (o, h) => {
      o.preventDefault(), m !== null && m !== h && (t == null || t(m, h)), c(null), r(null), i(null);
    }
  };
}, H = (e, t) => {
  b(() => {
    const s = e == null ? void 0 : e.current;
    if (!s) return;
    const c = new ResizeObserver((m) => {
      const r = m[0];
      r && t(r);
    });
    return c.observe(s), () => c.disconnect();
  }, [e, t]);
};
export {
  J as useDataTable,
  E as useDragAndDrop,
  H as useResizeObserver,
  M as useTable
};
