import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import BannerItemList from "@/components/page/banner/item/banner-item-list";
import BannerList from "@/components/page/banner/banner-list";

const pageHeader: IPageHeader = {
  title: "배너 목록",
};

const BannerListPage: IDefaultLayoutPage = () => {
  return (
    <>
      <BannerList />
    </>
  );
};

BannerListPage.getLayout = getDefaultLayout;
BannerListPage.pageHeader = pageHeader;

export default BannerListPage;
