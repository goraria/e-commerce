import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from "axios";
import apiHandler from "../../utils/apiHandler.jsx";

export const ReCaptchaComponent = ({ onSuccess, onError }) => {
    const [isVerifying, setIsVerifying] = useState(false);
    const [verificationResult, setVerificationResult] = useState(null);

    const handleChange = async (token) => {
        if (!token) return;

        setIsVerifying(true);

        try {
            const response = await apiHandler.post(
                "/recaptcha/verify-captcha",
                { captcha: token },
                { headers: { "Content-Type": "application/json" } }
            );

            setIsVerifying(false);

            if (response.data.success) {
                setVerificationResult("success");
                if (onSuccess) onSuccess(response.data); // Callback khi thành công
            } else {
                setVerificationResult("failed");
                if (onError) onError(response.data); // Callback khi thất bại
            }
        } catch (error) {
            setIsVerifying(false);
            setVerificationResult("error");

            if (onError) {
                if (error.response) {
                    // Lỗi từ server (có response)
                    onError(error.response.data);
                } else {
                    // Lỗi mạng hoặc request bị hủy
                    onError({ message: "Network error or request failed" });
                }
            }
        }
    };

    return (
        <div className="justify-content-center">
            <ReCAPTCHA
                sitekey={"6LfaA50qAAAAAGbL3FubZuwBEaLuDMAfEPjN48lX"}
                onChange={handleChange}
                style={{ width: '100%' }}
            />
            {isVerifying && <p>Verifying...</p>}
            {verificationResult === 'success' && <p>✅ Verification Successful!</p>}
            {verificationResult === 'failed' && <p>❌ Verification Failed!</p>}
            {verificationResult === 'error' && <p>⚠️ An error occurred.</p>}
        </div>
    );
};
