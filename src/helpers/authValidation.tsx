export function emailValidator(email: string){
    const regex = /\S+@\S+\.\S+/
    if(!email) return 'Email cannot be Empty';
    if (!regex.test(email)) return 'Please provide a valid Email Address'
    return '';
}

export function passwordValidator(password: string){
    return '';
}

export function nameValidator(name: string){
    return ''
}