import React, { useState, useContext, useEffect } from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Header from "../../../src/components/Header";
import Footer from "../../../src/components/Footer";
import theme from "../../../src/theme/home";
import {
  Container,
  IconButton,
  Button,
  Typography,
  Card,
  CardContent,
  TextField,
  Collapse,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";

import Authenticated from "../../../layout/Authenticated";
import { StateUserContext } from "../../../reducers/user";

import {
  isIndonesianNumber,
  validateEmail,
  normalizeIndonesiaPhoneNumber,
} from "../../../src/helper/validator";

import { postBorrowArchive } from "../../../resources/archive";
import { getArchiveTitle } from "../../../resources/archive";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "32px",
  },
  title: {
    textAlign: "center",
    marginBottom: "16px",
  },
  card: {
    width: "60%",
    marginTop: "32px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  button: {
    marginTop: "16px",
  },
  form: {
    marginTop: "12px",
  },
}));

const Borrow = (props) => {
  const classes = useStyles();

  const { archiveId, token } = props;

  const [phone, setPhone] = useState("");
  const [title, setTitle] = useState("");
  const [errorPhone, setErrorPhone] = useState(false);
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [reason, setReason] = useState("");
  const [errorReason, setErrorReason] = useState(false);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [alertText, setAlertText] = useState("");

  const postNewBorrow = async (idArchive) => {
    try {
      const response = await postBorrowArchive(token, {
        idArchive: idArchive,
        phone,
        email,
        reason,
      });

      if (response.error) {
        setSeverity("error");
        setAlertText("Maaf, terjadi error saat mencatat permohonan Anda!");
        setOpen(true);
      } else {
        setSeverity("success");
        setAlertText("Permohonan Anda sudah tercatat!");
        setOpen(true);
        setPhone("");
        setReason("");
        setEmail("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onChangePhone = (event) => {
    const value = normalizeIndonesiaPhoneNumber(event.target.value);
    setPhone(value);

    if (!isIndonesianNumber(value)) setErrorPhone(true);
    else setErrorPhone(false);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);

    if (!validateEmail(event.target.value)) setErrorEmail(true);
    else setErrorEmail(false);
  };

  const onChangeReason = (event) => {
    setReason(event.target.value);
    if (!event.target.value) setErrorReason(true);
    else setErrorReason(false);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    let valid = true;
    if (!isIndonesianNumber(phone)) {
      setErrorPhone(true);
      valid = false;
    }

    if (!validateEmail(email)) {
      setErrorEmail(true);
      valid = false;
    }

    if (!reason) {
      setErrorReason(true);
      valid = false;
    }

    if (valid) postNewBorrow(archiveId);
  };

  const userState = useContext(StateUserContext);

  const fetchArchiveTitle = async (archiveId) => {
    try {
      const response = await getArchiveTitle(archiveId);
      setTitle(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchArchiveTitle(archiveId);
  }, []);

  console.log(userState.user);

  return (
    <Authenticated token={token}>
      <ThemeProvider theme={theme}>
        <Header user={userState.user} />
        <Container className={classes.container}>
          <Typography variant="h4" className={classes.title}>
            Maaf, Anda tidak memiliki akses untuk arsip tersebut.
          </Typography>
          <Typography variant="h4" className={classes.title}>
            Silahkan hubungi kami dengan melengkapi formulir di bawah.
          </Typography>
          <Card className={classes.card}>
            <div>
              <Collapse in={open}>
                <Alert
                  variant="outlined"
                  severity={severity}
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  {alertText}
                </Alert>
              </Collapse>
            </div>
            <CardContent>
              <Typography className={classes.title}>
                Formulir Permohonan Arsip Digital
              </Typography>
              <Typography variant="h5" component="h2">
                {`Arsip Digital : ${title}`}
              </Typography>
              <TextField
                error={errorPhone}
                label="Nomor Telepon (628XX)"
                fullWidth
                onChange={onChangePhone}
                helperText={errorPhone ? "Nomor telepon tidak valid" : ""}
                value={phone}
                className={classes.form}
              />
              <TextField
                error={errorEmail}
                label="Email"
                fullWidth
                onChange={onChangeEmail}
                helperText={errorEmail ? "Email tidak valid" : ""}
                value={email}
                className={classes.form}
              />
              <TextField
                error={errorReason}
                label="Tujuan Peminjaman Arsip"
                fullWidth
                multiline
                row="4"
                onChange={onChangeReason}
                helperText={errorReason ? "Tujuan tidak boleh kosong" : ""}
                value={reason}
                className={classes.form}
              />
              <Button
                size="small"
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={onSubmit}
              >
                Kirim
              </Button>
            </CardContent>
          </Card>
        </Container>
        <Footer />
      </ThemeProvider>
    </Authenticated>
  );
};

Borrow.getInitialProps = ({ req, query }) => {
  if (req && req.cookies) return { ...query, token: req.cookies.token };
  else return query;
};

export default Borrow;
