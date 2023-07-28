import Button from './Button';
import { removeUser } from '../store';
import ExpandablePanel from './ExpandablePanel';
import AlbumsList from './AlbumsList';
import useThunk from '../hooks/useThunk';
import { MdDelete } from 'react-icons/md';

function UsersListItem({ user }) {
  const [doRemoveUser, isLoading, error] = useThunk(removeUser);

  const handleClick = () => {
    doRemoveUser(user);
  };

  const header = (
    <>
      <Button className='mr-3' loading={isLoading} onClick={handleClick}>
        <MdDelete />
      </Button>
      {error && <div>Error deleting user.</div>}
      {user.name}
    </>
  );

  return (
    <ExpandablePanel header={header}>
      <AlbumsList user={user} />
    </ExpandablePanel>
  );
}

export default UsersListItem;
