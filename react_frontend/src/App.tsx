import React from 'react';

import { useRecoilValue } from 'recoil';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import { darkTheme, lightTheme } from './theme'
import { isDarkAtom } from './atoms/settingState';

import Header from './Components/Header';
import Footer from './Components/Footer';
import MainContents from './Contents/MainContents';
import Login from './Contents/Users/Login';
import UserInfo from './Contents/Users/UserInfo';
import Signup from './Contents/Users/Signup';
import UsersManage from './Contents/Manager/UsersManage';

const BodyConteiner = styled.div`
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  max-height: 100%;
  background-color: ${(prop)=> prop.theme.bgColor};
  color: ${(prop) => prop.theme.textColor};
  display: flex;
  flex-direction: column;  
  flex-wrap: wrap;
  overflow:hidden;
`;

const HeaderConteiner = styled.div`
  height: 5%;
  width: 100%;
  background-color: ${prop=> prop.theme.bgColor}; 
`;
const MainConteiner = styled.div`
  height: 90%;
  width: 100%;
  background-color: ${prop=> prop.theme.contentBgColor}; 
`;
const FooterConteiner = styled.div`
  height: 5%;
  width: 100%;
  background-color: ${prop=> prop.theme.bgColor}; 
`;

function App() {
  const isDark = useRecoilValue(isDarkAtom)
  return (
    <>
      <ThemeProvider theme={isDarkAtom ? darkTheme: lightTheme}>
        <BrowserRouter>
          <BodyConteiner>

            <HeaderConteiner>
              <Header/>
            </HeaderConteiner>

            <MainConteiner>            
                <Routes>
                  <Route path="/" element={<MainContents />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/userinfo" element={<UserInfo />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/manager" element={<UsersManage />} />
                </Routes>                      
            </MainConteiner>

            <FooterConteiner>
              <Footer/>
            </FooterConteiner>

          </BodyConteiner>
        </BrowserRouter> 
      </ThemeProvider>
    </>    
  );
}

export default App;
