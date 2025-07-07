import DataTableModel, { DataTableLiteType } from "../models/data-table-model";
import { useRef } from "react";

export const useDataTable = ({ key, columns, ...props }: DataTableLiteType) => {
	// Keep the model stable to preserve MobX reactivity
	const modelRef = useRef<DataTableModel | null>(null);
	
	// Only create the model once
	if (!modelRef.current) {
		modelRef.current = new DataTableModel({ key, columns, ...props });
	}

	return modelRef.current;
}

export default useDataTable;