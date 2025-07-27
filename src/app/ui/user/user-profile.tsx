'use client';

import { useSession } from 'next-auth/react';
import React from 'react';
import styles from './UserProfile.module.css';

const UserProfile = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div className={styles.skeleton} />;
  }

  return (
    <div className={styles.userProfile}>
     User : {session?.user?.name && <span>{session.user.name}</span>}
    </div>
  );
};

export default UserProfile;

