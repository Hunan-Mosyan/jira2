import AuthProfileDropDown from "../../sheard/AuthProfileDropDown";

import { Flex, Button } from "antd";
import { Link } from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../../core/utilis/constants";
import { useSelector } from "react-redux";
import "./index.css";

const Header = () => {
  const {
    authUserInfo: { isAuth, userData },
  } = useSelector((store) => store.userProfile);
  return (
    <div className="main_header">
      <Flex justify="space-between" align="center">
        <div>Logo</div>
        <div>
          {isAuth ? (
            <AuthProfileDropDown userProfileInfo={userData} />
          ) : (
            <Link to={ROUTE_CONSTANTS.LOGIN}>
              <Button>Sign in</Button>
            </Link>
          )}
        </div>
      </Flex>
    </div>
  );
};

export default Header;
