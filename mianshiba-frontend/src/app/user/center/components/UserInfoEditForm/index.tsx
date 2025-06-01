import { App, Button, Form, Input } from "antd";
import { editUserUsingPost } from "@/api/userController";
import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/stores";
import { setLoginUser } from "@/stores/loginUser";
import { useRouter } from "next/navigation";

interface Props {
    user: API.LoginUserVO;
}

/**
 * 用户信息编辑表单
 * @constructor
 */
const UserInfoEditForm = (props: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const [form] = Form.useForm();
    const { message } = App.useApp();
    const { user } = props;

    // 确保在组件挂载时设置表单的初始值
    React.useEffect(() => {
        form.setFieldsValue(user);
    }, [user, form]);

    /**
     * 提交
     *
     * @param values
     */
    const doSubmit = async (values: API.UserEditRequest) => {
        const hide = message.loading("正在修改...");
        try {
            await editUserUsingPost(values);
            hide();
            message.success("修改成功");
            dispatch(setLoginUser({ ...user, ...values }));
            router.refresh();
        } catch (e: any) {
            hide();
            message.error("修改失败，" + e.message);
        }
    };

    return (
        <Form
            form={form}
            style={{ marginTop: 24, maxWidth: 480 }}
            labelCol={{ span: 4 }}
            labelAlign="left"
            onFinish={doSubmit}
        >
            <Form.Item label="手机号" name="phoneNumber">
                <Input placeholder="请输入手机号" />
            </Form.Item>
            <Form.Item label="邮箱" name="email">
                <Input placeholder="请输入邮箱" />
            </Form.Item>
            <Form.Item label="年级" name="grade">
                <Input placeholder="请输入年级" />
            </Form.Item>
            <Form.Item label="工作经验" name="workExperience">
                <Input placeholder="请输入工作经验" />
            </Form.Item>
            <Form.Item label="擅长方向" name="expertiseDirection">
                <Input placeholder="请输入擅长方向" />
            </Form.Item>
            <Form.Item>
                <Button style={{ width: 180 }} type="primary" htmlType="submit">
                    提交
                </Button>
            </Form.Item>
        </Form>
    );
};

const AppUserInfoEditForm: React.FC<{ user: API.LoginUserVO }> = ({ user }) => (
    <App>
        <UserInfoEditForm user={user} />
    </App>
);

export default AppUserInfoEditForm;