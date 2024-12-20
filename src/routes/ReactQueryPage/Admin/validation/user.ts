import * as yup from 'yup';

export const UserSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
});
