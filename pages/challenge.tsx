import { getCookie } from 'cookies-next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import hello from '../api/auth/hello';
import downloadChallenge from '../api/challenge.ts/downloadChallenge';
import { ChallengesResDto } from '../api/challenge.ts/dto/ChallengeResDto';
import getChallenge from '../api/challenge.ts/getChallenge';
import solveChallenge from '../api/challenge.ts/solveChallenge';
import uploadChallengeFile from '../api/challenge.ts/uploadChallengeFile';
import Loading from '../components/Loading';
import Sidebar from '../components/Sidebar';

const Challenge = () => {
  const router = useRouter();
  const [challenge, setChallenge] = useState<ChallengesResDto>();
  const [category, setCategory] = useState<string>('All');
  const [toggleConnection, setToggleConnection] = useState<{
    [x: string]: boolean;
  }>({});
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [uploadSelected, setUploadSelected] = useState<string>('');

  const [input, setInput] = useState<{ [x: string]: string }>({});

  useEffect(() => {
    if (!getCookie('accessToken')) router.push('/login');
    (async () => {
      const res = await getChallenge();
      const data = await hello();
      setChallenge(res);
      setIsAdmin(data as boolean);
      setInput({
        ...input,
        [res?.challenges.map((item) => item.id) as unknown as string]: '',
      });
      setToggleConnection({
        ...toggleConnection,
        [res?.challenges.map((item) => item.id) as unknown as string]: false,
      });
    })();
  }, [setChallenge, setInput]);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    setInput({
      ...input,
      [id]: e.target.value,
    });
  };

  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files = (e.target as HTMLInputElement).files as FileList;
      const file = files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('id', uploadSelected);
      await uploadChallengeFile(formData);
      const res = await getChallenge();
      setChallenge(res);
    } catch {
      alert('업로드에 실패했습니다.');
    }
  };

  const downloadFile = async (id: string, filename: string) => {
    const res = await downloadChallenge(id);
    const objectUrl = URL.createObjectURL(res as Blob);
    const a = document.createElement('a');
    a.href = objectUrl;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(objectUrl);
  };

  const submitFlag = async (id: string) => {
    if (input[id] === null) return alert('flag를 입력해주세요.');
    const data = await solveChallenge({ id, flag: input[id] });
    if (data?.correct === false) {
      if ((data?.message as string) !== 'Correct flag') alert(data?.message);
    }
    const res = await getChallenge();
    setChallenge(res);
  };

  return (
    <>
      <Head>
        <title>LOGCON - Challenge</title>
      </Head>
      <Sidebar />
      <ChallengeWrap>
        <ChallengeInner>
          <ContentWrap>
            {challenge ? (
              <>
                <Content>
                  <ContentTitle>카테고리</ContentTitle>
                  <CategoryMenu>
                    <CategoryItem
                      style={
                        category === 'All'
                          ? { backgroundColor: 'white', color: '#43454D' }
                          : { backgroundColor: 'transparent', color: 'white' }
                      }
                      onClick={() => setCategory('All')}
                    >
                      All
                    </CategoryItem>
                    {challenge?.categories.map((item, index) => (
                      <CategoryItem
                        key={index}
                        style={
                          category === item
                            ? {
                                backgroundColor: 'white',
                                color: '#43454D',
                              }
                            : { backgroundColor: 'transparent', color: 'white' }
                        }
                        onClick={() => setCategory(item)}
                      >
                        {item}
                      </CategoryItem>
                    ))}
                  </CategoryMenu>
                </Content>
                <Content>
                  <ContentTitle>문제 목록</ContentTitle>
                  {challenge &&
                    challenge?.challenges.map((item, index) =>
                      item.category === category || category === 'All' ? (
                        <ChallengeItem key={index}>
                          <ChallengeItemTitleWrap>
                            <ChallengeItemTitle>{item.name}</ChallengeItemTitle>
                            <ChallengeItemPoint>
                              {item.point} Points | {item?.solve} Solve |{' '}
                              {item?.category}
                            </ChallengeItemPoint>
                          </ChallengeItemTitleWrap>
                          <ChallengeItemDescription>
                            {item.description}
                          </ChallengeItemDescription>
                          <ChallengeItemInteract>
                            {isAdmin && (
                              <>
                                <ChallengeItemInput
                                  onChange={(e) => {
                                    uploadFile(e);
                                  }}
                                  id="upload"
                                  type="file"
                                />
                                <ChallengeItemLabel
                                  onClick={() => {
                                    setUploadSelected(item?.id as string);
                                  }}
                                  htmlFor="upload"
                                >
                                  문제 업로드
                                  <ChallengeItemImage src="/assets/symbols/upload.svg" />
                                </ChallengeItemLabel>
                              </>
                            )}
                            {item.file && (
                              <ChallengeItemButton
                                onClick={() =>
                                  downloadFile(
                                    item.file?.id as string,
                                    item.file?.name as string
                                  )
                                }
                              >
                                문제 다운로드
                                <ChallengeItemImage src="/assets/symbols/download.svg" />
                              </ChallengeItemButton>
                            )}
                            {item.connection && (
                              <ChallengeItemButton
                                onClick={() =>
                                  setToggleConnection({
                                    ...toggleConnection,
                                    [item.id as string]:
                                      !toggleConnection[item.id as string],
                                  })
                                }
                                style={
                                  toggleConnection[item.id as string] &&
                                  item.connection
                                    ? {
                                        color: 'white',
                                        backgroundColor: '#43454D',
                                      }
                                    : { color: '#c7ccd9' }
                                }
                              >
                                접속 정보 보기{' '}
                                {toggleConnection[item.id as string]}
                                <ChallengeItemImage
                                  src={
                                    toggleConnection[item.id as string] &&
                                    item.connection
                                      ? '/assets/symbols/close.svg'
                                      : '/assets/symbols/open.svg'
                                  }
                                />
                              </ChallengeItemButton>
                            )}
                            {item.connection &&
                              toggleConnection[item.id as string] && (
                                <ChallengeItemMobileInfo>
                                  {item.connection}
                                </ChallengeItemMobileInfo>
                              )}
                            <ChallengeItemInteractInputWrap>
                              {!challenge.solves.includes(
                                item?.id as string
                              ) ? (
                                <>
                                  <ChallengeItemSolveWrap>
                                    <ChallengeItemInteractInput
                                      value={
                                        (input[item.id as string] as string) ||
                                        ''
                                      }
                                      onChange={(e) =>
                                        inputHandler(e, item.id as string)
                                      }
                                      placeholder="FLAG"
                                    />
                                  </ChallengeItemSolveWrap>
                                  <ChallengeItemInteractSubmit
                                    onClick={() =>
                                      submitFlag(item.id as string)
                                    }
                                  >
                                    제출
                                  </ChallengeItemInteractSubmit>
                                </>
                              ) : (
                                <>
                                  <ChallengeItemSolveWrap>
                                    <ChallengeItemSolve>
                                      풀이 완료
                                    </ChallengeItemSolve>
                                  </ChallengeItemSolveWrap>
                                  <ChallengeItemInteractSubmit
                                    style={{
                                      backgroundColor: '#35373d',
                                      cursor: 'default',
                                    }}
                                  >
                                    <ChallengeItemSolveImage src="/assets/symbols/check.svg" />
                                  </ChallengeItemInteractSubmit>
                                </>
                              )}
                            </ChallengeItemInteractInputWrap>
                            {item.connection &&
                              toggleConnection[item.id as string] && (
                                <ChallengeItemNonMobileInfo>
                                  {item.connection}
                                </ChallengeItemNonMobileInfo>
                              )}
                          </ChallengeItemInteract>
                        </ChallengeItem>
                      ) : null
                    )}
                </Content>
              </>
            ) : (
              <Loading />
            )}
          </ContentWrap>
        </ChallengeInner>
      </ChallengeWrap>
    </>
  );
};

