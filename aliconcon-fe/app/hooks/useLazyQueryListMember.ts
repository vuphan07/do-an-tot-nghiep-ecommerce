import { useState } from 'react';
import MemberStatusEnum from '../../interfaces/enums/MemberStatus';
import http from '../api/axiosCustom';

export type QueryListMemberFilter = {
  limit?: number;
  status?: string;
  searchKey?: string;
  page?: number;
};

const useLazyQueryListMember = (
  defaultFilter: QueryListMemberFilter = { limit: 20, status: MemberStatusEnum.ACTIVE.toString(), page: 1 },
) => {
  const [data, setData] = useState<any>();
  const [pagination, setPagination] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (filter) => {
    try {
      setLoading(true);
      const { searchKey, status, ...filters } = filter;
      const result = await http.get(`/api/users?email[regex]=${searchKey}&status[eq]=${status}`, {
        params: filters,
      });
      setData((result as any)?.data || []);
      setPagination((result as any)?.data?.meta || {});
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  return { data, loading, pagination, fetchData, error };
};

export default useLazyQueryListMember;
