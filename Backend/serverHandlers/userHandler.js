const ERROR_MESSAGES = {
    userExists: 'User is already registered.',
    emailFormat: 'Check your email format.',
    passwordShort: 'Password is too short.',
    phoneNumber: 'Wrong Phone Number .',
    needSignUp: 'You need to sign up first.',
    wrongPassword: 'Email exists, but the password seems wrong.',
    successAddUser: 'User added successfully.',
}

const MIN_PASSWORD_LENGTH = 5
const PHONE_NUMBER_LENGTH = 10

function checkEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const existingUser = users.find(user => user.email.toLowerCase() === email.toLowerCase())
    
    if (existingUser) {
        return { valid: false, message: ERROR_MESSAGES.userExists }
    }

    if (!emailRegex.test(email)) {
        return { valid: false, message: ERROR_MESSAGES.emailFormat }
    }
    
    return { valid: true };
}

function checkPassword(password) {
    if (password.length < MIN_PASSWORD_LENGTH) {
        return { valid: false, message: ERROR_MESSAGES.passwordShort }
    }
    return { valid: true }
}

function checkPhoneNumber(phoneNumber) {
    if (phoneNumber.length == PHONE_NUMBER_LENGTH) {
        return { valid: false, message: ERROR_MESSAGES.phoneNumber }
    }
    return { valid: true }
}

function checkUser(user) {
    const response = { message: '', result: false }
    const existingUser = users.find(existUser => existUser.email.toLowerCase() === user.email.toLowerCase())

    if (!existingUser) {
        response.message = ERROR_MESSAGES.needSignUp
        return response
    }

    if (existingUser.password === user.password) {
        response.message = 'Everything is fine. Go inside.'
        response.result = true
        return response
    } else {
        response.message = ERROR_MESSAGES.wrongPassword
        return response
    }
}

function addUser(user) {
    const response = { message: '', result: false }
    const emailCheck = checkEmail(user.email)
    const passwordCheck = checkPassword(user.password)
    const phoneNumberCheck = checkPhoneNumber(user.phoneNumber)

    if (emailCheck.valid && passwordCheck.valid && phoneNumberCheck.valid) {
        users.push({ username: user.username, email: user.email, password: user.password })
        response.result = true
        response.message = ERROR_MESSAGES.successAddUser
    } else {
        response.message = emailCheck.message || passwordCheck.message || phoneNumberCheck.message
    }
    return response
}

module.exports = {
    checkUser,
    addUser
};