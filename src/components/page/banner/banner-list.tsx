import { IProduct, useProducts } from "@/client/sample/product";
import DefaultTable from "@/components/shared/ui/default-table";
import DefaultTableBtn from "@/components/shared/ui/default-table-btn";
import { ISO8601DateTime } from "@/types/common";
import { Alert, Button, Dropdown, MenuProps, Popconfirm } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { Download } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import numeral from "numeral";
import React, { useCallback, useMemo, useState } from "react";
import { IBanner, useBanners } from "@/apis/banner";

const BannerList = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const router = useRouter();

  const { data, error, isLoading } = useBanners();

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

  const columns: ColumnsType<IBanner> = [
    {
      key: "action",
      width: 120,
      title: "관리",
      align: "center",
      render: (_value: unknown, record: IBanner) => {
        return (
          <span className="flex justify-center gap-2">
            <Link href={`/banner/${record.bannerId}/list`} className="px-2 py-1 text-sm btn">
              배너 이미지 목록
            </Link>
            {/*<Popconfirm*/}
            {/*    title="상품을 삭제하시겠습니까?"*/}
            {/*    onConfirm={() => alert("삭제")}*/}
            {/*    okText="예"*/}
            {/*    cancelText="아니오"*/}
            {/*>*/}
            {/*  <a className="px-2 py-1 text-sm btn">삭제</a>*/}
            {/*</Popconfirm>*/}
          </span>
        );
      },
    },
    {
      title: "배너 위치",
      width: 150,
      dataIndex: "location",
    },
    {
      title: "배너 설명",
      dataIndex: "description",
    },
    {
      title: "배너 이미지 개수",
      render: (value: number, record: IBanner) => {
        return (
          <span>
            <span className="px-2 py-1 mr-1 bg-gray-100 rounded">{record.items?.length || 0}</span>
          </span>
        );
      },
    },
    {
      title: "배너 높이",
      dataIndex: "height",
      render: (value: number, record: IBanner) => {
        return (
          <span>
            <span className="px-2 py-1 mr-1 bg-gray-100 rounded">{value}</span>
            <span>px</span>
          </span>
        );
      },
    },
    {
      title: "생성일시",
      dataIndex: "createdAt",
      align: "center",
      width: 100,
      render: (value: ISO8601DateTime) => {
        return (
          <div className="text-sm">
            <span className="block">{dayjs(value).format("YYYY/MM/DD")}</span>
            <span className="block">{dayjs(value).format("hh:mm")}</span>
          </div>
        );
      },
    },
  ];

  if (error) {
    return <Alert message="데이터 로딩 중 오류가 발생했습니다." type="warning" />;
  }

  return (
    <>
      <DefaultTableBtn className="justify-between">
        <div>
        </div>
        <div className="flex-item-list">
          {/*<Button className="btn-with-icon" icon={<Download/>}>*/}
          {/*    엑셀 다운로드*/}
          {/*</Button>*/}
          {/* <Button type="primary" onClick={() => router.push("/banner/new")}>
                        배너 생성
                    </Button>*/}
        </div>
      </DefaultTableBtn>

      <DefaultTable<IBanner>
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data || []}
        loading={isLoading}
        pagination={{
          current: Number(router.query.page || 1),
          defaultPageSize: 5,
          total: data?.length || 0,
          showSizeChanger: false,
          onChange: handleChangePage,
        }}
        className="mt-3"
        countLabel={data?.length}
      />
    </>
  );
};

export default React.memo(BannerList);
