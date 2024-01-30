"use client";

import { useState } from "react";
import { AppContainer, Button, Images, Modal, Version } from "@/components";

export default function Home() {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <AppContainer>
      <section className="mt-10">
        <Button title="Find Image" callback={() => setShowModal(!showModal)} />
      </section>

      <Modal heading="Enter Details" show={showModal} callback={setShowModal} />
      <Images />
      <Version />
    </AppContainer>
  );
}
