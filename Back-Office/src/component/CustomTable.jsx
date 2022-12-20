import React from 'react';
import { useTable, usePagination } from 'react-table';

export default function Table({ columns, data }) {
  // Use the useTable hook to create the table configuration
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  // Render the UI for your table
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageCount}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{
            ' '}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: '100px' }}
            />
          
        </span>{' '}
        <select

          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }
          }
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}


// class MyTable extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       currentPage: 1,
//       itemsPerPage: 10
//     };
//   }

//   handlePageChange = (pageNumber) => {
//     this.setState({ currentPage: pageNumber });
//   }

//   handleItemsPerPageChange = (event) => {
//     this.setState({ itemsPerPage: event.target.value });
//   }

//   render() {
//     const { data } = this.props;
//     const { currentPage, itemsPerPage } = this.state;

//     // Determine which items to display on the current page
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const displayedData = data.slice(startIndex, startIndex + itemsPerPage);

//     return (
//       <div>
//         <table>
//           {/* Render the table rows here */}
//         </table>
//         <Pagination
//           currentPage={currentPage}
//           itemsPerPage={itemsPerPage}
//           onPageChange={this.handlePageChange}
//           onItemsPerPageChange={this.handleItemsPerPageChange}
//           totalItems={data.length}
//         />
//       </div>
//     );
//   }
// }
