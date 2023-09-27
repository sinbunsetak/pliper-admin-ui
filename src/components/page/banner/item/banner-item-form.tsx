import { IProductFormValue } from "@/client/sample/product";
import DefaultForm from "@/components/shared/form/ui/default-form";
import FormGroup from "@/components/shared/form/ui/form-group";
import FormSection from "@/components/shared/form/ui/form-section";
import { Button, Divider, Form, Input, message, Upload, UploadFile } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useState } from "react";
import { createBannerItem, IBannerItem, IBannerItemFormValue, updateBannerItem } from "@/apis/banner";
import { InboxOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { RcFile } from "antd/es/upload";
import Dragger from "antd/lib/upload/Dragger";


const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });


interface BannerItemFormProps {
  id?: string;
  bannerId: number | string;
  initialValues?: Partial<IBannerItem>;
}

const BannerItemForm = ({ bannerId, id, initialValues }: BannerItemFormProps) => {
  const [form] = useForm();
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1));
  };

  const handleFinish = async (formValue: IBannerItemFormValue) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("alt", formValue.alt);
      formData.append("link", formValue.link);
      if (id) {
        if (formValue.banner) {
          formData.append("banner", formValue.banner.file);
        }
        await updateBannerItem(bannerId, Number(id), formData);
        messageApi.success("수정되었습니다");
      } else {
        formData.append("banner", formValue.banner.file);
        await createBannerItem(bannerId, formData);
        messageApi.success("생성되었습니다");
      }
    } catch (e: unknown) {
      messageApi.error("에러가 발생했습니다");
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  return (
    <>
      {contextHolder}
      <DefaultForm<IProductFormValue> form={form} initialValues={initialValues} onFinish={handleFinish}>
        <FormSection title="기본정보" description="상품 기본 정보를 입력해주세요">
          <FormGroup title="기본 배너 아이디*">
            {/*<Input width={100} placeholder="상품명을 입력하세요" />*/}
            <span>{bannerId}</span>
          </FormGroup>

          <Divider />


          <FormGroup title="배너 링크*">
            <Form.Item name="link" rules={[{ required: true, message: "필수값입니다" }]}>
              <Input placeholder="링크 URL을 입력하세요" defaultValue={"http://"} value={"http://"} />
            </Form.Item>
          </FormGroup>

          <Divider />

          <FormGroup title="이미지 ALT*">
            <Form.Item name="alt" rules={[{ required: true, message: "필수값입니다" }]}>
              <Input placeholder="이미지 alt를 입력하세요" />
            </Form.Item>
          </FormGroup>


        </FormSection>

        <FormSection title="배너 이미지" description="배너 이미지를 업로드합니다">
          <FormGroup title="배너 이미지">
            <Form.Item name="banner">
              <Dragger {...{
                name: "file",
                listType: "picture",
                onPreview: handlePreview,

                maxCount: 1,
                beforeUpload: (file) => {
                  const isPNG = file.type === "image/png";
                  const isJPG = file.type === "image/jpeg" || file.type === "image/jpg";
                  if (!isPNG && !isJPG) {
                    message.error(`${file.name} is not a png or jpg file`);
                    return Upload.LIST_IGNORE;
                  }
                  return false;
                },
                onChange(info) {
                  const { status } = info.file;
                  if (status !== "uploading") {
                    console.log(info.file);
                  }
                  if (status === "done") {
                    message.success(`${info.file.name} file uploaded successfully.`);
                  } else if (status === "error") {
                    message.error(`${info.file.name} file upload failed.`);
                  }
                },
                onDrop(e) {
                  console.log("Dropped files", e.dataTransfer.files);
                },
              }}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">클릭 혹은 Image Drag&Drop</p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                  banned files.
                </p>
              </Dragger>
            </Form.Item>
          </FormGroup>

          <Divider />

        </FormSection>

        <div className="text-center gap-1 flex justify-center">
          <Button onClick={router.back}>
            취소
          </Button>
          <Button htmlType="submit" type="primary" loading={isLoading}>
            {id ? "수정" : "저장"}
          </Button>
        </div>
      </DefaultForm>
    </>
  );
};

export default React.memo(BannerItemForm);
