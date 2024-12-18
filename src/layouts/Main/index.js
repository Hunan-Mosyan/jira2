import Header from '../../components/global/Header';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div>
            <Header></Header>
            <main>
                <Outlet></Outlet>
            </main>
        </div>
           )
};

export default MainLayout