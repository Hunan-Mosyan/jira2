import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { ROUTE_CONSTANTS } from '../../core/utilis/constants';
import "./index.css";

const {Sider, Content } = Layout;

const menuItems = [
    {
        label: 'Personal Information',
        key: ROUTE_CONSTANTS.PROFILE
    },
    {
        label: 'Cabinet',
        key: ROUTE_CONSTANTS.CABINET
    }
]

const CabinetLayout = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const handleNavigate = ({ key }) => {
        navigate(key);
    };

   return(
    <div className="cabinet_layout_main_container">
            <Sider width={200} style={{backgroundColor:colorBgContainer}} collapsible>
                <Menu
                mode="inline"
                items={menuItems}
                selectedKeys={[pathname]}
                onSelect={handleNavigate}
                />
            </Sider>
            <Layout style={{padding:'0 24px 24px'}}>
                <Breadcrumb
                 items={[{ title: 'Cabinet' },{ title: 'Profile' }]}
                 style={{ margin: '16px 0'}}
                />
                    <Content style={{
                    padding:24,
                    margin:2,
                    minHeight:300,
                    backgroundColor:colorBgContainer,
                    borderRadius:borderRadiusLG
                }}>
                    <Outlet/>
                </Content>
            </Layout>
    </div>
   )
};

export default CabinetLayout;