"use client";

import { AppContainer, Button, Form, Images, Modal } from "@/components";
import { useState } from "react";

export default function Home() {
  const [showModal, setShowModal] = useState<boolean>(false);

  console.log("SHOW Modal: ", showModal);

  return (
    <AppContainer>
      <section className="mt-10">
        <Button title="Find Image" callback={() => setShowModal(!showModal)} />
      </section>

      <Modal show={showModal} callback={setShowModal} />
      <Images />
    </AppContainer>
  );
}
