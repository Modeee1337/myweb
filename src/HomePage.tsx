// HomePage.tsx
import { Box, Typography } from '@mui/material';

function HomePage() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                flexGrow: 1,
            }}
        >
            <Typography variant="h2" gutterBottom>
                Welcome to CSGOInsight
            </Typography>
            <Typography variant="h5" gutterBottom>
                This app provides statistics about the popular game CSGO.
            </Typography>
        </Box>
    );
}

export default HomePage;