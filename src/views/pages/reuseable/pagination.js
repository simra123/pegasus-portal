import ReactPaginate from "react-paginate";
const SeparatedPagination = ({ total, currentPage, handlePagination }) => {
	return (
		<div>
			<ReactPaginate
				pageCount={total}
				nextLabel={""}
				breakLabel={"..."}
				pageRangeDisplayed={2}
				marginPagesDisplayed={3}
				onPageChange={(page) => handlePagination(page)}
				activeClassName={"active"}
				pageClassName={"page-item"}
				previousLabel={""}
				nextLinkClassName={"page-link"}
				nextClassName={"page-item next-item"}
				previousClassName={"page-item prev-item"}
				previousLinkClassName={"page-link"}
				pageLinkClassName={"page-link"}
				breakClassName='page-item'
				breakLinkClassName='page-link'
				containerClassName={
					"pagination react-paginate justify-content-end mt-2"
				}
			/>
		</div>
	);
};
export default SeparatedPagination;
