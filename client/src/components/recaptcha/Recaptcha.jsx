import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export default function ReCaptchaComponent ({ siteKey, verifyUrl, onSuccess, onError }) {
    const [isVerifying, setIsVerifying] = useState(false);
    const [verificationResult, setVerificationResult] = useState(null);

    const handleChange = (token) => {
        if (!token) return;

        setIsVerifying(true);

        // Gửi token lên server để xác minh
        fetch(verifyUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ captcha: token }),
        })
            .then((response) => response.json())
            .then((data) => {
                setIsVerifying(false);

                if (data.success) {
                    setVerificationResult('success');
                    if (onSuccess) onSuccess(data); // Gọi callback khi xác minh thành công
                } else {
                    setVerificationResult('failed');
                    if (onError) onError(data); // Gọi callback khi xác minh thất bại
                }
            })
            .catch((error) => {
                setIsVerifying(false);
                setVerificationResult('error');
                if (onError) onError(error); // Gọi callback khi xảy ra lỗi
            });
    };

    return (
        <div>
            <ReCAPTCHA
                sitekey={siteKey}
                onChange={handleChange}
            />
            {isVerifying && <p>Verifying...</p>}
            {verificationResult === 'success' && <p>✅ Verification Successful!</p>}
            {verificationResult === 'failed' && <p>❌ Verification Failed!</p>}
            {verificationResult === 'error' && <p>⚠️ An error occurred.</p>}
        </div>
    );
};
