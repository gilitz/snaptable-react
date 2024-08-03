import { Table as SmartTable, TableProps } from "../table/table";
import { ReactNode } from "react";
// @ts-expect-error
import styled, { css, StyledComponent } from 'styled-components';

const Header = css`
	.header-cell-class {
		height: 60px;
		padding: 4px 0 4px 16px;
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
		background-color: var(--color-container-background);
	}	
`;

const TableContainerClass = css`
	&.table-container-class {	
		border: 1px solid #333333;;
		/* border-top-right-radius: var(--border-radius-default);
		border-top-left-radius: var(--border-radius-default); */
	}	
`;

const Td: StyledComponent<'td', any, {}, never> = styled.td`
	height: 56px;
	padding: 4px 16px;
	border: 1px solid var(--color-gray-80);
`;

export const Table: React.FC<{ children?: ReactNode } & TableProps> & {
	Cell: typeof Td;
} = styled((props: any) => {
	return <SmartTable {...props} tableContainerClass="table-container-class" tableClass='table-class' cellClass='cell-class' headerCellClass='header-cell-class' />
})`
	${TableContainerClass};
	${TableCss};
	${Header};
	${Cell};
`;

Table.Cell = styled.td``;
