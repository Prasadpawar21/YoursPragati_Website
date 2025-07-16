// utils/iconMap.js
import * as MdIcons from 'react-icons/md';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';
import * as IoIcons from 'react-icons/io5';
import * as RiIcons from 'react-icons/ri';
import * as GiIcons from 'react-icons/gi';
import * as BsIcons from 'react-icons/bs';
import * as TbIcons from 'react-icons/tb';

const iconLibraries = {
  md: MdIcons,
  fa: FaIcons,
  ai: AiIcons,
  bi: BiIcons,
  io: IoIcons,
  ri: RiIcons,
  gi: GiIcons,
  bs: BsIcons,
  tb: TbIcons,
};

export default function getIconComponent(iconName) {
  if (!iconName || typeof iconName !== 'string') return null;
  const prefix = iconName.slice(0, 2).toLowerCase();
  const library = iconLibraries[prefix];
  return library?.[iconName] || null;
}
