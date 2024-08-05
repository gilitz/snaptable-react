import { TableLayout } from "./table-layout";
import { TableColumnType } from "../models/data-table-model";
import useDragAndDrop from "../hooks/use-drag-drop";
import { SnapTableType } from "../types/table-type";

export const SnapTable = (({
	dataTable,
	data,
	bodyClass,
	headerCellClass,
	rowClass,
	cellClass,
	headerRowClass,
	tableClass,
	tableContainerClass,
	...props }: SnapTableType) => {
	const { draggedIndex, hoveredIndex, onDragStart, onDragOver, onDrop } = useDragAndDrop();
	return (
		<TableLayout {...props} tableContainerClass={tableContainerClass} tableClass={tableClass}>
			<TableLayout.Thead data-sticky={dataAttr(dataTable.isStickyHeader)}>
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

export default SnapTable;