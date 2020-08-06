import { useEffect, useState, useCallback, useRef } from 'react';
import cons from '../constants';
import base from '../base';

const rootRef = base.database().ref();

export const useFetchList = ({ initFilter, initPageInfo, isFetchListAtMount = true }) => {
  const [filter, setFilter] = useState(initFilter);
  const [list, setList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState(initPageInfo);
  const refIsFetchListAtMount = useRef(isFetchListAtMount);

  const fetchList = useCallback(
    ({ paramFilter = initFilter, paramPageInfo = initPageInfo } = {}) => {
      setIsLoading(true);

      rootRef.on(
        'value',
        function (snapshot) {
          // console.log('debugger:', snapshot.val());
          let list = [];
          let total = 0;

          if (snapshot.val()) {
            const members = snapshot.val();
            list = Object.keys(members)
              .map(key => ({
                id: key,
                ...members[key]
              }))
              .sort((a, b) => {
                return b.updateTime - a.updateTime;
              });
            total = list.length;
          }

          const { current, pageSize } = paramPageInfo;

          setList(list);
          setFilter({ ...paramFilter });
          setPageInfo({ current, pageSize, total });
          setIsLoading(false);
        },
        function (errorObject) {
          console.warn({ msg: cons.FETCH_LIST_FAIL, code: errorObject.code });
          setIsLoading(false);
        }
      );
    },
    [initFilter, initPageInfo]
  );

  const onTableChange = useCallback(
    tableInfo => {
      const { current, pageSize } = tableInfo;
      setPageInfo(prevPageInfo => ({ ...prevPageInfo, current, pageSize }));

      fetchList({
        paramFilter: { ...filter },
        paramPageInfo: {
          current,
          pageSize
        }
      });
    },
    [fetchList, filter]
  );

  const reset = useCallback(
    ({ initFilter, initPageInfo, isFetchListAtMount }) => {
      setList(null);
      setFilter(initFilter);
      setPageInfo(initPageInfo);
      refIsFetchListAtMount.current = isFetchListAtMount;

      if (refIsFetchListAtMount.current) {
        fetchList({
          paramFilter: { ...initFilter },
          paramPageInfo: { ...initPageInfo }
        });
      }
    },
    [fetchList]
  );

  useEffect(() => {
    if (refIsFetchListAtMount.current) {
      fetchList();
    }
  }, [fetchList]);

  return [isLoading, list, pageInfo, onTableChange, reset];
};

export const usePopupModal = () => {
  const [isShow, setIsShow] = useState(false);
  const [data, setData] = useState();

  const onUpdate = useCallback(record => {
    console.log('record', record);
    setData(record);
    setIsShow(true);
  }, []);

  return [isShow, onUpdate, data];
};
