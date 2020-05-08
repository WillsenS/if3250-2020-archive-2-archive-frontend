import React from "react";
import { useEffect, useContext } from "react";
import Head from "next/head";
import Router from "next/router";
import { getAuthCheck } from "../../resources/auth";
import { DispatchUserContext, StateUserContext } from "../../reducers/user";

const HIGHEST_ADMIN_ROLE = 1;

const HighestAdminAuth = (props) => {
  const { children, title, token, ...rest } = props;

  const userState = useContext(StateUserContext);
  const userDispatch = useContext(DispatchUserContext);

  const doAuth = async () => {
    try {
      const response = await getAuthCheck(token);
      if (response.error) {
        switch (response.error.code) {
          case 401:
            Router.push("/login");
            break;
          case 403:
            Router.push("/login");
            break;
        }
      } else {
        const { data } = response;
        if (data.role === HIGHEST_ADMIN_ROLE) {
          userDispatch({
            type: "set_user",
            payload: data,
          });
        } else {
          Router.push("/");
        }
      }
    } catch (e) {
      // setError('Error during contacting the server, please restart your page');
    }
  };

  useEffect(() => {
    doAuth();
  }, []);

  if (!userState.user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>
          {title || "Sistem Informasi Arsip Digital Statis (SIAGA) ITB"}
        </title>
      </Head>
      {children}
    </>
  );
};

export default HighestAdminAuth;
