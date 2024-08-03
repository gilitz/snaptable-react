import { TableLayout } from "./table-layout";
import { DataTableType, TableColumnType } from "../models/data-table-model";
import useDragAndDrop from "../hooks/use-drag-drop";

export type TableProps = {
	dataTable: DataTableType;
	data: any[];
	bodyClass?: string;
	headerRowClass?: string;
	rowClass?: string;
	cellClass?: string;
	headerCellClass?: string;
	tableClass?: string;
	tableContainerClass?: string;
}

export const Table = (({
	dataTable,
	data,
	bodyClass,
	headerCellClass,
	rowClass,
	cellClass,
	headerRowClass,
	tableClass,
	tableContainerClass,
	...props }: TableProps) => {
	const { draggedIndex, hoveredIndex, onDragStart, onDragOver, onDrop } = useDragAndDrop();
	return (
		<TableLayout {...props} tableContainerClass={tableContainerClass} tableClass={tableClass}>
			<TableLayout.Thead>
				<TableLayout.Row className={headerRowClass}>
					{dataTable.columns.map((column: TableColumnType, index: number) =>
						<TableLayout.Header
							key={column.key}
							index={index}
							dataTable={dataTable}
							className={headerCellClass}
							resizeable={column.resizeable}
							data-draggable={dataAttr(dataTable.hasDraggableColumns)}
							data-drag-hovered={dataAttr((hoveredIndex === index) && (hoveredIndex !== draggedIndex))}
							draggable={dataTable.hasDraggableColumns}
							onDragStart={onDragStart(index)}
							onDragOver={onDragOver(index)}
							onDrop={onDrop(index, () => dataTable.moveColumn(draggedIndex, index))}>
							{column.label}
						</TableLayout.Header>
					)}
				</TableLayout.Row>
			</TableLayout.Thead>
			<TableLayout.Body className={bodyClass}>
				{data.map((item: any) => (
					<TableLayout.Row key={item.key} className={rowClass}>
						{dataTable.columns.map(({ key, Cell }: TableColumnType) =>
							<Cell key={key} className={cellClass} data={item} />
						)}
					</TableLayout.Row>
				))}
			</TableLayout.Body>
		</TableLayout >
	)
});

 const dataAttr = (flag: boolean | undefined, value?: string) => {
	if (!flag) {
		return null;
	}
	return value ?? '';
};

export default Table;