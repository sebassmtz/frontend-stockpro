import { Form } from "@/components/Form";
import React, { useContext } from "react";
import { ModalContext } from "@/context/ModalContext";

import { useQueryClient, useMutation } from "@tanstack/react-query";

import { createUserAPI } from "@/api/Users";
import { ToasterSucess, ToasterError } from "@/helpers/useToaster";

function CreateUserDialog() {
  const { setOpen } = useContext(ModalContext);

  const queryClient = useQueryClient();

  const addUserMutation = useMutation({
    mutationFn: createUserAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      setOpen(false);
      ToasterSucess("Usuario creado exitosamente");
    },
    onError: (error: any) => {
      console.log(error.response.data);
      error.response.data.forEach((error: any) => {
        ToasterError(error.message);
      });
    },
  });

  const onSubmit = (formData: any) => {
    console.log("formData", formData);
  
    addUserMutation.mutate({
      ...formData,
      isActive: true,
    });
  };

  const onCancel = () => {
    setOpen(false);
  };

  const documentTypes = [
    {
      value: "CC",
      label: "Cedula de Ciudadania",
    },
    {
      value: "PP",
      label: "Pasaporte",
    },
    {
      value: "CE",
      label: "Cedula de Extranjeria",
    },
    {
      value: "TI",
      label: "Tarjeta de Identidad",
    },
    {
      value: "NIT",
      label: "NIT",
    },
  ];

  const roles = [
    { value: "cashier", label: "Cajero" },
    { value: "admin", label: "Administrador" },
    { value: "superAdmin", label: "Super Administrador" },
  ];
  return (
    <Form title="Añadir Usuario" onSubmit={onSubmit}>
      <div className="my-[10px] grid grid-cols-2 gap-4">
        <Form.ListBox
          name="type_document"
          placeholder="Seleccione su tipo de documento"
          label="Tipo de documento"
          options={documentTypes}
        />
        <Form.InputRequired
          name="id_document"
          label="Número de documento"
          placeholder="Ingresa tu número de documento"
          type="number"
        />
        <Form.InputRequired
          name="name"
          label="Nombre"
          placeholder="Ingresa tu nombre"
          type="text"
        />
        <Form.InputRequired
          name="last_name"
          label="Apellido"
          placeholder="Ingresa tu apellido"
          type="text"
        />
        <Form.InputRequired
          name="phone"
          label="Número de celular"
          placeholder="Ingresa tu número de celular"
          type="number"
        />
        <Form.InputRequired
          name="email"
          label="Correo electrónico"
          placeholder="Ingresa tu correo electrónico"
          type="email"
        />
        <Form.InputRequired
          name="username"
          label="Usuario"
          placeholder="Ingresa tu usuario"
          type="text"
        />
        <Form.InputRequired
          name="password"
          type="password"
          label="Contraseña"
          placeholder="Ingresa tu contraseña"
        />
        <Form.ListBox
          name="rol"
          label="Rol"
          placeholder="Seleccione el rol del usuario"
          options={roles}
        />
      </div>
      <div className="my-[10px] grid grid-cols-2 gap-4">
        <Form.CancelButton buttonText="Cancelar" onClick={onCancel} />
        <Form.SubmitButton buttonText="Aceptar" />
      </div>
    </Form>
  );
}

interface RegisterFields {
  type_document?: string;
  id_document?: string;
  name?: string;
  last_name?: string;
  phone?: string;
  email?: string;
  username?: string;
  password?: string;
  rol?: string;
}

export default CreateUserDialog;
