import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import BannerItemSearch from "@/components/page/banner/item/banner-item-search";
import BannerItemList from "@/components/page/banner/item/banner-item-list";
import { useRouter } from "next/router";

const pageHeader: IPageHeader = {
  title: "배너 이미지 목록",
};

const BannerItemListPage: IDefaultLayoutPage = () => {
  const router = useRouter()

  const bannerId = router.query.id as string


  return (
    <>
     <BannerItemSearch />
      <BannerItemList bannerId={Number(bannerId)} />
    </>
  );
};

BannerItemListPage.getLayout = getDefaultLayout;
BannerItemListPage.pageHeader = pageHeader;

export default BannerItemListPage;
