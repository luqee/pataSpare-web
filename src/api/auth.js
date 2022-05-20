import autoApi from './config';

export const getUser = (user, cb) => {
	autoApi.get('/auth/user', {
		headers: {'Authorization': 'Bearer '+ user.token}
	})
	.then((response) => cb(response.data))
	.catch((error) => {
		console.log('Error getting user');
		console.log(error);
	})
}

export const logout = (user, cb) => {
	autoApi.post(`/auth/logout`,{},{
		headers: {
				'Authorization': 'Bearer '+ user.token
		}
	})
	.then((response) => {
		if (response.status === 201) {
            cb(response.data)
        }
	})
	.catch((error) => {
		console.log(error);
	})
}

export const postRegister = (postData, cb) => {
	autoApi.post(`/auth/register`, JSON.stringify(postData))
	.then((response) => cb(response))
	.catch((error) => cb(error))
}

export const postLogin = (postData, cb) => {
	autoApi.post(`/auth/login`, JSON.stringify(postData))
	.then((response) => cb(response))
	.catch((error) => cb(error))
}

export const socialSignIn = (postData, cb) => {
	autoApi.post(`/auth/social/google`, JSON.stringify(postData))
	.then((response) => {
		if (response.data.status === 200) {
            cb(response.data)
        }
	})
	.catch((error) => {
		console.log(error);
	})
}

export const resendEmail = (email, cb) => {
	autoApi.get(`/auth/email/resend?email=${email}`)
	.then((response) => {
		if (response.data.status === 200) {
            cb(response.data.data)
        }
	})
	.catch((error) => {
		console.log(error);
	})
}

export const getVerifyMail = (query, cb) => {
	autoApi.get(query)
	.then((response) => {
		if (response.data.status === 200) {
            cb(response.data)
        }
	})
	.catch((error) => {
		console.log(error);
	})
}

export const sendResetLink = (payload, cb) => {
	autoApi.post(`/auth/password/email`, JSON.stringify(payload))
	.then((response) => {
		if (response.data.status === 200) {
            cb(response.data.data)
        }
	})
	.catch((error) => {
		console.log(error);
	})
}

export const resetPassword = (payload, cb) => {
	autoApi.post(`/auth/password/reset`, JSON.stringify(payload))
	.then((response) => {
		if (response.data.status === 201) {
            cb(response.data.data)
        }
	})
	.catch((error) => {
		console.log(error);
	})
}