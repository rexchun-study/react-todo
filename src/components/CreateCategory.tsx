import { Alert, FormControl, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { newCategory } from '../atoms';

interface IForm {
  category: string;
}

function CreateCategory() {
  const setCategories = useSetRecoilState<string[]>(newCategory);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<IForm>();
  const onValid = ({ category }: IForm) => {
    setCategories((oldCategories) => {
      if (
        oldCategories.find(
          (oldCategory) => oldCategory === category.toUpperCase()
        )
      ) {
        setError(
          'category',
          { message: 'A category is duplicated' },
          { shouldFocus: true }
        );
        return [...oldCategories];
      }
      setError(
        'category',
        { message: 'A category makes completed' },
        { shouldFocus: true }
      );
      return [...oldCategories, category.toUpperCase()];
    });
    setValue('category', '');
  };
  return (
    <>
      <FormControl
        component='form'
        sx={{ display: 'flex', flexDirection: 'row', mb: 1 }}
        onSubmit={handleSubmit(onValid)}
      >
        <TextField
          sx={{ width: '200px' }}
          variant='standard'
          label='New Category'
          placeholder='Write a category (ENTER)'
          {...register('category', { required: 'Please write a category' })}
        />
      </FormControl>
      {errors?.category?.message?.endsWith('duplicated') ? (
        <Alert severity='error'>{errors?.category?.message}</Alert>
      ) : errors?.category?.message ? (
        <Alert severity='success'>{errors?.category?.message}</Alert>
      ) : null}
    </>
  );
}

export default CreateCategory;
