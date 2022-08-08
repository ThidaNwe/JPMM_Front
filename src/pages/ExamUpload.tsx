import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import { useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Container, Paper, CssBaseline } from '@mui/material';
import { FormControl, FormGroup, Button } from '@mui/material';
import axios from "axios";
import '../sass/custom/csv.scss';

type data = {
  file: any;
};

const ExamUpload = () => {
  const [response, setResponse] = useState(false);
  const { register, handleSubmit } = useForm<data>({
    mode: "onChange",
  });

  const onSubmit = (data: any) => {
    const header = { headers: { 'Content-Type': 'multipart/form-data' } }
    const formData = new FormData();
    formData.append('file', data.file[0]);
    console.log(formData);
    axios.post(
      'http://localhost:8000/api/v1/upload_examdata', formData
    )
      .then(response => {
        console.log(response.data)
        setResponse(response.data)
      })
  };

  const handleDownload = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    let url = 'http://localhost:8000/api/v1/download-datas'
    axios({
      url: url,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'datas.xlsx');
      document.body.appendChild(link);
      link.click();
    });
  }


  return (
    <div className='csvupload-sec'>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box className="csv-page">
          <div className="sec-title">
            <h2 className="Pacifico-Regular">Exam  Upload</h2>
          </div>
          <Container maxWidth="sm">
            <Box component={Paper} elevation={3}>
              <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className='form'>
                <FormControl fullWidth>
                  <Input type="file"
                    id='contained-button-file'
                    multiple
                    {...register("file")}
                  />
                  <label htmlFor="contained-button-file" className="upload-label">Choose Files</label>
                </FormControl>
                <FormControl className='upload'><Button
                  type="submit"
                  variant="contained"
                  id="add-btn">Upload
                </Button></FormControl>
                <FormControl fullWidth>
                  <FormGroup>
                    <Button type="reset" variant="outlined" id="cancel-btn"><div className="cancel-txt">Cancel</div></Button>


                    <Button
                      type="submit"
                      variant="contained"
                      onClick={handleDownload}
                      id="add-btn">Download
                    </Button>
                  </FormGroup>
                </FormControl>
                {response ? <p className='complete-txt'>ExamData Imported Successfully</p> : null}
              </form>
            </Box>
          </Container>
        </Box>
      </ThemeProvider>
    </div>
  );
};

// Style Css Codes
const Input = styled('input')({
  display: 'block',
  width: '100%',
  padding: '0.594rem 0.75rem',
  fontSize: '1rem',
  fontFamily: 'inherit',
  color: '#212529',
  outline: 'none',
  cursor: 'pointer',
  backgroundColor: '#FFF',
  borderRadius: '0.25rem',
  transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
});

const theme = createTheme({
  typography: {
    h2: {
      marginBottom: '30px',
      fontSize: '1.5rem',
      fontWeight: '400',
      lineHeight: '1.334',
      letterSpacing: '0',
      textAlign: 'center',
      color: 'rgba(118,127,213)',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ".MuiBox-root": {
          ".MuiBox-root": {
            padding: '40px',
            margin: '38% 0',
            ".MuiFormControl-root": {
              marginBottom: '25px',
              "&:first-of-type": {
                borderRadius: '0.25rem',
                border: '1px solid rgba(0, 0, 0, 0.23)',
              },
              "&:last-of-type": {
                marginBottom: '0',
              },
              "label": {
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                padding: '0 0.91rem',
                cursor: 'pointer',
                borderRight: '1px solid #ced4da',
                background: '#e9ecef'
              },
              ".MuiFormGroup-root": {
                justifyContent: 'space-between',
                flexDirection: 'unset',
                ".MuiButton-root": {
                  width: '100px',
                  padding: '8px 16px',
                },
              },
            },
          },
        },
      },
    },
  },
});

export default ExamUpload;