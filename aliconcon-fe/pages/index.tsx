import React from "react";
import MainLayout from "../components/MainLayout";
import HomeContainer from "../containers/Home";

export default function Home() {
  return (
    <MainLayout title="home">
      {/* <SlideBanner /> */}
      <HomeContainer />
    </MainLayout>
  );
}
