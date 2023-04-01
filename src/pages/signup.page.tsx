import { NavigationMenu } from '@/components/NavigationMenu';
import { paths } from '@/utils/paths';
import { FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function SignIn() {
    const router = useRouter();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSP, setIsSp] = useState('SP');

    const handleClickButton = async () => {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password,
                isSP: isSP === 'SP'
            })
        })

        if (response.ok) {
            return router.push(paths.home)
        }
    }

    return (
        <>
            <NavigationMenu />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            name="firstName"
                            autoComplete="name"
                            autoFocus
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            sx={{ backgroundColor: 'white' }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="name"
                            autoFocus
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            sx={{ backgroundColor: 'white' }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            sx={{ backgroundColor: 'white' }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            sx={{ backgroundColor: 'white' }}
                        />
                        <FormLabel id="demo-row-radio-buttons-group-label">Register as:</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            onChange={(e) => setIsSp(e.target.value)}
                        >
                            <FormControlLabel value={"CUSTOMER"} control={<Radio />} label="Client" defaultChecked />
                            <FormControlLabel value={"SP"} control={<Radio />} label="Restaurant" />
                        </RadioGroup>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleClickButton}
                        >
                            Sign Up
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href={paths.login} variant="body2">
                                    {"Do have an account? Sign In"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    );
}
