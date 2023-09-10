import { useState, useContext } from "react";
import { AppButton } from "../../../components/button";
import { AppTextHR } from "../../../components/hr-text";
import { AppInput } from "../../../components/input";
import { AppLink } from "../../../components/link";
import { AppLogo } from "../../../components/logo";
import './login-modal.scss';
import { apiService } from "../../../services/api";
import { ServerError } from "../../../entities/utils";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../providers/user";

interface Props {
    closeModal: () => void;
    openSignup: () => void;
}
export function LoginModal(props: Props) {
    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    const [credentials, setCredentials] = useState<string>();
    const [password, setPassword] = useState<string>("admin123");

    async function login() {
        if (credentials && password) {
            const response = await apiService.login(credentials, password);
            if (response instanceof ServerError) {
                alert(response.toString());
            }
            else {
                props.closeModal();
                navigate("/home");
                userContext.setUser(response);
            }
        }
        else alert("Complete information first!");
    }

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ position: 'absolute', top: 0, right: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.6)' }}
        >
            <div id="modal-view">
                <div className="mt-2 mb-4">
                    <div
                        className="close-button"
                        onClick={props.closeModal}
                    >
                        <svg width={20} height={20} viewBox="0 0 24 24" aria-hidden="true">
                            <g>
                                <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z">
                                </path>
                            </g>
                        </svg>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <AppLogo width={35} height={35} />
                    </div>
                </div>
                <div
                    style={{ margin: '0% 25% auto', height: 'inherit' }}>
                    <div 
                        className="d-flex row justify-content-around"
                        style={{ height: '70%' }}>
                        <h2 className="basic dark">
                            Sign in to X
                        </h2>
                        <AppButton
                            title="Sign in with Google"
                            onClick={() => { }}
                            icon="https://www.svgrepo.com/show/303108/google-icon-logo.svg"
                        />

                        <AppTextHR />
                        <div className="w-100 my-2">
                            <AppInput
                                value={credentials}
                                type="email"
                                onChange={(value) => setCredentials(value)}
                                label="Phone, email or username"
                                placeholder="Phone, email or username"
                            />
                        </div>
                        <AppButton
                            taste="dark"
                            title="Next"
                            onClick={login}
                        />
                        <div className="my-2"></div>
                        <AppButton
                            title="Forgot password?"
                            onClick={() => { }}
                        />
                    </div>
                    <div
                        className="w-100 h-25 my-2 d-flex align-items-end"
                    >
                        <p className="">Don't have an account?</p>
                        <AppLink
                            text="Sign up"
                            link=""
                            onClick={props.openSignup}
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}