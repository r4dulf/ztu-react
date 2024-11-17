import { object, string, StringSchema } from 'yup';
import { tShirtSizes } from './constants';

const onlyAlphabetsWithSpaces = /^[a-zA-Z\s]*$/;
const lowercase = /[a-z]/;

export type TShirtOrderData = {
  name: string;
  size: string;
  comment: string;
};

export const tShirtOrderSchema = object<
  TShirtOrderData,
  {
    name: StringSchema<string | undefined>;
    size: StringSchema<string | null | undefined>;
    comment: StringSchema<string | null | undefined>;
  }
>({
  name: string()
    .trim()
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must be at most 50 characters')
    .test({
      name: 'name',
      message: 'Name is required',
      test: (value, ctx) => {
        if (!value?.trim()) return false;

        if (!onlyAlphabetsWithSpaces.test(value)) {
          return ctx.createError({ path: 'name', message: 'Name must contain only alphabets and spaces' });
        }

        if (lowercase.test(value.trim()[0])) {
          return ctx.createError({ path: 'name', message: 'Name must start with an uppercase letter' });
        }

        return true;
      },
    }),
  size: string().nullable().oneOf(tShirtSizes, 'Selected size is not available'),
  comment: string().nullable().trim().max(500, 'Comment must be at most 500 characters'),
});
