import DefaultTable from "@/components/shared/ui/default-table";
import DefaultTableBtn from "@/components/shared/ui/default-table-btn";
import { Alert, Breadcrumb, Button, MenuProps, message, Popconfirm } from "antd";
import { ColumnsType } from "antd/es/table";
import { useRouter } from "next/router";
import React, { FC, useCallback, useMemo, useState } from "react";
import { deleteBannerItem, IBanner, IBannerItem, useBannerById } from "@/apis/banner";
import Link from "next/link";
import { FileImageOutlined } from "@ant-design/icons";
import { addHttp } from "@/utils/utils";

interface BannerItemListProps {
  bannerId: number;
}

const BannerItemList: FC<BannerItemListProps> = ({ bannerId }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const router = useRouter();
  const { data, error, isLoading, mutate } = useBannerById(bannerId);
  const [m, contextHolder] = message.useMessage();


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

  const handleDeleteItem = async (id: number) => {
    try {
      await deleteBannerItem(bannerId, id);
    } catch (e: unknown) {
      m.error("삭제가 실패하였습니다: " + e);
      return;
    }
    mutate();
    m.success("삭제가 완료되었습니다.");
  };

  const columns: ColumnsType<IBannerItem> = [
    {
      key: "action",
      width: 120,
      title: "관리",
      align: "center",
      render: (_value: unknown, record: IBannerItem) => {
        return (
          <span className="flex justify-center gap-2">
            <Link href={`/banner/${record.bannerId}/edit/${record.id}`} className="px-2 py-1 text-sm btn">
              수정
            </Link>
            <Popconfirm
              title=" 삭제하시겠습니까?"
              onConfirm={() => handleDeleteItem(record.id)}
              okText="예"
              cancelText="아니오"
            >
              <a className="px-2 py-1 text-sm btn">삭제</a>
            </Popconfirm>
          </span>
        );
      },
    },
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
          <img className="m-h-96 w-auto" alt={record.alt} src={addHttp(record.imageUrl)} />
        );
      },
    },
    {
      title: "링크 URL",
      width: 150,
      dataIndex: "link",
      render: (value: string) => {
        return (
          <span className={"underline"}><a target="_blank" href={value}>{value}</a></span>
        );
      },
    },
  ];

  if (error) {
    return <Alert message="데이터 로딩 중 오류가 발생했습니다." type="warning" />;
  }

  return (
    <>
      {contextHolder}
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
