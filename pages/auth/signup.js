import { useFormik} from 'formik';
import * as yup from 'yup';
import { signIn, useSession } from 'next-auth/react';
import { authentication } from '@/settings/firebase.setting';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';


//validation rules
const validationRules = yup.object().shape({
    email:yup.string()
    .required('field is compulsory'),
    password:yup.string()
    .required().
    min(8, 'must be up to 8 characters')
    .max(20, 'max of 20 characters'),
    //.oneOf([yup.ref('passwordConfirmation'),null],'Your password must match')
    passwordConfirmation:yup.string()
    .oneOf([yup.ref('password'),null], "Passwords must match")
})

export default function Signup() {
    const {data:session} = useSession(); //shows the info of the active account
    console.log(session) 

    const router = useRouter();

    if (session) { //meaning if the session is active
        router.push('/feeds')
    }

    const handleGoogleEmailPasswordCreateAccount = async (userEmail,userPassword) => {
        createUserWithEmailAndPassword(authentication,userEmail,userPassword)
        .then((user) => {
            alert(`${user} created successfully`)
        })
        .catch((error) => console.log(error))
    };

    const {handleBlur,handleSubmit,handleChange,errors,touched,values} =  useFormik({
        initialValues:{email:'',password:'',passwordConfirmation:''}, //the IDs are used here
        onSubmit: values => { //this block of code runs only if no errors occur
            handleGoogleEmailPasswordCreateAccount(values.email,values.password) 
        },
        validationSchema:validationRules //returns the yup function, and handles errors
    })

  return (
    <>
        <main className='h-screen flex justify-center items-center'>
            <div className="w-[480px] sm:min-h-[480px] flex flex-col gap-5">
                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                    <input 
                    id='email'
                    type="email" 
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Email address"
                    className="py-3 sm:py-5 px-2 border border-indigo-400 rounded-lg bg-white/60"
                    />
                    {errors.email && touched.email ? <span className='text-red-500'>{errors.email}</span> : null}
                    <input 
                    id='password'
                    type="password" 
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Password"
                    className="py-3 sm:py-5 px-2 border border-indigo-400 rounded-lg bg-white/60"
                    />
                    {errors.password && touched.password ? <span className='text-red-500'>{errors.password}</span> : null}

                    <input 
                    id='passwordConfirmation'
                    type="password" 
                    value={values.passwordConfirmation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Confirm Password"
                    className="py-3 sm:py-5 px-2 border border-indigo-400 rounded-lg bg-white/60"
                    />
                    {errors.passwordConfirmation && touched.passwordConfirmation ? <span className='text-red-500'>{errors.passwordConfirmation}</span> : null}

                    <button type='submit' className="max-w-[160px] h-12 bg-indigo-800 rounded-lg text-white font-bold"
                    >Create account</button>
                </form>
        
                <div className="w-full grid grid-cols-3 gap-1">
                    <button 
                    className="w-full h-12 bg-green-600 rounded-lg text-white font-bold"
                    onClick={() => signIn('google')}>Google</button>
                    <button 
                    className="w-full h-12 bg-gray-700 rounded-lg text-white font-bold"
                    onClick={() => signIn('github')}>Github</button>
                    <button 
                    className="w-full h-12 bg-sky-600 rounded-lg text-white font-bold"
                    onClick={() => signIn('twitter')}>Twitter</button>
                </div>
        
            </div>
        </main>
    </>
  )
}
