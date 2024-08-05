import { useDataTable } from "../hooks/use-data-table";
import { Table } from "./table";

export const TableExample = (() => {
	const dataTable = useDataTable({ key: 'gilitz-table', columns: tableColumns, saveLayoutView: true, isStickyHeader: false })
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
	{ key: 'item7', name: 'item 7', label: '7' },	
	{ key: 'item8', name: 'item 8', label: '8' },
	{ key: 'item9', name: 'item 9', label: '9' },
	{ key: 'item10', name: 'item 10', label: '10' },
	{ key: 'item11', name: 'item 11', label: '11' },
	{ key: 'item12', name: 'item 12', label: '12' },
	{ key: 'item13', name: 'item 13', label: '13' },
	{ key: 'item14', name: 'item 14', label: '7' },
]
