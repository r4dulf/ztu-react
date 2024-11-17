import { useForm } from 'react-hook-form';
import { ValidationError } from 'yup';
import { FormFieldWrapper } from '../../components/FormFieldWrapper';
import { tShirtSizes } from './constants';
import { TShirtOrderData, tShirtOrderSchema } from './validation';

export const ReactHookFormPage = () => {
  const { register, handleSubmit, setFocus, resetField, reset, watch, formState } = useForm<Partial<TShirtOrderData>>();

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
          error={formState.errors.name?.message}
        >
          <input
            type='text'
            placeholder='Name'
            {...register('name', {
              validate: (value) =>
                tShirtOrderSchema
                  .validateAt('name', { name: value })
                  .then(() => true)
                  .catch((error) => error.message),
            })}
          />
        </FormFieldWrapper>

        <FormFieldWrapper
          isRequired={false}
          label='Shirt size'
          onReset={sizeValue ? () => resetField('size') : undefined}
        >
          {tShirtSizes.map((size) => (
            <label key={size} className='radio-label'>
              <input type='radio' key={size} {...register('size', {})} value={size} />
              <span>{size}</span>
            </label>
          ))}
        </FormFieldWrapper>

        <FormFieldWrapper label='T-Shirt Preview'>
          <img src='https://via.placeholder.com/200' alt='T-Shirt Preview' />
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
