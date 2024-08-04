import { DataTableType } from "../src/models/data-table-model";
import SnapTableType from "../src/types/table-type";

declare module 'snaptable-react' {
	export const SnapTable: SnapTableType; 
	export const useDataTable: DataTableType; // Replace `any` with actual type if available
  }