import { FormControl, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { categoryState, toDoState } from '../atoms';

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue('toDo', '');
  };
  return (
    <>
      <FormControl
        component='form'
        sx={{ display: 'flex', flexDirection: 'row' }}
        onSubmit={handleSubmit(onValid)}
      >
        <TextField
          required
          id='outlined-required'
          label='Required'
          placeholder='Write a to do (ENTER)'
          {...register('toDo', { required: 'Please write a To Do' })}
        />
      </FormControl>
    </>
  );
}

export default CreateToDo;
