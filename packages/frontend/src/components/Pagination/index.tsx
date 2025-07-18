import React from "react";
import { Pagination as AntPagination } from "antd";

export interface PaginationCountsInterface {
  perPage: number;
  page: number;
  totalCount: number;
}

export interface PaginationInterface extends PaginationCountsInterface {
  className?: string;
  disabled?: boolean;
  onChange: (page: number) => void;
}

function Pagination({ className, disabled, perPage, page, totalCount, onChange }: PaginationInterface) {
  const handleChange = React.useCallback((page: number) => onChange(page), [onChange]);
  return (
    <AntPagination
      rootClassName={className}
      disabled={disabled}
      pageSize={perPage}
      current={page}
      total={totalCount}
      showSizeChanger={false}
      onChange={handleChange}
    />
  );
}

export default React.memo(Pagination);
