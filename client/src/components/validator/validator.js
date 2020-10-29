const haveUpper = (input) => {
    for (let i = 0; i < input.length; i++) {
        if (input[i] === input[i].toUpperCase() && isNaN(input[i])) {
            return true

        }
    }
}

export const validator = (input) => {
    switch (input.type) {
        case 'login':
            if (input.value.length < 3) {
                return { message: 'Login is to short', isOk: false }
            } else {
                return { message: 'ok', isOk: true }
            }
        case 'pass':
            if (input.value.length < 8) {
                return { message: 'Password is to short', isOk: false }
            } else if (!/[0-9]/.test(input.value)) {
                return { message: 'Password should contain at least one number', isOk: false }
            } else if (haveUpper(input.value) === undefined) {
                return { message: 'Password should contain at least one uppercase letter', isOk: false }
            } else return { message: 'ok', isOk: true }
        case 'mail':
            if (!/^[a-zA-Z0-9_\-.]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-.]+$/.test(input.value)) {
                return { message: 'Incorrect e-mail address', isOk: false }
            } else return { message: '', isOk: true }
        default:
            console.log('something went wrong');
            break;



    }
}


