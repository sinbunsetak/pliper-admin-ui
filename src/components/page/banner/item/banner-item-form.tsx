import { createProduct, IProductFormValue, updateProduct } from "@/client/sample/product";
import DefaultForm from "@/components/shared/form/ui/default-form";
import FormGroup from "@/components/shared/form/ui/form-group";
import FormSection from "@/components/shared/form/ui/form-section";
import { Button, Divider, Form, Input, message, UploadProps } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useState } from "react";
import { IBannerItem } from "@/apis/banner";
import Dragger from "antd/es/upload/Dragger";
import { InboxOutlined } from "@ant-design/icons";

interface BannerItemFormProps {
  id?: string;
  initialValues?: Partial<IBannerItem>;
}

const props: UploadProps = {
  name: "file",
  multiple: true,
  beforeUpload: () => false,
  action: (file) => {
    console.log(file);
    return "success";
  },
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
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
};


const BannerItemForm = ({ id, initialValues }: BannerItemFormProps) => {
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleFinish = async (formValue: IProductFormValue) => {
    try {
      setIsLoading(true);

      if (id) {
        await updateProduct(id, formValue);
        messageApi.success("수정되었습니다");
      } else {
        await createProduct(formValue);
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
          <FormGroup title="기본 배너 위치*">
            {/*<Input width={100} placeholder="상품명을 입력하세요" />*/}
            <span>{id}</span>
          </FormGroup>

          <Divider />


          <FormGroup title="배너 링크*">
            <Form.Item name="link" rules={[{ required: true, message: "필수값입니다" }]}>
              <Input placeholder="링크 URL을 입력하세요" defaultValue={"http://"} />
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
            <Form.Item name="image">
              <Dragger {...props}>
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

        <div className="text-center">
          <Button htmlType="submit" type="primary" loading={isLoading}>
            저장
          </Button>
        </div>
      </DefaultForm>
    </>
  );
};

export default React.memo(BannerItemForm);
