import {useEffect} from "react";

const BellWarning = () => {
    useEffect(() => {
        Toast();
    },[])

    return (
        <>
            <div className="card mb-4">
                <h5 className="card-header">Bootstrap Toasts Styles</h5>
                <div className="row g-0">
                    <div className="col-md-6 p-4">
                        <div className="text-light small fw-medium mb-3">Default</div>
                        <div className="toast-container position-relative">
                            <div className="bs-toast toast fade show" role="alert" aria-live="assertive"
                                 aria-atomic="true">
                                <div className="toast-header">
                                    <i className="bx bx-bell me-2"></i>
                                    <div className="me-auto fw-medium">Bootstrap</div>
                                    <small>11 mins ago</small>
                                    <button type="button" className="btn-close" data-bs-dismiss="toast"
                                            aria-label="Close"></button>
                                </div>
                                <div className="toast-body">
                                    Fruitcake chocolate bar tootsie roll gummies gummies jelly beans cake.
                                </div>
                            </div>

                            <div
                                className="bs-toast toast fade show bg-primary"
                                role="alert"
                                aria-live="assertive"
                                aria-atomic="true">
                                <div className="toast-header">
                                    <i className="bx bx-bell me-2"></i>
                                    <div className="me-auto fw-medium">Bootstrap</div>
                                    <small>11 mins ago</small>
                                    <button type="button" className="btn-close" data-bs-dismiss="toast"
                                            aria-label="Close"></button>
                                </div>
                                <div className="toast-body">
                                    Fruitcake chocolate bar tootsie roll gummies gummies jelly beans cake.
                                </div>
                            </div>

                            <div
                                className="bs-toast toast fade show bg-secondary"
                                role="alert"
                                aria-live="assertive"
                                aria-atomic="true">
                                <div className="toast-header">
                                    <i className="bx bx-bell me-2"></i>
                                    <div className="me-auto fw-medium">Bootstrap</div>
                                    <small>11 mins ago</small>
                                    <button type="button" className="btn-close" data-bs-dismiss="toast"
                                            aria-label="Close"></button>
                                </div>
                                <div className="toast-body">
                                    Fruitcake chocolate bar tootsie roll gummies gummies jelly beans cake.
                                </div>
                            </div>

                            <div
                                className="bs-toast toast fade show bg-success"
                                role="alert"
                                aria-live="assertive"
                                aria-atomic="true">
                                <div className="toast-header">
                                    <i className="bx bx-bell me-2"></i>
                                    <div className="me-auto fw-medium">Bootstrap</div>
                                    <small>11 mins ago</small>
                                    <button type="button" className="btn-close" data-bs-dismiss="toast"
                                            aria-label="Close"></button>
                                </div>
                                <div className="toast-body">
                                    Fruitcake chocolate bar tootsie roll gummies gummies jelly beans cake.
                                </div>
                            </div>

                            <div
                                className="bs-toast toast fade show bg-danger"
                                role="alert"
                                aria-live="assertive"
                                aria-atomic="true">
                                <div className="toast-header">
                                    <i className="bx bx-bell me-2"></i>
                                    <div className="me-auto fw-medium">Bootstrap</div>
                                    <small>11 mins ago</small>
                                    <button type="button" className="btn-close" data-bs-dismiss="toast"
                                            aria-label="Close"></button>
                                </div>
                                <div className="toast-body">
                                    Fruitcake chocolate bar tootsie roll gummies gummies jelly beans cake.
                                </div>
                            </div>

                            <div
                                className="bs-toast toast fade show bg-warning"
                                role="alert"
                                aria-live="assertive"
                                aria-atomic="true">
                                <div className="toast-header">
                                    <i className="bx bx-bell me-2"></i>
                                    <div className="me-auto fw-medium">Bootstrap</div>
                                    <small>11 mins ago</small>
                                    <button type="button" className="btn-close" data-bs-dismiss="toast"
                                            aria-label="Close"></button>
                                </div>
                                <div className="toast-body">
                                    Fruitcake chocolate bar tootsie roll gummies gummies jelly beans cake.
                                </div>
                            </div>

                            <div
                                className="bs-toast toast fade show bg-info"
                                role="alert"
                                aria-live="assertive"
                                aria-atomic="true">
                                <div className="toast-header">
                                    <i className="bx bx-bell me-2"></i>
                                    <div className="me-auto fw-medium">Bootstrap</div>
                                    <small>11 mins ago</small>
                                    <button type="button" className="btn-close" data-bs-dismiss="toast"
                                            aria-label="Close"></button>
                                </div>
                                <div className="toast-body">
                                    Fruitcake chocolate bar tootsie roll gummies gummies jelly beans cake.
                                </div>
                            </div>

                            <div
                                className="bs-toast toast fade show bg-dark"
                                role="alert"
                                aria-live="assertive"
                                aria-atomic="true">
                                <div className="toast-header">
                                    <i className="bx bx-bell me-2"></i>
                                    <div className="me-auto fw-medium">Bootstrap</div>
                                    <small>11 mins ago</small>
                                    <button type="button" className="btn-close" data-bs-dismiss="toast"
                                            aria-label="Close"></button>
                                </div>
                                <div className="toast-body">
                                    Fruitcake chocolate bar tootsie roll gummies gummies jelly beans cake.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 ui-bg-overlay-container p-4">
                        <div className="ui-bg-overlay bg-dark rounded-end-bottom"></div>
                        <div className="text-white small fw-medium mb-3">Translucent</div>

                        <div className="toast-container position-relative">
                            <div className="bs-toast toast fade show" role="alert" aria-live="assertive"
                                 aria-atomic="true">
                                <div className="toast-header">
                                    <i className="bx bx-bell me-2"></i>
                                    <div className="me-auto fw-medium">Bootstrap</div>
                                    <small>11 mins ago</small>
                                    <button type="button" className="btn-close" data-bs-dismiss="toast"
                                            aria-label="Close"></button>
                                </div>
                                <div className="toast-body">
                                    Fruitcake chocolate bar tootsie roll gummies gummies jelly beans cake.
                                </div>
                            </div>

                            <div
                                className="bs-toast toast fade show bg-primary"
                                role="alert"
                                aria-live="assertive"
                                aria-atomic="true">
                                <div className="toast-header">
                                    <i className="bx bx-bell me-2"></i>
                                    <div className="me-auto fw-medium">Bootstrap</div>
                                    <small>11 mins ago</small>
                                    <button type="button" className="btn-close" data-bs-dismiss="toast"
                                            aria-label="Close"></button>
                                </div>
                                <div className="toast-body">
                                    Fruitcake chocolate bar tootsie roll gummies gummies jelly beans cake.
                                </div>
                            </div>

                            <div
                                className="bs-toast toast fade show bg-secondary"
                                role="alert"
                                aria-live="assertive"
                                aria-atomic="true">
                                <div className="toast-header">
                                    <i className="bx bx-bell me-2"></i>
                                    <div className="me-auto fw-medium">Bootstrap</div>
                                    <small>11 mins ago</small>
                                    <button type="button" className="btn-close" data-bs-dismiss="toast"
                                            aria-label="Close"></button>
                                </div>
                                <div className="toast-body">
                                    Fruitcake chocolate bar tootsie roll gummies gummies jelly beans cake.
                                </div>
                            </div>

                            <div
                                className="bs-toast toast fade show bg-success"
                                role="alert"
                                aria-live="assertive"
                                aria-atomic="true">
                                <div className="toast-header">
                                    <i className="bx bx-bell me-2"></i>
                                    <div className="me-auto fw-medium">Bootstrap</div>
                                    <small>11 mins ago</small>
                                    <button type="button" className="btn-close" data-bs-dismiss="toast"
                                            aria-label="Close"></button>
                                </div>
                                <div className="toast-body">
                                    Fruitcake chocolate bar tootsie roll gummies gummies jelly beans cake.
                                </div>
                            </div>

                            <div
                                className="bs-toast toast fade show bg-danger"
                                role="alert"
                                aria-live="assertive"
                                aria-atomic="true">
                                <div className="toast-header">
                                    <i className="bx bx-bell me-2"></i>
                                    <div className="me-auto fw-medium">Bootstrap</div>
                                    <small>11 mins ago</small>
                                    <button type="button" className="btn-close" data-bs-dismiss="toast"
                                            aria-label="Close"></button>
                                </div>
                                <div className="toast-body">
                                    Fruitcake chocolate bar tootsie roll gummies gummies jelly beans cake.
                                </div>
                            </div>

                            <div
                                className="bs-toast toast fade show bg-warning"
                                role="alert"
                                aria-live="assertive"
                                aria-atomic="true">
                                <div className="toast-header">
                                    <i className="bx bx-bell me-2"></i>
                                    <div className="me-auto fw-medium">Bootstrap</div>
                                    <small>11 mins ago</small>
                                    <button type="button" className="btn-close" data-bs-dismiss="toast"
                                            aria-label="Close"></button>
                                </div>
                                <div className="toast-body">
                                    Fruitcake chocolate bar tootsie roll gummies gummies jelly beans cake.
                                </div>
                            </div>

                            <div
                                className="bs-toast toast fade show bg-info"
                                role="alert"
                                aria-live="assertive"
                                aria-atomic="true">
                                <div className="toast-header">
                                    <i className="bx bx-bell me-2"></i>
                                    <div className="me-auto fw-medium">Bootstrap</div>
                                    <small>11 mins ago</small>
                                    <button type="button" className="btn-close" data-bs-dismiss="toast"
                                            aria-label="Close"></button>
                                </div>
                                <div className="toast-body">
                                    Fruitcake chocolate bar tootsie roll gummies gummies jelly beans cake.
                                </div>
                            </div>

                            <div
                                className="bs-toast toast fade show bg-dark"
                                role="alert"
                                aria-live="assertive"
                                aria-atomic="true">
                                <div className="toast-header">
                                    <i className="bx bx-bell me-2"></i>
                                    <div className="me-auto fw-medium">Bootstrap</div>
                                    <small>11 mins ago</small>
                                    <button type="button" className="btn-close" data-bs-dismiss="toast"
                                            aria-label="Close"></button>
                                </div>
                                <div className="toast-body">
                                    Fruitcake chocolate bar tootsie roll gummies gummies jelly beans cake.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BellWarning