import * as yup from 'yup';

export const TodoSchema = yup.object().shape({
  title: yup.string().required(),
  completed: yup.boolean(),
  userId: yup.number().required(),
});
