import { DataTableType } from "../models/data-table-model";

export type SnapTableType = {
	dataTable: DataTableType;
	data: any[];
	bodyClass?: string;
	headerRowClass?: string;
	rowClass?: string;
	headerCellClass?: string;
	tableClass?: string;
	tableContainerClass?: string;
};

export default SnapTableType;