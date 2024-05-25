import { createSlice } from '@reduxjs/toolkit'
import { IInitialState } from './user.types'
import { getStoreLocal } from 'utils/local-storage'
import { checkAuth, login, logout } from './user.actions'
// import { AppThunk } from '../../hooks/reduxHooks'
// import axios from 'axios'
// import Cookies from 'js-cookie'
// import { ACCESS_TOKEN, REFRESH_TOKEN } from '@Constants/tokens'

const initialState: IInitialState = {
	user: getStoreLocal('user'),
	isLoading: false
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		// setUser: (state, action: PayloadAction<UserState>) => action.payload,
		// logoutUser: state => ({
		// 	status: 'empty',
		// 	error: null,
		// 	user: {
		// 		name: '',
		// 		email: '',
		// 		phone: ''
		// 	}
		// }),
		// setError: (state, action: PayloadAction<UserState>) => action.payload
	},
	extraReducers: builder => {
		builder
			.addCase(login.pending, state => {
				state.isLoading = true
			})
			.addCase(login.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.user = payload
			})
			.addCase(login.rejected, state => {
				state.isLoading = false
				state.user = null
			})
			.addCase(logout.fulfilled, state => {
				state.isLoading = false
				state.user = null
			})
			.addCase(checkAuth.fulfilled, (state, { payload }) => {
				state.user = payload
			})
	}
})

// export const loginUser =
// 	(data: LoginUser): AppThunk =>
// 	dispatch => {
// 		axios
// 			.post<BackendUser>('/auth/login', data)
// 			.then(response => {
// 				if (response.status !== 200) {
// 					throw new Error(`Ошибка ${response.status}`)
// 				}

// 				Cookies.set(ACCESS_TOKEN, response.data.accessToken)
// 				Cookies.set(REFRESH_TOKEN, response.data.refreshToken)
// 				dispatch(
// 					setUser({
// 						user: response.data.user,
// 						accessToken: response.data.accessToken,
// 						status: 'logged'
// 					})
// 				)
// 				window.location.href = '/campaign'
// 			})
// 			.catch((error: any) => {
// 				dispatch(
// 					setError({
// 						user: {
// 							name: '',
// 							email: '',
// 							phone: ''
// 						},
// 						status: 'fetching',
// 						error: error?.response?.data.message || 'Unknown error'
// 					})
// 				)
// 				return error?.response?.data
// 			})
// 	}

// export const checkAuth = (): AppThunk => dispatch => {
// 	axios
// 		.post('/auth/login/access-token', {
// 			refreshToken: Cookies.get(REFRESH_TOKEN)
// 		})
// 		.then(response => {
// 			Cookies.remove(ACCESS_TOKEN)
// 			Cookies.set(ACCESS_TOKEN, response.data.accessToken)
// 			dispatch(
// 				setUser({
// 					user: response.data.user,
// 					accessToken: response.data.accessToken,
// 					status: 'logged',
// 					isLoading: false
// 				})
// 			)
// 		})
// 		.catch((error: any) => {
// 			dispatch(
// 				setUser({
// 					status: 'fetching',
// 					user: {
// 						name: '',
// 						email: '',
// 						phone: ''
// 					}
// 				})
// 			)
// 			Cookies.remove(ACCESS_TOKEN)
// 			Cookies.remove(REFRESH_TOKEN)
// 			dispatch(
// 				setError({
// 					user: {
// 						name: '',
// 						email: '',
// 						phone: ''
// 					},
// 					status: 'fetching',
// 					error: error?.response?.data.message || 'Unknown error',
// 					isLoading: false
// 				})
// 			)
// 			return error?.response?.data
// 		})
// }
