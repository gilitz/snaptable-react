import { ReactNode, useEffect, useRef } from 'react';
// @ts-expect-error
import styled, { StyledComponent } from 'styled-components';
import { DataTableType } from '../models/data-table-model';
import { useResizeObserver } from '../hooks/use-resize-observer';

type TableProps = {
	children?: React.ReactNode;
	className?: string;
	tableClass?: string;
	tableContainerClass?: string;
};

type HeaderProps = {
	index: number;
	dataTable: DataTableType;
	resizeable?: boolean;
	children: ReactNode
}

type StyledTableProps = {};

type StyledTableRowProps = {};

type StyledTableHeaderProps = {};

type StyledTableBodyProps = {};

type StyledTableTheadProps = {};

const StyledTable: StyledComponent<'table', any, StyledTableProps, never> = styled.table`
	width: 100%;
	border-collapse: collapse;
`;

const TableContainer = styled.div`
	width: 100%;
	overflow: scroll;
	/* border: 1px solid #333333; */
`;

const THContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const ResizeHandler = styled.div`
	min-width: 8px;
	height: 8px;
	position: relative;
	top: 0;
	right: -8px;
	background-color: transparent;
	resize: horizontal;
	overflow: hidden;
	transform: scaleY(4);
	visibility: hidden;
`;

const Tr: StyledComponent<'tr', any, StyledTableRowProps, never> = styled.tr``;

const Th: StyledComponent<'th', any, StyledTableHeaderProps, never> = styled(({ children, dataTable, index, resizeable = true, ...props }: HeaderProps) => {
	const ref = useRef<HTMLDivElement>(null);
	const staticWidth = useRef(`${dataTable.columnsWidth[index].width}px`);
	const resizeHandlerstyle = { width: staticWidth.current, minWidth: dataTable.columns[index].width ? staticWidth.current : 'auto' };
	const widthWithPadding = resizeable ? `${ref.current?.getBoundingClientRect()?.width}px` : staticWidth.current;

	const resizeHandlerWidth = useResizeObserver({ref});

	useEffect(() => {
		if (dataTable.saveLayoutView && Boolean(resizeHandlerWidth)) {
			const customColumnsWidth = [...dataTable.columnsWidth];
			const updateColummnsWidth = () => {
				customColumnsWidth[index].width =
					dataTable.columns[index].width ??
					resizeHandlerWidth ??
					customColumnsWidth[index].width;
				dataTable.setColumnsWidth(customColumnsWidth);
				const combimedColumns = dataTable.columns.map(({ key }, index) => ({ key, width: customColumnsWidth[index].width }));
				localStorage.setItem(dataTable.key, JSON.stringify(combimedColumns));
				staticWidth.current = `${combimedColumns[index].width}px`;
			}
			addEventListener('mouseup', updateColummnsWidth);
			return () => addEventListener('mouseup', updateColummnsWidth);
		}
	}, [resizeHandlerWidth, index, dataTable.key, dataTable.columns]);

	return (
		<th {...props} style={resizeable ? {} : { width: widthWithPadding, minWidth: widthWithPadding }}>
			<THContainer>
				{children}
				{resizeable && <ResizeHandler ref={ref} className="resize-handler" style={resizeHandlerstyle} />}
			</THContainer>
		</th>)
})`
	&:hover {
		${ResizeHandler} {
			visibility: visible;
			opacity: 0;
		}
	}

	&[data-draggable] {
		cursor: pointer;
	}
`;

const Body: StyledComponent<'tbody', any, StyledTableBodyProps, never> = styled.tbody``;

const Thead: StyledComponent<'thead', any, StyledTableTheadProps, never> = styled.thead`
	background-color: #0e131a;
`;

const Footer: StyledComponent<'tfoot', any, StyledTableTheadProps, never> = styled.tfoot``;

export const TableLayout: React.FC<TableProps> & {
	Row: typeof Tr;
	Header: typeof Th;
	Thead: typeof Thead;
	Footer: typeof Footer;
	Body: typeof Body;
} = ({ tableContainerClass, tableClass, children, ...props }) => {
	return (
		<TableContainer {...props} className={`${props.className} ${tableContainerClass}`}>
			<StyledTable className={tableClass}>
				{children}
			</StyledTable>
		</TableContainer>
	);
};

TableLayout.Row = Tr;
TableLayout.Thead = Thead;
TableLayout.Footer = Footer;
TableLayout.Header = Th;
TableLayout.Body = Body;
