import styled from 'styled-components';

export const AuthWrap = styled.div`
  width: 100%;
  height: 100vh;
  padding-left: 256px;

  @media (max-width: 768px) {
    padding-left: 0;
  }
`;

export const AuthInner = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContentWrap = styled.div`
  width: 85%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

export const ContentTitle = styled.img`
  height: 82px;
  margin-bottom: 24px;
`;

export const ContentInputWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export const ContentInputBox = styled.div`
  width: 100%;
  height: 48px;
  position: relative;
  display: flex;
  gap: 12px;
  align-items: center;
  background-color: #2f3136;
  padding: 0 20px;
  border-radius: 2px;

  &:first-child {
    border-radius: 8px 8px 2px 2px;
  }
  &:last-child {
    border-radius: 2px 2px 8px 8px;
  }
`;

export const ContentInputImage = styled.img`
  width: 16px;
  height: 16px;
`;

export const ContentInput = styled.input`
  width: 100%;
  font-weight: 500;
  font-size: 16px;
  color: white;
  background-color: transparent;

  &::placeholder {
    color: #a4a8b3;
  }
`;

export const ContentSumbitWrap = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const ContentMovePage = styled.a`
  width: 100%;
  text-align: right;
  padding-top: 8px;
  font-size: 14px;
  color: #a4a8b2;
`;

export const ContentSumbit = styled.button`
  width: 100%;
  height: 48px;
  border-radius: 8px;
  background-color: #7988b2;
  border: #43454d 2px solid;
  font-size: 16px;
  border: none;
  color: #212226;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: 0.2s;
`;

export const ContentVisiblePassword = styled.button`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 20px;
  background-color: transparent;
`;

export const ContentVisiblePasswordIcon = styled.img`
  width: 100%;
  height: 100%;
`;
