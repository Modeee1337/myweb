// Layout.tsx
import { Box } from '@mui/material';
import Header from './Header.tsx';
import Footer from './Footer.tsx';
import { Outlet } from 'react-router-dom';

const Layout = () => (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
        }}
    >
        <Header />
        <Box sx={{ flex: '1 0 auto' }}>
            <Outlet />
        </Box>
        <Footer />
    </Box>
);

export default Layout;