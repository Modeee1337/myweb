// Login.tsx
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {Link} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {useAuthenticateMutation} from '../../api/authSlice';
import {useNavigate} from "react-router-dom";

const LoginFormSchema = z.object({
    email: z.string().min(6),
    password: z.string().min(6),
});

type LoginFormInputs = z.infer<typeof LoginFormSchema>;

function Login() {
    const {control, handleSubmit, formState: {errors}} = useForm<LoginFormInputs>({
        resolver: zodResolver(LoginFormSchema),
    });
    const [authenticate] = useAuthenticateMutation();
    const navigate = useNavigate();

    const onSubmit = async (data: LoginFormInputs) => {
        try {
            const result = await authenticate(data).unwrap();
            localStorage.setItem('token', result.accessToken);
            navigate("/");
        } catch (err) {
            //todo
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{mt: 1}}>
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        render={({field}) =>
                            <TextField {...field}
                                       margin="normal"
                                       required
                                       fullWidth
                                       id="email"
                                       label="Email Address"
                                       autoComplete="email"
                                       autoFocus
                                       error={!!errors.email}
                                       helperText={errors.email?.message}
                            />
                        }
                    />
                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        render={({field}) =>
                            <TextField {...field}
                                       margin="normal"
                                       required
                                       fullWidth
                                       label="Password"
                                       type="password"
                                       id="password"
                                       autoComplete="current-password"
                                       error={!!errors.password}
                                       helperText={errors.password?.message}
                            />
                        }
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>

                        </Grid>
                        <Grid item>
                            <Link to={"/register"}>
                                <Button>Don't have an account? Sign up</Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default Login;