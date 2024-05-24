import { useMemo } from "react";
import _ from "lodash";

export const useCreateSelectOptions = <T,>(
  data: T[] | undefined,
  labelKey: string,
  valueKey: string,
) =>
  useMemo(() => {
    if (!data) return [];
    return data.map((row) => ({
      label: _.get(row, labelKey),
      value: _.get(row, valueKey),
    }));
  }, [data]);
