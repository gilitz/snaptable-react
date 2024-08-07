import { DataTableType } from "../models/data-table-model";

export type SnapTableType = {
	dataTable: DataTableType;
	data: unknown[];
	tableContainerClass?: string;
	tableClass?: string;
	bodyClass?: string;
	headerRowClass?: string;
	rowClass?: string;
	headerCellClass?: string;
	nestedHeaderCellClass?:string;
	cellClass?: string;
};

export default SnapTableType;