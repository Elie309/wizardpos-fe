type PagerProps = {
    perPage: number;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

const Pager: React.FC<PagerProps> = ({ currentPage, totalPages, onPageChange }) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            const newPage = currentPage - 1;
            onPageChange(newPage);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            const newPage = currentPage + 1;
            onPageChange(newPage);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5;
        const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);
        let startPage = Math.max(1, currentPage - halfMaxPagesToShow);
        let endPage = Math.min(totalPages, currentPage + halfMaxPagesToShow);

        if (currentPage <= halfMaxPagesToShow) {
            endPage = Math.min(totalPages, maxPagesToShow);
        } else if (currentPage + halfMaxPagesToShow >= totalPages) {
            startPage = Math.max(1, totalPages - maxPagesToShow + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button key={i} onClick={() => onPageChange(i)} disabled={i === currentPage}>
                    {i}
                </button>
            );
        }

        return pageNumbers;
    };

    return (
        <div className="pager">
            <button onClick={handlePrevious} disabled={currentPage === 1}>
                Previous
            </button>
            {renderPageNumbers()}
            <button onClick={handleNext} disabled={currentPage === totalPages}>
                Next
            </button>
        </div>
    );
};

export default Pager;