import { ReactNode, useRef } from 'react';
import styled from 'styled-components';
import { DataTableType } from '../models/data-table-model';
import { observer } from 'mobx-react';

type TableLayoutType = {
	children?: React.ReactNode;
	className?: string;
	tableClass?: string;
	tableContainerClass?: string;
};

type HeaderType = {
	index: number;
	dataTable: DataTableType;
	resizeable?: boolean;
	colSpan: number;
	children: ReactNode
};

const StyledTable = styled.table`
	width: max-content;
	border-collapse: collapse;
	table-layout: fixed;
`;

const TableContainer = styled.div`
	width: 100%;
	max-height: 100vh;
	overflow: scroll;
`;

const THContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const ResizeHandler = styled.div`
	width: 4px;
	height: 100%;
	position: absolute;
	top: 0;
	right: 0;
	background-color: transparent;
	overflow: hidden;
	visibility: hidden;
	touch-action: none;
	user-select: none;
	cursor: col-resize;
`;

const Tr = styled.tr`
	&[data-clickable] {
		cursor: pointer;
	}
`;

const Th = styled(
	observer(({ children, dataTable, index, colSpan, resizeable = true, ...props }: HeaderType) => {
		const ref = useRef<any>(null);

		const handleMouseDown = (index: number) => (event:MouseEvent) => {
			event.preventDefault();
			const startX = event.clientX;
			let widthWithPadding = ref.current?.getBoundingClientRect()?.width;
			let updatedColumnsWidth = [...dataTable.columnsWidth];

			const handleMouseMove = (event: MouseEvent) => {
			const newWidth = Math.trunc(Math.max(widthWithPadding + event.clientX - startX, 80));
			
			updatedColumnsWidth = updatedColumnsWidth.map((column, colIndex) =>
				colIndex === index ? { ...column, width: newWidth } : column);

			dataTable.setColumnsWidth(updatedColumnsWidth)
			localStorage.setItem(dataTable.key, JSON.stringify(updatedColumnsWidth));
			};
		
			const handleMouseUp = () => {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
			};
		
			document.addEventListener('mousemove', handleMouseMove);
			document.addEventListener('mouseup', handleMouseUp);
		};

		return (
			<th {...props} ref={ref} colSpan={colSpan} style={{ width: dataTable.columnsWidth[index].width, minWidth: dataTable.columns[index].width ?? ref.current?.width }}>
				<THContainer>
					{children}
					{resizeable && <ResizeHandler className="resize-handler" onMouseDown={handleMouseDown(index)} />}
				</THContainer>
			</th>)
}))`
	display: table-cell;
	position: relative;

	&:hover {
		${ResizeHandler} {
			visibility: visible;
			background-color: #404145;
		}
	}

	&[data-draggable] {
		cursor: pointer;
	}
`;

const ThNested = styled(
	observer((props: HeaderType) => {
		return (
			<th {...props} style={{ width: 'unset' }} />
		);
}))`
	display: table-cell;

	&[data-draggable] {
		cursor: pointer;
	}
`;

const Body = styled.tbody``;

const Thead = styled.thead`
	&[data-sticky] {
		position: sticky;
		top: 0;
	}
`;

const Footer = styled.tfoot``;

export const TableLayout: React.FC<TableLayoutType> & {
	Body: typeof Body;
	Thead: typeof Thead;
	Row: typeof Tr;
	Header: typeof Th;
	Footer: typeof Footer;
	ThNested: typeof ThNested;
} = ({ tableContainerClass, tableClass, children, ...props }) => {
	return (
		<TableContainer {...props} className={`${props.className} ${tableContainerClass}`}>
			<StyledTable className={tableClass}>
				{children}
			</StyledTable>
		</TableContainer>
	);
};

TableLayout.Body = Body;
TableLayout.Thead = Thead;
TableLayout.Row = Tr;
TableLayout.Header = Th;
TableLayout.Footer = Footer;
TableLayout.ThNested = ThNested;
