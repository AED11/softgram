"use client"
import { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Profile from '@/assets/icon/layout/instagramDefaultProfile.jpg';
import { Menu, MenuItem } from '@mui/material';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  homeIcon,
  homeIconActive,
  searchIcon,
  searchIconActive,
  compas,
  compasActive,
  video,
  videoActive,
  message,
  messageActive,
  like,
  likeActive,
  action,
  setting,
  savedIcon,
  problemIcon,
  threads,
} from '@/assets/icon/layout/svg';

const NavLink = ({ href, icon, activeIcon, label, isActive }) => (
  <Link legacyBehavior href={href}>
    <a className={`flex items-center gap-4 w-[90%] m-auto rounded-md h-[52px] px-4 hover:bg-gray-100 ${isActive(href)}`}>
      {isActive(href) ? activeIcon : icon}
      <p className="text-lg">{label}</p>
    </a>
  </Link>
);

export default function SideBar({ children }) {
  const pathname = usePathname();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { t } = useTranslation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isActive = (path) => pathname === path ? 'font-bold' : 'font-normal';

  return (
    <div>
      <section className="w-[320px] h-[100%] fixed  border-r-2 border-gray-300">
        <div className="sideBar h-full pb-[100px]">
          <div className="m-auto pt-[20px] ml-[20px] flex pb-[10px] mt-[20px]">
            {homeIcon}
          </div>
          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col gap-2 mt-4">
              <NavLink href="/" icon={homeIcon} activeIcon={homeIconActive} label={t('layout.home')} isActive={isActive} />
              <NavLink href="/search" icon={searchIcon} activeIcon={searchIconActive} label={t('layout.search')} isActive={isActive} />
              <NavLink href="/explore" icon={compas} activeIcon={compasActive} label={t('layout.explore')} isActive={isActive} />
              <NavLink href="/reels" icon={video} activeIcon={videoActive} label={t('layout.reels')} isActive={isActive} />
              <NavLink href="/chats" icon={message} activeIcon={messageActive} label={t('layout.message')} isActive={isActive} />
              <NavLink href="/notification" icon={like} activeIcon={likeActive} label={t('layout.notification')} isActive={isActive} />

              <div className="flex items-center gap-4 w-[90%] m-auto rounded-md h-[52px] px-4 hover:bg-gray-100">
                {action}
                <p className="text-lg">{t('layout.create')}</p>
              </div>

              <NavLink href="/profile" icon={<Image className={`${pathname === '/profile' ? 'border-2 border-black rounded-full' : ''} h-10 w-10`} src={Profile} alt="Profile" />} label={t('layout.profile')} isActive={isActive} />
            </div>

            <div className="flex items-center gap-4 w-[90%] m-auto rounded-md h-[52px] px-4 hover:bg-gray-100">
              {threads}
              <p className="text-lg">{t('layout.threads')}</p>
            </div>

            <div className="flex items-center gap-4 w-[90%] m-auto rounded-md h-[52px] px-4 hover:bg-gray-100">
              <button onClick={handleClick} className="flex gap-5">
                {setting}
                <p className="text-lg">{t('layout.more')}</p>
              </button>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
              >
                {/* Your menu items */}
              </Menu>
            </div>
          </div>
        </div>
      </section>

      <div className="ml-[320px]">
        {children}
      </div>
    </div>
  );
}
