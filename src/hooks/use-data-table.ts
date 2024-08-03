import DataTableModel, { DataTableLiteType } from "../models/data-table-model";
import { useEffect, useState } from "react";

export const useDataTable = ({ key, columns, ...props }: DataTableLiteType) => {
	const model = new DataTableModel({ key, columns, ...props });
	const [currentModel, setCurrentModel] = useState(model);

	useEffect(() => {
		const updatedModel = new DataTableModel({ key, columns, ...props });
		setCurrentModel(updatedModel)
	}, [key, columns])

	return currentModel;
}

export default useDataTable;