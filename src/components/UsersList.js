import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchUsers, addUser } from '../store';
import Skeleton from './Skeleton';
import Button from './Button';
import useThunk from '../hooks/useThunk';

export default function UsersList() {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] =
    useThunk(fetchUsers);
  const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);

  const { data } = useSelector((state) => {
    return state.users;
  });

  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

  const handleUserAdd = () => {
    doCreateUser();
  };
  let content;
  if (isLoadingUsers) {
    content = <Skeleton times={6} className='h-10 w-full' />;
  } else if (loadingUsersError) {
    content = <div>Error fetching data</div>;
  } else {
    content = data.map((user) => {
      return (
        <div
          key={user.id}
          className='mb-2 border rounded bg-blue-50 border-blue-300'
        >
          <div className='flex p-2 justify-between items-center cursor-pointer'>
            {user.name}
          </div>
        </div>
      );
    });
  }

  return (
    <div>
      <div className='flex flex-row justify-between items-center m-3'>
        <h1 className='m-2 text-xl text-blue-400'>Users</h1>

        <Button
          className=' text-blue-400 border border-blue-200'
          outline
          onClick={handleUserAdd}
          loading={isCreatingUser}
        >
          + Add User
        </Button>

        {creatingUserError && 'Error creating user.. '}
      </div>
      {content}
    </div>
  );
}
