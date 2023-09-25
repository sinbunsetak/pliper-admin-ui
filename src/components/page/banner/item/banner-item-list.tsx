import DefaultTable from "@/components/shared/ui/default-table";
import DefaultTableBtn from "@/components/shared/ui/default-table-btn";
import { Alert, Breadcrumb, Button, MenuProps } from "antd";
import { ColumnsType } from "antd/es/table";
import { useRouter } from "next/router";
import React, { FC, useCallback, useMemo, useState } from "react";
import { IBannerItem, useBannerById } from "@/apis/banner";
import Link from "next/link";
import { FileImageOutlined } from "@ant-design/icons";

interface BannerItemListProps {
  bannerId: number;
}

const BannerItemList: FC<BannerItemListProps> = ({ bannerId }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const router = useRouter();
  const { data, error, isLoading } = useBannerById(bannerId);


  const handleChangePage = useCallback(
    (pageNumber: number) => {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, page: pageNumber },
      });
    },
    [router],
  );

  const onSelectChange = useCallback((newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  }, []);

  const modifyDropdownItems: MenuProps["items"] = useMemo(
    () => [
      {
        key: "statusUpdate",
        label: <a onClick={() => console.log(selectedRowKeys)}>상태수정</a>,
      },
    ],
    [selectedRowKeys],
  );

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const columns: ColumnsType<IBannerItem> = [
    {
      key: "order",
      width: 120,
      title: "순서",
      align: "center",
      render: (_value: unknown, record: IBannerItem) => {
        return (
          <span className="flex justify-center gap-2">
            <div className={"bg-gray-200 rounded p-2 "}>{record.order}</div>
          </span>
        );
      },
    },
    {
      title: "배너 이미지",
      render: (value: number, record: IBannerItem) => {
        return (
          <img alt={record.alt} src={record.imageUrl} />
        );
      },
    },
    {
      title: "링크 URL",
      width: 150,
      dataIndex: "link",
    },
  ];

  if (error) {
    return <Alert message="데이터 로딩 중 오류가 발생했습니다." type="warning" />;
  }

  return (
    <>
      <DefaultTableBtn className="justify-between">
        <Breadcrumb>
          <Breadcrumb.Item> <Link href="/banner/list">배너 목록</Link></Breadcrumb.Item>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <Breadcrumb.Item><FileImageOutlined /> "{data?.location}" 배너 이미지</Breadcrumb.Item>
        </Breadcrumb>
        <div className="flex-item-list">
          {/*<Button className="btn-with-icon" icon={<Download/>}>*/}
          {/*    엑셀 다운로드*/}
          {/*</Button>*/}
          <Button type="primary" onClick={() => router.push(`/banner/${bannerId}/new`)}>
            배너 아이템 생성
          </Button>
        </div>
      </DefaultTableBtn>

      <DefaultTable<IBannerItem>
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data?.items || []}
        loading={isLoading}
        pagination={{
          current: Number(router.query.page || 1),
          defaultPageSize: 5,
          total: data?.items?.length || 0,
          showSizeChanger: false,
          onChange: handleChangePage,
        }}
        className="mt-3"
        countLabel={data?.items?.length}
      />
    </>
  );
};

export default BannerItemList;
