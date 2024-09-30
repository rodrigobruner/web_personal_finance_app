import {useTranslations} from 'next-intl';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function AppPage() {
    const t = useTranslations('HomePage');
    return (
        <Container maxWidth="lg" sx={{my:0}}>
            <Box
                sx={{
                    my: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
            <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
                {t('title')}
            </Typography>
        </Box>
    </Container>);
}