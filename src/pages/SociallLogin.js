import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '../store/modules/cookie';


function SociallLogin() {
  const navigator = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const url = new URL(window.location.href);

    const accessToken = params.get('Authorization')
    const refreshToken = url.search.split('&')[1].split('=')[1]

    localStorage.setItem("accessToken", accessToken);
    setCookie('refreshToken', refreshToken, {
      path: "/",
      secure: true,
      sameSite: 'none',
    })
    navigator('/');
  }, [navigator]);
  return <div>테스트</div>;
};


export default SociallLogin;