const ChallengeWrap = styled.div`
  width: 100%;
  padding-left: 256px;

  @media (max-width: 768px) {
    padding-left: 0;
  }
`;

const ChallengeInner = styled.div`
  width: 100%;
  height: 100%;
  padding: 64px 0;

  display: flex;
  justify-content: center;
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;

  width: 90%;
  max-width: 960px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ContentTitle = styled.h1`
  font-weight: 600;
  font-size: 28px;
  color: #ffffff;
`;

const CategoryMenu = styled.ul`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const CategoryItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #43454d;
  color: white;
  background-color: transparent;
  border-radius: 99px;
  padding: 12px 28px;
  cursor: pointer;
  user-select: none;

  transition: 0.3s;

  &:hover {
    background-color: #43454d;
  }
`;

const ChallengeItem = styled.ul`
  padding: 32px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  background-color: #28292e;
  border-radius: 12px;
`;

const ChallengeItemTitleWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ChallengeItemTitle = styled.h1`
  font-weight: 600;
  font-size: 24px;
  color: #ffffff;
`;

const ChallengeItemPoint = styled.p`
  font-weight: 500;
  font-size: 16px;
  color: #a4a8b2;
`;

const ChallengeItemDescription = styled.p`
  font-weight: 500;
  font-size: 16px;
  color: #c7ccd9;
