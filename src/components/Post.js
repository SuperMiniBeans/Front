import React, { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import "./post.css";

const Post = (props) => {
  const complete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      // fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
      extraAddress = `(${extraAddress})`;
    }
    console.log(data);
    console.log(data.zonecode);
    console.log(fullAddress);
    console.log(data.address);
    console.log(extraAddress);

    props.setcompany({
      ...props.company,
      postcode: data.zonecode,
      address1: fullAddress,
      address3: extraAddress,
    });
  };

  return (
    <div>
      <DaumPostcode className="postmodal" autoClose onComplete={complete} />
    </div>
  );
};

export default Post;