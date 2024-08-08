import { TableLayout } from "./table-layout";
import { TableColumnType } from "../models/data-table-model";
import { SnapTableType } from "../types/table-type";
import useDragAndDrop from "../hooks/use-drag-drop";

export const SnapTable = (({
	dataTable,
	data,
	tableContainerClass,
	tableClass,
	bodyClass,
	headerRowClass,
	rowClass,
	headerCellClass,
	nestedHeaderCellClass,
	cellClass,
	...props }: SnapTableType) => {
	const { draggedIndex, hoveredIndex, onDragStart, onDragOver, onDrop } = useDragAndDrop();
	return (
		<TableLayout {...props} tableContainerClass={tableContainerClass} tableClass={tableClass}>
			<TableLayout.Thead data-sticky={dataAttr(dataTable.isStickyHeader)}>
				<TableLayout.Row className={headerRowClass}>
					{dataTable.columns.map((column: TableColumnType, index: number) =>{
						const colspan = column.nestedColumns?.length ?? 1;
						return (<TableLayout.Header
							key={column.key}
							colSpan={colspan}
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
					)}
				</TableLayout.Row>
				{dataTable.columns.some(column => Boolean(column.nestedColumns)) &&<TableLayout.Row className={headerRowClass}>
					{dataTable.columns.map((column, index) => !column.nestedColumns?.length ? 
						<th key={index} className={nestedHeaderCellClass ?? headerCellClass} />
						:
						column.nestedColumns.map((nestedColumn) =><th key={nestedColumn.key} className={nestedHeaderCellClass ?? headerCellClass}>{nestedColumn.label}</th>
						))}
				</TableLayout.Row>}
			</TableLayout.Thead>
			<TableLayout.Body className={bodyClass}>
				{data.map((item: any) => (
					<TableLayout.Row 
						key={item.key} 
						className={rowClass} 
						onClick={() => dataTable.onRowClick?.({ item })} 
						data-clickable={dataAttr(Boolean(dataTable.onRowClick))}>
							{dataTable.columns.map(({ key, Cell, ...column }: TableColumnType) => {
								if (!column.nestedColumns) {
									return <Cell key={key} className={cellClass} data={item} />;
								}
								return (
									column.nestedColumns.map(nestedColumn => 
									<nestedColumn.Cell 
										key={nestedColumn.key} 
										className={cellClass} 
										data={item} />
									)
							)})}
					</TableLayout.Row>
				))}
			</TableLayout.Body>
		</TableLayout>
	)
});

 const dataAttr = (flag: boolean | undefined, value?: string) => {
	if (!flag) {
		return null;
	}
	return value ?? '';
};

export default SnapTable;
