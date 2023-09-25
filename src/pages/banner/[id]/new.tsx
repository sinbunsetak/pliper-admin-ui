import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import BannerItemForm from "@/components/page/banner/item/banner-item-form";

const pageHeader: IPageHeader = {
  title: "배너 이미지 등록",
};

const ProductNewPage: IDefaultLayoutPage = () => {
  return <BannerItemForm initialValues={{ status: "NOTSALE" }} />;
};

ProductNewPage.getLayout = getDefaultLayout;
ProductNewPage.pageHeader = pageHeader;

export default ProductNewPage;