`;

const ChallengeItemInteract = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

const ChallengeItemInteractInputWrap = styled.div`
  flex: 1;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    flex: 1 1 100%;
  }
`;

const ChallengeItemInteractInput = styled.input`
  color: #ffffff;
  font-weight: 500;
  font-size: 16px;
  background-color: transparent;
  width: 100%;

  &:placeholder {
    color: #a4a8b2;
  }
`;

const ChallengeItemInteractSubmit = styled.button`
  width: 68px;
  height: 100%;
  background-color: #43454d;
  padding: 12px 20px;
  border-radius: 0 8px 8px 0;
  font-weight: 500;
  font-size: 16px;
  color: #ffffff;
  cursor: pointer;
`;

const ChallengeItemButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  transition: 0.3s;

  background-color: #35373d;
  border-radius: 8px;
  color: #c7ccd9;

  padding: 12px 16px;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  user-select: none;

  @media (max-width: 768px) {
    flex: 1;
  }
`;

const ChallengeItemInput = styled.input`
  display: none;
`;

const ChallengeItemLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  transition: 0.3s;

  background-color: #35373d;
  border-radius: 8px;
  color: #c7ccd9;

  padding: 12px 16px;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  user-select: none;

  @media (max-width: 768px) {
    flex: 1;
  }
`;

const ChallengeItemConnectInfo = styled.div`
  background-color: #35373d;
  border-radius: 8px;
  width: 100%;
  color: #c7ccd9;
  padding: 12px 16px;
`;

const ChallengeItemMobileInfo = styled(ChallengeItemConnectInfo)`
  @media (min-width: 768px) {
    display: none;
  }
`;

const ChallengeItemNonMobileInfo = styled(ChallengeItemConnectInfo)`
  @media (max-width: 768px) {
    display: none;
  }
`;

const ChallengeItemImage = styled.img`
  width: 16px;
  height: 16px;
`;

const ChallengeItemSolveWrap = styled.div`
  flex: 1;
  height: 100%;
  padding: 12px 16px;
  border-radius: 8px 0 0 8px;
  background-color: #35373d;
  display: flex;
  align-items: center;
`;

const ChallengeItemSolve = styled.p`
  font-weight: 500;
  font-size: 16px;
  color: #83da8a;
  user-select: none;
`;
const ChallengeItemSolveImage = styled.img``;

export default Challenge;
