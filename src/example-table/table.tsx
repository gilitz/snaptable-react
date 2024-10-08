import { ReactNode } from "react";
// @ts-expect-error
import styled, { css, StyledComponent } from 'styled-components';
import { SnapTable } from "../table/table";
import { SnapTableType } from "../types/table-type";

const HeaderStyle = css`
	height: 68px;
	padding: 4px 16px;
	text-align: left;
	color: var(--color-text-secondary);
	overflow: hidden; 
	position: relative;
	border: 1px solid #333333;
	background-color: #1e2a39;
	border-top: none;

	&:first-of-type {
		border-left: none;
	}

	&:last-of-type {
		border-right: none;
	}
	
	&[data-drag-hovered] {
		background-color: #38485b;
	}
`;

const Header = css`
	.header-cell-class {
		${HeaderStyle};
	}
`;

const NestedHeaderCell = css`
	.nested-header-cell {
		${HeaderStyle};
		height: 40px;
		font-size: 14px;
	}
`;


const Cell = css`
	.cell-class {	
		height: 56px;
		padding: 4px 16px;
		border: 1px solid #333333;

		&:first-of-type {
			border-left: none;
		}

		&:last-of-type {
			border-right: none;
		}
	}	
`;

const TableCss = css`
	.table-class {	
		background-color: #202020;
	}	
`;

const TableContainerClass = css`
	&.table-container-class {	
		border: 1px solid #333333;;
	}	
`;

const Td: StyledComponent<'td', any, {}, never> = styled.td`
	height: 56px;
	padding: 4px 16px;
	border: 1px solid var(--color-gray-80);
`;

export const Table: React.FC<{ children?: ReactNode } & SnapTableType> & {
	Cell: typeof Td;
} = styled((props: any) => {
	return <SnapTable {...props} tableContainerClass="table-container-class" tableClass='table-class' cellClass='cell-class' headerCellClass='header-cell-class' nestedHeaderCellClass="nested-header-cell"/>
})`
	${TableContainerClass};
	${TableCss};
	${Header};
	${NestedHeaderCell};
	${Cell};
`;

Table.Cell = styled.td``;
