import { useDataTable } from "../hooks/use-data-table";
import { Table } from "./table";
// import { Table as SmartTable } from '../table/table';

export const TableExample = (() => {
	const dataTable = useDataTable({ key: 'gil-table', columns: tableColumns, saveLayoutView: true })
	return (
		<Table dataTable={dataTable} data={mockData} />
	)
});

const tableColumns = [
	{ width: 300, key: '1', resizeable: false, label: 'First', Cell: ({ data, ...props }: { data: any }) => <Table.Cell {...props}>{data.name}</Table.Cell> },
	{ key: '2', label: 'Second', Cell: ({ data, ...props }: { data: any }) => <Table.Cell {...props}>{data.label}</Table.Cell> },
	{ key: '3', label: 'Third', Cell: ({ data, ...props }: { data: any }) => <Table.Cell {...props}>{data.name}</Table.Cell> },
	{ key: '4', label: 'Fourth', Cell: ({ data, ...props }: { data: any }) => <Table.Cell {...props}>{data.label}</Table.Cell> },
	{ key: '5', label: 'Fifth', Cell: ({ data, ...props }: { data: any }) => <Table.Cell {...props}>{data.label}</Table.Cell> },
	{ key: '6', label: 'Sixth', Cell: ({ data, ...props }: { data: any }) => <Table.Cell {...props}>{data.label}</Table.Cell> },
	{ key: '7', label: 'Seventh', Cell: ({ data, ...props }: { data: any }) => <Table.Cell {...props}>{data.label}</Table.Cell> }
];

const mockData = [
	{ key: 'item1', name: 'item 1', label: '1' },
	{ key: 'item2', name: 'item 2', label: '2' },
	{ key: 'item3', name: 'item 3', label: '3' },
	{ key: 'item4', name: 'item 4', label: '4' },
	{ key: 'item5', name: 'item 5', label: '5' },
	{ key: 'item6', name: 'item 6', label: '6' },
	{ key: 'item7', name: 'item 7', label: '7' }
]
