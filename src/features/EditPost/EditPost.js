import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import styles from "./EditPost.module.css";
import { updatePostByIdTC } from '../MainPage/posts-reducer'
import { useFormik} from "formik";
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import { font } from '../../app/App';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

export function EditPost() {
  const navigate = useNavigate();

  const location = useLocation();
  const dispatch = useDispatch()
  const initialPost = location.state?.post || { title: "", content: "" };
  const [post, setPost] = useState(initialPost);
  const { id } = useParams()

  const formik = useFormik({
    initialValues: {
      title: post.title || '',
      content: post.content || ''
    }, validate: (values) => {
      const errors = {};

      if (!values.title) {
        errors.title = "Title is required";
      } else if (values.title.length < 5) {
        errors.title = "Title must be at least 5 symbols";
      }

      if (!values.content) {
        errors.content = "Post message is required";
      } else if (values.content.length < 10) {
        errors.content = "Post must be at least 10 symbols";
      }
      return errors
    },
    onSubmit: values => {
      console.log(values)
      dispatch(updatePostByIdTC(id,values.title, values.content))
      formik.resetForm();
      navigate(`/post/${id}`);
    }

  })
  return (
    <div className={styles.container}>
      <h2>Edit Post</h2>
      <form onSubmit={formik.handleSubmit} >
        <FormControl sx={{ width: '500px' }}>
          <FormGroup>
            <TextField
              error={
                Boolean(formik.errors.title && formik.touched.title)
              }
              helperText={
                formik.errors.title &&
                formik.touched.title &&
                String(formik.errors.title)
              }
              sx={{ width: '500px' }}
              label="Title"
              type="text"
              margin="normal"
              {...formik.getFieldProps('title')}
              inputProps={{ style: { fontFamily: font } }}
              InputLabelProps={{ style: { fontFamily: font } }}
            />
            <TextField
              id="filled-multiline-static"
              label="Content"
              multiline
              rows={4}
              variant="filled"
              error={
                Boolean(formik.errors.content && formik.touched.content)
              }
              helperText={
                formik.errors.content && formik.touched.content &&
                String(formik.errors.content)
              }
              {...formik.getFieldProps('content')}
              inputProps={{ style: { fontFamily: font } }}
              InputLabelProps={{ style: { fontFamily: font } }}
            />
            <Button className='button' type={'submit'} variant={'contained'} color={'primary'}>
              Save
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </div>
  );

}
