import { Divider } from "antd";
import {Home, Monitor, Package2, SlidersHorizontal} from "lucide-react";
import React from "react";
import Menu, { IMenu } from "./nav";

const mainMenuData: IMenu[] = [
  /*{
    id: "home",
    name: "홈",
    icon: <Home className="w-5 h-5" />,
    link: {
      path: "/",
    },
  },*/
  {
    id: "banner",
    name: "배너 관리",
    icon: <SlidersHorizontal className="w-5 h-5" />,
    submenu: [
      {
        id: "bannerList",
        name: "배너 목록",
        link: {
          path: "/banner/list",
        },
      },
    ],
  },
];

// const devMenuData: IMenu[] = [
//   {
//     id: "dev",
//     name: "사용 가이드",
//     icon: <Monitor className="w-5 h-5" />,
//     submenu: [
//       {
//         name: "폼",
//         link: {
//           path: "/sample/form",
//         },
//       },
//     ],
//   },
// ];

const MainMenu = () => {
  return (
    <>
      <>
        <Divider orientation="left" plain>
          사이트 관리
        </Divider>
        <Menu data={mainMenuData} />
      </>
      <>
        {/*<Divider orientation="left" plain>
          개발
        </Divider>

        <Menu data={devMenuData} />*/}
      </>
    </>
  );
};

export default React.memo(MainMenu);
