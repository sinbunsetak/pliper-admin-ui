import { useProduct } from "@/client/sample/product";
import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import { Alert, Skeleton } from "antd";
import { useRouter } from "next/router";
import BannerItemForm from "@/components/page/banner/item/banner-item-form";
import { useBannerById, useBannerItem } from "@/apis/banner";

const pageHeader: IPageHeader = {
  title: "배너 이미지 수정",
};

const ProductNewPage: IDefaultLayoutPage = () => {
  const router = useRouter();

  const bannerId =  router.query.id as string
  const itemId = router.query.item as string
  const { data, error, isLoading, isValidating } = useBannerItem(bannerId, itemId);

  if (error) {
    return <Alert message="데이터 로딩 중 오류가 발생했습니다." type="warning" className="my-5" />;
  }

  if (!data || isLoading || isValidating) {
    return <Skeleton className="my-5" />;
  }

  return <BannerItemForm bannerId={bannerId} id={itemId} initialValues={data} />;
};

ProductNewPage.getLayout = getDefaultLayout;
ProductNewPage.pageHeader = pageHeader;

export default ProductNewPage;
