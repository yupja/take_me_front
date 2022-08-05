import React from "react";
import styled from "styled-components";

import { ReactComponent as Check } from "../../assets/icons/Check.svg";

const UserModalForm = (props) => {
  const { open, close, header, footer } = props;

  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <ModalWrap>
          <ModalBox>
            <div className={header === "icon" ? 'icon' : 'hidden'}><Check /></div>
            <h1 className={header === "icon" ? 'hidden' : ''}>{header}</h1>
            <CloseBtn onClick={close}>
              <span></span>
              <span></span>
            </CloseBtn>
            <div className={header === "icon" ? '' : 'cont'}>{props.children}</div>
            <button className="change" onClick={close}>{footer}</button>
          </ModalBox>
        </ModalWrap>
      ) : null}
    </div>
  );
}

export default UserModalForm;

const ModalWrap = styled.div`
width: 100%;
height: 100%;
padding: 0 25px;
position: absolute;
top: 0; left: 0;
background: rgba(0,0,0,0.7);
z-index: 999;
`
const ModalBox = styled.div`
position: absolute;
top: 50%; left: 50%;
transform: translate(-50%,-50%);
width: 90%;
height: 11.5rem;
background: #fff;
border-radius: 5px;
overflow: hidden;
text-align : center;

h1 {
  font-size: 1.25rem;
  font-weight: 700;
  text-align: center;
  line-height:62px;
}
 h3 {
  font-size: 1.5rem;
  padding: ${header => header === "icon" ? "20px 0 24px" : "20px 0"};
  white-space: pre-wrap;
 }
 div.cont{
  position: relative;
  margin: 0 10px;
  padding: 15px 0;
  border-bottom : 1px solid #ddd;
  button{
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    width: 4.43rem;
    text-align: center;
    color: #999;
    padding: 3px 5px;
    font-weight: 500;
    font-size: 0.875rem;
    border: 1px solid #dbdbdb;
    border-radius: 3.12rem;
  }
}
.icon {
  width: 2.5rem;
  height: 2.5rem;
  margin:  10px auto 0;
  svg {
    width: 40px;
    height: 40px;
  }
  path {
    fill:#26DFA6;
  }
 }
 input {
  width: 75%;
  background : none;
  border: none;
  text-align: center;
 }
 input:focus{
  outline:none;
 }
 button.change {
  font-size:0.93rem;
  font-weight: 700;
  color: #fff;
  width: 100%;
  background: #26DFA6;
  padding: 16px 0;
  position: absolute;
  bottom: 0; left: 0;
 }
 .hidden{
  display: none;
}
`

const CloseBtn = styled.div`
width:15px;
height: 15px;
position:absolute;
top: 13px; right: 5%;

span {
  display:block;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width:100%;
  height:1px;
  background-color: #999999;
}
span:first-child{
  transform: rotate(45deg) translateX(0%);
  }
span:last-child{
  transform: rotate(135deg) translateX(0%);
  }
`;
