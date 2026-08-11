// Named icon lookups so data files can stay free of JSX imports.

import {
  FaBuildingColumns,
  FaChartLine,
  FaChartPie,
  FaClipboardCheck,
  FaFileContract,
  FaFileLines,
  FaHandshake,
  FaHeadset,
  FaIndianRupeeSign,
  FaKey,
  FaListCheck,
  FaMagnifyingGlass,
  FaPaintRoller,
  FaRoute,
  FaShieldHalved,
  FaTag,
} from 'react-icons/fa6'

export const serviceIcons = {
  key: FaKey,
  tag: FaTag,
  contract: FaFileContract,
  shield: FaShieldHalved,
  chart: FaChartLine,
  bank: FaBuildingColumns,
  doc: FaFileLines,
  paint: FaPaintRoller,
}

export const processIcons = {
  search: FaMagnifyingGlass,
  list: FaListCheck,
  tour: FaRoute,
  handshake: FaHandshake,
}

export const whyIcons = {
  verified: FaClipboardCheck,
  rupee: FaIndianRupeeSign,
  data: FaChartPie,
  support: FaHeadset,
}
