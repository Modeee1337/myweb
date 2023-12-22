// Register.tsx
import { TextField, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRegisterMutation } from '../../api/authSlice';
import {Link, useNavigate} from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {toast} from "react-toastify";

const RegisterFormSchema = z.object({
    firstname: z.string(),
    lastname: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    username: z.string(),
});

type RegisterFormInputs = z.infer<typeof RegisterFormSchema>;

export default function Register() {
    const { control, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>({
        resolver: zodResolver(RegisterFormSchema),
    });
    const [register] = useRegisterMutation();
    const navigate = useNavigate();

    const onSubmit = async (data: RegisterFormInputs) => {
        try {
            const result = await register(data).unwrap();
            localStorage.setItem('token', result.accessToken);
            navigate("/");
            toast.success("You have successfully registered!")
        } catch (error) {
            //based on message, set error
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
                    color: 'white',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{mt: 1,  color: 'white',}}>
                    <Controller
                        name="firstname"
                        control={control}
                        defaultValue=""
                        render={({field}) =>
                            <TextField {...field}
                                       margin="normal"
                                       required
                                       fullWidth
                                       id="firstname"
                                       label="First Name"
                                       autoComplete="firstname"
                                       autoFocus
                                       error={!!errors.firstname}
                                       helperText={errors.firstname?.message}
                            />
                        }
                    />
                    <Controller
                        name="lastname"
                        control={control}
                        defaultValue=""
                        render={({field}) =>
                            <TextField {...field}
                                       margin="normal"
                                       required
                                       fullWidth
                                       id="lastname"
                                       label="Last Name"
                                       autoComplete="lastname"
                                       error={!!errors.lastname}
                                       helperText={errors.lastname?.message}
                            />
                        }
                    />
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
                    <Controller
                        name="username"
                        control={control}
                        defaultValue=""
                        render={({field}) =>
                            <TextField {...field}
                                       margin="normal"
                                       required
                                       fullWidth
                                       id="username"
                                       label="Username"
                                       autoComplete="username"
                                       error={!!errors.username}
                                       helperText={errors.username?.message}
                            />
                        }
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign Up
                    </Button>
                    <Grid container>
                        <Grid item xs>

                        </Grid>
                        <Grid item>
                            <Link to={"/login"}>
                                <Button>Already have an account? Sign in</Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}