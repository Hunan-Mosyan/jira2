import { Avatar, Dropdown, Typography, Flex, theme } from "antd";
import { signOut } from "firebase/auth";
import { auth } from "../../../services/firebase";
import { useNavigate } from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../../core/utilis/constants";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuth } from "../../../state-managment/slices/userProfile";

import "./index.css";
const { Text } = Typography;
const { useToken } = theme;
const AuthProfileDropDown = ({ userProfileInfo }) => {
  const dispatch = useDispatch();
  const { token } = useToken();
  const navigate = useNavigate();
  const setFullNameLetter = ({ firstName, lastName }) => {
    if (firstName && lastName) {
      return `${firstName[0]} ${lastName[0]}`;
    }
    return "-";
  };
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(setIsAuth(false));
    } catch (error) {
      console.log(error);
    }
  };
  const items = [
    {
      label: "Profile",
      key: "0",
      onClick: () => navigate(ROUTE_CONSTANTS.PROFILE),
    },
    {
      label: "Cabinet",
      key: "1",
      onClick: () => navigate(ROUTE_CONSTANTS.CABINET),
    },
    {
      label: "Logout",
      key: "logout",
      onClick: handleSignOut,
    },
  ];
  return (
    <Dropdown
      menu={{ items }}
      trigger={["click"]}
      dropdownRender={(menu) => {
        return (
          <div
            style={{
              borderRadius: token.borderRadiusLG,
              backgroundColor: token.colorBgElevated,
              boxShadow: token.boxShadowSecondary,
            }}
          >
            <Flex
              vertical
              align="center"
              style={{ padding: token.sizeMS }}
              className="profile_dropdown_container"
            >
              <Avatar src={userProfileInfo.imgUrl} />
              <Text>
                {userProfileInfo.firstName} {userProfileInfo.lastName}
              </Text>
              <Text type="secondary" underline>
                {userProfileInfo.email}
              </Text>
            </Flex>
            {menu}
          </div>
        );
      }}
    >
      <Avatar size={"large"} className="user_profile_avatar">
        {setFullNameLetter(userProfileInfo)}
      </Avatar>
    </Dropdown>
  );
};
export default AuthProfileDropDown;
