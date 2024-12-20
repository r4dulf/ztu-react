import { useForm } from 'react-hook-form';
import { ValidationError } from 'yup';
import { FormFieldWrapper } from '../../components/FormFieldWrapper';
import { tShirtSizes } from './constants';
import { TShirtOrderData, tShirtOrderSchema } from './validation';
import { yupResolver } from '@hookform/resolvers/yup';

export const ReactHookFormPage = () => {
  const {
    register,
    handleSubmit,
    setFocus,
    resetField,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(tShirtOrderSchema),
  });

  const onSubmit = async (data: Partial<TShirtOrderData>) => {
    try {
      const values = await tShirtOrderSchema.validate(data);

      console.log(JSON.stringify(values, null, 2));
    } catch (error) {
      if (error instanceof ValidationError) {
        setFocus(error.path as keyof TShirtOrderData);
      }
    }
  };

  const sizeValue = watch('size');

  return (
    <div className='screen react-hook-form'>
      <h2>T-Shirt Sign Up</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormFieldWrapper
          isRequired={true}
          label='Name'
          onReset={() => resetField('name')}
          error={errors.name?.message}
        >
          <input type='text' placeholder='Name' {...register('name')} />
        </FormFieldWrapper>

        <FormFieldWrapper
          isRequired={false}
          label='Shirt size'
          onReset={sizeValue ? () => resetField('size') : undefined}
        >
          <div className='t-shirt-sizes-wrapper'>
            {tShirtSizes.map((size) => (
              <label key={size} className='radio-label'>
                <input type='radio' key={size} {...register('size')} />
                <span>{size}</span>
              </label>
            ))}
          </div>
        </FormFieldWrapper>

        <FormFieldWrapper label='T-Shirt Preview'>
          <img src='https://placehold.co/600x400' alt='T-Shirt Preview' />
        </FormFieldWrapper>

        <FormFieldWrapper isRequired={false} label='Other thoughts or comments'>
          <textarea {...register('comment')} placeholder='Comment' />
        </FormFieldWrapper>

        <div className='action-row'>
          <button type='submit' className='submit'>
            Send
          </button>

          <button className='reset' onClick={() => reset()}>
            Clear form
          </button>
        </div>
      </form>
    </div>
  );
};
