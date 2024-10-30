import { useContext, useEffect, useState } from 'react'
import { Button, Form, Input, notification, Upload } from 'antd'
import { AuthContext } from '../../context/authContext'
import { db } from '../../services/firbase'
import { doc,  updateDoc } from 'firebase/firestore'
import { FIRESTORE_PATH_NAMES } from '../../core/utils/constants'
import './index.css'

const Profile = () => {
    const {userProfileInfo, getUserInfoData} = useContext(AuthContext)
    const [form] = Form.useForm()
    const [buttonLoading, setButtonLoading] = useState(false)
    const { uid, ... restData} = userProfileInfo;
    
    useEffect(() => {
        
        form.setFieldsValue(restData);
    },[form, restData])
    
        const handleEditUserProfile = async(values) => {
            setButtonLoading(true)
          try {
            const userDocRef = doc(db,FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid)
            await updateDoc(userDocRef, values)
            handleEditUserProfile(uid)
            notification.success({
                message:'User data succesfully updated'
            })
          } catch (error) {
             notification.error({
                message: 'Error :('
             })
        }finally {
              setButtonLoading(false)

          }
        }

    console.log(userProfileInfo,'userProfileInfo');
return (
    <div className='form_page_container'>
        <Form layout='vertical' form={form} onFinish={handleEditUserProfile}>
            <Form.Item
            label='Profile Image'
            >
                <Upload
                
                >

                </Upload>
            </Form.Item>

            <Form.Item
            label='First Name'
            name='firstName'
            rules={[
                {
                    required: true,
                    message:"Please input your First Name"
                }
            ]}
            >
                <Input
                placeholder='First Name'/>
            </Form.Item>

            <Form.Item
            label='Last Name'
            name='lastName'
            rules={[
                {
                    required: true,
                    message:"Please input your First Name"
                }
            ]}
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
            rules={[
                {
                    required: true,
                    message:"Please input your phoneNumber"
                }
            ]}
            >
                <Input
                placeholder='Phone Number'/>
            </Form.Item>
            <Button type='primary' htmlType='submit' loading={buttonLoading}>
                Submit
            </Button>
        </Form>
        
    </div>
)
}

export default Profile