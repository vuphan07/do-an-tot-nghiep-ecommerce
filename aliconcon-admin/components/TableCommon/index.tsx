import React, { ReactNode } from 'react';
import { Button, Empty, Row, Space, Table, TableProps } from 'antd';
import { DEFAULT_PAGE_SIZE, NO_DATA, PAGE_SIZE_OPTIONS } from '../../constants';
import clsx from 'clsx';

import styles from './style.module.less';

export type TableCommonType = Omit<TableProps<any>, 'title'> & {
  title?: string;
  actionBtns?: ReactNode;
  rightAdditionBtn?: ReactNode;
  isPagination?: boolean;
  subClass?: string;
  textTotal?: string;
  nameTable?: string;
  onDelete?: () => void;
  onAdd?: () => void;
};

const TableCommon = ({
  title = '',
  isVisibleAreaButton = true,
  isAreaButton = true,
  isPagination = true,
  actionBtns = undefined,
  rightAdditionBtn = undefined,
  disableDeleteBtn = false,
  subClass = '',
  textTotal = '',
  nameTable = '',
  ...rest
}) => {
  const NONE_DISPLAY_TEXT = '';
  const pagination = {
    defaultPageSize: DEFAULT_PAGE_SIZE,
    pageSizeOptions: PAGE_SIZE_OPTIONS,
    showSizeChanger: true,
    locale: { items_per_page: NONE_DISPLAY_TEXT },
  };
  return (
    <>
      <Row className="mt4 justify-between">
        <div>
          {nameTable ? (
            <span className={styles.nameTable}>{nameTable}</span>
          ) : (
            <span className="fw7">{textTotal && `Tổng: ${textTotal}`}</span>
          )}
        </div>
        {rightAdditionBtn && rightAdditionBtn}
      </Row>
      <div className="mt4">
        {isPagination ? (
          <Table
            className={clsx(styles.table, 'cell', subClass)}
            pagination={{ ...pagination, ...rest.pagination }}
            {...rest}
            locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={NO_DATA} /> }}
          />
        ) : (
          <Table
            className={clsx(styles.table, 'cell', subClass)}
            {...rest}
            pagination={false}
            locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={NO_DATA} /> }}
          />
        )}
      </div>
    </>
  );
};

export default TableCommon;
