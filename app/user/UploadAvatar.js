"use client";
import axios from "axios";
import React, { useState } from "react";
import "./profile.css";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import {
  Form,
  Button,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
const UpoloadAvatar = ({
  id,
  username,
  profile,
  setisUserUpdated,
}) => {
  const [modal, setModal] = useState(false);
  const [file, setFile] = useState(null);

  const toggle = () => {
    setModal(!modal);
  };


  const handleFileChange = ({ target: { files } }) => {
    if (files?.length) {
      const { type } = files[0];
      if (type === "image/png" || type === "image/jpeg") {
        setFile(files[0]);
      } else {
        toast.error("Accept only png and jpeg image types are allowed*", {
          hideProgressBar: true,
        });
      }
    }
  };

  const upateUserAvatarId = async ( profile) => {
    try {
      const token = Cookies.get("token");
      console.log(token);

      await axios.put(
        `https://favorable-dawn-95d99e7a24.strapiapp.com/api/users/${id}`,
        {  profile },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
        }
      );
      setisUserUpdated(true);
    } catch (error) {
      console.log({ error });
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      toast.error("File is required*", {
        hideProgressBar: true,
      });
      return;
    }

    try {
      const files = new FormData();
      files.append("files", file);
      files.append("name", `${username} avatar`);
      const token = Cookies.get("token");


      const {
        data: [{ id, profile }],
      } = await axios.post(`https://favorable-dawn-95d99e7a24.strapiapp.com/api/upload`, files, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `bearer ${token}`,
        },
      });
      upateUserAvatarId(id, profile);
      setFile(null);
      setModal(false);
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div>
      <Button size="sm" onClick={toggle}>
        {`${profile ? "Change" : "Upload"} picture`}
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{`${
          profile ? "Change" : "Upload"
        } your avatar`}</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="exampleFile">File</Label>
              <Input
                type="file"
                name="file"
                id="exampleFile"
                onChange={handleFileChange}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            Upload
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default UpoloadAvatar;