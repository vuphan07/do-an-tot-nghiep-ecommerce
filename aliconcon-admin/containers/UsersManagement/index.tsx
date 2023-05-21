import React, { useEffect, useState } from 'react';
import useLazyQueryListMember from '../../app/hooks/useLazyQueryListMember';
import UsersManagement from '../../components/UsersManagement';
import { DEFAULT_PAGE_SIZE } from '../../constants';
import MemberStatusEnum from '../../interfaces/enums/MemberStatus';

type Props = {};

const Index = (props: Props) => {
  const [param, setParam] = useState<any>({
    page: 1,
    limit: DEFAULT_PAGE_SIZE,
    searchKey: '',
    status: '',
  });
  const { data, loading, pagination, fetchData, error } = useLazyQueryListMember(param);
  useEffect(() => {
    fetchData(param);
  }, [param]);

  const handleFilter = (value) => {
    const dataFilter = { searchKey: value.name, status: value.status };
    setParam({ ...param, page: 1, ...dataFilter });
  };

  const onTableChange = (pagination, extra) => {
    if (extra.action === 'paginate') {
      setParam((currentParams) => ({
        ...currentParams,
        limit: pagination.pageSize,
        page: pagination.current,
      }));
    }
  };

  return (
    <UsersManagement
      data={data?.items}
      onFilter={handleFilter}
      loading={loading}
      onChange={(pagination, _, __, extra) => {
        onTableChange(pagination, extra);
      }}
      pagination={{
        pageSize: param.limit,
        current: param.page,
        total: data?.pagination?.totalItems || 0,
      }}
    />
  );
};

export default Index;
