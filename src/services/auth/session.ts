import { GetServerSidePropsContext } from 'next';

import { authService } from './authService';
import { tokenService } from './tokenService';

type Permissions =
  | 'view:products'
  | 'view:users'
  | 'view:motorcycles'
  | 'view:services'
  | 'view:home'
  | 'manage:products'
  | 'manage:users'
  | 'manage:motorcycles'
  | 'manage:services'
  | 'manage:home'
  | 'teste';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withSession(cb: any, permission: Permissions = 'view:home') {
  return async (context: GetServerSidePropsContext) => {
    try {
      const { data } = await authService.getSession({ context: context });

      const modifiedCtx = {
        ...context,
        req: {
          ...context.req,
          session: data
        }
      };

      if (!data.permission.permissions.includes(permission)) {
        return {
          redirect: {
            permanent: false,
            destination: '/sign-in'
          }
        };
      }

      return cb(modifiedCtx);
    } catch (err) {
      tokenService.delete();

      return {
        redirect: {
          permanent: false,
          destination: '/sign-in'
        }
      };
    }
  };
}

// export function useSession() {
//   const [session, setSession] = React.useState(null);
//   const [loading, setLoading] = React.useState(true);
//   const [error, setError] = React.useState(null);

//   React.useEffect(() => {
//     authService
//       .getSession()
//       .then((userSession) => {
//         console.log(userSession);
//         setSession(userSession);
//       })
//       .catch((err) => {
//         setError(err);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   return {
//     data: {
//       session
//     },
//     error,
//     loading
//   };
// }

// export function withSessionHOC(Component) {
//   return function Wrapper(props) {
//     const router = useRouter();
//     const session = useSession();

//     if (!session.loading && session.error) {
//       console.log('redireciona o usuário para a home');
//       router.push('/?error=401');
//     }

//     const modifiedProps = {
//       ...props,
//       session: session.data.session
//     };

//     return <Component {...modifiedProps} />;
//   };
// }
