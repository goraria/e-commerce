import React, { Component, useEffect, useState } from "react";
import {AccountPage} from "../account/AccountPage.jsx";

const UserProfile = () => {
    const [reloadAccountInfo, setReloadAccountInfo] = useState(0);

    // Hàm reload được truyền vào AccountInfo dưới dạng callback
    const handleReloadAccountInfo = () => {
        setReloadAccountInfo(reloadAccountInfo + 1);  // Tăng giá trị để force re-render
    };

    useEffect(() => {
        const deactivateAcc = document.querySelector('#formAccountDeactivation');

        // Update/reset user image of account page
        let accountUserImage = document.getElementById('uploadedAvatar');
        const fileInput = document.querySelector('.account-file-input');
        const resetFileInput = document.querySelector('.account-image-reset');

        if (accountUserImage) {
            const resetImage = accountUserImage.src;

            fileInput.onchange = () => {
                if (fileInput.files[0]) {
                    accountUserImage.src = window.URL.createObjectURL(fileInput.files[0]);
                }
            };

            resetFileInput.onclick = () => {
                fileInput.value = '';
                accountUserImage.src = resetImage;
            };
        }
    }, []);

    return (
        <>
            <AccountPage key={reloadAccountInfo} onReload={handleReloadAccountInfo} />

            {/*<div className="card mb-4">*/}
            {/*    <h5 className="card-header">Profile Details</h5>*/}
            {/*    <hr className="my-0" />*/}
            {/*    <div className="card-body">*/}
            {/*        <AccountInfo key={reloadAccountInfo} onReload={handleReloadAccountInfo} />*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    )
}

export default UserProfile
