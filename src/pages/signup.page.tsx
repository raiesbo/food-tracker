import { ErrorMessagePassword } from '@/components/ErrorMessage';
import { Layout } from '@/components/Layout';
import { validatePassword } from '@/utils';
import { paths } from '@/utils/paths';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import styles from './signup.module.scss';

export default function SignIn() {
    const router = useRouter();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSP, setIsSp] = useState('SP');

    const [isDisabled, setIsDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const [passwordError, setPasswordError] = useState(false);

    const handleClickButton = async () => {
        setIsLoading(true);

        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password,
                isSP: isSP === 'SP'
            })
        }).finally(() => setIsLoading(false));

        if (response.ok) {
            return router.push(paths.home);
        }
    };

    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        setPassword(value);
        setIsDisabled(!value || !validatePassword(value).isValid);
        setPasswordError(value === '' ? false : !validatePassword(value).isValid);
    };

    return (
        <Layout withTopMargin>
            <div className={styles.root}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
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
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            sx={{ backgroundColor: 'white' }}
                        />
                        <div>
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
                                onChange={onPasswordChange}
                                sx={{ backgroundColor: 'white' }}
                            />
                            {passwordError && (
                                <ErrorMessagePassword
                                    conditions={validatePassword(password).conditions}
                                />
                            )}
                        </div>
                        <FormLabel id="demo-row-radio-buttons-group-label">Register as:</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            onChange={(e) => setIsSp(e.target.value)}
                        >
                            <FormControlLabel value={"CUSTOMER"} control={<Radio />} label="Private" defaultChecked />
                            <FormControlLabel value={"SP"} control={<Radio />} label="Business" />
                        </RadioGroup>
                        <Button
                            disabled={isDisabled || isLoading}
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
            </div>
        </Layout>
    );
}
