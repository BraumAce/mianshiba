import { updateUserUsingPost } from '@/api/userController';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { App, message, Modal } from 'antd';
import React from 'react';

interface Props {
  oldData?: API.User;
  visible: boolean;
  columns: ProColumns<API.User>[];
  onSubmit: (values: API.UserAddRequest) => void;
  onCancel: () => void;
}

/**
 * 更新弹窗
 * @param props
 * @constructor
 */
const UpdateModal: React.FC<Props> = (props) => {
  const { oldData, visible, columns, onSubmit, onCancel } = props;
  const { message } = App.useApp();

  /**
   * 更新节点
   *
   * @param fields
   */
  const handleUpdate = async (fields: API.UserUpdateRequest) => {
    const hide = message.loading('正在更新');
    try {
      await updateUserUsingPost(fields);
      hide();
      message.success('更新成功');
      return true;
    } catch (e: any) {
      hide();
      message.error('更新失败，' + e.message);
      return false;
    }
  };

  if (!oldData) {
    return <></>;
  }

  return (
    <Modal
      destroyOnClose
      title={'更新'}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <ProTable
        type="form"
        columns={columns}
        form={{
          initialValues: oldData,
        }}
        onSubmit={async (values: API.UserAddRequest) => {
          const success = await handleUpdate({
            ...values,
            id: oldData?.id as any,
          } as any);
          if (success) {
            onSubmit?.(values);
          }
        }}
      />
    </Modal>
  );
};

const AppUpdateModal: React.FC<Props> = (props) => (
  <App>
    <UpdateModal {...props} />
  </App>
);

export default AppUpdateModal;