export type LoginUser = {
  username: string;
  password: string;
};

export type UserState = {
  accessToken: string;
};

export interface IInitialState {
  user: UserState | null;
  isLoading: boolean;
}
// | {
// 		status: 'fetching'
// 		error?: string | null | {}
// 		isLoading?: boolean
// 		user: {
// 			name: string
// 			email: string
// 			phone: string
// 		}
//   }
// | {
// 		status: 'loading'
// 		error?: string | null | {}
// 		isLoading?: boolean
// 		user: {
// 			name: string
// 			email: string
// 			phone: string
// 		}
//   }
// | {
// 		user?: {
// 			name: string
// 			email: string
// 			phone: string
// 		}
// 		accessToken?: string
// 		isLoading?: boolean
// 		status?: 'logged'
// 		error?: string | null | {}
//   }
// | {
// 		status: 'empty'
// 		error?: string | null | {}
// 		isLoading?: boolean
// 		user: {
// 			name: string
// 			email: string
// 			phone: string
// 		}
//   }

export type BackendUser = {
  user?: {
    username: string;
  };
  accessToken: string;
  refreshToken?: string;
};
