import { useAuthentication } from './Auth';
import { SignIn} from './Auth';
import { Sidebar } from './components/Sidebar';
import { UserData } from './components/data/UserData';

export const GameApp = () => {
  const [user] = useAuthentication();
  return (
    <main className='app-content d-flex'>
      <Sidebar activePage='Dashboard'/>
      {user ? (
        <UserData user={user} />
      ) : (
        <SignIn />
      )}
    </main>
  );
};
