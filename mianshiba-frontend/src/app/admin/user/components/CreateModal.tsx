import { addUserUsingPost } from '@/api/userController';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { App, message, Modal } from 'antd';
import React from 'react';

interface Props {
  visible: boolean;
  columns: ProColumns<API.User>[];
  onSubmit: (values: API.UserAddRequest) => void;
  onCancel: () => void;
}

/**
 * 创建弹窗
 * @param props
 * @constructor
 */
const CreateModal: React.FC<Props> = (props) => {
  const { visible, columns, onSubmit, onCancel } = props;
  const { message } = App.useApp();

  /**
   * 添加节点
   * @param fields
   */
  const handleAdd = async (fields: API.UserAddRequest) => {
    const hide = message.loading('正在添加');
    try {
      await addUserUsingPost(fields);
      hide();
      message.success('创建成功');
      return true;
    } catch (e: any) {
      hide();
      message.error('创建失败，' + e.message);
      return false;
    }
  };

  return (
    <Modal
      destroyOnClose
      title={'创建'}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <ProTable
        type="form"
        columns={columns}
        onSubmit={async (values: API.UserAddRequest) => {
          const success = await handleAdd(values);
          if (success) {
            onSubmit?.(values);
          }
        }}
      />
    </Modal>
  );
};

const AppCreateModal: React.FC<Props> = (props) => (
  <App>
    <CreateModal {...props} />
  </App>
);

export default AppCreateModal;