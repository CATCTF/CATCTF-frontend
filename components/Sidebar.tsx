import { getCookie } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { User } from '../api/profile/dto/ProfileResDto';
import getProfile from '../api/profile/getProfile';

const Sidebar = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<User>();

  useEffect(() => {
    if (getCookie('accessToken'))
      (async () => {
        const profile = await getProfile();
        setProfile(profile);
      })();
  }, [setProfile]);

  return (
    <>
      <ToggleInput id="toggle" type="checkbox" />
      <SidebarWrap>
        <ToggleLabel htmlFor="toggle">
          <ToggleImg src="/assets/symbols/menu.svg" alt="" />
        </ToggleLabel>
        <SidebarMenuWrap>
          <LogoWrap href="/">
            <LogoImg src="/assets/logo/logo.svg" alt="로고" />
          </LogoWrap>
          <ProfileWrap href={profile ? '/profile' : '/login'}>
            <ProfileImg src="/assets/symbols/profile.svg" alt="프로필사진" />
            {profile ? (
              <ProfileName>{profile.name}</ProfileName>
            ) : (
              <ProfileName style={{ color: '#A4A8B3' }}>
                로그인하세요!
              </ProfileName>
            )}
          </ProfileWrap>
          <SidebarMenu>
            <SidebarMenuItem
              href="/challenge"
              style={
                router.pathname === '/challenge'
                  ? { color: 'white' }
                  : { color: 'rgba(255, 255, 255, 0.5)' }
              }
            >
              Challenge
            </SidebarMenuItem>
            <SidebarMenuItem
              href="/scoreboard"
              style={
                router.pathname === '/scoreboard'
                  ? { color: 'white' }
                  : { color: 'rgba(255, 255, 255, 0.5)' }
              }
            >
              Scoreboard
            </SidebarMenuItem>
            <SidebarMenuItem
              href="/notice"
              style={
                router.pathname === '/notice'
                  ? { color: 'white' }
                  : { color: 'rgba(255, 255, 255, 0.5)' }
              }
            >
              Notice
            </SidebarMenuItem>
            {profile?.isAdmin && (
              <SidebarMenuItem
                target="_blank"
                href={`${process.env.NEXT_PUBLIC_API_URL}/admin`}
                style={{ color: 'rgba(255, 255, 255, 0.5)' }}
              >
                Admin
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        </SidebarMenuWrap>
        <SidebarSubMenuWrap>
          <SidebarCopyRight>&copy; 2023 TeamLog</SidebarCopyRight>
          <SidebarSubMenu>
            <SidebarSubMenuLink href="https://teamlog.kr" target="_blank">
              Website
            </SidebarSubMenuLink>
            <SidebarSubMenuLink
              href="https://www.facebook.com/sunrintog/"
              target="_blank"
            >
              Facebook
            </SidebarSubMenuLink>
          </SidebarSubMenu>
        </SidebarSubMenuWrap>
      </SidebarWrap>
      <ToggleBackground htmlFor="toggle" />
    </>
  );
};

const ToggleInput = styled.input`
  display: none;

  &:checked ~ label {
    transform: translateX(0);
    backdrop-filter: blur(10px);
  }

  &:checked + div > label {
    transform: translateX(0);
  }

  &:checked + div {
    transform: translateX(0);
  }
`;

const ToggleBackground = styled.label`
  position: fixed;
  top: 0;
  left: 0;
  transform: translateX(-100%);
  width: 100%;
  height: 100vh;
  transition: 0.8s;
  z-index: 1;
`;

const ToggleLabel = styled.label`
  position: absolute;
  right: 16px;
  top: 16px;
  transform: translateX(200%);
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  transition: 0.8s;

  @media (min-width: 768px) {
    display: none;
  }
`;

const ToggleImg = styled.img`
  width: 100%;
  height: 100%;
`;

const SidebarWrap = styled.div`
  width: 256px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #28292e;
  transition: 0.8s;
  padding: 48px 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 2;

  @media (max-width: 768px) {
    transform: translateX(-100%);
    padding: 42px 16px;
  }
`;

const SidebarMenuWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

const LogoWrap = styled(Link)`
  width: fit-content;
`;

const LogoImg = styled.img``;

const ProfileWrap = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  width: fit-content;
`;

const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #3a3d44;
  padding: 8px;
`;

const ProfileName = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
`;

const SidebarMenu = styled.ul`
  display: flex;
  width: fit-content;
  flex-direction: column;
  gap: 16px;
`;

const SidebarMenuItem = styled(Link)`
  font-weight: 600;
  font-size: 18px;
  list-style: none;
  width: fit-content;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    color: #ffffff !important;
  }
`;

const SidebarSubMenuWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 16px;
  font-weight: 500;
`;

const SidebarCopyRight = styled.p`
  color: #a4a8b2;
`;

const SidebarSubMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  a:first-child {
    &:after {
      content: '';
      display: inline-block;
      width: 1px;
      height: 12px;
      background-color: #43454d;
      margin-left: 12px;
    }
  }
`;

const SidebarSubMenuLink = styled(Link)`
  color: #7988b2;
  cursor: pointer;
`;

export default Sidebar;
