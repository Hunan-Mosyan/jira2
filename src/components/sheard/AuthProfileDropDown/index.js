import { Avatar, Dropdown, Button, Typography, Flex, theme  } from "antd"
import {signOut} from 'firebase/auth'
import { auth } from "../../../services/firbase"
import { ROUTE_CONSTANTS } from "../../../core/utils/constants"
import { useNavigate } from "react-router-dom"
import './index.css'

const { useToken } = theme
const { Text } = Typography
const AuthProfileDropDown = () => {
   const { token } = useToken( )
   const  navigate = useNavigate()

   const handleSignOut = async () => {
     try {
      await signOut(auth)
     }catch(e) {
      console.log(e, 'signout error');
     }
   }
const items = [
   {
      label: 'Profile',
      key:'0',
      onClick: () => navigate(ROUTE_CONSTANTS.PROFILE)
   },
   {
      label: 'Cabinet',
      key:'1',
      onClick: () => navigate(ROUTE_CONSTANTS.CABINET)
   },
   {
      label: 'Logout',
      key:'logout',
      onClick: handleSignOut
   }
]
     return ( 
        <Dropdown 
        menu={{items}} 
        trigger={["click"]}
        dropdownRender={(menu) => {
         return (
            <div
            style={{
               borderRadius: token.borderRadiusLG,
               backgroundColor: token.colorBgElevated,
               boxShadow: token.boxShadowSecondary
            }}
             >
               <Flex vertical align="center" style={{padding:token.sizeMS}}>
                  <Avatar src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Fso%2Favatar&psig=AOvVaw03xcevuWqoibuyjV53sPzD&ust=1729352039164000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCKj67ZKhmIkDFQAAAAAdAAAAABAE"/>
                  <Text>John Smith</Text>
                  <Text type="secondary" underline>johnsmith@gmail.com</Text>
               </Flex>
               {menu}
            </div>
         )
        }}
        >
          <Avatar size={"large"} className="user_profile_avatar">
            J S
          </Avatar>
        </Dropdown>
     )

}

 export default AuthProfileDropDown
