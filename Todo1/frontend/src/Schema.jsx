import * as yup from 'yup'

export const userSchema =yup.object({
    name : yup.string().min(2).max(25).required('name should be 2 to 25 character'),
    email : yup.string().email().required('Provide a email'),
    designation : yup.string().min(2).max(25).required('designation should be 2 to 25 character'),
    password : yup.string().min(6).matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Choose a strong password"
    ).required(),
    doj : yup.date().required('Provide date'),
    hr : yup.string().required("Choose Departments")

})