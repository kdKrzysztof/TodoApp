import type { AxiosResponse } from 'axios';
import { useEffect } from 'react';
import type { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { getNewRefreshToken } from 'src/utils/getNewRefreshToken';

interface GetNewRefershTokenParams {
  isError: boolean;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<AxiosResponse<any, any>, unknown>>;
}

const useGetNewRefreshToken = ({ isError, refetch }: GetNewRefershTokenParams) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (isError) {
      (async () => {
        const result = await getNewRefreshToken();
        if (result === false) {
          sessionStorage.clear();
          navigate('/login');
        }
        refetch();
      })();
    }
  }, [isError]);
};

export default useGetNewRefreshToken;
