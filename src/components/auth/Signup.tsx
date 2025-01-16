import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import sdk from '../../../sdk';

// Define Zod schema
const signupSchema = z.object({
  fname: z.string()
    .min(3, "First Name must be at least 3 characters")
    .regex(/^[A-Za-z\s]+$/, "Name can only contain alphabets and spaces"),
  lname: z.string()
    .min(3, "Last Name must be at least 3 characters")
    .regex(/^[A-Za-z\s]+$/, "Name can only contain alphabets and spaces"),
  email: z.string().email("Invalid email format"),
  password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character (@, $, !, %, *, ?, &)"),
});

type SignupForm = z.infer<typeof signupSchema>;

function Signup({navigation}): React.JSX.Element {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });
  const handleSignup = async (data: SignupForm) => {
    try {
      const response = await sdk.currentUser.create({
        email: data.email,
        password: data.password,
        firstName: data.fname,
        lastName: data.lname,
      });
      console.log(
      response.data.data.id.uuid
      );
      navigation.navigate('Login');     
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.title}>Market</Text>
        <Text style={styles.title2}>Place!</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.sign}>Signup</Text>

        {/* First Name */}
        <Controller
          control={control}
          name="fname"
          render={({ field: { onChange, value } }) => (
            <TextInput
              mode="outlined"
              placeholder="First Name"
              value={value}
              onChangeText={onChange}
              style={{ marginTop: 60, borderRadius: 20 }}
              theme={{ roundness: 20 }}
              error={!!errors.fname}
            />
          )}
        />
        {errors.fname && <Text style={styles.errorText}>{errors.fname.message}</Text>}

        {/* Last Name */}
        <Controller
          control={control}
          name="lname"
          render={({ field: { onChange, value } }) => (
            <TextInput
              mode="outlined"
              placeholder="Last Name"
              value={value}
              onChangeText={onChange}
              style={{ marginTop: 15, borderRadius: 20 }}
              theme={{ roundness: 20 }}
              error={!!errors.lname}
            />
          )}
        />
        {errors.lname && <Text style={styles.errorText}>{errors.lname.message}</Text>}

        {/* Email */}
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              mode="outlined"
              placeholder="Email"
              value={value}
              onChangeText={onChange}
              style={{ marginTop: 15, borderRadius: 20 }}
              theme={{ roundness: 20 }}
              error={!!errors.email}
            />
          )}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

        {/* Password */}
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <TextInput
              mode="outlined"
              placeholder="Password"
              secureTextEntry
              value={value}
              onChangeText={onChange}
              style={{ marginTop: 15, borderRadius: 20 }}
              theme={{ roundness: 20 }}
              error={!!errors.password}
            />
          )}
        />
        {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

        {/* Submit Button */}
        <Button mode="contained" style={styles.btn} onPress={handleSubmit(handleSignup)}>
          Signup
        </Button>
        <Button mode='contained' onPress={()=>{navigation.navigate('Login')}}>
          Login
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  head: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    alignSelf: 'center',
    marginTop: 100,
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    fontStyle: 'italic',
  },
  title2: {
    fontSize: 25,
    fontWeight: '700',
    color: 'blue',
  },
  body: {
    flex: 5,
    backgroundColor: '#2467B3',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    padding: 15,
  },
  sign: {
    alignSelf: 'center',
    fontSize: 25,
    color: '#fff',
    fontWeight: '900',
  },
  btn: {
    marginTop: 20,
    backgroundColor: 'green',
    width: '50%',
    alignSelf: 'center',
  },
  errorText: {
    color: 'yellow',
    fontSize: 13,
    marginLeft: 15,
    marginTop: 5,
  },
});

export default Signup;
