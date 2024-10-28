import { useContext, useEffect } from 'react'
import { Button, Form, Input } from 'antd'
import { AuthContext } from '../../context/authContext'
import './index.css'

const Profile = () => {
    const {userProfileInfo} = useContext(AuthContext)
    const [form] = Form.useForm()

    useEffect(() => {
        const {  uid, ... restData} = userProfileInfo;

        form.setFieldsValue(restData);
    },[form, userProfileInfo])

    console.log(userProfileInfo,'userProfileInfo');
return (
    <div>
        <Form layout='vertical' form={form}>
            <Form.Item
            label='First Name'
            name='firstName'
            >
                <Input
                placeholder='First Name'/>
            </Form.Item>

            <Form.Item
            label='Last Name'
            name='lastName'
            >
                <Input
                placeholder='Last Name'/>
            </Form.Item>

          
            <Form.Item
            label='Email'
            name='email'
            >
                <Input
                readOnly
                placeholder='email'/>
            </Form.Item>

            <Form.Item
            label='Phone Number'
            name='phoneNumber'
            >
                <Input
                placeholder='Phone Number'/>
            </Form.Item>
            <Button type='primary' htmlType='submit'>
                Submit
            </Button>
        </Form>
        <h2>Profile</h2>
    </div>
)
}

export default Profile