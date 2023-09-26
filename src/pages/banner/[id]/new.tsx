import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import BannerItemForm from "@/components/page/banner/item/banner-item-form";
import { useRouter } from "next/router";

const pageHeader: IPageHeader = {
  title: "배너 이미지 등록",
};

const ProductNewPage: IDefaultLayoutPage = () => {
  const router = useRouter();

  return <BannerItemForm bannerId={Number(router.query.id)} />;
};

ProductNewPage.getLayout = getDefaultLayout;
ProductNewPage.pageHeader = pageHeader;

export default ProductNewPage;
