import { useForm, type UseFormProps, type FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ZodSchema, TypeOf } from 'zod';

/**
 * A wrapper around react-hook-form's useForm that automatically
 * sets up Zod validation resolver
 *
 * @example
 * const schema = z.object({
 *   email: z.string().email(),
 *   password: z.string().min(8),
 * });
 *
 * const form = useZodForm({
 *   schema,
 *   defaultValues: { email: '', password: '' },
 * });
 *
 * // In your component:
 * <Input
 *   {...form.register('email')}
 *   error={form.formState.errors.email?.message}
 * />
 */
export function useZodForm<TSchema extends ZodSchema>(
  props: Omit<UseFormProps<TypeOf<TSchema>>, 'resolver'> & {
    schema: TSchema;
  }
) {
  const { schema, ...formProps } = props;

  return useForm<TypeOf<TSchema>>({
    ...formProps,
    resolver: zodResolver(schema),
  });
}

// Re-export commonly used types and functions from react-hook-form
export {
  useForm,
  useFormContext,
  useWatch,
  useFieldArray,
  useController,
  Controller,
  FormProvider,
  type UseFormReturn,
  type FieldErrors,
  type SubmitHandler,
  type SubmitErrorHandler,
  type UseFormProps,
  type FieldValues,
  type Path,
  type PathValue,
} from 'react-hook-form';

export { zodResolver } from '@hookform/resolvers/zod';
