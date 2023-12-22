// Footer.tsx
import {Box, Typography} from '@mui/material';
import {Link} from 'react-router-dom';

function Footer() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                height: '10vh',
                textAlign: 'center',
            }}
            component={'footer'}
        >
            <Typography variant="body1">
                <Link to="/">Main Menu</Link>
            </Typography>
            <Typography variant="body1">
                <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">
                    External Website
                </a>
            </Typography>
            <Typography variant="body2" color="text.secondary">
                &copy; {new Date().getFullYear()} CSGOInsight
            </Typography>
        </Box>
    );
}

export default Footer;