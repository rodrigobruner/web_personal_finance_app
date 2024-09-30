import {useTranslations} from 'next-intl';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import Login from '@/components/login';

export default function HomePage() {
    const t = useTranslations('Pages.HomePage');
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
            <Login></Login>
        </Box>
    </Container>);
}