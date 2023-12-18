import React from "react";
import anonAvatar from "../../assets/images/avatar.jpg";
import validate from "../../components/inputform/ValidateFields";
import InputReadOnly from "../../components/inputform/InputReadOnly1";
import InputFormV3 from "../../components/inputform/InputFormV3";

import * as userService from "../../services/user";
import AuthContext from "../../context/authProvider";
import { useEffect, useContext, useState } from "react";

const Editprofile = () => {
  const { auth } = useContext(AuthContext);
  console.log("🚀 ~ Editprofile ~ auth:", auth);
  // const [name, setName] = useState(auth?.name || "");
  // const {phone,setPhone} = useState("");
  // const {dateOfBirth,setDateOfBirth} = useState("");
  // const {address,setAddress} = useState("");
  // const {avatar,setAvatar} = useState("");
  const [invalidFields, setInvalidFields] = useState([]);

  const [payload, setpayload] = useState({
    name: "",
    phone: "",
    dateOfBirth: "",
    address: auth?.address || "",
    avatar: auth?.avatar,
  });

  const [user, setUser] = useState("");
  useEffect(() => {
    console.log("🚀 ~ getuser ~ auth.accessToken:", auth.accessToken);
    const getuser = async () => {
      try {
        const user = await userService.getcurrentuser(auth.accessToken);
        console.log("🚀 ~ getuser ~ user:", user);
        setUser({ ...user.data });
        setpayload({ ...user.data });
        // console.log(payload);
      } catch (error) {
        console.log("Error ", error);
      }
    };
    getuser();
  }, [auth]);

  const handleSubmit = async () => {
    console.log(payload);
    const result = validate(payload, setInvalidFields);
    if (result === 0) {
      const result = await userService.EditUser(
        auth.accessToken,
        payload.name,
        payload.address,
        payload.dateOfBirth,
        payload.phone,
        payload.avatar,
      );
      console.log("🚀 ~ handleSubmit ~ result:", result);
    }
  };

  return (
    <div className="flex h-full flex-col items-center">
      <h1 className="text-3x1 w-full border-b border-gray-200 py-4 text-start font-medium text-primaryColor">
        {" "}
        Chỉnh sửa Thông Tin Cá Nhân
      </h1>
      <div className="flex w-3/5 flex-auto items-center justify-center">
        <div className="flex w-full flex-col gap-4 py-6">
          <InputReadOnly
            value={`#${user?.id}` || ""}
            direction="flex-row"
            label="Mã Thành Viên"
          />
          <InputFormV3
            name="name"
            setInvalidFields={setInvalidFields}
            invaLidFields={invalidFields}
            direction="flew-row"
            value={user.name}
            setValue={setpayload}
            label="Tên Hiển Thị"
          />
          <InputReadOnly
            value={user?.email || ""}
            direction="flex-row"
            label="Email"
          />
          <InputFormV3
            name="phone"
            setInvalidFields={setInvalidFields}
            invaLidFields={invalidFields}
            direction="flew-row"
            value={payload.phone || user?.phone}
            setValue={setpayload}
            label="Số điện Thoại"
          />
          <InputFormV3
            name="dateOfBirth"
            setValue={setpayload}
            setInvalidFields={setInvalidFields}
            invaLidFields={invalidFields}
            direction="flew-row"
            value={payload.dateOfBirth || user?.dateOfBirth}
            label="Ngày sinh"
          />
          <InputFormV3
            name="address"
            setValue={setpayload}
            setInvalidFields={setInvalidFields}
            invaLidFields={invalidFields}
            direction="flew-row"
            value={payload.address || user.address}
            label="Địa chỉ"
          />

          {/* <div className="flex" >
                <label className='font-medium w-[192px] flex-none' htmlFor="fullname">Tên Hiển Thị</label>
                <input
                type='name'
                id='fullname'
                className='flex-auto p-2 border border-gray-300 rounded-md outline-none'
                
                value={name} 
                onChange={(e) => setName(e.target.value)}

                />
            </div> */}

          <div className="mb-6 flex">
            <label className="w-48 flex-none font-medium" htmlFor="avatar">
              Ảnh đại diện
            </label>
            <div>
              <img
                src={user?.avatar || anonAvatar}
                alt="avatar"
                className="h-28 w-28 rounded-full object-cover"
              />
              <input type="file" className="my-4 appearance-none" id="avatar" />
            </div>
          </div>

          <button
            className="w-full rounded-md bg-green-600 px-2 py-2 text-white hover:underline"
            onClick={handleSubmit}
          >
            Tiếp Tục
          </button>
        </div>
      </div>
    </div>
  );
};

export default Editprofile;
