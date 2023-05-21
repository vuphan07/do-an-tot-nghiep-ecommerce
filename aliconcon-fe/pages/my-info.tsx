import React from 'react';
import MainLayout from '../components/MainLayout';
import ProfileContainer from '../containers/Profile';

export default function Home() {
  return (
    <MainLayout title="home">
      <ProfileContainer />
    </MainLayout>
  );
}
