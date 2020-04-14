import React from "react";
import { useEffect, useContext } from "react";
import Head from "next/head";
import { getAuthCheck } from "../resources/auth";
import { DispatchUserContext } from "../reducers/user";

const Layout = (props) => {
  const { children, title, token, ...rest } = props;

  const userDispatch = useContext(DispatchUserContext);

  const doAuth = async () => {
    try {
      const response = await getAuthCheck(token);
      if (!response.error) {
        const { data } = response;
        userDispatch({
          type: "set_user",
          payload: data,
        });
      }
    } catch (e) {
      // setError("Error during contacting the server, please restart your page");
    }
  };

  useEffect(() => {
    doAuth();
  }, []);

  return (
    <>
      <Head>
        <title>{title || "Archive Digital Information Center ITB"}</title>
      </Head>
      {children}
    </>
  );
};

export default Layout;
