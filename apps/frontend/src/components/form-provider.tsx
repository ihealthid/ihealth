import { UseFormReturnType, useForm } from "@mantine/form";
import { MutationDefinition } from "@reduxjs/toolkit/query";
import {
  MutationTrigger,
  UseMutation,
} from "node_modules/@reduxjs/toolkit/dist/query/react/buildHooks";
import { ReactNode, useEffect } from "react";
import { FormEncType, useNavigate } from "react-router-dom";

interface FormProviderProps<TInput, TResult> {
  children: (
    form: UseFormReturnType<TInput, (values: TInput) => TInput>,
    mutate: MutationTrigger<MutationDefinition<TInput, any, any, any>>
  ) => ReactNode;
  useMutate: UseMutation<MutationDefinition<TInput, any, any, any>>;
  onSuccess?: (res: TResult) => void;
  initialValues?: Partial<TInput>;
  encType?: FormEncType;
}

export const FormProvider = <TInput, TResult extends Record<string, any>>({
  children,
  useMutate,
  onSuccess,
  initialValues,
  encType,
}: FormProviderProps<TInput, TResult>) => {
  const navigate = useNavigate();
  const form = useForm<TInput>({
    initialValues,
  });
  const [mutate, { isSuccess, data }] = useMutate();

  useEffect(() => {
    if (isSuccess) {
      onSuccess?.(data);
    }
  }, [isSuccess, navigate, onSuccess, data]);

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        mutate(values);
      })}
      encType={encType}
    >
      {children(form, mutate)}
    </form>
  );
};
