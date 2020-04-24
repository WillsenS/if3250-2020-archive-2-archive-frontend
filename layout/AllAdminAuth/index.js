import React from "react";
import { useEffect, useContext } from "react";
import Head from "next/head";
import Router from "next/router";
import { getAuthCheck } from "../../resources/auth";
import { DispatchUserContext, StateUserContext } from "../../reducers/user";

const HIGHEST_ADMIN_ROLE = 1;
const MINIMUM_ADMIN_ROLE = 3; // All admins (except highest) has role number with value minimum 3

const AllAdminAuth = (props) => {
  const { children, title, token, ...rest } = props;

  const userState = useContext(StateUserContext);
  const userDispatch = useContext(DispatchUserContext);

  const doAuth = async () => {
    try {
      const response = await getAuthCheck(token);
      console.log("RESPONSE:", response);
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
        if (
          data.role === HIGHEST_ADMIN_ROLE ||
          data.role >= MINIMUM_ADMIN_ROLE
        ) {
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
        <title>{title || "Archive Digital Information Center ITB"}</title>
      </Head>
      {children}
    </>
  );
};

export default AllAdminAuth;
